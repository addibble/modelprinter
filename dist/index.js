// src/flex-screen-schema.ts
import { mm } from "@tscircuit/mm";
import { z } from "zod";
var modelLengthSchema = z.union([z.number(), z.string()]).transform((value, context) => {
  try {
    const parsed = mm(value);
    if (!Number.isFinite(parsed)) throw new Error("Length is not finite");
    return parsed;
  } catch {
    context.addIssue({
      code: "custom",
      message: `Invalid model length: ${String(value)}`
    });
    return z.NEVER;
  }
});
var positiveModelLengthSchema = modelLengthSchema.refine(
  (value) => value > 0,
  "Length must be greater than zero"
);
var nonnegativeModelLengthSchema = modelLengthSchema.refine(
  (value) => value >= 0,
  "Length cannot be negative"
);
var flexScreenOrientationSchema = z.enum([
  "sitsFlat",
  "sitsFlatBelowBoard",
  "foldedToFaceAboveBoard",
  "foldedToFaceBelowBoard",
  "foldedToRightAngleAboveBoard",
  "foldedToRightAngleBelowBoard"
]);
var positiveFiniteNumberSchema = z.number().finite().positive();
var aspectRatioStringSchema = z.string().refine((value) => {
  const parts = value.split(":");
  if (parts.length !== 2) return false;
  const width = Number(parts[0]);
  const height = Number(parts[1]);
  return Number.isFinite(width) && Number.isFinite(height) && width > 0 && height > 0;
}, 'Aspect ratio must look like "16:9"');
var flexScreenAspectRatioSchema = z.union([
  positiveFiniteNumberSchema,
  aspectRatioStringSchema,
  z.tuple([positiveFiniteNumberSchema, positiveFiniteNumberSchema])
]);
var modelPointSchema = z.object({
  x: modelLengthSchema.optional(),
  y: modelLengthSchema.optional(),
  z: modelLengthSchema.optional()
}).strict();
var rotationValueSchema = z.union([z.number().finite(), z.string().min(1)]);
var modelRotationSchema = z.tuple([
  rotationValueSchema,
  rotationValueSchema,
  rotationValueSchema
]);
var orientationShortcutKeys = [
  "sitsFlat",
  "sitsFlatBelowBoard",
  "foldedToFaceAboveBoard",
  "foldedToFaceBelowBoard",
  "foldsAboveBoard",
  "foldsBelowBoard",
  "foldedToRightAngleAboveBoard",
  "foldedToRightAngleBelowBoard"
];
var flexScreenModelPropsShape = {
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
  offset: modelPointSchema.optional()
};
var addOrientationShortcutIssue = (props, addIssue) => {
  const selectedShortcuts = orientationShortcutKeys.filter(
    (key) => props[key] === true
  );
  if (selectedShortcuts.length > 1) addIssue(selectedShortcuts[1]);
};
var flexScreenModelPropsSchema = z.object(flexScreenModelPropsShape).strict().superRefine((props, context) => {
  addOrientationShortcutIssue(props, (path) => {
    context.addIssue({
      code: "custom",
      message: "Only one FlexScreen orientation shortcut can be true",
      path: [path]
    });
  });
});
var flexScreenModelDefinitionSchema = z.object({
  fn: z.literal("flexscreen"),
  ...flexScreenModelPropsShape
}).strict().superRefine((model, context) => {
  addOrientationShortcutIssue(model, (path) => {
    context.addIssue({
      code: "custom",
      message: "Only one FlexScreen orientation shortcut can be true",
      path: [path]
    });
  });
});
var modelDefinitionSchema = flexScreenModelDefinitionSchema;

