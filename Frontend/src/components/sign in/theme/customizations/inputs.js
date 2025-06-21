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
exports.inputsCustomizations = void 0;
var jsx_runtime_1 = require("react/jsx-runtime");
var styles_1 = require("@mui/material/styles");
var OutlinedInput_1 = require("@mui/material/OutlinedInput");
var SvgIcon_1 = require("@mui/material/SvgIcon");
var ToggleButtonGroup_1 = require("@mui/material/ToggleButtonGroup");
var ToggleButton_1 = require("@mui/material/ToggleButton");
var CheckBoxOutlineBlankRounded_1 = __importDefault(require("@mui/icons-material/CheckBoxOutlineBlankRounded"));
var CheckRounded_1 = __importDefault(require("@mui/icons-material/CheckRounded"));
var RemoveRounded_1 = __importDefault(require("@mui/icons-material/RemoveRounded"));
// @ts-ignore
var themePrimitives_ts_1 = require("../themePrimitives.ts");
/* eslint-disable import/prefer-default-export */
exports.inputsCustomizations = {
    MuiButtonBase: {
        defaultProps: {
            disableTouchRipple: true,
            disableRipple: true
        },
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return ({
                    boxSizing: 'border-box',
                    transition: 'all 100ms ease-in',
                    '&:focus-visible': {
                        outline: "3px solid ".concat((0, styles_1.alpha)(theme.palette.primary.main, 0.5)),
                        outlineOffset: '2px'
                    }
                });
            }
        }
    },
    MuiButton: {
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return ({
                    boxShadow: 'none',
                    borderRadius: (theme).shape.borderRadius,
                    textTransform: 'none',
                    variants: [
                        {
                            props: {
                                size: 'small'
                            },
                            style: {
                                height: '2.25rem',
                                padding: '8px 12px'
                            }
                        },
                        {
                            props: {
                                size: 'medium'
                            },
                            style: {
                                height: '2.5rem'
                            }
                        },
                        {
                            props: {
                                color: 'primary',
                                variant: 'contained'
                            },
                            style: __assign({ color: 'white', backgroundColor: themePrimitives_ts_1.gray[900], backgroundImage: "linear-gradient(to bottom, ".concat(themePrimitives_ts_1.gray[700], ", ").concat(themePrimitives_ts_1.gray[800], ")"), boxShadow: "inset 0 1px 0 ".concat(themePrimitives_ts_1.gray[600], ", inset 0 -1px 0 1px hsl(220, 0%, 0%)"), border: "1px solid ".concat(themePrimitives_ts_1.gray[700]), '&:hover': {
                                    backgroundImage: 'none',
                                    backgroundColor: themePrimitives_ts_1.gray[700],
                                    boxShadow: 'none'
                                }, '&:active': {
                                    backgroundColor: themePrimitives_ts_1.gray[800]
                                } }, theme.applyStyles('dark', {
                                color: 'black',
                                backgroundColor: themePrimitives_ts_1.gray[50],
                                backgroundImage: "linear-gradient(to bottom, ".concat(themePrimitives_ts_1.gray[100], ", ").concat(themePrimitives_ts_1.gray[50], ")"),
                                boxShadow: 'inset 0 -1px 0  hsl(220, 30%, 80%)',
                                border: "1px solid ".concat(themePrimitives_ts_1.gray[50]),
                                '&:hover': {
                                    backgroundImage: 'none',
                                    backgroundColor: themePrimitives_ts_1.gray[300],
                                    boxShadow: 'none'
                                },
                                '&:active': {
                                    backgroundColor: themePrimitives_ts_1.gray[400]
                                }
                            }))
                        },
                        {
                            props: {
                                color: 'secondary',
                                variant: 'contained'
                            },
                            style: {
                                color: 'white',
                                backgroundColor: themePrimitives_ts_1.brand[300],
                                backgroundImage: "linear-gradient(to bottom, ".concat((0, styles_1.alpha)(themePrimitives_ts_1.brand[400], 0.8), ", ").concat(themePrimitives_ts_1.brand[500], ")"),
                                boxShadow: "inset 0 2px 0 ".concat((0, styles_1.alpha)(themePrimitives_ts_1.brand[200], 0.2), ", inset 0 -2px 0 ").concat((0, styles_1.alpha)(themePrimitives_ts_1.brand[700], 0.4)),
                                border: "1px solid ".concat(themePrimitives_ts_1.brand[500]),
                                '&:hover': {
                                    backgroundColor: themePrimitives_ts_1.brand[700],
                                    boxShadow: 'none'
                                },
                                '&:active': {
                                    backgroundColor: themePrimitives_ts_1.brand[700],
                                    backgroundImage: 'none'
                                }
                            }
                        },
                        {
                            props: {
                                variant: 'outlined'
                            },
                            style: __assign({ color: (theme).palette.text.primary, border: '1px solid', borderColor: themePrimitives_ts_1.gray[200], backgroundColor: (0, styles_1.alpha)(themePrimitives_ts_1.gray[50], 0.3), '&:hover': {
                                    backgroundColor: themePrimitives_ts_1.gray[100],
                                    borderColor: themePrimitives_ts_1.gray[300]
                                }, '&:active': {
                                    backgroundColor: themePrimitives_ts_1.gray[200]
                                } }, theme.applyStyles('dark', {
                                backgroundColor: themePrimitives_ts_1.gray[800],
                                borderColor: themePrimitives_ts_1.gray[700],
                                '&:hover': {
                                    backgroundColor: themePrimitives_ts_1.gray[900],
                                    borderColor: themePrimitives_ts_1.gray[600]
                                },
                                '&:active': {
                                    backgroundColor: themePrimitives_ts_1.gray[900]
                                }
                            }))
                        },
                        {
                            props: {
                                color: 'secondary',
                                variant: 'outlined'
                            },
                            style: __assign({ color: themePrimitives_ts_1.brand[700], border: '1px solid', borderColor: themePrimitives_ts_1.brand[200], backgroundColor: themePrimitives_ts_1.brand[50], '&:hover': {
                                    backgroundColor: themePrimitives_ts_1.brand[100],
                                    borderColor: themePrimitives_ts_1.brand[400]
                                }, '&:active': {
                                    backgroundColor: (0, styles_1.alpha)(themePrimitives_ts_1.brand[200], 0.7)
                                } }, theme.applyStyles('dark', {
                                color: themePrimitives_ts_1.brand[50],
                                border: '1px solid',
                                borderColor: themePrimitives_ts_1.brand[900],
                                backgroundColor: (0, styles_1.alpha)(themePrimitives_ts_1.brand[900], 0.3),
                                '&:hover': {
                                    borderColor: themePrimitives_ts_1.brand[700],
                                    backgroundColor: (0, styles_1.alpha)(themePrimitives_ts_1.brand[900], 0.6)
                                },
                                '&:active': {
                                    backgroundColor: (0, styles_1.alpha)(themePrimitives_ts_1.brand[900], 0.5)
                                }
                            }))
                        },
                        {
                            props: {
                                variant: 'text'
                            },
                            style: __assign({ color: themePrimitives_ts_1.gray[600], '&:hover': {
                                    backgroundColor: themePrimitives_ts_1.gray[100]
                                }, '&:active': {
                                    backgroundColor: themePrimitives_ts_1.gray[200]
                                } }, theme.applyStyles('dark', {
                                color: themePrimitives_ts_1.gray[50],
                                '&:hover': {
                                    backgroundColor: themePrimitives_ts_1.gray[700]
                                },
                                '&:active': {
                                    backgroundColor: (0, styles_1.alpha)(themePrimitives_ts_1.gray[700], 0.7)
                                }
                            }))
                        },
                        {
                            props: {
                                color: 'secondary',
                                variant: 'text'
                            },
                            style: __assign({ color: themePrimitives_ts_1.brand[700], '&:hover': {
                                    backgroundColor: (0, styles_1.alpha)(themePrimitives_ts_1.brand[100], 0.5)
                                }, '&:active': {
                                    backgroundColor: (0, styles_1.alpha)(themePrimitives_ts_1.brand[200], 0.7)
                                } }, theme.applyStyles('dark', {
                                color: themePrimitives_ts_1.brand[100],
                                '&:hover': {
                                    backgroundColor: (0, styles_1.alpha)(themePrimitives_ts_1.brand[900], 0.5)
                                },
                                '&:active': {
                                    backgroundColor: (0, styles_1.alpha)(themePrimitives_ts_1.brand[900], 0.3)
                                }
                            }))
                        },
                    ]
                });
            }
        }
    },
    MuiIconButton: {
        styleOverrides: {
            root: function (_a) {
                var _b;
                var theme = _a.theme;
                return (__assign(__assign({ boxShadow: 'none', borderRadius: (theme).shape.borderRadius, textTransform: 'none', fontWeight: theme.typography.fontWeightMedium, letterSpacing: 0, color: (theme).palette.text.primary, border: '1px solid ', borderColor: themePrimitives_ts_1.gray[200], backgroundColor: (0, styles_1.alpha)(themePrimitives_ts_1.gray[50], 0.3), '&:hover': {
                        backgroundColor: themePrimitives_ts_1.gray[100],
                        borderColor: themePrimitives_ts_1.gray[300]
                    }, '&:active': {
                        backgroundColor: themePrimitives_ts_1.gray[200]
                    } }, theme.applyStyles('dark', {
                    backgroundColor: themePrimitives_ts_1.gray[800],
                    borderColor: themePrimitives_ts_1.gray[700],
                    '&:hover': {
                        backgroundColor: themePrimitives_ts_1.gray[900],
                        borderColor: themePrimitives_ts_1.gray[600]
                    },
                    '&:active': {
                        backgroundColor: themePrimitives_ts_1.gray[900]
                    }
                })), { variants: [
                        {
                            props: {
                                size: 'small'
                            },
                            style: (_b = {
                                    width: '2.25rem',
                                    height: '2.25rem',
                                    padding: '0.25rem'
                                },
                                _b["& .".concat(SvgIcon_1.svgIconClasses.root)] = { fontSize: '1rem' },
                                _b)
                        },
                        {
                            props: {
                                size: 'medium'
                            },
                            style: {
                                width: '2.5rem',
                                height: '2.5rem'
                            }
                        },
                    ] }));
            }
        }
    },
    MuiToggleButtonGroup: {
        styleOverrides: {
            root: function (_a) {
                var _b, _c;
                var theme = _a.theme;
                return (__assign((_b = { borderRadius: '10px', boxShadow: "0 4px 16px ".concat((0, styles_1.alpha)(themePrimitives_ts_1.gray[400], 0.2)) }, _b["& .".concat(ToggleButtonGroup_1.toggleButtonGroupClasses.selected)] = {
                    color: themePrimitives_ts_1.brand[500]
                }, _b), theme.applyStyles('dark', (_c = {},
                    _c["& .".concat(ToggleButtonGroup_1.toggleButtonGroupClasses.selected)] = {
                        color: '#fff'
                    },
                    _c.boxShadow = "0 4px 16px ".concat((0, styles_1.alpha)(themePrimitives_ts_1.brand[700], 0.5)),
                    _c))));
            }
        }
    },
    MuiToggleButton: {
        styleOverrides: {
            root: function (_a) {
                var _b;
                var theme = _a.theme;
                return (__assign({ padding: '12px 16px', textTransform: 'none', borderRadius: '10px', fontWeight: 500 }, theme.applyStyles('dark', (_b = {
                        color: themePrimitives_ts_1.gray[400],
                        boxShadow: '0 4px 16px rgba(0, 0, 0, 0.5)'
                    },
                    _b["&.".concat(ToggleButton_1.toggleButtonClasses.selected)] = {
                        color: themePrimitives_ts_1.brand[300]
                    },
                    _b))));
            }
        }
    },
    MuiCheckbox: {
        defaultProps: {
            disableRipple: true,
            icon: ((0, jsx_runtime_1.jsx)(CheckBoxOutlineBlankRounded_1["default"], { sx: { color: 'hsla(210, 0%, 0%, 0.0)' } })),
            checkedIcon: (0, jsx_runtime_1.jsx)(CheckRounded_1["default"], { sx: { height: 14, width: 14 } }),
            indeterminateIcon: (0, jsx_runtime_1.jsx)(RemoveRounded_1["default"], { sx: { height: 14, width: 14 } })
        },
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return (__assign({ margin: 10, height: 16, width: 16, borderRadius: 5, border: '1px solid ', borderColor: (0, styles_1.alpha)(themePrimitives_ts_1.gray[300], 0.8), boxShadow: '0 0 0 1.5px hsla(210, 0%, 0%, 0.04) inset', backgroundColor: (0, styles_1.alpha)(themePrimitives_ts_1.gray[100], 0.4), transition: 'border-color, background-color, 120ms ease-in', '&:hover': {
                        borderColor: themePrimitives_ts_1.brand[300]
                    }, '&.Mui-focusVisible': {
                        outline: "3px solid ".concat((0, styles_1.alpha)(themePrimitives_ts_1.brand[500], 0.5)),
                        outlineOffset: '2px',
                        borderColor: themePrimitives_ts_1.brand[400]
                    }, '&.Mui-checked': {
                        color: 'white',
                        backgroundColor: themePrimitives_ts_1.brand[500],
                        borderColor: themePrimitives_ts_1.brand[500],
                        boxShadow: "none",
                        '&:hover': {
                            backgroundColor: themePrimitives_ts_1.brand[600]
                        }
                    } }, theme.applyStyles('dark', {
                    borderColor: (0, styles_1.alpha)(themePrimitives_ts_1.gray[700], 0.8),
                    boxShadow: '0 0 0 1.5px hsl(210, 0%, 0%) inset',
                    backgroundColor: (0, styles_1.alpha)(themePrimitives_ts_1.gray[900], 0.8),
                    '&:hover': {
                        borderColor: themePrimitives_ts_1.brand[300]
                    },
                    '&.Mui-focusVisible': {
                        borderColor: themePrimitives_ts_1.brand[400],
                        outline: "3px solid ".concat((0, styles_1.alpha)(themePrimitives_ts_1.brand[500], 0.5)),
                        outlineOffset: '2px'
                    }
                })));
            }
        }
    },
    MuiInputBase: {
        styleOverrides: {
            root: {
                border: 'none'
            },
            input: {
                '&::placeholder': {
                    opacity: 0.7,
                    color: themePrimitives_ts_1.gray[500]
                }
            }
        }
    },
    MuiOutlinedInput: {
        styleOverrides: {
            input: {
                padding: 0
            },
            root: function (_a) {
                var _b;
                var theme = _a.theme;
                return (__assign(__assign((_b = { padding: '8px 12px', color: (theme).palette.text.primary, borderRadius: (theme).shape.borderRadius, border: "1px solid ".concat((theme).palette.divider), backgroundColor: (theme).palette.background["default"], transition: 'border 120ms ease-in', '&:hover': {
                            borderColor: themePrimitives_ts_1.gray[400]
                        } }, _b["&.".concat(OutlinedInput_1.outlinedInputClasses.focused)] = {
                    outline: "3px solid ".concat((0, styles_1.alpha)(themePrimitives_ts_1.brand[500], 0.5)),
                    borderColor: themePrimitives_ts_1.brand[400]
                }, _b), theme.applyStyles('dark', {
                    '&:hover': {
                        borderColor: themePrimitives_ts_1.gray[500]
                    }
                })), { variants: [
                        {
                            props: {
                                size: 'small'
                            },
                            style: {
                                height: '2.25rem'
                            }
                        },
                        {
                            props: {
                                size: 'medium'
                            },
                            style: {
                                height: '2.5rem'
                            }
                        },
                    ] }));
            },
            notchedOutline: {
                border: 'none'
            }
        }
    },
    MuiInputAdornment: {
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return (__assign({ color: (theme).palette.grey[500] }, theme.applyStyles('dark', {
                    color: (theme).palette.grey[400]
                })));
            }
        }
    },
    MuiFormLabel: {
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return ({
                    typography: theme.typography.caption,
                    marginBottom: 8
                });
            }
        }
    }
};
