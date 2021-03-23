import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'

//Type 
export const Type = objectType({
  name: 'Type',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('name')
    t.nonNull.list.nonNull.field('activities', {
      type: 'Activity',
      resolve: (root, _, ctx) => ctx.prisma.type.findUnique({
        where: { id: root.id }
      }).activities()
    }) 
  },
})

//Queries
export const TypeQuery = extendType({
  type: 'Query',
  definition(t) {
    /**
     * Liste aller Typen
     */
    t.nonNull.list.nonNull.field('types', {
      type: 'Type',
      resolve: (_root, _args, ctx) => ctx.prisma.type.findMany()
    })
    /**
     * Objekt eines Typs
     */
    t.nonNull.field('type', {
      type: 'Type',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.type.findUnique({ where: { id: args.id } })
    })
  }
})

//Mutations
export const TypeMutation = extendType({
  type: 'Mutation',
  definition(t) {
    /**
     * Erstelle Typ
     */
    t.nonNull.field('createType', {
      type: 'Type',
      args: {
        name: nonNull(stringArg()),
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.type.create({
          data: {
            name: args.name
          }
        })
    })
    /**
     * Aktualisiere Typ
     */
    t.field('updateType', {
      type: 'Type',
      args: {
        id: nonNull(intArg()),
        name: stringArg()
      },
      resolve: async (_root, args, ctx) =>
        ctx.prisma.type.update({
          where: { id: args.id },
          data: {
            name: args.name
          }
        })
    })
    /**
     * Lösche Typ
     */
    t.field('deleteType', {
      type: 'Type',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.type.delete({
          where: { id: args.id }
        })
    })
  }
})
