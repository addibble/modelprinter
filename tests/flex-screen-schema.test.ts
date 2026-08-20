import { describe, expect, test } from "bun:test"
import {
  flexScreenModelPropsSchema,
  modelprinter,
  parseFlexScreenModelString,
  parseModelString,
} from "../src"

describe("FlexScreen model schema", () => {
  test("normalizes unit-bearing properties to millimeters", () => {
    expect(
      flexScreenModelPropsSchema.parse({
        width: "2in",
        height: "30mm",
        flexCableLength: "6cm",
        boardTopZ: "-0.5mm",
        screenOffset: { x: "2mm", z: "-3mm" },
      }),
    ).toMatchObject({
      width: 50.8,
      height: 30,
      flexCableLength: 60,
      boardTopZ: -0.5,
      screenOffset: { x: 2, z: -3 },
    })
  })

  test("rejects unknown props and conflicting orientation shortcuts", () => {
    expect(() =>
      flexScreenModelPropsSchema.parse({ imaginaryLength: "4mm" }),
    ).toThrow()
    expect(() =>
      flexScreenModelPropsSchema.parse({
        foldsAboveBoard: true,
        foldsBelowBoard: true,
      }),
    ).toThrow("Only one FlexScreen orientation shortcut can be true")
  })
})

describe("FlexScreen model strings", () => {
  const source =
    "flexscreen_w40mm_h22.5mm_flex60mm_foldsabove_distance20mm_foldstart9mm_outset6mm_conductors10"

  test("parses the initial flexscreen grammar", () => {
    expect(parseFlexScreenModelString(source)).toEqual({
      width: 40,
      height: 22.5,
      flexCableLength: 60,
      orientation: "foldedToFaceAboveBoard",
      distanceAboveBoard: 20,
      foldDistanceFromConnector: 9,
      foldOutset: 6,
      conductorCount: 10,
    })
  })

  test("exposes a footprinter-like API", () => {
    expect(modelprinter.string(source).json()).toEqual({
      type: "flexscreen",
      props: parseFlexScreenModelString(source),
    })
    expect(modelprinter.string(source).props().distanceAboveBoard).toBe(20)
  })

  test("rejects typos, ambiguous distance, and unsupported models", () => {
    expect(() =>
      parseFlexScreenModelString("flexscreen_foldsabove_distnace20mm"),
    ).toThrow('Unknown FlexScreen model token "distnace20mm"')
    expect(() =>
      parseFlexScreenModelString("flexscreen_sitsflat_distance20mm"),
    ).toThrow('The "distance" token requires foldsabove or foldsbelow')
    expect(() => parseModelString("motor_w20mm")).toThrow(
      'Unsupported modelprinter model "motor"',
    )
  })
})
