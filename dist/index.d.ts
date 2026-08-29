import { z } from 'zod';

declare const modelLengthSchema: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
declare const positiveModelLengthSchema: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
declare const nonnegativeModelLengthSchema: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
declare const flexScreenOrientationSchema: z.ZodEnum<{
    sitsFlat: "sitsFlat";
    sitsFlatBelowBoard: "sitsFlatBelowBoard";
    foldedToFaceAboveBoard: "foldedToFaceAboveBoard";
    foldedToFaceBelowBoard: "foldedToFaceBelowBoard";
    foldedToRightAngleAboveBoard: "foldedToRightAngleAboveBoard";
    foldedToRightAngleBelowBoard: "foldedToRightAngleBelowBoard";
}>;
declare const flexScreenAspectRatioSchema: z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<`${number}:${number}`, string>>, z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>]>;
/**
 * Canonical, renderer-independent properties for a parameterized FlexScreen.
 * Every length accepts either millimeters as a number or a unit-bearing string
 * and is normalized to millimeters by the schema.
 */
declare const flexScreenModelPropsSchema: z.ZodObject<{
    width: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    height: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    diagonal: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    aspectRatio: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<`${number}:${number}`, string>>, z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>]>>;
    ratio: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<`${number}:${number}`, string>>, z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>]>>;
    defaultDiagonal: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    orientation: z.ZodOptional<z.ZodEnum<{
        sitsFlat: "sitsFlat";
        sitsFlatBelowBoard: "sitsFlatBelowBoard";
        foldedToFaceAboveBoard: "foldedToFaceAboveBoard";
        foldedToFaceBelowBoard: "foldedToFaceBelowBoard";
        foldedToRightAngleAboveBoard: "foldedToRightAngleAboveBoard";
        foldedToRightAngleBelowBoard: "foldedToRightAngleBelowBoard";
    }>>;
    sitsFlat: z.ZodOptional<z.ZodBoolean>;
    sitsFlatBelowBoard: z.ZodOptional<z.ZodBoolean>;
    foldedToFaceAboveBoard: z.ZodOptional<z.ZodBoolean>;
    foldedToFaceBelowBoard: z.ZodOptional<z.ZodBoolean>;
    foldsAboveBoard: z.ZodOptional<z.ZodBoolean>;
    foldsBelowBoard: z.ZodOptional<z.ZodBoolean>;
    foldedToRightAngleAboveBoard: z.ZodOptional<z.ZodBoolean>;
    foldedToRightAngleBelowBoard: z.ZodOptional<z.ZodBoolean>;
    screenThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    bezelInset: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    bezelDepth: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    activeAreaWidth: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    activeAreaHeight: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    screenColor: z.ZodOptional<z.ZodString>;
    bezelColor: z.ZodOptional<z.ZodString>;
    showScreen: z.ZodOptional<z.ZodBoolean>;
    flexCableLength: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    flexCableWidth: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    flexCableThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    flexCableColor: z.ZodOptional<z.ZodString>;
    conductorCount: z.ZodOptional<z.ZodNumber>;
    conductorPitch: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    conductorWidth: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    conductorThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    conductorColor: z.ZodOptional<z.ZodString>;
    cableEdgeMargin: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    exposedContactLength: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    showConductors: z.ZodOptional<z.ZodBoolean>;
    showFlexCable: z.ZodOptional<z.ZodBoolean>;
    showStiffeners: z.ZodOptional<z.ZodBoolean>;
    stiffenerLength: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    stiffenerThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    stiffenerColor: z.ZodOptional<z.ZodString>;
    bendRadius: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    bendSegments: z.ZodOptional<z.ZodNumber>;
    rightAngleVerticalLead: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    distanceAboveBoard: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    distanceBelowBoard: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    foldDistanceFromConnector: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    foldOutset: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    foldSegments: z.ZodOptional<z.ZodNumber>;
    screenGap: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    boardTopZ: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    boardThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    boardClearance: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    cableStartX: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    cableStartY: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    cableStartZ: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    cableLateralOffset: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    screenOffset: z.ZodOptional<z.ZodObject<{
        x: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
        y: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
        z: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    }, z.core.$strict>>;
    screenRotation: z.ZodOptional<z.ZodTuple<[z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>], null>>;
    rotation: z.ZodOptional<z.ZodTuple<[z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>], null>>;
    offset: z.ZodOptional<z.ZodObject<{
        x: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
        y: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
        z: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    }, z.core.$strict>>;
}, z.core.$strict>;
type FlexScreenOrientation = z.infer<typeof flexScreenOrientationSchema>;
type FlexScreenAspectRatio = z.infer<typeof flexScreenAspectRatioSchema>;
type FlexScreenModelPropsInput = z.input<typeof flexScreenModelPropsSchema>;
type FlexScreenModelProps = z.output<typeof flexScreenModelPropsSchema>;
declare const flexScreenModelDefinitionSchema: z.ZodObject<{
    width: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    height: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    diagonal: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    aspectRatio: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<`${number}:${number}`, string>>, z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>]>>;
    ratio: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<`${number}:${number}`, string>>, z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>]>>;
    defaultDiagonal: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    orientation: z.ZodOptional<z.ZodEnum<{
        sitsFlat: "sitsFlat";
        sitsFlatBelowBoard: "sitsFlatBelowBoard";
        foldedToFaceAboveBoard: "foldedToFaceAboveBoard";
        foldedToFaceBelowBoard: "foldedToFaceBelowBoard";
        foldedToRightAngleAboveBoard: "foldedToRightAngleAboveBoard";
        foldedToRightAngleBelowBoard: "foldedToRightAngleBelowBoard";
    }>>;
    sitsFlat: z.ZodOptional<z.ZodBoolean>;
    sitsFlatBelowBoard: z.ZodOptional<z.ZodBoolean>;
    foldedToFaceAboveBoard: z.ZodOptional<z.ZodBoolean>;
    foldedToFaceBelowBoard: z.ZodOptional<z.ZodBoolean>;
    foldsAboveBoard: z.ZodOptional<z.ZodBoolean>;
    foldsBelowBoard: z.ZodOptional<z.ZodBoolean>;
    foldedToRightAngleAboveBoard: z.ZodOptional<z.ZodBoolean>;
    foldedToRightAngleBelowBoard: z.ZodOptional<z.ZodBoolean>;
    screenThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    bezelInset: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    bezelDepth: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    activeAreaWidth: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    activeAreaHeight: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    screenColor: z.ZodOptional<z.ZodString>;
    bezelColor: z.ZodOptional<z.ZodString>;
    showScreen: z.ZodOptional<z.ZodBoolean>;
    flexCableLength: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    flexCableWidth: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    flexCableThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    flexCableColor: z.ZodOptional<z.ZodString>;
    conductorCount: z.ZodOptional<z.ZodNumber>;
    conductorPitch: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    conductorWidth: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    conductorThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    conductorColor: z.ZodOptional<z.ZodString>;
    cableEdgeMargin: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    exposedContactLength: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    showConductors: z.ZodOptional<z.ZodBoolean>;
    showFlexCable: z.ZodOptional<z.ZodBoolean>;
    showStiffeners: z.ZodOptional<z.ZodBoolean>;
    stiffenerLength: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    stiffenerThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    stiffenerColor: z.ZodOptional<z.ZodString>;
    bendRadius: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    bendSegments: z.ZodOptional<z.ZodNumber>;
    rightAngleVerticalLead: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    distanceAboveBoard: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    distanceBelowBoard: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    foldDistanceFromConnector: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    foldOutset: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    foldSegments: z.ZodOptional<z.ZodNumber>;
    screenGap: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    boardTopZ: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    boardThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    boardClearance: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    cableStartX: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    cableStartY: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    cableStartZ: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    cableLateralOffset: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    screenOffset: z.ZodOptional<z.ZodObject<{
        x: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
        y: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
        z: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    }, z.core.$strict>>;
    screenRotation: z.ZodOptional<z.ZodTuple<[z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>], null>>;
    rotation: z.ZodOptional<z.ZodTuple<[z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>], null>>;
    offset: z.ZodOptional<z.ZodObject<{
        x: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
        y: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
        z: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    }, z.core.$strict>>;
    fn: z.ZodLiteral<"flexscreen">;
}, z.core.$strict>;
type FlexScreenModelDefinition = z.infer<typeof flexScreenModelDefinitionSchema>;

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
 * Matches `@tscircuit/props`' `assemblyThreads` exactly -- this is the same
 * authoring vocabulary reaching the model string. `create-fdm-enclosure` spells
 * them uppercase and converts at its own boundary.
 */
