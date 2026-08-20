import {
  flexScreenModelDefinitionSchema,
  type ModelDefinition,
} from "./flex-screen-schema"
import {
  isFlexScreenModelString,
  parseFlexScreenModelString,
} from "./parse-flex-screen-model-string"

export const parseModelString = (value: string): ModelDefinition => {
  if (isFlexScreenModelString(value)) {
    return flexScreenModelDefinitionSchema.parse({
      type: "flexscreen",
      props: parseFlexScreenModelString(value),
    })
  }
  const modelName = value.split("_", 1)[0] || value
  throw new Error(`Unsupported modelprinter model "${modelName}"`)
}

export const isModelString = (value: string): boolean =>
  isFlexScreenModelString(value)

export const modelprinter = {
  parse: parseModelString,
  string: (value: string) => ({
    json: () => parseModelString(value),
    model: () => parseModelString(value),
    props: () => parseModelString(value).props,
  }),
}

/** Compact alias matching footprinter's familiar `fp.string(...)` API. */
export const mp = modelprinter
