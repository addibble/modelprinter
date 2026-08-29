import { z } from "zod"
import { flexScreenModelDefinitionSchema } from "./flex-screen-schema"
import { hardwareModelDefinitionSchema } from "./hardware-schema"
import { hexSocketBoltModelDefinitionSchema } from "./hex-socket-bolt-schema"
import { sheetMetalModelDefinitionSchema } from "./sheet-metal-schema"

/**
 * Every model family modelprinter knows.
 *
 * A plain union rather than `z.discriminatedUnion`: the flexscreen schema
 * carries a `.superRefine`, which makes it a ZodEffects, and a discriminated
 * union will not accept one.
 */
export const modelDefinitionSchema = z.union([
  sheetMetalModelDefinitionSchema,
  flexScreenModelDefinitionSchema,
  hexSocketBoltModelDefinitionSchema,
  hardwareModelDefinitionSchema,
])

export type ModelDefinition = z.infer<typeof modelDefinitionSchema>
