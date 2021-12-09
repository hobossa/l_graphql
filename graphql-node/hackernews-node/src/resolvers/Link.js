function postedBy(parent, args, context) {
    return context.prisma.link.findUnique({ where: { id: parent.id } }).postedBy()
}

// The resolvers for scalar values can be omitted
// function id(parent) {
//     return parent.id
// }
// const id = (parent) => parent.id
// const url = (parent) => parent.url
// const description = (parent) => parent.description

module.exports = {
    // id,
    // url,
    // description,
    postedBy,
}