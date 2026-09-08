import { z } from "zod"
import { positiveModelLengthSchema } from "./flex-screen-schema"

/**
 * Assembly hardware model families: the fasteners that hold a board into an
 * enclosure.
 *
 * This module is the *grammar* only. It says what `screw_m3_l8_buttonhead`
 * means, not how wide an M3 button head is -- those dimension tables live in
 * `jscad-assembly-hardware`, the same way `flexscreen`'s schema lives here
 * while `DEFAULT_DIAGONAL` and its mesh live in `jscad-electronics`.
 *
 * So every property here is either stated by the string or absent. Nothing is
 * defaulted to a dimension, because a default that lives in two layers is a
 * default that will eventually disagree with itself.
 */

/**
 * Nominal metric threads, lowercase.
 *
 * Props forwards a required nonempty string without maintaining this vocabulary.
 * The mechanical resolver validates the authored spelling against this grammar
 * before looking up catalogue dimensions; it does not normalize case.
 */
export const fastenerThreads = ["m2", "m2.5", "m3", "m4", "m5"] as const
export type FastenerThread = (typeof fastenerThreads)[number]
export const fastenerThreadSchema = z.enum(fastenerThreads)

/**
 * Head shapes, which the enclosure needs in order to cut a recess.
 *
 * Drive type (phillips, torx, hex) is deliberately absent: it is chosen by
 * whoever assembles the device and changes no geometry we model.
 */
export const screwHeads = [
  "buttonhead",
  "panhead",
  "flathead",
  "countersunk",
  "socketcap",
  "hexflange",
] as const
export type ScrewHead = (typeof screwHeads)[number]
export const screwHeadSchema = z.enum(screwHeads)

/**
 * A screw and a bolt are the same solid; they differ in what they thread into.
 * A screw forms its own thread in plastic, a bolt threads into an insert, and
 * that difference decides the bore the enclosure cuts -- so the two are
 * separate families rather than one family with a flag.
 */
const threadedFastenerShape = {
  thread: fastenerThreadSchema,
  /** Nominal designated length. Overall for countersunk, under-head otherwise. */
  length: positiveModelLengthSchema,
  /** Absent means the geometry layer picks its default. */
  head: screwHeadSchema.optional(),
}

export const screwModelDefinitionSchema = z
  .object({ fn: z.literal("screw"), ...threadedFastenerShape })
  .strict()

export const boltModelDefinitionSchema = z
  .object({ fn: z.literal("bolt"), ...threadedFastenerShape })
  .strict()

export const heatsetinsertModelDefinitionSchema = z
  .object({
    fn: z.literal("heatsetinsert"),
    thread: fastenerThreadSchema,
    /** Length along the axis; the outside diameter comes from the series. */
    length: positiveModelLengthSchema,
  })
  .strict()

/**
 * A spacer has no thread and no catalogue -- it is fully described by three
 * diameters and a length, so it is stated outright rather than looked up.
 */
export const spacerModelDefinitionSchema = z
  .object({
    fn: z.literal("spacer"),
    outerDiameter: positiveModelLengthSchema,
    innerDiameter: positiveModelLengthSchema,
    length: positiveModelLengthSchema,
  })
  .strict()
  .superRefine((model, context) => {
    if (model.innerDiameter >= model.outerDiameter) {
      context.addIssue({
        code: "custom",
        message:
          "A spacer's innerDiameter must be smaller than its outerDiameter",
        path: ["innerDiameter"],
      })
    }
  })

export type ScrewModelDefinition = z.infer<typeof screwModelDefinitionSchema>
export type BoltModelDefinition = z.infer<typeof boltModelDefinitionSchema>
export type HeatsetInsertModelDefinition = z.infer<
  typeof heatsetinsertModelDefinitionSchema
>
export type SpacerModelDefinition = z.infer<typeof spacerModelDefinitionSchema>

export const hardwareModelDefinitionSchema = z.union([
  screwModelDefinitionSchema,
  boltModelDefinitionSchema,
  heatsetinsertModelDefinitionSchema,
  spacerModelDefinitionSchema,
])

export type HardwareModelDefinition = z.infer<
  typeof hardwareModelDefinitionSchema
>
