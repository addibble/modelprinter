import { describe, expect, test } from "bun:test"
import { mp, parseModelString } from "../src"

describe("assembly hardware model strings", () => {
  test("parses the families the RFC names", () => {
    expect(parseModelString("screw_m3_l8_buttonhead")).toEqual({
      fn: "screw",
      thread: "m3",
      length: 8,
      head: "buttonhead",
    })
    expect(parseModelString("heatsetinsert_m3_l4")).toEqual({
      fn: "heatsetinsert",
      thread: "m3",
      length: 4,
    })
    expect(parseModelString("bolt_m3_l10_socketcap")).toEqual({
      fn: "bolt",
      thread: "m3",
      length: 10,
      head: "socketcap",
    })
    expect(parseModelString("spacer_od5_id3_l6")).toEqual({
      fn: "spacer",
      outerDiameter: 5,
      innerDiameter: 3,
      length: 6,
    })
  })

  test("registers the families for dispatch", () => {
    expect(mp.getModelNames()).toEqual(
      expect.arrayContaining(["screw", "bolt", "heatsetinsert", "spacer"]),
    )
  })

  /**
   * A hand-written `l0.5cm` has to mean 5mm. Parsed with the shared length
   * schema rather than `parseFloat`, which would read it as 0.5 and draw a
   * screw ten times too short without anything throwing.
   */
  test("normalizes unit-bearing lengths to millimeters", () => {
    expect(parseModelString("screw_m2.5_l0.5cm")).toMatchObject({
      thread: "m2.5",
      length: 5,
    })
    expect(parseModelString("bolt_m3_l0.25in")).toMatchObject({ length: 6.35 })
  })

  /**
   * A screw and a bolt are the same solid but thread into different things, so
   * the family has to survive the round trip -- it is what decides the bore.
   */
  test("keeps screw and bolt distinct", () => {
    expect(parseModelString("screw_m3_l8").fn).toBe("screw")
    expect(parseModelString("bolt_m3_l8").fn).toBe("bolt")
  })

  test("accepts the short head spellings create-fdm-enclosure emits", () => {
    expect(parseModelString("screw_m3_l8_pan")).toMatchObject({
      head: "panhead",
    })
    expect(parseModelString("screw_m3_l8_socketcap")).toMatchObject({
      head: "socketcap",
    })
    expect(parseModelString("screw_m3_l14_countersunk")).toMatchObject({
      head: "countersunk",
    })
  })

  /** Absent, not defaulted: the head dimension table lives in the jscad layer. */
  test("leaves an unstated head absent", () => {
    expect(parseModelString("screw_m3_l8")).not.toHaveProperty("head")
  })

  test("rejects what it cannot mean", () => {
    expect(() => parseModelString("screw_m3")).toThrow(/needs a length/)
    expect(() => parseModelString("heatsetinsert_l4")).toThrow(/needs a thread/)
    expect(() => parseModelString("screw_m9_l8")).toThrow()
    expect(() => parseModelString("screw_m3_l8_wobble")).toThrow(
      /Unknown screw model token/,
    )
    expect(() => parseModelString("screw_m3_l8_pan_button")).toThrow(
      /one head shape/,
    )
    expect(() => parseModelString("spacer_od3_id5_l6")).toThrow()
    expect(() => parseModelString("screw_m3_l0")).toThrow()
  })
})
