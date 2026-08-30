import { describe, expect, test } from "bun:test"
import { mp, parseModelString, parseModelStringParams } from "../src"

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

/**
 * A model string is a specification, so two answers to one question is a
 * mistake to report rather than a precedence rule to apply.
 *
 * Both spellings below used to parse: the later token overwrote the earlier
 * one, and a numeric suffix on the family token became a pin count that the
 * hardware parsers then skipped. Each produced a real part that was not the one
 * written down -- an M4 from a string that says m3, a 10mm from one that says 8.
 */
describe("malformed hardware strings are refused, not silently resolved", () => {
  test("a repeated thread is refused rather than taking the last", () => {
    expect(() => parseModelStringParams("screw_m3_m4_l8")).toThrow(
      /gives "m" twice/,
    )
  })

  test("a repeated length is refused rather than taking the last", () => {
    expect(() => parseModelStringParams("screw_m3_l8_l10")).toThrow(
      /gives "l" twice/,
    )
  })

  test("a pin count on a hardware family is refused", () => {
    // `screw3` reads as a 3-pin screw via the footprinter-style numeric suffix.
    expect(() => parseModelString("screw3_m3_l8")).toThrow(/takes no pin count/)
    expect(() => parseModelString("spacer7_od5_id3_l6")).toThrow(
      /takes no pin count/,
    )
  })

  test("well-formed strings still parse", () => {
    const screw = parseModelString("screw_m3_l8mm_socketcap")
    const insert = parseModelString("heatsetinsert_m3_l5.7mm")
    expect(screw.fn).toBe("screw")
    expect(insert.fn).toBe("heatsetinsert")
    if (screw.fn !== "screw" || insert.fn !== "heatsetinsert") return
    expect(screw.thread).toBe("m3")
    expect(insert.thread).toBe("m3")
  })
})
