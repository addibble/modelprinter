import {
  boltModelDefinitionSchema,
  heatsetinsertModelDefinitionSchema,
  screwHeads,
  screwModelDefinitionSchema,
  spacerModelDefinitionSchema,
  type BoltModelDefinition,
  type HeatsetInsertModelDefinition,
  type ScrewHead,
  type ScrewModelDefinition,
  type SpacerModelDefinition,
} from "./hardware-schema"
import type { RawModelprinterParams } from "./parse-model-string"

/**
 * Head aliases.
 *
 * The canonical spellings are the ones the RFC lists. The short forms are
 * accepted because `create-fdm-enclosure` already emits them, and a string that
 * round-trips through two packages should not depend on which one wrote it.
 */
const headAliases: Record<string, ScrewHead> = {
  ...Object.fromEntries(screwHeads.map((head) => [head, head])),
  button: "buttonhead",
  pan: "panhead",
  flat: "flathead",
  csk: "countersunk",
  socket: "socketcap",
  cap: "socketcap",
  hex: "hexflange",
}

const bare = (value: unknown, token: string): void => {
  if (value !== true && value !== undefined) {
    throw new Error(`Hardware model token "${token}" does not take a value`)
  }
}

const valued = (value: unknown, token: string, fn: string): string => {
  if (value === true || value === undefined) {
    throw new Error(`Hardware model token "${token}" needs a value in "${fn}"`)
  }
  return String(value)
}

/**
 * Read the tokens a threaded fastener shares: `m3` thread, `l8` length, and an
 * optional bare head token.
 */
const parseThreadedFastener = (
  params: RawModelprinterParams,
): { thread: string; length: string; head?: ScrewHead } => {
  let thread: string | undefined
  let length: string | undefined
  let head: ScrewHead | undefined

  for (const [token, value] of Object.entries(params)) {
    if (token === "fn" || token === "string" || token === params.fn) continue
    // A pin count is a footprinter idea -- it arrives from a numeric suffix on
    // the family token, so `screw3_m3_l8` parses as a 3-pin screw. Skipping it
    // let that spelling through as an ordinary screw; hardware has no pins, so
    // it is a malformed string and says so.
    if (token === "num_pins") {
      throw new Error(
        `A ${params.fn} takes no pin count, but "${params.string}" gives one`,
      )
    }

    if (token === "m") {
      thread = `m${valued(value, token, params.fn)}`
      continue
    }
    if (token === "l") {
      length = valued(value, token, params.fn)
      continue
    }
    const aliased = headAliases[token]
    if (aliased) {
      bare(value, token)
      if (head && head !== aliased) {
        throw new Error(`A ${params.fn} can only have one head shape`)
      }
      head = aliased
      continue
    }
    throw new Error(`Unknown ${params.fn} model token "${token}"`)
  }

  if (!thread) throw new Error(`A ${params.fn} needs a thread, e.g. "m3"`)
  if (!length) throw new Error(`A ${params.fn} needs a length, e.g. "l8"`)
  return { thread, length, ...(head ? { head } : {}) }
}

export const parseScrewModelParams = (
  params: RawModelprinterParams,
): ScrewModelDefinition =>
  screwModelDefinitionSchema.parse({
    fn: "screw",
    ...parseThreadedFastener(params),
  })

export const parseBoltModelParams = (
  params: RawModelprinterParams,
): BoltModelDefinition =>
  boltModelDefinitionSchema.parse({
    fn: "bolt",
    ...parseThreadedFastener(params),
  })

export const parseHeatsetInsertModelParams = (
  params: RawModelprinterParams,
): HeatsetInsertModelDefinition => {
  let thread: string | undefined
  let length: string | undefined

  for (const [token, value] of Object.entries(params)) {
    if (token === "fn" || token === "string" || token === params.fn) continue
    // A pin count is a footprinter idea -- it arrives from a numeric suffix on
    // the family token, so `screw3_m3_l8` parses as a 3-pin screw. Skipping it
    // let that spelling through as an ordinary screw; hardware has no pins, so
    // it is a malformed string and says so.
    if (token === "num_pins") {
      throw new Error(
        `A ${params.fn} takes no pin count, but "${params.string}" gives one`,
      )
    }
    if (token === "m") {
      thread = `m${valued(value, token, params.fn)}`
      continue
    }
    if (token === "l") {
      length = valued(value, token, params.fn)
      continue
    }
    throw new Error(`Unknown heatsetinsert model token "${token}"`)
  }

  if (!thread) throw new Error('A heatsetinsert needs a thread, e.g. "m3"')
  if (!length) throw new Error('A heatsetinsert needs a length, e.g. "l4"')
  return heatsetinsertModelDefinitionSchema.parse({
    fn: "heatsetinsert",
    thread,
    length,
  })
}

export const parseSpacerModelParams = (
  params: RawModelprinterParams,
): SpacerModelDefinition => {
  let outerDiameter: string | undefined
  let innerDiameter: string | undefined
  let length: string | undefined

  for (const [token, value] of Object.entries(params)) {
    if (token === "fn" || token === "string" || token === params.fn) continue
    // A pin count is a footprinter idea -- it arrives from a numeric suffix on
    // the family token, so `screw3_m3_l8` parses as a 3-pin screw. Skipping it
    // let that spelling through as an ordinary screw; hardware has no pins, so
    // it is a malformed string and says so.
    if (token === "num_pins") {
      throw new Error(
        `A ${params.fn} takes no pin count, but "${params.string}" gives one`,
      )
    }
    if (token === "od") {
      outerDiameter = valued(value, token, params.fn)
      continue
    }
    if (token === "id") {
      innerDiameter = valued(value, token, params.fn)
      continue
    }
    if (token === "l") {
      length = valued(value, token, params.fn)
      continue
    }
    throw new Error(`Unknown spacer model token "${token}"`)
  }

  if (!outerDiameter) throw new Error('A spacer needs an outer diameter, "od5"')
  if (!innerDiameter) throw new Error('A spacer needs an inner diameter, "id3"')
  if (!length) throw new Error('A spacer needs a length, e.g. "l6"')
  return spacerModelDefinitionSchema.parse({
    fn: "spacer",
    outerDiameter,
    innerDiameter,
    length,
  })
}