declare const fastenerThreads: readonly ["m2", "m2.5", "m3", "m4", "m5"];
type FastenerThread = (typeof fastenerThreads)[number];
declare const fastenerThreadSchema: z.ZodEnum<{
    m2: "m2";
    "m2.5": "m2.5";
    m3: "m3";
    m4: "m4";
    m5: "m5";
}>;
/**
 * Head shapes, which the enclosure needs in order to cut a recess.
 *
 * Drive type (phillips, torx, hex) is deliberately absent: it is chosen by
 * whoever assembles the device and changes no geometry we model.
 */
declare const screwHeads: readonly ["buttonhead", "panhead", "flathead", "countersunk", "socketcap", "hexflange"];
type ScrewHead = (typeof screwHeads)[number];
declare const screwHeadSchema: z.ZodEnum<{
    buttonhead: "buttonhead";
    panhead: "panhead";
    flathead: "flathead";
    countersunk: "countersunk";
    socketcap: "socketcap";
    hexflange: "hexflange";
}>;
declare const screwModelDefinitionSchema: z.ZodObject<{
    thread: z.ZodEnum<{
        m2: "m2";
        "m2.5": "m2.5";
        m3: "m3";
        m4: "m4";
        m5: "m5";
    }>;
    length: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
    head: z.ZodOptional<z.ZodEnum<{
        buttonhead: "buttonhead";
        panhead: "panhead";
        flathead: "flathead";
        countersunk: "countersunk";
        socketcap: "socketcap";
        hexflange: "hexflange";
    }>>;
    fn: z.ZodLiteral<"screw">;
}, z.core.$strict>;
declare const boltModelDefinitionSchema: z.ZodObject<{
    thread: z.ZodEnum<{
        m2: "m2";
        "m2.5": "m2.5";
        m3: "m3";
        m4: "m4";
        m5: "m5";
    }>;
    length: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
    head: z.ZodOptional<z.ZodEnum<{
        buttonhead: "buttonhead";
        panhead: "panhead";
        flathead: "flathead";
        countersunk: "countersunk";
        socketcap: "socketcap";
        hexflange: "hexflange";
    }>>;
    fn: z.ZodLiteral<"bolt">;
}, z.core.$strict>;
declare const heatsetinsertModelDefinitionSchema: z.ZodObject<{
    fn: z.ZodLiteral<"heatsetinsert">;
    thread: z.ZodEnum<{
        m2: "m2";
        "m2.5": "m2.5";
        m3: "m3";
        m4: "m4";
        m5: "m5";
    }>;
    length: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
}, z.core.$strict>;
/**
 * A spacer has no thread and no catalogue -- it is fully described by three
 * diameters and a length, so it is stated outright rather than looked up.
 */