// src/parse-model-string.ts
var parsePart = (part) => {
  const match = part.match(/^([a-zA-Z]+)([\(\d\.\+\-].*)?$/);
  if (!match?.[1]) return void 0;
  return {
    fn: match[1].toLowerCase(),
    value: match[2]
  };
};
var parseModelStringParams = (definition) => {
  const normalizedDefinition = definition.trim();
  if (!normalizedDefinition) throw new Error("Model string cannot be empty");
  const parts = normalizedDefinition.split("_");
  const firstPart = parts[0];
  const first = parsePart(firstPart);
  const params = {};
  const fn = first?.fn ?? firstPart.toLowerCase();
  params[fn] = true;
  params.fn = fn;
  if (first?.value) {
    const numericValue = Number.parseFloat(first.value);
    if (Number.isFinite(numericValue)) params.num_pins = numericValue;
  }
  for (const part of parts.slice(1)) {
    if (!part) throw new Error("Model strings cannot contain empty tokens");
    const parsed = parsePart(part);
    if (!parsed) throw new Error(`Invalid model string token "${part}"`);
    params[parsed.fn] = parsed.value ?? true;
  }
  params.string = normalizedDefinition;
  return params;
};

// src/parse-flex-screen-model-string.ts
var orientationTokens = {
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
  foldedtorightanglebelowboard: "foldedToRightAngleBelowBoard"
};
var lengthProperties = {
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
    "foldstart"
  ],
  foldOutset: ["foldoutset", "outset"],
  screenGap: ["screengap"],
  boardTopZ: ["boardtopz"],
  boardThickness: ["boardthickness"],
  boardClearance: ["boardclearance"],
  cableStartX: ["cablestartx"],
  cableStartY: ["cablestarty"],
  cableStartZ: ["cablestartz"],
  cableLateralOffset: ["cablelateraloffset", "lateraloffset"]
};
var lengthTokenToProperty = Object.fromEntries(
  Object.entries(lengthProperties).flatMap(
    ([property, tokens]) => tokens.map((token) => [token, property])
  )
);
var integerTokenToProperty = {
  conductorcount: "conductorCount",
  conductors: "conductorCount",
  bendsegments: "bendSegments",
  foldsegments: "foldSegments"
};
var booleanTokens = {
  showscreen: ["showScreen", true],
  hidescreen: ["showScreen", false],
  showflex: ["showFlexCable", true],
  hideflex: ["showFlexCable", false],
  showconductors: ["showConductors", true],
  hideconductors: ["showConductors", false],
  showstiffeners: ["showStiffeners", true],
  hidestiffeners: ["showStiffeners", false]
};
var colorProperties = {
  screencolor: "screenColor",
  bezelcolor: "bezelColor",
  flexcolor: "flexCableColor",
  conductorcolor: "conductorColor",
  stiffenercolor: "stiffenerColor"
};
var parseAspectRatio = (value) => {
  const normalized = String(value).toLowerCase().replace("x", ":");
  if (normalized.includes(":")) {
    const [width, height, extra] = normalized.split(":");
    const numericWidth = Number(width);
    const numericHeight = Number(height);
    if (extra !== void 0 || !Number.isFinite(numericWidth) || !Number.isFinite(numericHeight) || numericWidth <= 0 || numericHeight <= 0) {
      throw new Error(`Invalid FlexScreen aspect ratio "${String(value)}"`);
    }
    return `${numericWidth}:${numericHeight}`;
  }
  const numeric = Number(normalized);
  if (!Number.isFinite(numeric) || numeric <= 0) {
    throw new Error(`Invalid FlexScreen aspect ratio "${String(value)}"`);
  }
  return numeric;
};
var unwrapFunctionValue = (value, token) => {
  if (typeof value !== "string" || !/^\(.+\)$/.test(value)) {
    throw new Error(`FlexScreen token "${token}" requires a value in (...)`);
  }
  return value.slice(1, -1);
};
var assertBareToken = (value, token) => {
  if (value !== true) {
    throw new Error(`FlexScreen token "${token}" does not accept a value`);
  }
};
var parseFlexScreenModelParams = (rawParams) => {
  if (rawParams.fn !== "flexscreen") {
    throw new Error(`Expected FlexScreen params, got "${rawParams.fn}"`);
  }
  const props = {};
  let orientation;
  let relativeDistance;
  for (const [token, value] of Object.entries(rawParams)) {
    if (token === "fn" || token === "string" || token === "flexscreen") {
      continue;
    }
    const tokenOrientation = orientationTokens[token];
    if (tokenOrientation) {
      assertBareToken(value, token);
      if (orientation && orientation !== tokenOrientation) {
        throw new Error(
          "A FlexScreen model string can only set one orientation"
        );
      }
      orientation = tokenOrientation;
      props.orientation = tokenOrientation;
      continue;
    }
    if (token in booleanTokens) {
      assertBareToken(value, token);
      const [property, enabled] = booleanTokens[token];
      props[property] = enabled;
      continue;
    }
    const colorProperty = colorProperties[token];
    if (colorProperty) {
      props[colorProperty] = unwrapFunctionValue(value, token);
      continue;
    }
    if (token === "ratio") {
      props.aspectRatio = parseAspectRatio(value);
      continue;
    }
    const lengthProperty = lengthTokenToProperty[token];
    if (lengthProperty) {
      props[lengthProperty] = value;
      continue;
    }
    if (token === "distance") {
      relativeDistance = value;
      continue;
    }
    const integerProperty = integerTokenToProperty[token];
    if (integerProperty) {
      const parsed = Number(value);
      if (!Number.isInteger(parsed) || parsed < 1) {
        throw new Error(
          `Invalid positive integer in FlexScreen token "${token}${String(value)}"`
        );
      }
      props[integerProperty] = parsed;
      continue;
    }
    throw new Error(`Unknown FlexScreen model token "${token}${String(value)}"`);
  }
  if (relativeDistance !== void 0) {
    if (orientation === "foldedToFaceAboveBoard") {
      props.distanceAboveBoard = relativeDistance;
    } else if (orientation === "foldedToFaceBelowBoard") {
      props.distanceBelowBoard = relativeDistance;
    } else {
      throw new Error(
        'The "distance" token requires foldsabove or foldsbelow; use distanceabove or distancebelow for an explicit side'
      );
    }
  }
  return flexScreenModelDefinitionSchema.parse({ fn: "flexscreen", ...props });
};

// src/modelprinter.ts
var modelFunctions = {
  flexscreen: parseFlexScreenModelParams
};
var modelParamsToJson = (params) => {
  const modelFunction = modelFunctions[params.fn];
  if (modelFunction) {
    return modelFunction(params);
  }
  throw new Error(`Unsupported modelprinter function "${params.fn}"`);
};
var string = (value) => {
  const params = parseModelStringParams(value);
  return {
    params: () => params,
    json: () => modelParamsToJson(params)
  };
};
var parseModelString = (value) => string(value).json();
var modelprinter = {
  string,
  getModelNames: () => Object.keys(modelFunctions)
};
var mp = modelprinter;
export {
  flexScreenAspectRatioSchema,
  flexScreenModelDefinitionSchema,
  flexScreenModelPropsSchema,
  flexScreenOrientationSchema,
  modelDefinitionSchema,
  modelLengthSchema,
  modelprinter,
  mp,
  nonnegativeModelLengthSchema,
  parseModelString,
  parseModelStringParams,
  positiveModelLengthSchema,
  string
};
//# sourceMappingURL=index.js.map