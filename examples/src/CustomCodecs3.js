// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Spice = require("@greenlabs/ppx-spice/src/rescript/Spice.js");
var Js_dict = require("rescript/lib/js/js_dict.js");
var Js_json = require("rescript/lib/js/js_json.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var Belt_Result = require("rescript/lib/js/belt_Result.js");

function userRaw_encode(v) {
  return Js_dict.fromArray(Spice.filterOptional([
                  [
                    "name",
                    false,
                    Spice.stringToJson(v.name)
                  ],
                  [
                    "address_street",
                    false,
                    Spice.stringToJson(v.address_street)
                  ],
                  [
                    "address_number",
                    false,
                    Spice.intToJson(v.address_number)
                  ]
                ]));
}

function userRaw_decode(v) {
  var dict = Js_json.classify(v);
  if (typeof dict !== "object") {
    return Spice.error(undefined, "Not an object", v);
  }
  if (dict.TAG !== "JSONObject") {
    return Spice.error(undefined, "Not an object", v);
  }
  var dict$1 = dict._0;
  var name = Spice.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "name"), null));
  if (name.TAG === "Ok") {
    var address_street = Spice.stringFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "address_street"), null));
    if (address_street.TAG === "Ok") {
      var address_number = Spice.intFromJson(Belt_Option.getWithDefault(Js_dict.get(dict$1, "address_number"), null));
      if (address_number.TAG === "Ok") {
        return {
                TAG: "Ok",
                _0: {
                  name: name._0,
                  address_street: address_street._0,
                  address_number: address_number._0
                }
              };
      }
      var e = address_number._0;
      return {
              TAG: "Error",
              _0: {
                path: ".address_number" + e.path,
                message: e.message,
                value: e.value
              }
            };
    }
    var e$1 = address_street._0;
    return {
            TAG: "Error",
            _0: {
              path: ".address_street" + e$1.path,
              message: e$1.message,
              value: e$1.value
            }
          };
  }
  var e$2 = name._0;
  return {
          TAG: "Error",
          _0: {
            path: ".name" + e$2.path,
            message: e$2.message,
            value: e$2.value
          }
        };
}

var data = {
  "name": "woonki",
  "address_street": "Munjung",
  "address_number": 8
};

var data$1 = Belt_Result.map(userRaw_decode(data), (function (userRaw) {
        return {
                name: userRaw.name,
                address: {
                  street: userRaw.address_street,
                  number: userRaw.address_number
                }
              };
      }));

var json = Belt_Result.map(data$1, (function (user) {
        return userRaw_encode({
                    name: user.name,
                    address_street: user.address.street,
                    address_number: user.address.number
                  });
      }));

exports.userRaw_encode = userRaw_encode;
exports.userRaw_decode = userRaw_decode;
exports.data = data$1;
exports.json = json;
/* data Not a pure module */
