import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'

//Type
export const Program = objectType({
  name: 'Program',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('title')
    t.nonNull.int('split')
    t.nonNull.int('year')
    t.nonNull.list.nonNull.field('activities', {
      type: 'Activity',
      resolve: (root, _, ctx) =>
        ctx.prisma.program
          .findUnique({
            where: { id: root.id }
          })
          .activities()
    })
  }
})

//Queries
export const ProgramQuery = extendType({
  type: 'Query',
  definition(t) {
    /**
     * Liste aller Programme
     */
    t.nonNull.list.nonNull.field('programs', {
      type: 'Program',
      resolve: (_root, _args, ctx) => ctx.prisma.program.findMany()
    })
    /**
     * Objekt eines Programms
     */
    t.nonNull.field('program', {
      type: 'Program',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.program.findUnique({ where: { id: args.id } })
    })
  }
})

//Mutations
export const ProgramMutation = extendType({
  type: 'Mutation',
  definition(t) {
    /**
     * Erstelle Programm
     */
    t.nonNull.field('createProgram', {
      type: 'Program',
      args: {
        title: nonNull(stringArg()),
        split: nonNull(intArg()),
        year: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.program.create({
          data: {
            title: args.title,
            split: args.split,
            year: args.year
          }
        })
    })
    /**
     * Aktualisiere Programm
     */
    t.field('updateProgram', {
      type: 'Program',
      args: {
        id: nonNull(intArg()),
        title: stringArg(),
        split: intArg(),
        year: intArg()
      },
      resolve: async (_root, args, ctx) =>
        ctx.prisma.program.update({
          where: { id: args.id },
          data: {
            title: args.title,
            split: args.split,
            year: args.year
          }
        })
    })
    /**
     * Lösche Programm
     */
    t.field('deleteProgram', {
      type: 'Program',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.program.delete({
          where: { id: args.id }
        })
    })
  }
})
