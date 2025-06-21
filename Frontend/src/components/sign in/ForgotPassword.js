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
var Button_1 = __importDefault(require("@mui/material/Button"));
var Dialog_1 = __importDefault(require("@mui/material/Dialog"));
var DialogActions_1 = __importDefault(require("@mui/material/DialogActions"));
var DialogContent_1 = __importDefault(require("@mui/material/DialogContent"));
var DialogContentText_1 = __importDefault(require("@mui/material/DialogContentText"));
var DialogTitle_1 = __importDefault(require("@mui/material/DialogTitle"));
var OutlinedInput_1 = __importDefault(require("@mui/material/OutlinedInput"));
function ForgotPassword(_a) {
    var open = _a.open, handleClose = _a.handleClose;
    return ((0, jsx_runtime_1.jsxs)(Dialog_1["default"], __assign({ open: open, onClose: handleClose, slotProps: {
            paper: {
                component: 'form',
                onSubmit: function (event) {
                    event.preventDefault();
                    handleClose();
                },
                sx: { backgroundImage: 'none' }
            }
        } }, { children: [(0, jsx_runtime_1.jsx)(DialogTitle_1["default"], { children: "Reset password" }), (0, jsx_runtime_1.jsxs)(DialogContent_1["default"], __assign({ sx: { display: 'flex', flexDirection: 'column', gap: 2, width: '100%' } }, { children: [(0, jsx_runtime_1.jsx)(DialogContentText_1["default"], { children: "Enter your account's email address, and we'll send you a link to reset your password." }), (0, jsx_runtime_1.jsx)(OutlinedInput_1["default"], { autoFocus: true, required: true, margin: "dense", id: "email", name: "email", label: "Email address", placeholder: "Email address", type: "email", fullWidth: true })] })), (0, jsx_runtime_1.jsxs)(DialogActions_1["default"], __assign({ sx: { pb: 3, px: 3 } }, { children: [(0, jsx_runtime_1.jsx)(Button_1["default"], __assign({ onClick: handleClose }, { children: "Cancel" })), (0, jsx_runtime_1.jsx)(Button_1["default"], __assign({ variant: "contained", type: "submit", sx: { '&:hover': { backgroundColor: '#3D90D7' } } }, { children: "Continue" }))] }))] })));
}
exports["default"] = ForgotPassword;