declare const spacerModelDefinitionSchema: z.ZodObject<{
    fn: z.ZodLiteral<"spacer">;
    outerDiameter: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
    innerDiameter: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
    length: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
}, z.core.$strict>;
type ScrewModelDefinition = z.infer<typeof screwModelDefinitionSchema>;
type BoltModelDefinition = z.infer<typeof boltModelDefinitionSchema>;
type HeatsetInsertModelDefinition = z.infer<typeof heatsetinsertModelDefinitionSchema>;
type SpacerModelDefinition = z.infer<typeof spacerModelDefinitionSchema>;
declare const hardwareModelDefinitionSchema: z.ZodUnion<readonly [z.ZodObject<{
    thread: z.ZodEnum<{
        m2: "m2";
        "m2.5": "m2.5";
        m3: "m3";
        m4: "m4";
        m5: "m5";
    }>;
    length: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
    head: z.ZodOptional<z.ZodEnum<{
        buttonhead: "buttonhead";
        panhead: "panhead";
        flathead: "flathead";
        countersunk: "countersunk";
        socketcap: "socketcap";
        hexflange: "hexflange";
    }>>;
    fn: z.ZodLiteral<"screw">;
}, z.core.$strict>, z.ZodObject<{
    thread: z.ZodEnum<{
        m2: "m2";
        "m2.5": "m2.5";
        m3: "m3";
        m4: "m4";
        m5: "m5";
    }>;
    length: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
    head: z.ZodOptional<z.ZodEnum<{
        buttonhead: "buttonhead";
        panhead: "panhead";
        flathead: "flathead";
        countersunk: "countersunk";
        socketcap: "socketcap";
        hexflange: "hexflange";
    }>>;
    fn: z.ZodLiteral<"bolt">;
}, z.core.$strict>, z.ZodObject<{
    fn: z.ZodLiteral<"heatsetinsert">;
    thread: z.ZodEnum<{
        m2: "m2";
        "m2.5": "m2.5";
        m3: "m3";
        m4: "m4";
        m5: "m5";
    }>;
    length: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
}, z.core.$strict>, z.ZodObject<{
    fn: z.ZodLiteral<"spacer">;
    outerDiameter: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
    innerDiameter: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
    length: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
}, z.core.$strict>]>;
type HardwareModelDefinition = z.infer<typeof hardwareModelDefinitionSchema>;

