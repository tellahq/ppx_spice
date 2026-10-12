open Zora

let testEqual = (t, name, lhs, rhs) =>
  t->test(name, async t => {
    t->equal(lhs, rhs, name)
  })

let json = JSON.parseOrThrow

zoraBlock("@spice.serde({legacyWrite: true}) variants", t => {
  open SerdeLegacyWrite
  let encode = external__encode
  let decode = s => json(s)->external__decode

  t->testEqual("encode unit", encode(Unit), json(`["Unit"]`))
  t->testEqual("encode renamed by constructor", encode(Renamed), json(`["Renamed"]`))
  t->testEqual("encode single", encode(Single(1)), json(`["Single",1]`))
  t->testEqual("encode tuple", encode(Pair("a", true)), json(`["Pair","a",true]`))
  t->testEqual("encode record", encode(Rec({a: "x", b: None})), json(`["Rec",{"a":"x"}]`))

  let defaults: array<(external_, default)> = [
    (Unit, Unit),
    (Renamed, Renamed),
    (Single(2), Single(2)),
    (Pair("b", false), Pair("b", false)),
    (Rec({a: "y", b: Some(3)}), Rec({a: "y", b: Some(3)})),
  ]
  defaults->Array.forEach(((value, default)) =>
    t->testEqual(
      "encodes like @spice: " ++ JSON.stringify(default_encode(default)),
      encode(value),
      default_encode(default),
    )
  )

  t->testEqual("decode legacy unit", decode(`["Unit"]`), Ok(Unit))
  t->testEqual("decode legacy record", decode(`["Rec",{"a":"x"}]`), Ok(Rec({a: "x", b: None})))
  t->testEqual("decode serde unit", decode(`"Unit"`), Ok(Unit))
  t->testEqual("decode serde renamed", decode(`"renamed"`), Ok(Renamed))
  t->testEqual("decode serde tuple", decode(`{"Pair":["a",true]}`), Ok(Pair("a", true)))
  t->testEqual("roundtrip", decode(JSON.stringify(encode(Single(4)))), Ok(Single(4)))
})

zoraBlock("@spice.serde({legacyWrite: true}) internally tagged", t => {
  open SerdeLegacyWrite
  t->testEqual("encode unit", internal_encode(Regular), json(`["Regular"]`))
  t->testEqual("encode record", internal_encode(Point({x: 1, y: 2})), json(`["Point",{"x":1,"y":2}]`))
  t->testEqual("decode serde", json(`{"type":"Point","x":1,"y":2}`)->internal_decode, Ok(Point({x: 1, y: 2})))
  t->testEqual("decode legacy", json(`["Point",{"x":1,"y":2}]`)->internal_decode, Ok(Point({x: 1, y: 2})))
})

zoraBlock("@spice.serde({legacyWrite: true}) polymorphic variants", t => {
  open SerdeLegacyWrite
  let pairs: array<(poly, defaultPoly)> = [(#Left, #Left), (#Payload(1), #Payload(1)), (#Pair("a", true), #Pair("a", true))]
  pairs->Array.forEach(((value, default)) =>
    t->testEqual(
      "encodes like @spice: " ++ JSON.stringify(defaultPoly_encode(default)),
      poly_encode(value),
      defaultPoly_encode(default),
    )
  )
  t->testEqual("decode serde", json(`{"Payload":5}`)->poly_decode, Ok(#Payload(5)))
  t->testEqual("decode legacy", json(`["Payload",5]`)->poly_decode, Ok(#Payload(5)))
})

zoraBlock("@spice.serde({legacyWrite: false})", t => {
  open SerdeLegacyWrite
  t->testEqual("encodes serde", off_encode(B(1)), json(`{"B":1}`))
  t->testEqual("reads only serde", json(`["A"]`)->off_decode->Result.isError, true)
})
