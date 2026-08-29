import type { ModelDefinition } from "./model-definition"
import { parseFlexScreenModelParams } from "./parse-flex-screen-model-string"
import {
  parseBoltModelParams,
  parseHeatsetInsertModelParams,
  parseScrewModelParams,
  parseSpacerModelParams,
} from "./parse-hardware-model-string"
import {
  parseModelStringParams,
  type RawModelprinterParams,
} from "./parse-model-string"

const modelFunctions = {
  flexscreen: parseFlexScreenModelParams,
  screw: parseScrewModelParams,
  bolt: parseBoltModelParams,
  heatsetinsert: parseHeatsetInsertModelParams,
  spacer: parseSpacerModelParams,
}

const modelParamsToJson = (params: RawModelprinterParams): ModelDefinition => {
  const modelFunction = modelFunctions[params.fn as keyof typeof modelFunctions]
  if (modelFunction) {
    return modelFunction(params)
  }
  throw new Error(`Unsupported modelprinter function "${params.fn}"`)
}

export const string = (value: string) => {
  const params = parseModelStringParams(value)
  return {
    params: () => params,
    json: () => modelParamsToJson(params),
  }
}

export const parseModelString = (value: string): ModelDefinition =>
  string(value).json()

export const modelprinter = {
  string,
  getModelNames: () => Object.keys(modelFunctions),
}

/** Compact alias matching footprinter's familiar `fp.string(...)` API. */
export const mp = modelprinter