/**
 * Every model family modelprinter knows.
 *
 * A plain union rather than `z.discriminatedUnion`: the flexscreen schema
 * carries a `.superRefine`, which makes it a ZodEffects, and a discriminated
 * union will not accept one.
 */
declare const modelDefinitionSchema: z.ZodUnion<readonly [z.ZodObject<{
    width: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    height: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    diagonal: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    aspectRatio: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<`${number}:${number}`, string>>, z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>]>>;
    ratio: z.ZodOptional<z.ZodUnion<readonly [z.ZodNumber, z.ZodPipe<z.ZodString, z.ZodTransform<`${number}:${number}`, string>>, z.ZodTuple<[z.ZodNumber, z.ZodNumber], null>]>>;
    defaultDiagonal: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    orientation: z.ZodOptional<z.ZodEnum<{
        sitsFlat: "sitsFlat";
        sitsFlatBelowBoard: "sitsFlatBelowBoard";
        foldedToFaceAboveBoard: "foldedToFaceAboveBoard";
        foldedToFaceBelowBoard: "foldedToFaceBelowBoard";
        foldedToRightAngleAboveBoard: "foldedToRightAngleAboveBoard";
        foldedToRightAngleBelowBoard: "foldedToRightAngleBelowBoard";
    }>>;
    sitsFlat: z.ZodOptional<z.ZodBoolean>;
    sitsFlatBelowBoard: z.ZodOptional<z.ZodBoolean>;
    foldedToFaceAboveBoard: z.ZodOptional<z.ZodBoolean>;
    foldedToFaceBelowBoard: z.ZodOptional<z.ZodBoolean>;
    foldsAboveBoard: z.ZodOptional<z.ZodBoolean>;
    foldsBelowBoard: z.ZodOptional<z.ZodBoolean>;
    foldedToRightAngleAboveBoard: z.ZodOptional<z.ZodBoolean>;
    foldedToRightAngleBelowBoard: z.ZodOptional<z.ZodBoolean>;
    screenThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    bezelInset: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    bezelDepth: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    activeAreaWidth: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    activeAreaHeight: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    screenColor: z.ZodOptional<z.ZodString>;
    bezelColor: z.ZodOptional<z.ZodString>;
    showScreen: z.ZodOptional<z.ZodBoolean>;
    flexCableLength: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    flexCableWidth: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    flexCableThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    flexCableColor: z.ZodOptional<z.ZodString>;
    conductorCount: z.ZodOptional<z.ZodNumber>;
    conductorPitch: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    conductorWidth: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    conductorThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    conductorColor: z.ZodOptional<z.ZodString>;
    cableEdgeMargin: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    exposedContactLength: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    showConductors: z.ZodOptional<z.ZodBoolean>;
    showFlexCable: z.ZodOptional<z.ZodBoolean>;
    showStiffeners: z.ZodOptional<z.ZodBoolean>;
    stiffenerLength: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    stiffenerThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    stiffenerColor: z.ZodOptional<z.ZodString>;
    bendRadius: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    bendSegments: z.ZodOptional<z.ZodNumber>;
    rightAngleVerticalLead: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    distanceAboveBoard: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    distanceBelowBoard: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    foldDistanceFromConnector: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    foldOutset: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    foldSegments: z.ZodOptional<z.ZodNumber>;
    screenGap: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    boardTopZ: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    boardThickness: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    boardClearance: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    cableStartX: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    cableStartY: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    cableStartZ: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    cableLateralOffset: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    screenOffset: z.ZodOptional<z.ZodObject<{
        x: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
        y: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
        z: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    }, z.core.$strict>>;
    screenRotation: z.ZodOptional<z.ZodTuple<[z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>], null>>;
    rotation: z.ZodOptional<z.ZodTuple<[z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>], null>>;
    offset: z.ZodOptional<z.ZodObject<{
        x: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
        y: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
        z: z.ZodOptional<z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>>;
    }, z.core.$strict>>;
    fn: z.ZodLiteral<"flexscreen">;
}, z.core.$strict>, z.ZodUnion<readonly [z.ZodObject<{
    thread: z.ZodEnum<{
        m2: "m2";
        "m2.5": "m2.5";
        m3: "m3";
        m4: "m4";
        m5: "m5";
    }>;
    length: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
    head: z.ZodOptional<z.ZodEnum<{
        buttonhead: "buttonhead";
        panhead: "panhead";
        flathead: "flathead";
        countersunk: "countersunk";
        socketcap: "socketcap";
        hexflange: "hexflange";
    }>>;
    fn: z.ZodLiteral<"screw">;
}, z.core.$strict>, z.ZodObject<{
    thread: z.ZodEnum<{
        m2: "m2";
        "m2.5": "m2.5";
        m3: "m3";
        m4: "m4";
        m5: "m5";
    }>;
    length: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
    head: z.ZodOptional<z.ZodEnum<{
        buttonhead: "buttonhead";
        panhead: "panhead";
        flathead: "flathead";
        countersunk: "countersunk";
        socketcap: "socketcap";
        hexflange: "hexflange";
    }>>;
    fn: z.ZodLiteral<"bolt">;
}, z.core.$strict>, z.ZodObject<{
    fn: z.ZodLiteral<"heatsetinsert">;
    thread: z.ZodEnum<{
        m2: "m2";
        "m2.5": "m2.5";
        m3: "m3";
        m4: "m4";
        m5: "m5";
    }>;
    length: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
}, z.core.$strict>, z.ZodObject<{
    fn: z.ZodLiteral<"spacer">;
    outerDiameter: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
    innerDiameter: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
    length: z.ZodPipe<z.ZodUnion<readonly [z.ZodNumber, z.ZodString]>, z.ZodTransform<number, string | number>>;
}, z.core.$strict>]>]>;
type ModelDefinition = z.infer<typeof modelDefinitionSchema>;

