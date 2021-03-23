import { extendType, intArg, nonNull, objectType, stringArg } from 'nexus'

//Type
export const Location = objectType({
  name: 'Location',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('city')
    t.string('place')
    t.nonNull.list.nonNull.field('activities', {
      type: 'Activity',
      resolve: (root, _, ctx) =>
        ctx.prisma.location
          .findUnique({
            where: { id: root.id }
          })
          .activities()
    })
  }
})

//Queries
export const LocationQuery = extendType({
  type: 'Query',
  definition(t) {
    /**
     * Liste aller Orte
     */
    t.nonNull.list.nonNull.field('locations', {
      type: 'Location',
      resolve: (_root, _args, ctx) => ctx.prisma.location.findMany()
    })
    /**
     * Objekt eines Ortes
     */
    t.nonNull.field('location', {
      type: 'Location',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.location.findUnique({ where: { id: args.id } })
    })
  }
})

//Mutations
export const LocationMutation = extendType({
  type: 'Mutation',
  definition(t) {
    /**
     * Erstelle Ort
     */
    t.nonNull.field('createLocation', {
      type: 'Location',
      args: {
        city: nonNull(stringArg()),
        place: stringArg()
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.location.create({
          data: {
            city: args.city,
            place: args.place
          }
        })
    })
    /**
     * Aktualisiere Ort
     */
    t.field('updateLocation', {
      type: 'Location',
      args: {
        id: nonNull(intArg()),
        city: stringArg(),
        place: stringArg()
      },
      resolve: async (_root, args, ctx) =>
        ctx.prisma.location.update({
          where: { id: args.id },
          data: {
            city: args.city,
            place: args.place
          }
        })
    })
    /**
     * Lösche Ort
     */
    t.field('deleteLocation', {
      type: 'Location',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.location.delete({
          where: { id: args.id }
        })
    })
  }
})
