import {
  booleanArg,
  extendType,
  intArg,
  nonNull,
  objectType,
  stringArg
} from 'nexus'

//Type
export const Settings = objectType({
  name: 'Settings',
  definition(t) {
    t.nonNull.int('id')
    t.nonNull.string('startTime')
    t.nonNull.boolean('semester')
    t.nonNull.boolean('dark')
  }
})

//Queries
export const SettingsQuery = extendType({
  type: 'Query',
  definition(t) {
    /**
     * Objekt einer Einstellung
     */
    t.nonNull.field('settings', {
      type: "Settings",
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.settings.findUnique({ where: { id: args.id } })
    })
  }
})

//Mutations
export const SettingsMutation = extendType({
  type: 'Mutation',
  definition(t) {
    /**
     * Erstelle Einstellungen
     */
    t.nonNull.field('createSettings', {
      type: 'Settings',
      args: {
        startTime: stringArg(),
        semester: booleanArg(),
        dark: booleanArg()
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.settings.create({
          data: {
            startTime: args.startTime,
            semester: args.semester,
            dark: args.dark
          }
        })
    })
    /**
     * Aktualisiere Einstellungen
     */
    t.field('updateSettings', {
      type: 'Settings',
      args: {
        id: nonNull(intArg()),
        startTime: stringArg(),
        semester: booleanArg(),
        dark: booleanArg()
      },
      resolve: async (_root, args, ctx) =>
        ctx.prisma.settings.update({
          where: { id: args.id },
          data: {
            startTime: args.startTime,
            semester: args.semester,
            dark: args.dark
          }
        })
    })
    /**
     * Lösche Einstellungen
     */
    t.field('deleteSettings', {
      type: 'Settings',
      args: {
        id: nonNull(intArg())
      },
      resolve: (_root, args, ctx) =>
        ctx.prisma.settings.delete({
          where: { id: args.id }
        })
    })
  }
})
