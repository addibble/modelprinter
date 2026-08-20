import {
  flexScreenModelPropsSchema,
  modelLengthSchema,
  type FlexScreenModelProps,
  type FlexScreenOrientation,
} from "./flex-screen-schema"

const PREFIX = "flexscreen"

const orientationTokens: Record<string, FlexScreenOrientation> = {
  sitsflat: "sitsFlat",
  sitsflatbelow: "sitsFlatBelowBoard",
  sitsflatbelowboard: "sitsFlatBelowBoard",
  foldsabove: "foldedToFaceAboveBoard",
  foldsaboveboard: "foldedToFaceAboveBoard",
  foldedtofaceaboveboard: "foldedToFaceAboveBoard",
  foldsbelow: "foldedToFaceBelowBoard",
  foldsbelowboard: "foldedToFaceBelowBoard",
  foldedtofacebelowboard: "foldedToFaceBelowBoard",
  rightangleabove: "foldedToRightAngleAboveBoard",
  rightangleaboveboard: "foldedToRightAngleAboveBoard",
  foldedtorightangleaboveboard: "foldedToRightAngleAboveBoard",
  rightanglebelow: "foldedToRightAngleBelowBoard",
  rightanglebelowboard: "foldedToRightAngleBelowBoard",
  foldedtorightanglebelowboard: "foldedToRightAngleBelowBoard",
}

const lengthProperties = {
  width: ["width", "w"],
  height: ["height", "h"],
  diagonal: ["diagonal", "diag", "d"],
  defaultDiagonal: ["defaultdiagonal", "defaultdiag"],
  screenThickness: ["screenthickness"],
  bezelInset: ["bezelinset"],
  bezelDepth: ["bezeldepth"],
  activeAreaWidth: ["activeareawidth", "activew"],
  activeAreaHeight: ["activeareaheight", "activeh"],
  flexCableLength: ["flexcablelength", "flexlength", "flex"],
  flexCableWidth: ["flexcablewidth", "flexwidth"],
  flexCableThickness: ["flexcablethickness", "flexthickness"],
  conductorPitch: ["conductorpitch"],
  conductorWidth: ["conductorwidth"],
  conductorThickness: ["conductorthickness"],
  cableEdgeMargin: ["cableedgemargin", "edgemargin"],
  exposedContactLength: ["exposedcontactlength", "contactlength"],
  stiffenerLength: ["stiffenerlength"],
  stiffenerThickness: ["stiffenerthickness"],
  bendRadius: ["bendradius"],
  rightAngleVerticalLead: ["rightangleverticallead", "verticallead"],
  distanceAboveBoard: ["distanceaboveboard", "distanceabove"],
  distanceBelowBoard: ["distancebelowboard", "distancebelow"],
  foldDistanceFromConnector: [
    "folddistancefromconnector",
    "folddistance",
    "foldstart",
  ],
  foldOutset: ["foldoutset", "outset"],
  screenGap: ["screengap"],
  boardTopZ: ["boardtopz"],
  boardThickness: ["boardthickness"],
  boardClearance: ["boardclearance"],
  cableStartX: ["cablestartx"],
  cableStartY: ["cablestarty"],
  cableStartZ: ["cablestartz"],
  cableLateralOffset: ["cablelateraloffset", "lateraloffset"],
} satisfies Partial<Record<keyof FlexScreenModelProps, readonly string[]>>

const integerProperties = {
  conductorCount: ["conductorcount", "conductors"],
  bendSegments: ["bendsegments"],
  foldSegments: ["foldsegments"],
} satisfies Partial<Record<keyof FlexScreenModelProps, readonly string[]>>

const booleanTokens = {
  showscreen: ["showScreen", true],
  hidescreen: ["showScreen", false],
  showflex: ["showFlexCable", true],
  hideflex: ["showFlexCable", false],
  showconductors: ["showConductors", true],
  hideconductors: ["showConductors", false],
  showstiffeners: ["showStiffeners", true],
  hidestiffeners: ["showStiffeners", false],
} as const

const colorProperties = {
  screencolor: "screenColor",
  bezelcolor: "bezelColor",
  flexcolor: "flexCableColor",
  conductorcolor: "conductorColor",
  stiffenercolor: "stiffenerColor",
} as const

const numericPrefixPattern = /^[+-]?(?:\d+\.?\d*|\.\d+)(?:e[+-]?\d+)?/i

const parseLength = (value: string, token: string): number => {
  const result = modelLengthSchema.safeParse(value)
  if (!result.success) {
    throw new Error(`Invalid length in FlexScreen token "${token}"`)
  }
  return result.data
}

