open Zora

let decoded = (t, name, result, expected) =>
  t->test(name, async t => {
    t->equal(result, expected, name)
  })

let json = JSON.parseOrThrow
let error = result =>
  switch result {
  | Ok(_) => None
  | Error({Spice.message: message}) => Some(message)
  }

zoraBlock("@spice.serde without legacy", t => {
  t->decoded("poly unit", json(`"Left"`)->SerdeStrict.poly_decode, Ok(#Left))
  t->decoded("poly payload", json(`{"Payload":3}`)->SerdeStrict.poly_decode, Ok(#Payload(3)))
  t->decoded(
    "poly legacy array",
    json(`["Payload",3]`)->SerdeStrict.poly_decode->error,
    Some("Expected variant, found array"),
  )
  t->decoded("external unit", json(`"Unit"`)->SerdeStrict.external__decode, Ok(SerdeStrict.Unit))
  t->decoded(
    "external legacy array",
    json(`["Single",1]`)->SerdeStrict.external__decode->error,
    Some("Expected variant, found array"),
  )
  t->decoded(
    "external empty array",
    json(`[]`)->SerdeStrict.external__decode->error,
    Some("Expected variant, found array"),
  )
  t->decoded(
    "internal unit",
    json(`{"type":"Regular"}`)->SerdeStrict.internal_decode,
    Ok(SerdeStrict.Regular),
  )
  t->decoded(
    "internal bare string",
    json(`"Regular"`)->SerdeStrict.internal_decode->error,
    Some("Not a variant"),
  )
  t->decoded(
    "internal legacy array",
    json(`["Overlap",{"size":1}]`)->SerdeStrict.internal_decode->error,
    Some("Expected variant, found array"),
  )
})
