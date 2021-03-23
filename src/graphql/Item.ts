import {
  booleanArg,
  extendType,
  intArg,
  nonNull,
  objectType,
  stringArg
} from 'nexus'

//Type
export const Item = objectType({
  name: 'Item',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('time')
    t.nonNull.int('duration'),
      t.nonNull.string('task'),
      t.string('stuff'),
      t.nonNull.field('activity', {
        type: 'Activity',
        resolve: (root, _, ctx) =>
          ctx.prisma.item
            .findUnique({
              where: { id: root.id }
            })
            .activity()
      })
  }
})

//Queries
export const ItemQuery = extendType({
  type: 'Query',
  definition(t) {
    /**
     * Liste aller Items
     */
    t.nonNull.list.nonNull.field('items', {
      type: 'Item',
      args: {
        activity: intArg()
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.item.findMany({
          where: { activity: { id: args.activity } }
        })
    })
    /**
     * Objekt eines Items
     */
    t.nonNull.field('item', {
      type: 'Item',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.item.findUnique({ where: { id: args.id } })
    })
  }
})

//Mutations
export const ItemMutation = extendType({
  type: 'Mutation',
  definition(t) {
    /**
     * Erstelle Item
     */
    t.nonNull.field('createItem', {
      type: 'Item',
      args: {
        time: nonNull(stringArg()),
        duration: nonNull(intArg()),
        task: nonNull(stringArg()),
        stuff: stringArg(),
        activity: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.item.create({
          data: {
            time: args.time,
            duration: args.duration,
            task: args.task,
            stuff: args.stuff,
            activity: {
              connect: { id: args.activity }
            }
          }
        })
    })
    /**
     * Aktualisiere Item
     */
    t.field('updateItem', {
      type: 'Item',
      args: {
        id: nonNull(intArg()),
        time: stringArg(),
        duration: intArg(),
        task: stringArg(),
        stuff: stringArg(),
        activity: intArg()
      },
      resolve: async (_root, args, ctx) =>
        ctx.prisma.item.update({
          where: { id: args.id },
          data: {
            time: args.time,
            duration: args.duration,
            task: args.task,
            stuff: args.stuff,
            activity: {
              connect: { id: args.activity }
            }
          }
        })
    })
    /**
     * Lösche Item
     */
    t.field('deleteItem', {
      type: 'Item',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.item.delete({
          where: { id: args.id }
        })
    })
  }
})
