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
var _a;
exports.__esModule = true;
exports.navigationCustomizations = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var React = __importStar(require("react"));
var styles_1 = require("@mui/material/styles");
var ButtonBase_1 = require("@mui/material/ButtonBase");
var Divider_1 = require("@mui/material/Divider");
var MenuItem_1 = require("@mui/material/MenuItem");
var Select_1 = require("@mui/material/Select");
var Tab_1 = require("@mui/material/Tab");
var UnfoldMoreRounded_1 = __importDefault(require("@mui/icons-material/UnfoldMoreRounded"));
// @ts-ignore
var themePrimitives_ts_1 = require("../themePrimitives.ts");
/* eslint-disable import/prefer-default-export */
exports.navigationCustomizations = {
    MuiMenuItem: {
        styleOverrides: {
            root: function (_a) {
                var _b, _c;
                var theme = _a.theme;
                return (_b = {
                        borderRadius: (theme).shape.borderRadius,
                        padding: '6px 8px'
                    },
                    _b["&.".concat(MenuItem_1.menuItemClasses.focusVisible)] = {
                        backgroundColor: 'transparent'
                    },
                    _b["&.".concat(MenuItem_1.menuItemClasses.selected)] = (_c = {},
                        _c["&.".concat(MenuItem_1.menuItemClasses.focusVisible)] = {
                            backgroundColor: (0, styles_1.alpha)(theme.palette.action.selected, 0.3)
                        },
                        _c),
                    _b);
            }
        }
    },
    MuiMenu: {
        styleOverrides: {
            list: (_a = {
                    gap: '0px'
                },
                _a["&.".concat(Divider_1.dividerClasses.root)] = {
                    margin: '0 -8px'
                },
                _a),
            paper: function (_a) {
                var _b;
                var theme = _a.theme;
                return (__assign((_b = { marginTop: '4px', borderRadius: (theme).shape.borderRadius, border: "1px solid ".concat((theme).palette.divider), backgroundImage: 'none', background: 'hsl(0, 0%, 100%)', boxShadow: 'hsla(220, 30%, 5%, 0.07) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.07) 0px 8px 16px -5px' }, _b["& .".concat(ButtonBase_1.buttonBaseClasses.root)] = {
                    '&.Mui-selected': {
                        backgroundColor: (0, styles_1.alpha)(theme.palette.action.selected, 0.3)
                    }
                }, _b), theme.applyStyles('dark', {
                    background: themePrimitives_ts_1.gray[900],
                    boxShadow: 'hsla(220, 30%, 5%, 0.7) 0px 4px 16px 0px, hsla(220, 25%, 10%, 0.8) 0px 8px 16px -5px'
                })));
            }
        }
    },
    MuiSelect: {
        defaultProps: {
            IconComponent: React.forwardRef(function (props, ref) { return ((0, jsx_runtime_1.jsx)(UnfoldMoreRounded_1["default"], __assign({ fontSize: "small" }, props, { ref: ref }))); })
        },
        styleOverrides: {
            root: function (_a) {
                var _b, _c;
                var theme = _a.theme;
                return (__assign((_b = { borderRadius: (theme).shape.borderRadius, border: '1px solid', borderColor: themePrimitives_ts_1.gray[200], backgroundColor: (theme).palette.background.paper, boxShadow: "inset 0 1px 0 1px hsla(220, 0%, 100%, 0.6), inset 0 -1px 0 1px hsla(220, 35%, 90%, 0.5)", '&:hover': {
                            borderColor: themePrimitives_ts_1.gray[300],
                            backgroundColor: (theme).palette.background.paper,
                            boxShadow: 'none'
                        } }, _b["&.".concat(Select_1.selectClasses.focused)] = {
                    outlineOffset: 0,
                    borderColor: themePrimitives_ts_1.gray[400]
                }, _b['&:before, &:after'] = {
                    display: 'none'
                }, _b), theme.applyStyles('dark', (_c = {
                        borderRadius: (theme).shape.borderRadius,
                        borderColor: themePrimitives_ts_1.gray[700],
                        backgroundColor: (theme).palette.background.paper,
                        boxShadow: "inset 0 1px 0 1px ".concat((0, styles_1.alpha)(themePrimitives_ts_1.gray[700], 0.15), ", inset 0 -1px 0 1px hsla(220, 0%, 0%, 0.7)"),
                        '&:hover': {
                            borderColor: (0, styles_1.alpha)(themePrimitives_ts_1.gray[700], 0.7),
                            backgroundColor: (theme).palette.background.paper,
                            boxShadow: 'none'
                        }
                    },
                    _c["&.".concat(Select_1.selectClasses.focused)] = {
                        outlineOffset: 0,
                        borderColor: themePrimitives_ts_1.gray[900]
                    },
                    _c['&:before, &:after'] = {
                        display: 'none'
                    },
                    _c))));
            },
            select: function (_a) {
                var theme = _a.theme;
                return (__assign({ display: 'flex', alignItems: 'center' }, theme.applyStyles('dark', {
                    display: 'flex',
                    alignItems: 'center',
                    '&:focus-visible': {
                        backgroundColor: themePrimitives_ts_1.gray[900]
                    }
                })));
            }
        }
    },
    MuiLink: {
        defaultProps: {
            underline: 'none'
        },
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return ({
                    color: (theme).palette.text.primary,
                    fontWeight: 500,
                    position: 'relative',
                    textDecoration: 'none',
                    width: 'fit-content',
                    '&::before': {
                        content: '""',
                        position: 'absolute',
                        width: '100%',
                        height: '1px',
                        bottom: 0,
                        left: 0,
                        backgroundColor: (theme).palette.text.secondary,
                        opacity: 0.3,
                        transition: 'width 0.3s ease, opacity 0.3s ease'
                    },
                    '&:hover::before': {
                        width: 0
                    },
                    '&:focus-visible': {
                        outline: "3px solid ".concat((0, styles_1.alpha)(themePrimitives_ts_1.brand[500], 0.5)),
                        outlineOffset: '4px',
                        borderRadius: '2px'
                    }
                });
            }
        }
    },
    MuiDrawer: {
        styleOverrides: {
            paper: function (_a) {
                var theme = _a.theme;
                return ({
                    backgroundColor: (theme).palette.background["default"]
                });
            }
        }
    },
    MuiPaginationItem: {
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return (__assign({ '&.Mui-selected': {
                        color: 'white',
                        backgroundColor: (theme).palette.grey[900]
                    } }, theme.applyStyles('dark', {
                    '&.Mui-selected': {
                        color: 'black',
                        backgroundColor: (theme).palette.grey[50]
                    }
                })));
            }
        }
    },
    MuiTabs: {
        styleOverrides: {
            root: { minHeight: 'fit-content' },
            indicator: function (_a) {
                var theme = _a.theme;
                return (__assign({ backgroundColor: (theme).palette.grey[800] }, theme.applyStyles('dark', {
                    backgroundColor: (theme).palette.grey[200]
                })));
            }
        }
    },
    MuiTab: {
        styleOverrides: {
            root: function (_a) {
                var _b, _c;
                var theme = _a.theme;
                return (__assign((_b = { padding: '6px 8px', marginBottom: '8px', textTransform: 'none', minWidth: 'fit-content', minHeight: 'fit-content', color: (theme).palette.text.secondary, borderRadius: (theme).shape.borderRadius, border: '1px solid', borderColor: 'transparent', ':hover': {
                            color: (theme).palette.text.primary,
                            backgroundColor: themePrimitives_ts_1.gray[100],
                            borderColor: themePrimitives_ts_1.gray[200]
                        } }, _b["&.".concat(Tab_1.tabClasses.selected)] = {
                    color: themePrimitives_ts_1.gray[900]
                }, _b), theme.applyStyles('dark', (_c = {
                        ':hover': {
                            color: (theme).palette.text.primary,
                            backgroundColor: themePrimitives_ts_1.gray[800],
                            borderColor: themePrimitives_ts_1.gray[700]
                        }
                    },
                    _c["&.".concat(Tab_1.tabClasses.selected)] = {
                        color: '#fff'
                    },
                    _c))));
            }
        }
    },
    MuiStepConnector: {
        styleOverrides: {
            line: function (_a) {
                var theme = _a.theme;
                return ({
                    borderTop: '1px solid',
                    borderColor: (theme).palette.divider,
                    flex: 1,
                    borderRadius: '99px'
                });
            }
        }
    },
    MuiStepIcon: {
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return (__assign(__assign({ color: 'transparent', border: "1px solid ".concat(themePrimitives_ts_1.gray[400]), width: 12, height: 12, borderRadius: '50%', '& text': {
                        display: 'none'
                    }, '&.Mui-active': {
                        border: 'none',
                        color: (theme).palette.primary.main
                    }, '&.Mui-completed': {
                        border: 'none',
                        color: (theme).palette.success.main
                    } }, theme.applyStyles('dark', {
                    border: "1px solid ".concat(themePrimitives_ts_1.gray[700]),
                    '&.Mui-active': {
                        border: 'none',
                        color: (theme).palette.primary.light
                    },
                    '&.Mui-completed': {
                        border: 'none',
                        color: (theme).palette.success.light
                    }
                })), { variants: [
                        {
                            props: { completed: true },
                            style: {
                                width: 12,
                                height: 12
                            }
                        },
                    ] }));
            }
        }
    },
    MuiStepLabel: {
        styleOverrides: {
            label: function (_a) {
                var theme = _a.theme;
                return ({
                    '&.Mui-completed': __assign({ opacity: 0.6 }, theme.applyStyles('dark', { opacity: 0.5 }))
                });
            }
        }
    }
};
