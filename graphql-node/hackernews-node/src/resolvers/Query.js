
function info() {
    return `This is the API of a Hackernews Clone`
}

function feed(parent, args, context) {
    return context.prisma.link.findMany()
}


function link(parent, args, context) {
    console.log(args)
    return context.prisma.link.findUnique({
        where: {
            id: parseInt(args.id),
        },
    })
}

module.exports = {
    info,
    feed,
    link,
}