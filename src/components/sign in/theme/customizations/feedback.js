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
exports.__esModule = true;
exports.feedbackCustomizations = void 0;
var styles_1 = require("@mui/material/styles");
// @ts-ignore
var themePrimitives_ts_1 = require("../themePrimitives.ts");
/* eslint-disable import/prefer-default-export */
exports.feedbackCustomizations = {
    MuiAlert: {
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return (__assign({ borderRadius: 10, backgroundColor: themePrimitives_ts_1.orange[100], color: (theme).palette.text.primary, border: "1px solid ".concat((0, styles_1.alpha)(themePrimitives_ts_1.orange[300], 0.5)), '& .MuiAlert-icon': {
                        color: themePrimitives_ts_1.orange[500]
                    } }, theme.applyStyles('dark', {
                    backgroundColor: "".concat((0, styles_1.alpha)(themePrimitives_ts_1.orange[900], 0.5)),
                    border: "1px solid ".concat((0, styles_1.alpha)(themePrimitives_ts_1.orange[800], 0.5))
                })));
            }
        }
    },
    MuiDialog: {
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return ({
                    '& .MuiDialog-paper': {
                        borderRadius: '10px',
                        border: '1px solid',
                        borderColor: (theme).palette.divider
                    }
                });
            }
        }
    },
    MuiLinearProgress: {
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return (__assign({ height: 8, borderRadius: 8, backgroundColor: themePrimitives_ts_1.gray[200] }, theme.applyStyles('dark', {
                    backgroundColor: themePrimitives_ts_1.gray[800]
                })));
            }
        }
    }
};
