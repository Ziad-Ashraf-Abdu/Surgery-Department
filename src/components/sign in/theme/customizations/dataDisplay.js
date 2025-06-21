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
var _a;
exports.__esModule = true;
exports.dataDisplayCustomizations = void 0;
var styles_1 = require("@mui/material/styles");
var SvgIcon_1 = require("@mui/material/SvgIcon");
var Typography_1 = require("@mui/material/Typography");
var ButtonBase_1 = require("@mui/material/ButtonBase");
var Chip_1 = require("@mui/material/Chip");
var IconButton_1 = require("@mui/material/IconButton");
// @ts-ignore
var themePrimitives_ts_1 = require("../themePrimitives.ts");
/* eslint-disable import/prefer-default-export */
exports.dataDisplayCustomizations = {
    MuiList: {
        styleOverrides: {
            root: {
                padding: '8px',
                display: 'flex',
                flexDirection: 'column',
                gap: 0
            }
        }
    },
    MuiListItem: {
        styleOverrides: {
            root: function (_a) {
                var _b, _c;
                var theme = _a.theme;
                return (_b = {},
                    _b["& .".concat(SvgIcon_1.svgIconClasses.root)] = {
                        width: '1rem',
                        height: '1rem',
                        color: (theme).palette.text.secondary
                    },
                    _b["& .".concat(Typography_1.typographyClasses.root)] = {
                        fontWeight: 500
                    },
                    _b["& .".concat(ButtonBase_1.buttonBaseClasses.root)] = {
                        display: 'flex',
                        gap: 8,
                        padding: '2px 8px',
                        borderRadius: (theme).shape.borderRadius,
                        opacity: 0.7,
                        '&.Mui-selected': (_c = {
                                opacity: 1,
                                backgroundColor: (0, styles_1.alpha)(theme.palette.action.selected, 0.3)
                            },
                            _c["& .".concat(SvgIcon_1.svgIconClasses.root)] = {
                                color: (theme).palette.text.primary
                            },
                            _c['&:focus-visible'] = {
                                backgroundColor: (0, styles_1.alpha)(theme.palette.action.selected, 0.3)
                            },
                            _c['&:hover'] = {
                                backgroundColor: (0, styles_1.alpha)(theme.palette.action.selected, 0.5)
                            },
                            _c),
                        '&:focus-visible': {
                            backgroundColor: 'transparent'
                        }
                    },
                    _b);
            }
        }
    },
    MuiListItemText: {
        styleOverrides: {
            primary: function (_a) {
                var theme = _a.theme;
                return ({
                    fontSize: theme.typography.body2.fontSize,
                    fontWeight: 500,
                    lineHeight: theme.typography.body2.lineHeight
                });
            },
            secondary: function (_a) {
                var theme = _a.theme;
                return ({
                    fontSize: theme.typography.caption.fontSize,
                    lineHeight: theme.typography.caption.lineHeight
                });
            }
        }
    },
    MuiListSubheader: {
        styleOverrides: {
            root: function (_a) {
                var theme = _a.theme;
                return ({
                    backgroundColor: 'transparent',
                    padding: '4px 8px',
                    fontSize: theme.typography.caption.fontSize,
                    fontWeight: 500,
                    lineHeight: theme.typography.caption.lineHeight
                });
            }
        }
    },
    MuiListItemIcon: {
        styleOverrides: {
            root: {
                minWidth: 0
            }
        }
    },
    MuiChip: {
        defaultProps: {
            size: 'small'
        },
        styleOverrides: {
            root: function (_a) {
                var _b, _c, _d, _e, _f, _g, _h, _j, _k;
                var theme = _a.theme;
                return (_b = {
                        border: '1px solid',
                        borderRadius: '999px'
                    },
                    _b["& .".concat(Chip_1.chipClasses.label)] = {
                        fontWeight: 600
                    },
                    _b.variants = [
                        {
                            props: {
                                color: 'default'
                            },
                            style: __assign((_c = { borderColor: themePrimitives_ts_1.gray[200], backgroundColor: themePrimitives_ts_1.gray[100] }, _c["& .".concat(Chip_1.chipClasses.label)] = {
                                color: themePrimitives_ts_1.gray[500]
                            }, _c["& .".concat(Chip_1.chipClasses.icon)] = {
                                color: themePrimitives_ts_1.gray[500]
                            }, _c), theme.applyStyles('dark', (_d = {
                                    borderColor: themePrimitives_ts_1.gray[700],
                                    backgroundColor: themePrimitives_ts_1.gray[800]
                                },
                                _d["& .".concat(Chip_1.chipClasses.label)] = {
                                    color: themePrimitives_ts_1.gray[300]
                                },
                                _d["& .".concat(Chip_1.chipClasses.icon)] = {
                                    color: themePrimitives_ts_1.gray[300]
                                },
                                _d)))
                        },
                        {
                            props: {
                                color: 'success'
                            },
                            style: __assign((_e = { borderColor: themePrimitives_ts_1.green[200], backgroundColor: themePrimitives_ts_1.green[50] }, _e["& .".concat(Chip_1.chipClasses.label)] = {
                                color: themePrimitives_ts_1.green[500]
                            }, _e["& .".concat(Chip_1.chipClasses.icon)] = {
                                color: themePrimitives_ts_1.green[500]
                            }, _e), theme.applyStyles('dark', (_f = {
                                    borderColor: themePrimitives_ts_1.green[800],
                                    backgroundColor: themePrimitives_ts_1.green[900]
                                },
                                _f["& .".concat(Chip_1.chipClasses.label)] = {
                                    color: themePrimitives_ts_1.green[300]
                                },
                                _f["& .".concat(Chip_1.chipClasses.icon)] = {
                                    color: themePrimitives_ts_1.green[300]
                                },
                                _f)))
                        },
                        {
                            props: {
                                color: 'error'
                            },
                            style: __assign((_g = { borderColor: themePrimitives_ts_1.red[100], backgroundColor: themePrimitives_ts_1.red[50] }, _g["& .".concat(Chip_1.chipClasses.label)] = {
                                color: themePrimitives_ts_1.red[500]
                            }, _g["& .".concat(Chip_1.chipClasses.icon)] = {
                                color: themePrimitives_ts_1.red[500]
                            }, _g), theme.applyStyles('dark', (_h = {
                                    borderColor: themePrimitives_ts_1.red[800],
                                    backgroundColor: themePrimitives_ts_1.red[900]
                                },
                                _h["& .".concat(Chip_1.chipClasses.label)] = {
                                    color: themePrimitives_ts_1.red[200]
                                },
                                _h["& .".concat(Chip_1.chipClasses.icon)] = {
                                    color: themePrimitives_ts_1.red[300]
                                },
                                _h)))
                        },
                        {
                            props: { size: 'small' },
                            style: (_j = {
                                    maxHeight: 20
                                },
                                _j["& .".concat(Chip_1.chipClasses.label)] = {
                                    fontSize: theme.typography.caption.fontSize
                                },
                                _j["& .".concat(SvgIcon_1.svgIconClasses.root)] = {
                                    fontSize: theme.typography.caption.fontSize
                                },
                                _j)
                        },
                        {
                            props: { size: 'medium' },
                            style: (_k = {},
                                _k["& .".concat(Chip_1.chipClasses.label)] = {
                                    fontSize: theme.typography.caption.fontSize
                                },
                                _k)
                        },
                    ],
                    _b);
            }
        }
    },
    MuiTablePagination: {
        styleOverrides: {
            actions: (_a = {
                    display: 'flex',
                    gap: 8,
                    marginRight: 6
                },
                _a["& .".concat(IconButton_1.iconButtonClasses.root)] = {
                    minWidth: 0,
                    width: 36,
                    height: 36
                },
                _a)
        }
    },
    MuiIcon: {
        defaultProps: {
            fontSize: 'small'
        },
        styleOverrides: {
            root: {
                variants: [
                    {
                        props: {
                            fontSize: 'small'
                        },
                        style: {
                            fontSize: '1rem'
                        }
                    },
                ]
            }
        }
    }
};