type RawModelprinterParams = {
    fn: string;
    string: string;
    [key: string]: unknown;
};
/**
 * Parses a model string into the same sort of raw builder parameters exposed
 * by `fp.string(...).params()`. Function-specific validation happens in
 * `.json()`.
 */
declare const parseModelStringParams: (definition: string) => RawModelprinterParams;

declare const string: (value: string) => {
    params: () => RawModelprinterParams;
    json: () => {
        fn: "flexscreen";
        width?: number | undefined;
        height?: number | undefined;
        diagonal?: number | undefined;
        aspectRatio?: number | `${number}:${number}` | [number, number] | undefined;
        ratio?: number | `${number}:${number}` | [number, number] | undefined;
        defaultDiagonal?: number | undefined;
        orientation?: "sitsFlat" | "sitsFlatBelowBoard" | "foldedToFaceAboveBoard" | "foldedToFaceBelowBoard" | "foldedToRightAngleAboveBoard" | "foldedToRightAngleBelowBoard" | undefined;
        sitsFlat?: boolean | undefined;
        sitsFlatBelowBoard?: boolean | undefined;
        foldedToFaceAboveBoard?: boolean | undefined;
        foldedToFaceBelowBoard?: boolean | undefined;
        foldsAboveBoard?: boolean | undefined;
        foldsBelowBoard?: boolean | undefined;
        foldedToRightAngleAboveBoard?: boolean | undefined;
        foldedToRightAngleBelowBoard?: boolean | undefined;
        screenThickness?: number | undefined;
        bezelInset?: number | undefined;
        bezelDepth?: number | undefined;
        activeAreaWidth?: number | undefined;
        activeAreaHeight?: number | undefined;
        screenColor?: string | undefined;
        bezelColor?: string | undefined;
        showScreen?: boolean | undefined;
        flexCableLength?: number | undefined;
        flexCableWidth?: number | undefined;
        flexCableThickness?: number | undefined;
        flexCableColor?: string | undefined;
        conductorCount?: number | undefined;
        conductorPitch?: number | undefined;
        conductorWidth?: number | undefined;
        conductorThickness?: number | undefined;
        conductorColor?: string | undefined;
        cableEdgeMargin?: number | undefined;
        exposedContactLength?: number | undefined;
        showConductors?: boolean | undefined;
        showFlexCable?: boolean | undefined;
        showStiffeners?: boolean | undefined;
        stiffenerLength?: number | undefined;
        stiffenerThickness?: number | undefined;
        stiffenerColor?: string | undefined;
        bendRadius?: number | undefined;
        bendSegments?: number | undefined;
        rightAngleVerticalLead?: number | undefined;
        distanceAboveBoard?: number | undefined;
        distanceBelowBoard?: number | undefined;
        foldDistanceFromConnector?: number | undefined;
        foldOutset?: number | undefined;
        foldSegments?: number | undefined;
        screenGap?: number | undefined;
        boardTopZ?: number | undefined;
        boardThickness?: number | undefined;
        boardClearance?: number | undefined;
        cableStartX?: number | undefined;
        cableStartY?: number | undefined;
        cableStartZ?: number | undefined;
        cableLateralOffset?: number | undefined;
        screenOffset?: {
            x?: number | undefined;
            y?: number | undefined;
            z?: number | undefined;
        } | undefined;
        screenRotation?: [string | number, string | number, string | number] | undefined;
        rotation?: [string | number, string | number, string | number] | undefined;
        offset?: {
            x?: number | undefined;
            y?: number | undefined;
            z?: number | undefined;
        } | undefined;
    } | {
        fn: "spacer";
        outerDiameter: number;
        innerDiameter: number;
        length: number;
    } | {
        thread: "m2" | "m2.5" | "m3" | "m4" | "m5";
        length: number;
        fn: "screw";
        head?: "buttonhead" | "panhead" | "flathead" | "countersunk" | "socketcap" | "hexflange" | undefined;
    } | {
        thread: "m2" | "m2.5" | "m3" | "m4" | "m5";
        length: number;
        fn: "bolt";
        head?: "buttonhead" | "panhead" | "flathead" | "countersunk" | "socketcap" | "hexflange" | undefined;
    } | {
        fn: "heatsetinsert";
        thread: "m2" | "m2.5" | "m3" | "m4" | "m5";
        length: number;
    };
};
declare const parseModelString: (value: string) => ModelDefinition;
declare const modelprinter: {
    string: (value: string) => {
        params: () => RawModelprinterParams;
        json: () => {
            fn: "flexscreen";
            width?: number | undefined;
            height?: number | undefined;
            diagonal?: number | undefined;
            aspectRatio?: number | `${number}:${number}` | [number, number] | undefined;
            ratio?: number | `${number}:${number}` | [number, number] | undefined;
            defaultDiagonal?: number | undefined;
            orientation?: "sitsFlat" | "sitsFlatBelowBoard" | "foldedToFaceAboveBoard" | "foldedToFaceBelowBoard" | "foldedToRightAngleAboveBoard" | "foldedToRightAngleBelowBoard" | undefined;
            sitsFlat?: boolean | undefined;
            sitsFlatBelowBoard?: boolean | undefined;
            foldedToFaceAboveBoard?: boolean | undefined;
            foldedToFaceBelowBoard?: boolean | undefined;
            foldsAboveBoard?: boolean | undefined;
            foldsBelowBoard?: boolean | undefined;
            foldedToRightAngleAboveBoard?: boolean | undefined;
            foldedToRightAngleBelowBoard?: boolean | undefined;
            screenThickness?: number | undefined;
            bezelInset?: number | undefined;
            bezelDepth?: number | undefined;
            activeAreaWidth?: number | undefined;
            activeAreaHeight?: number | undefined;
            screenColor?: string | undefined;
            bezelColor?: string | undefined;
            showScreen?: boolean | undefined;
            flexCableLength?: number | undefined;
            flexCableWidth?: number | undefined;
            flexCableThickness?: number | undefined;
            flexCableColor?: string | undefined;
            conductorCount?: number | undefined;
            conductorPitch?: number | undefined;
            conductorWidth?: number | undefined;
            conductorThickness?: number | undefined;
            conductorColor?: string | undefined;
            cableEdgeMargin?: number | undefined;
            exposedContactLength?: number | undefined;
            showConductors?: boolean | undefined;
            showFlexCable?: boolean | undefined;
            showStiffeners?: boolean | undefined;
            stiffenerLength?: number | undefined;
            stiffenerThickness?: number | undefined;
            stiffenerColor?: string | undefined;
            bendRadius?: number | undefined;
            bendSegments?: number | undefined;
            rightAngleVerticalLead?: number | undefined;
            distanceAboveBoard?: number | undefined;
            distanceBelowBoard?: number | undefined;
            foldDistanceFromConnector?: number | undefined;
            foldOutset?: number | undefined;
            foldSegments?: number | undefined;
            screenGap?: number | undefined;
            boardTopZ?: number | undefined;
            boardThickness?: number | undefined;
            boardClearance?: number | undefined;
            cableStartX?: number | undefined;
            cableStartY?: number | undefined;
            cableStartZ?: number | undefined;
            cableLateralOffset?: number | undefined;
            screenOffset?: {
                x?: number | undefined;
                y?: number | undefined;
                z?: number | undefined;
            } | undefined;
            screenRotation?: [string | number, string | number, string | number] | undefined;
            rotation?: [string | number, string | number, string | number] | undefined;
            offset?: {
                x?: number | undefined;
                y?: number | undefined;
                z?: number | undefined;
            } | undefined;
        } | {
            fn: "spacer";
            outerDiameter: number;
            innerDiameter: number;
            length: number;
        } | {
            thread: "m2" | "m2.5" | "m3" | "m4" | "m5";
            length: number;
            fn: "screw";
            head?: "buttonhead" | "panhead" | "flathead" | "countersunk" | "socketcap" | "hexflange" | undefined;
        } | {
            thread: "m2" | "m2.5" | "m3" | "m4" | "m5";
            length: number;
            fn: "bolt";
            head?: "buttonhead" | "panhead" | "flathead" | "countersunk" | "socketcap" | "hexflange" | undefined;
        } | {
            fn: "heatsetinsert";
            thread: "m2" | "m2.5" | "m3" | "m4" | "m5";
            length: number;
        };
    };
    getModelNames: () => string[];
};
/** Compact alias matching footprinter's familiar `fp.string(...)` API. */
declare const mp: {
    string: (value: string) => {
        params: () => RawModelprinterParams;
        json: () => {
            fn: "flexscreen";
            width?: number | undefined;
            height?: number | undefined;
            diagonal?: number | undefined;
            aspectRatio?: number | `${number}:${number}` | [number, number] | undefined;
            ratio?: number | `${number}:${number}` | [number, number] | undefined;
            defaultDiagonal?: number | undefined;
            orientation?: "sitsFlat" | "sitsFlatBelowBoard" | "foldedToFaceAboveBoard" | "foldedToFaceBelowBoard" | "foldedToRightAngleAboveBoard" | "foldedToRightAngleBelowBoard" | undefined;
            sitsFlat?: boolean | undefined;
            sitsFlatBelowBoard?: boolean | undefined;
            foldedToFaceAboveBoard?: boolean | undefined;
            foldedToFaceBelowBoard?: boolean | undefined;
            foldsAboveBoard?: boolean | undefined;
            foldsBelowBoard?: boolean | undefined;
            foldedToRightAngleAboveBoard?: boolean | undefined;
            foldedToRightAngleBelowBoard?: boolean | undefined;
            screenThickness?: number | undefined;
            bezelInset?: number | undefined;
            bezelDepth?: number | undefined;
            activeAreaWidth?: number | undefined;
            activeAreaHeight?: number | undefined;
            screenColor?: string | undefined;
            bezelColor?: string | undefined;
            showScreen?: boolean | undefined;
            flexCableLength?: number | undefined;
            flexCableWidth?: number | undefined;
            flexCableThickness?: number | undefined;
            flexCableColor?: string | undefined;
            conductorCount?: number | undefined;
            conductorPitch?: number | undefined;
            conductorWidth?: number | undefined;
            conductorThickness?: number | undefined;
            conductorColor?: string | undefined;
            cableEdgeMargin?: number | undefined;
            exposedContactLength?: number | undefined;
            showConductors?: boolean | undefined;
            showFlexCable?: boolean | undefined;
            showStiffeners?: boolean | undefined;
            stiffenerLength?: number | undefined;
            stiffenerThickness?: number | undefined;
            stiffenerColor?: string | undefined;
            bendRadius?: number | undefined;
            bendSegments?: number | undefined;
            rightAngleVerticalLead?: number | undefined;
            distanceAboveBoard?: number | undefined;
            distanceBelowBoard?: number | undefined;
            foldDistanceFromConnector?: number | undefined;
            foldOutset?: number | undefined;
            foldSegments?: number | undefined;
            screenGap?: number | undefined;
            boardTopZ?: number | undefined;
            boardThickness?: number | undefined;
            boardClearance?: number | undefined;
            cableStartX?: number | undefined;
            cableStartY?: number | undefined;
            cableStartZ?: number | undefined;
            cableLateralOffset?: number | undefined;
            screenOffset?: {
                x?: number | undefined;
                y?: number | undefined;
                z?: number | undefined;
            } | undefined;
            screenRotation?: [string | number, string | number, string | number] | undefined;
            rotation?: [string | number, string | number, string | number] | undefined;
            offset?: {
                x?: number | undefined;
                y?: number | undefined;
                z?: number | undefined;
            } | undefined;
        } | {
            fn: "spacer";
            outerDiameter: number;
            innerDiameter: number;
            length: number;
        } | {
            thread: "m2" | "m2.5" | "m3" | "m4" | "m5";
            length: number;
            fn: "screw";
            head?: "buttonhead" | "panhead" | "flathead" | "countersunk" | "socketcap" | "hexflange" | undefined;
        } | {
            thread: "m2" | "m2.5" | "m3" | "m4" | "m5";
            length: number;
            fn: "bolt";
            head?: "buttonhead" | "panhead" | "flathead" | "countersunk" | "socketcap" | "hexflange" | undefined;
        } | {
            fn: "heatsetinsert";
            thread: "m2" | "m2.5" | "m3" | "m4" | "m5";
            length: number;
        };
    };
    getModelNames: () => string[];
};

export { type BoltModelDefinition, type FastenerThread, type FlexScreenAspectRatio, type FlexScreenModelDefinition, type FlexScreenModelProps, type FlexScreenModelPropsInput, type FlexScreenOrientation, type HardwareModelDefinition, type HeatsetInsertModelDefinition, type ModelDefinition, type RawModelprinterParams, type ScrewHead, type ScrewModelDefinition, type SpacerModelDefinition, boltModelDefinitionSchema, fastenerThreadSchema, fastenerThreads, flexScreenAspectRatioSchema, flexScreenModelDefinitionSchema, flexScreenModelPropsSchema, flexScreenOrientationSchema, hardwareModelDefinitionSchema, heatsetinsertModelDefinitionSchema, modelDefinitionSchema, modelLengthSchema, modelprinter, mp, nonnegativeModelLengthSchema, parseModelString, parseModelStringParams, positiveModelLengthSchema, screwHeadSchema, screwHeads, screwModelDefinitionSchema, spacerModelDefinitionSchema, string };
