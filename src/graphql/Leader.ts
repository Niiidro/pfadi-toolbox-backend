import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'

//Type 
export const Leader = objectType({
  name: 'Leader',
  definition(t) {
    t.nonNull.int('id'),
    t.nonNull.string('name')
    t.nonNull.list.nonNull.field('activities', {
      type: 'Activity',
      resolve: (root, _, ctx) => ctx.prisma.leader.findUnique({
        where: { id: root.id }
      }).activities()
    })   
  },
})

//Queries
export const LeaderQuery = extendType({
  type: 'Query',
  definition(t) {
    /**
     * Liste aller Leiter
     */
    t.nonNull.list.nonNull.field('leaders', {
      type: 'Leader',
      resolve: (_root, _args, ctx) => ctx.prisma.leader.findMany()
    })
    /**
     * Objekt eines Leiters
     */
    t.nonNull.field('leader', {
      type: 'Leader',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.leader.findUnique({ where: { id: args.id } })
    })
  }
})

//Mutations
export const LeaderMutation = extendType({
  type: 'Mutation',
  definition(t) {
    /**
     * Erstelle Leiter
     */
    t.nonNull.field('createLeader', {
      type: 'Leader',
      args: {
        name: nonNull(stringArg()),
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.leader.create({
          data: {
            name: args.name
          }
        })
    })
    /**
     * Aktualisiere Leiter
     */
    t.field('updateLeader', {
      type: 'Leader',
      args: {
        id: nonNull(intArg()),
        name: stringArg(),
      },
      resolve: async (_root, args, ctx) =>
        ctx.prisma.leader.update({
          where: { id: args.id },
          data: {
            name: args.name
          }
        })
    })
    /**
     * Lösche Leiter
     */
    t.field('deleteLeader', {
      type: 'Leader',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.leader.delete({
          where: { id: args.id }
        })
    })
  }
})
