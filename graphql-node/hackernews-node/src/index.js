const { ApolloServer } = require('apollo-server');
const fs = require('fs');
const path = require('path');


let links = [
    {
        id: 'link-0',
        url: 'www.howtographql.com',
        description: 'Fullstack tutorial for GraphQL'
    }
]


const resolvers = {
    Query: {
        info: () => `This is the API of a Hackernews Clone`,
        feed: () => links,
        link: (parent, args) => {
            // console.log(args)
            return links.find((link) => link.id === args.id)
        }
    },
    Link: {
        id: (parent) => parent.id,
        description: (parent) => parent.description,
        url: (parent) => parent.url,
    },
    Mutation: {
        post: (parent, args) => {
            let idCount = links.length
            const link = {
                id: `link-${idCount++}`,
                description: args.description,
                url: args.url,
            }
            links.push(link)
            return link
        },
        updateLink: (parent, args) => {
            let link = links.find((link) => link.id === args.id)
            if (link === undefined ) {
                return link
            }
            link.description = args.description
            link.url = args.url
            return link
        },
        deleteLink: (parent, args) => {
            let index = links.findIndex((link) => link.id === args.id)
            if (index === -1 ) {
                return undefined
            }
            console.log(links[index])
            let link = links[index]
            links.splice(index, 1)
            console.log(link)
            return link
        }
    },
}


const server = new ApolloServer({
    typeDefs: fs.readFileSync(
        path.join(__dirname, 'schema.graphql'),
        'utf8'
    ),
    resolvers,
})

server
    .listen()
    .then(({ url }) =>
        console.log(`Server is running on ${url}`)
    );