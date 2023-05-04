// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Jest = require("@glennsl/bs-jest/src/jest.js");
var EncodeDecode = require("../src/EncodeDecode.js");

Jest.describe("encode only", (function (param) {
        var sample = {};
        sample["name"] = "Alice";
        sample["nickname"] = "Ecila";
        Jest.test("encode", (function (param) {
                var encoded = EncodeDecode.te_encode({
                      name: "Alice",
                      nickname: "Ecila"
                    });
                return Jest.Expect.toEqual(sample, Jest.Expect.expect(encoded));
              }));
      }));

Jest.describe("decode only", (function (param) {
        var sample = {};
        sample["name"] = "Alice";
        sample["nickname"] = "Ecila";
        Jest.test("decode", (function (param) {
                var decoded = EncodeDecode.td_decode(sample);
                return Jest.Expect.toEqual({
                            TAG: /* Ok */0,
                            _0: {
                              name: "Alice",
                              nickname: "Ecila"
                            }
                          }, Jest.Expect.expect(decoded));
              }));
      }));

/*  Not a pure module */