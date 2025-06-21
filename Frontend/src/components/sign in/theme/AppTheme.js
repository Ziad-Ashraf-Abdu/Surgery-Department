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
exports.__esModule = true;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
var styles_1 = require("@mui/material/styles");
// @ts-ignore
var inputs_tsx_1 = require("./customizations/inputs.tsx");
// @ts-ignore
var dataDisplay_tsx_1 = require("./customizations/dataDisplay.tsx");
// @ts-ignore
var feedback_tsx_1 = require("./customizations/feedback.tsx");
// @ts-ignore
var navigation_tsx_1 = require("./customizations/navigation.tsx");
// @ts-ignore
var surfaces_ts_1 = require("./customizations/surfaces.ts");
// @ts-ignore
var themePrimitives_ts_1 = require("./themePrimitives.ts");
function AppTheme(props) {
    var children = props.children, disableCustomTheme = props.disableCustomTheme, themeComponents = props.themeComponents;
    var theme = React.useMemo(function () {
        return disableCustomTheme
            ? {}
            : (0, styles_1.createTheme)({
                // For more details about CSS variables configuration, see https://mui.com/material-ui/customization/css-theme-variables/configuration/
                cssVariables: {
                    colorSchemeSelector: 'data-mui-color-scheme',
                    cssVarPrefix: 'template'
                },
                colorSchemes: themePrimitives_ts_1.colorSchemes,
                typography: themePrimitives_ts_1.typography,
                shadows: themePrimitives_ts_1.shadows,
                shape: themePrimitives_ts_1.shape,
                components: __assign(__assign(__assign(__assign(__assign(__assign({}, inputs_tsx_1.inputsCustomizations), dataDisplay_tsx_1.dataDisplayCustomizations), feedback_tsx_1.feedbackCustomizations), navigation_tsx_1.navigationCustomizations), surfaces_ts_1.surfacesCustomizations), themeComponents)
            });
    }, [disableCustomTheme, themeComponents]);
    if (disableCustomTheme) {
        return (0, jsx_runtime_1.jsx)(React.Fragment, { children: children });
    }
    return ((0, jsx_runtime_1.jsx)(styles_1.ThemeProvider, __assign({ theme: theme, disableTransitionOnChange: true }, { children: children })));
}
exports["default"] = AppTheme;
