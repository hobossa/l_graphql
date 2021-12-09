const { ApolloServer } = require('apollo-server');
const { PrismaClient } = require('@prisma/client')
const fs = require('fs');
const path = require('path');


const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: (parent, args, context) => {
            return context.prisma.link.findMany()
        },
        link: (parent, args, context) => {
            console.log(args)
            return context.prisma.link.findUnique({
                where: {
                    id: parseInt(args.id),
                },
            })
        }
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    },
    Mutation: {
        post: (parent, args, context, info) => {
            // console.log(info)
            const newLink = context.prisma.link.create({
                data: {
                    url: args.url,
                    description: args.description,
                },
            })
            return newLink
        },
        updateLink: (parent, args, context) => {
            return context.prisma.link.update({
                where: {
                    id: parseInt(args.id),
                },
                data: {
                    url: args.url,
                    description: args.description,
                },
            })
        },
        deleteLink: (parent, args, context) => {
            return context.prisma.link.delete({
                where: {
                    id: parseInt(args.id),
                },
            })
        }
    },
}

const prisma = new PrismaClient()

const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
    context: {
        prisma,
    }
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );