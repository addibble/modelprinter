import { mm } from "@tscircuit/mm"
import { z } from "zod"

export const modelLengthSchema = z
  .union([z.number(), z.string()])
  .transform((value, context) => {
    try {
      const parsed = mm(value)
      if (!Number.isFinite(parsed)) throw new Error("Length is not finite")
      return parsed
    } catch {
      context.addIssue({
        code: "custom",
        message: `Invalid model length: ${String(value)}`,
      })
      return z.NEVER
    }
  })

export const positiveModelLengthSchema = modelLengthSchema.refine(
  (value) => value > 0,
  "Length must be greater than zero",
)

export const nonnegativeModelLengthSchema = modelLengthSchema.refine(
  (value) => value >= 0,
  "Length cannot be negative",
)

export const flexScreenOrientationSchema = z.enum([
  "sitsFlat",
  "sitsFlatBelowBoard",
  "foldedToFaceAboveBoard",
  "foldedToFaceBelowBoard",
  "foldedToRightAngleAboveBoard",
  "foldedToRightAngleBelowBoard",
])

const positiveFiniteNumberSchema = z.number().finite().positive()

const aspectRatioStringSchema = z.string().refine((value) => {
  const parts = value.split(":")
  if (parts.length !== 2) return false
  const width = Number(parts[0])
  const height = Number(parts[1])
  return (
    Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0
  )
}, 'Aspect ratio must look like "16:9"')

export const flexScreenAspectRatioSchema = z.union([
  positiveFiniteNumberSchema,
  aspectRatioStringSchema,
  z.tuple([positiveFiniteNumberSchema, positiveFiniteNumberSchema]),
])

const modelPointSchema = z
  .object({
    x: modelLengthSchema.optional(),
    y: modelLengthSchema.optional(),
    z: modelLengthSchema.optional(),
  })
  .strict()

const rotationValueSchema = z.union([z.number().finite(), z.string().min(1)])

const modelRotationSchema = z.tuple([
  rotationValueSchema,
  rotationValueSchema,
  rotationValueSchema,
])

const orientationShortcutKeys = [
  "sitsFlat",
  "sitsFlatBelowBoard",
  "foldedToFaceAboveBoard",
  "foldedToFaceBelowBoard",
  "foldsAboveBoard",
  "foldsBelowBoard",
  "foldedToRightAngleAboveBoard",
  "foldedToRightAngleBelowBoard",
] as const

/**
 * Canonical, renderer-independent properties for a parameterized FlexScreen.
 * Every length accepts either millimeters as a number or a unit-bearing string
 * and is normalized to millimeters by the schema.
 */
export const flexScreenModelPropsSchema = z
  .object({
    width: positiveModelLengthSchema.optional(),
    height: positiveModelLengthSchema.optional(),
    diagonal: positiveModelLengthSchema.optional(),
    aspectRatio: flexScreenAspectRatioSchema.optional(),
    ratio: flexScreenAspectRatioSchema.optional(),
    defaultDiagonal: positiveModelLengthSchema.optional(),

    orientation: flexScreenOrientationSchema.optional(),
    sitsFlat: z.boolean().optional(),
    sitsFlatBelowBoard: z.boolean().optional(),
    foldedToFaceAboveBoard: z.boolean().optional(),
    foldedToFaceBelowBoard: z.boolean().optional(),
    foldsAboveBoard: z.boolean().optional(),
    foldsBelowBoard: z.boolean().optional(),
    foldedToRightAngleAboveBoard: z.boolean().optional(),
    foldedToRightAngleBelowBoard: z.boolean().optional(),

    screenThickness: positiveModelLengthSchema.optional(),
    bezelInset: nonnegativeModelLengthSchema.optional(),
    bezelDepth: positiveModelLengthSchema.optional(),
    activeAreaWidth: positiveModelLengthSchema.optional(),
    activeAreaHeight: positiveModelLengthSchema.optional(),
    screenColor: z.string().min(1).optional(),
    bezelColor: z.string().min(1).optional(),
    showScreen: z.boolean().optional(),

    flexCableLength: positiveModelLengthSchema.optional(),
    flexCableWidth: positiveModelLengthSchema.optional(),
    flexCableThickness: positiveModelLengthSchema.optional(),
    flexCableColor: z.string().min(1).optional(),
    conductorCount: z.number().int().positive().optional(),
    conductorPitch: positiveModelLengthSchema.optional(),
    conductorWidth: positiveModelLengthSchema.optional(),
    conductorThickness: positiveModelLengthSchema.optional(),
    conductorColor: z.string().min(1).optional(),
    cableEdgeMargin: nonnegativeModelLengthSchema.optional(),
    exposedContactLength: nonnegativeModelLengthSchema.optional(),
    showConductors: z.boolean().optional(),
    showFlexCable: z.boolean().optional(),

    showStiffeners: z.boolean().optional(),
    stiffenerLength: nonnegativeModelLengthSchema.optional(),
    stiffenerThickness: positiveModelLengthSchema.optional(),
    stiffenerColor: z.string().min(1).optional(),

    bendRadius: positiveModelLengthSchema.optional(),
    bendSegments: z.number().int().min(2).optional(),
    rightAngleVerticalLead: nonnegativeModelLengthSchema.optional(),
    distanceAboveBoard: nonnegativeModelLengthSchema.optional(),
    distanceBelowBoard: nonnegativeModelLengthSchema.optional(),
    foldDistanceFromConnector: nonnegativeModelLengthSchema.optional(),
    foldOutset: positiveModelLengthSchema.optional(),
    foldSegments: z.number().int().min(4).optional(),
    screenGap: nonnegativeModelLengthSchema.optional(),

    boardTopZ: modelLengthSchema.optional(),
    boardThickness: positiveModelLengthSchema.optional(),
    boardClearance: nonnegativeModelLengthSchema.optional(),
    cableStartX: modelLengthSchema.optional(),
    cableStartY: modelLengthSchema.optional(),
    cableStartZ: modelLengthSchema.optional(),
    cableLateralOffset: modelLengthSchema.optional(),

    screenOffset: modelPointSchema.optional(),
    screenRotation: modelRotationSchema.optional(),
    rotation: modelRotationSchema.optional(),
    offset: modelPointSchema.optional(),
  })
  .strict()
  .superRefine((props, context) => {
    const selectedShortcuts = orientationShortcutKeys.filter(
      (key) => props[key] === true,
    )
    if (selectedShortcuts.length <= 1) return
    context.addIssue({
      code: "custom",
      message: "Only one FlexScreen orientation shortcut can be true",
      path: [selectedShortcuts[1]!],
    })
  })

export type FlexScreenOrientation = z.infer<typeof flexScreenOrientationSchema>
export type FlexScreenAspectRatio = z.infer<typeof flexScreenAspectRatioSchema>
export type FlexScreenModelPropsInput = z.input<
  typeof flexScreenModelPropsSchema
>
export type FlexScreenModelProps = z.output<typeof flexScreenModelPropsSchema>

export const flexScreenModelDefinitionSchema = z
  .object({
    type: z.literal("flexscreen"),
    props: flexScreenModelPropsSchema,
  })
  .strict()

export type FlexScreenModelDefinition = z.infer<
  typeof flexScreenModelDefinitionSchema
>

// This alias becomes a discriminated union as additional model families land.
export const modelDefinitionSchema = flexScreenModelDefinitionSchema
export type ModelDefinition = z.infer<typeof modelDefinitionSchema>
