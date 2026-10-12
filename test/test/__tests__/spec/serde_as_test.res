open Zora

let equal = (t, name, lhs, rhs) =>
  t->test(name, async t => {
    t->equal(lhs, rhs, name)
  })

let json = JSON.parseOrThrow

zoraBlock("@spice.serde with @as", t => {
  let external_ = [
    (SerdeAs.Unit, `"unit"`),
    (One(1), `{"one":1}`),
    (Plain, `"Plain"`),
  ]
  external_->Array.forEach(((value, encoded)) => {
    t->equal(`encode ${encoded}`, value->SerdeAs.external__encode, json(encoded))
    t->equal(`decode ${encoded}`, json(encoded)->SerdeAs.external__decode, Ok(value))
  })
  let internal = [
    (SerdeAs.Regular, `{"type":"reg"}`),
    (Full({screenFit: "fill"}), `{"type":"full","screenFit":"fill"}`),
    (Both, `{"type":"same"}`),
  ]
  internal->Array.forEach(((value, encoded)) => {
    t->equal(`encode ${encoded}`, value->SerdeAs.internal_encode, json(encoded))
    t->equal(`decode ${encoded}`, json(encoded)->SerdeAs.internal_decode, Ok(value))
  })
  // A constructor with a payload is the same object in memory and in JSON.
  t->equal(
    "in memory",
    (Obj.magic(SerdeAs.Full({screenFit: "fill"})): JSON.t),
    json(`{"type":"full","screenFit":"fill"}`),
  )
  t->equal(
    "the constructor name no longer decodes",
    json(`{"type":"Full","screenFit":"fill"}`)->SerdeAs.internal_decode->Result.isError,
    true,
  )
})
