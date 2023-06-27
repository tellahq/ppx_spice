// Generated by ReScript, PLEASE EDIT WITH CARE
'use strict';

var Spice = require("@greenlabs/ppx-spice/src/rescript/Spice.js");
var Js_dict = require("rescript/lib/js/js_dict.js");
var Js_json = require("rescript/lib/js/js_json.js");
var Js_array = require("rescript/lib/js/js_array.js");
var Belt_Array = require("rescript/lib/js/belt_Array.js");
var Belt_Option = require("rescript/lib/js/belt_Option.js");
var Belt_Result = require("rescript/lib/js/belt_Result.js");

function status_encode(v) {
  switch (v) {
    case "WAITING" :
        return ["WAITING"];
    case "PROCESSING" :
        return ["PROCESSING"];
    case "SUCCESS" :
        return ["SUCCESS"];
    case "FAIL" :
        return ["FAIL"];
    
  }
}

function status_decode(v) {
  var json_arr = Js_json.classify(v);
  if (typeof json_arr !== "object") {
    return Spice.error(undefined, "Not a variant", v);
  }
  if (json_arr.TAG !== "JSONArray") {
    return Spice.error(undefined, "Not a variant", v);
  }
  var json_arr$1 = json_arr._0;
  if (json_arr$1.length === 0) {
    return Spice.error(undefined, "Expected variant, found empty array", v);
  }
  var tagged = Js_array.map(Js_json.classify, json_arr$1);
  var match = Belt_Array.getExn(tagged, 0);
  if (typeof match === "object" && match.TAG === "JSONString") {
    switch (match._0) {
      case "FAIL" :
          if (tagged.length !== 1) {
            return Spice.error(undefined, "Invalid number of arguments to variant constructor", v);
          } else {
            return {
                    TAG: "Ok",
                    _0: "FAIL"
                  };
          }
      case "PROCESSING" :
          if (tagged.length !== 1) {
            return Spice.error(undefined, "Invalid number of arguments to variant constructor", v);
          } else {
            return {
                    TAG: "Ok",
                    _0: "PROCESSING"
                  };
          }
      case "SUCCESS" :
          if (tagged.length !== 1) {
            return Spice.error(undefined, "Invalid number of arguments to variant constructor", v);
          } else {
            return {
                    TAG: "Ok",
                    _0: "SUCCESS"
                  };
          }
      case "WAITING" :
          if (tagged.length !== 1) {
            return Spice.error(undefined, "Invalid number of arguments to variant constructor", v);
          } else {
            return {
                    TAG: "Ok",
                    _0: "WAITING"
                  };
          }
      default:
        
    }
  }
  return Spice.error(undefined, "Invalid variant constructor", Belt_Array.getExn(json_arr$1, 0));
}

function encoderStatus(v) {
  switch (v) {
    case "WAITING" :
        return "waiting";
    case "PROCESSING" :
        return "processing";
    case "SUCCESS" :
        return "success";
    case "FAIL" :
        return "fail";
    
  }
}

function decoderStatus(json) {
  var str = Js_json.classify(json);
  if (typeof str !== "object") {
    return {
            TAG: "Error",
            _0: {
              path: "",
              message: "Expected JSONString",
              value: json
            }
          };
  }
  if (str.TAG !== "JSONString") {
    return {
            TAG: "Error",
            _0: {
              path: "",
              message: "Expected JSONString",
              value: json
            }
          };
  }
  switch (str._0) {
    case "fail" :
        return {
                TAG: "Ok",
                _0: "FAIL"
              };
    case "processing" :
        return {
                TAG: "Ok",
                _0: "PROCESSING"
              };
    case "success" :
        return {
                TAG: "Ok",
                _0: "SUCCESS"
              };
    case "waiting" :
        return {
                TAG: "Ok",
                _0: "WAITING"
              };
    default:
      return {
              TAG: "Error",
              _0: {
                path: "",
                message: "Expected JSONString",
                value: json
              }
            };
  }
}

var codecStatus = [
  encoderStatus,
  decoderStatus
];

function data_encode(v) {
  return Js_dict.fromArray(Spice.filterOptional([[
                    "status",
                    false,
                    encoderStatus(v.status)
                  ]]));
}

function data_decode(v) {
  var dict = Js_json.classify(v);
  if (typeof dict !== "object") {
    return Spice.error(undefined, "Not an object", v);
  }
  if (dict.TAG !== "JSONObject") {
    return Spice.error(undefined, "Not an object", v);
  }
  var status = decoderStatus(Belt_Option.getWithDefault(Js_dict.get(dict._0, "status"), null));
  if (status.TAG === "Ok") {
    return {
            TAG: "Ok",
            _0: {
              status: status._0
            }
          };
  }
  var e = status._0;
  return {
          TAG: "Error",
          _0: {
            path: ".status" + e.path,
            message: e.message,
            value: e.value
          }
        };
}

var data = {
    "status": "success"
  };

var data$1 = data_decode(data);

var json = data_encode(Belt_Result.getExn(data$1));

exports.status_encode = status_encode;
exports.status_decode = status_decode;
exports.encoderStatus = encoderStatus;
exports.decoderStatus = decoderStatus;
exports.codecStatus = codecStatus;
exports.data_encode = data_encode;
exports.data_decode = data_decode;
exports.data = data$1;
exports.json = json;
/* data Not a pure module */