const readAliasedValue = (
  token: string,
  aliases: readonly string[],
): string | undefined => {
  for (const alias of [...aliases].sort((a, b) => b.length - a.length)) {
    const remainder = token.slice(alias.length)
    if (token.startsWith(alias) && numericPrefixPattern.test(remainder)) {
      return remainder
    }
  }
  return undefined
}

const parseAspectRatio = (value: string): number | `${number}:${number}` => {
  const normalized = value.replace("x", ":")
  if (normalized.includes(":")) {
    const [width, height, extra] = normalized.split(":")
    const numericWidth = Number(width)
    const numericHeight = Number(height)
    if (
      extra !== undefined ||
      !Number.isFinite(numericWidth) ||
      !Number.isFinite(numericHeight) ||
      numericWidth <= 0 ||
      numericHeight <= 0
    ) {
      throw new Error(`Invalid FlexScreen aspect ratio "${value}"`)
    }
    return `${numericWidth}:${numericHeight}` as `${number}:${number}`
  }
  const numeric = Number(normalized)
  if (!Number.isFinite(numeric) || numeric <= 0) {
    throw new Error(`Invalid FlexScreen aspect ratio "${value}"`)
  }
  return numeric
}

export const isFlexScreenModelString = (value: string): boolean =>
  value.toLowerCase() === PREFIX || value.toLowerCase().startsWith(`${PREFIX}_`)

export const parseFlexScreenModelString = (
  value: string,
): FlexScreenModelProps => {
  if (!isFlexScreenModelString(value)) {
    throw new Error(`FlexScreen model strings must start with "${PREFIX}"`)
  }

  const props: Record<string, unknown> = {}
  let orientation: FlexScreenOrientation | undefined
  let relativeDistance: number | undefined

  for (const originalToken of value.split("_").slice(1)) {
    if (!originalToken) {
      throw new Error("FlexScreen model strings cannot contain empty tokens")
    }
    const token = originalToken.toLowerCase()

    const tokenOrientation = orientationTokens[token]
    if (tokenOrientation) {
      if (orientation && orientation !== tokenOrientation) {
        throw new Error(
          "A FlexScreen model string can only set one orientation",
        )
      }
      orientation = tokenOrientation
      props.orientation = tokenOrientation
      continue
    }

    if (token in booleanTokens) {
      const [property, enabled] =
        booleanTokens[token as keyof typeof booleanTokens]
      props[property] = enabled
      continue
    }

    const colorMatch = originalToken.match(/^([a-z]+)\((.+)\)$/i)
    if (colorMatch) {
      const property =
        colorProperties[
          colorMatch[1]!.toLowerCase() as keyof typeof colorProperties
        ]
      if (property) {
        props[property] = colorMatch[2]!
        continue
      }
    }

    if (token.startsWith("ratio") && token.length > "ratio".length) {
      props.aspectRatio = parseAspectRatio(token.slice("ratio".length))
      continue
    }

    let matched = false
    for (const [property, aliases] of Object.entries(lengthProperties)) {
      const rawValue = readAliasedValue(token, aliases)
      if (rawValue === undefined) continue
      props[property] = parseLength(rawValue, originalToken)
      matched = true
      break
    }
    if (matched) continue

    if (token.startsWith("distance") && token.length > "distance".length) {
      relativeDistance = parseLength(
        token.slice("distance".length),
        originalToken,
      )
      continue
    }

    for (const [property, aliases] of Object.entries(integerProperties)) {
      const rawValue = readAliasedValue(token, aliases)
      if (rawValue === undefined) continue
      const parsed = Number(rawValue)
      if (!Number.isInteger(parsed) || parsed < 1) {
        throw new Error(
          `Invalid positive integer in FlexScreen token "${originalToken}"`,
        )
      }
      props[property] = parsed
      matched = true
      break
    }
    if (matched) continue

    throw new Error(`Unknown FlexScreen model token "${originalToken}"`)
  }

  if (relativeDistance !== undefined) {
    if (orientation === "foldedToFaceAboveBoard") {
      props.distanceAboveBoard = relativeDistance
    } else if (orientation === "foldedToFaceBelowBoard") {
      props.distanceBelowBoard = relativeDistance
    } else {
      throw new Error(
        'The "distance" token requires foldsabove or foldsbelow; use distanceabove or distancebelow for an explicit side',
      )
    }
  }

  return flexScreenModelPropsSchema.parse(props)
}
