import {
  booleanArg,
  extendType,
  intArg,
  nonNull,
  objectType,
  stringArg
} from 'nexus'

//Type
export const Activity = objectType({
  name: 'Activity',
  definition(t) {
    t.nonNull.int('id'),
      t.nonNull.string('date'),
      t.nonNull.field('type', {
        type: 'Type',
        resolve: (root, _, ctx) =>
          ctx.prisma.activity
            .findUnique({
              where: { id: root.id }
            })
            .type()
      }),
      t.nonNull.field('location', {
        type: 'Location',
        resolve: (root, _, ctx) =>
          ctx.prisma.activity
            .findUnique({
              where: { id: root.id }
            })
            .location()
      })
    t.nonNull.field('step', {
      type: 'Step',
      resolve: (root, _, ctx) =>
        ctx.prisma.activity
          .findUnique({
            where: { id: root.id }
          })
          .step()
    })
    t.nonNull.field('chief', {
      type: 'Leader',
      resolve: (root, _, ctx) =>
        ctx.prisma.activity
          .findUnique({
            where: { id: root.id }
          })
          .chief()
    })
    t.nonNull.boolean('planned')
    t.nonNull.field('program', {
      type: 'Program',
      resolve: (root, _, ctx) =>
        ctx.prisma.activity
          .findUnique({
            where: { id: root.id }
          })
          .program()
    })
    t.nonNull.list.nonNull.field('items', {
      type: 'Item',
      resolve: (root, _, ctx) =>
        ctx.prisma.activity
          .findUnique({
            where: { id: root.id }
          })
          .items()
    })
  }
})

//Queries
export const ActivityQuery = extendType({
  type: 'Query',
  definition(t) {
    /**
     * Liste aller Aktivitäten
     */
    t.nonNull.list.nonNull.field('activities', {
      type: 'Activity',
      args: {
        program: intArg()
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.activity.findMany({
          where: { program: { id: args.program } }
        })
    })
    /**
     * Objekt einer Aktivität
     */
    t.nonNull.field('activity', {
      type: 'Activity',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.activity.findUnique({ where: { id: args.id } })
    })
  }
})

//Mutations
export const ActivityMutation = extendType({
  type: 'Mutation',
  definition(t) {
    /**
     * Erstelle Aktivität
     */
    t.nonNull.field('createActivity', {
      type: 'Activity',
      args: {
        date: nonNull(stringArg()),
        type: nonNull(intArg()),
        location: nonNull(intArg()),
        step: nonNull(intArg()),
        chief: nonNull(intArg()),
        planned: nonNull(booleanArg()),
        program: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.activity.create({
          data: {
            date: args.date,
            type: {
              connect: { id: args.type }
            },
            location: {
              connect: { id: args.location }
            },
            step: {
              connect: { id: args.step }
            },
            chief: {
              connect: { id: args.chief }
            },
            planned: args.planned,
            program: {
              connect: { id: args.program }
            }
          }
        })
    })
    /**
     * Aktualisiere Aktivität
     */
    t.field('updateActivity', {
      type: 'Activity',
      args: {
        id: nonNull(intArg()),
        date: stringArg(),
        type: intArg(),
        location: intArg(),
        step: intArg(),
        chief: intArg(),
        planned: booleanArg(),
        program: intArg()
      },
      resolve: async (_root, args, ctx) =>
        ctx.prisma.activity.update({
          where: { id: args.id },
          data: {
            date: args.date,
            type: {
              connect: { id: args.type }
            },
            location: {
              connect: { id: args.location }
            },
            step: {
              connect: { id: args.step }
            },
            chief: {
              connect: { id: args.chief }
            },
            planned: args.planned,
            program: {
              connect: { id: args.program }
            }
          }
        })
    })
    /**
     * Lösche Aktivität
     */
    t.field('deleteActivity', {
      type: 'Activity',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.activity.delete({
          where: { id: args.id }
        })
    })
  }
})
