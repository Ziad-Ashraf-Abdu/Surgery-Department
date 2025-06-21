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
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
var DarkModeRounded_1 = __importDefault(require("@mui/icons-material/DarkModeRounded"));
var LightModeRounded_1 = __importDefault(require("@mui/icons-material/LightModeRounded"));
var Box_1 = __importDefault(require("@mui/material/Box"));
var IconButton_1 = __importDefault(require("@mui/material/IconButton"));
var Menu_1 = __importDefault(require("@mui/material/Menu"));
var MenuItem_1 = __importDefault(require("@mui/material/MenuItem"));
var styles_1 = require("@mui/material/styles");
function ColorModeIconDropdown(props) {
    var _a = (0, styles_1.useColorScheme)(), mode = _a.mode, systemMode = _a.systemMode, setMode = _a.setMode;
    var _b = React.useState(null), anchorEl = _b[0], setAnchorEl = _b[1];
    var open = Boolean(anchorEl);
    var handleClick = function (event) {
        setAnchorEl(event.currentTarget);
    };
    var handleClose = function () {
        setAnchorEl(null);
    };
    var handleMode = function (targetMode) { return function () {
        setMode(targetMode);
        handleClose();
    }; };
    if (!mode) {
        return ((0, jsx_runtime_1.jsx)(Box_1["default"], { "data-screenshot": "toggle-mode", sx: function (theme) { return ({
                verticalAlign: 'bottom',
                display: 'inline-flex',
                width: '2.25rem',
                height: '2.25rem',
                borderRadius: (theme).shape.borderRadius,
                border: '1px solid',
                borderColor: (theme).palette.divider
            }); } }));
    }
    var resolvedMode = (systemMode || mode);
    var icon = {
        light: (0, jsx_runtime_1.jsx)(LightModeRounded_1["default"], {}),
        dark: (0, jsx_runtime_1.jsx)(DarkModeRounded_1["default"], {})
    }[resolvedMode];
    return ((0, jsx_runtime_1.jsxs)(React.Fragment, { children: [(0, jsx_runtime_1.jsx)(IconButton_1["default"], __assign({ "data-screenshot": "toggle-mode", onClick: handleClick, disableRipple: true, size: "small", "aria-controls": open ? 'color-scheme-menu' : undefined, "aria-haspopup": "true", "aria-expanded": open ? 'true' : undefined }, props, { children: icon })), (0, jsx_runtime_1.jsxs)(Menu_1["default"], __assign({ anchorEl: anchorEl, id: "account-menu", open: open, onClose: handleClose, onClick: handleClose, slotProps: {
                    paper: {
                        variant: 'outlined',
                        elevation: 0,
                        sx: {
                            my: '4px'
                        }
                    }
                }, transformOrigin: { horizontal: 'right', vertical: 'top' }, anchorOrigin: { horizontal: 'right', vertical: 'bottom' } }, { children: [(0, jsx_runtime_1.jsx)(MenuItem_1["default"], __assign({ selected: mode === 'system', onClick: handleMode('system') }, { children: "System" })), (0, jsx_runtime_1.jsx)(MenuItem_1["default"], __assign({ selected: mode === 'light', onClick: handleMode('light') }, { children: "Light" })), (0, jsx_runtime_1.jsx)(MenuItem_1["default"], __assign({ selected: mode === 'dark', onClick: handleMode('dark') }, { children: "Dark" }))] }))] }));
}
exports["default"] = ColorModeIconDropdown;
