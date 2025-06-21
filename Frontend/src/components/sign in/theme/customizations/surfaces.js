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
exports.surfacesCustomizations = void 0;
var styles_1 = require("@mui/material/styles");
// @ts-ignore
var themePrimitives_ts_1 = require("../themePrimitives.ts");
/* eslint-disable import/prefer-default-export */
exports.surfacesCustomizations = {
    MuiAccordion: {
        defaultProps: {
            elevation: 0,
            disableGutters: true
        },
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return ({
                    padding: 4,
                    overflow: 'clip',
                    backgroundColor: (theme).palette.background["default"],
                    border: '1px solid',
                    borderColor: (theme).palette.divider,
                    ':before': {
                        backgroundColor: 'transparent'
                    },
                    '&:not(:last-of-type)': {
                        borderBottom: 'none'
                    },
                    '&:first-of-type': {
                        borderTopLeftRadius: (theme).shape.borderRadius,
                        borderTopRightRadius: (theme).shape.borderRadius
                    },
                    '&:last-of-type': {
                        borderBottomLeftRadius: (theme).shape.borderRadius,
                        borderBottomRightRadius: (theme).shape.borderRadius
                    }
                });
            }
        }
    },
    MuiAccordionSummary: {
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return (__assign({ border: 'none', borderRadius: 8, '&:hover': { backgroundColor: themePrimitives_ts_1.gray[50] }, '&:focus-visible': { backgroundColor: 'transparent' } }, theme.applyStyles('dark', {
                    '&:hover': { backgroundColor: themePrimitives_ts_1.gray[800] }
                })));
            }
        }
    },
    MuiAccordionDetails: {
        styleOverrides: {
            root: { mb: 20, border: 'none' }
        }
    },
    MuiPaper: {
        defaultProps: {
            elevation: 0
        }
    },
    MuiCard: {
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return __assign(__assign({ padding: 16, gap: 16, transition: 'all 100ms ease', backgroundColor: themePrimitives_ts_1.gray[50], borderRadius: (theme).shape.borderRadius, border: "1px solid ".concat((theme).palette.divider), boxShadow: 'none' }, theme.applyStyles('dark', {
                    backgroundColor: themePrimitives_ts_1.gray[800]
                })), { variants: [
                        {
                            props: {
                                variant: 'outlined'
                            },
                            style: __assign({ border: "1px solid ".concat((theme).palette.divider), boxShadow: 'none', background: 'hsl(0, 0%, 100%)' }, theme.applyStyles('dark', {
                                background: (0, styles_1.alpha)(themePrimitives_ts_1.gray[900], 0.4)
                            }))
                        },
                    ] });
            }
        }
    },
    MuiCardContent: {
        styleOverrides: {
            root: {
                padding: 0,
                '&:last-child': { paddingBottom: 0 }
            }
        }
    },
    MuiCardHeader: {
        styleOverrides: {
            root: {
                padding: 0
            }
        }
    },
    MuiCardActions: {
        styleOverrides: {
            root: {
                padding: 0
            }
        }
    }
};
