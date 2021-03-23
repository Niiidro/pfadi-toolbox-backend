import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'

//Type 
export const Step = objectType({
  name: 'Step',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.list.nonNull.field('activities', {
      type: 'Activity',
      resolve: (root, _, ctx) => ctx.prisma.step.findUnique({
        where: { id: root.id }
      }).activities()
    }) 
  },
})

//Queries
export const stepQuery = extendType({
  type: 'Query',
  definition(t) {
    /**
     * Liste aller Steps
     */
    t.nonNull.list.nonNull.field('steps', {
      type: 'Step',
      resolve: (_root, _args, ctx) => ctx.prisma.step.findMany()
    })
    /**
     * Objekt eines Steps
     */
    t.nonNull.field('step', {
      type: 'Step',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.step.findUnique({ where: { id: args.id } })
    })
  }
})

//Mutations
export const stepMutation = extendType({
  type: 'Mutation',
  definition(t) {
    /**
     * Erstelle Step
     */
    t.nonNull.field('createStep', {
      type: 'Step',
      args: {
        name: nonNull(stringArg()),
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.step.create({
          data: {
            name: args.name
          }
        })
    })
    /**
     * Aktualisiere Step
     */
    t.field('updateStep', {
      type: 'Step',
      args: {
        id: nonNull(intArg()),
        name: stringArg()
      },
      resolve: async (_root, args, ctx) =>
        ctx.prisma.step.update({
          where: { id: args.id },
          data: {
            name: args.name
          }
        })
    })
    /**
     * Lösche Step
     */
    t.field('deleteStep', {
      type: 'Step',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.step.delete({
          where: { id: args.id }
        })
    })
  }
})