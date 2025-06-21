"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var styles_1 = require("@mui/material/styles");
var MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
var Select_1 = __importDefault(require("@mui/material/Select"));
function ColorModeSelect(props) {
    var _a = (0, styles_1.useColorScheme)(), mode = _a.mode, setMode = _a.setMode;
    if (!mode) {
        return null;
    }
    return ((0, jsx_runtime_1.jsxs)(Select_1["default"], __assign({ value: mode, onChange: function (event) {
            return setMode(event.target.value);
        }, SelectDisplayProps: {
            // @ts-ignore
            'data-screenshot': 'toggle-mode'
        } }, props, { children: [(0, jsx_runtime_1.jsx)(MenuItem_1["default"], __assign({ value: "system" }, { children: "System" })), (0, jsx_runtime_1.jsx)(MenuItem_1["default"], __assign({ value: "light" }, { children: "Light" })), (0, jsx_runtime_1.jsx)(MenuItem_1["default"], __assign({ value: "dark" }, { children: "Dark" }))] })));
}
exports["default"] = ColorModeSelect;
