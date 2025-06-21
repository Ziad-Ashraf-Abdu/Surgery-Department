import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import {FormHelperText, RadioGroup, Radio } from '@mui/material';
import Preload from '../preload.jsx'
import AppTheme from '../signin/theme/AppTheme.tsx';
import ColorModeSelect from '../signin/theme/ColorModeSelect.tsx';
import { LogoIcon } from '../signin/CustomIcons.tsx';
import { useNavigate } from "react-router-dom";

const Card = styled(MuiCard)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    [theme.breakpoints.up('sm')]: {
        width: '450px',
    },
    overflow: 'auto',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
    height: 'calc((1 - var(--template-frame-height, 0)) * 100dvh)',
    minHeight: '100%',
    padding: theme.spacing(2),
    backgroundColor: "#7AC6D2",
    [theme.breakpoints.up('sm')]: {
        padding: theme.spacing(4),
    },
    '&::before': {
        content: '""',
        display: 'block',
        position: 'absolute',
        zIndex: -1,
        inset: 0,
        backgroundImage:
            'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
        backgroundRepeat: 'no-repeat',
        ...theme.applyStyles('dark', {
            backgroundImage:
                'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
        }),
    },
}));

export default function SignUp(props) {
    const [emailError, setEmailError] = useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = useState('');

    const [passwordError, setPasswordError] = useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = useState('');

    const [nameError, setNameError] = useState(false);
    const [nameErrorMessage, setNameErrorMessage] = useState('');

    const [primaryMobileNoError, setPrimaryMobileNoError] = useState(false);
    const [primaryMobileNoErrorMessage, setPrimaryMobileNoErrorMessage] = useState('');

    const [secondryMobileNoError, setSecondryMobileNoError] = useState(false);
    const [secondryMobileNoErrorMessage, setSecondryMobileNoErrorMessage] = useState('');

    const [addressError, setAddressError] = useState(false);
    const [addressErrorMessage, setAddressErrorMessage] = useState('');

    const [genderError, setGenderError] = useState(false);
    const [genderErrorMessage, setGenderErrorMessage] = useState('');

    const [loading, setLoading] = React.useState(false);
    const [showPassword, setShowPassword] = React.useState(false);

    const navigate = useNavigate();

    const handleClickSignIn = () => {
        navigate("/");
    };

    const validateInputs = () => {
        const email = document.getElementById('email');
        const password = document.getElementById('password');
        const name = document.getElementById('name');
        const primaryMobileNo = document.getElementById('primaryMobileNo');
        const secondryMobileNo = document.getElementById('secondryMobileNo');
        const address = document.getElementById('address');
        const gender = document.querySelector('input[name="gender"]:checked');

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        if (!name.value || name.value.length < 1) {
            setNameError(true);
            setNameErrorMessage('Name is required.');
            isValid = false;
        } else {
            setNameError(false);
            setNameErrorMessage('');
        }

        if (!primaryMobileNo.value || !/^[0-9]{10,}$/.test(primaryMobileNo.value)) {
            setPrimaryMobileNoError(true);
            setPrimaryMobileNoErrorMessage('Mobile number must be at least 10 digits long.');
            isValid = false;
        } else {
            setPrimaryMobileNoError(false);
            setPrimaryMobileNoErrorMessage('');
        }
        if (secondryMobileNo.value && !/^[0-9]{10}$/.test(secondryMobileNo.value)) {
            setSecondryMobileNoError(true);
            setSecondryMobileNoErrorMessage('Mobile number must be at least 10 digits long.');
            isValid = false;
        } else {
            setSecondryMobileNoError(false);
            setSecondryMobileNoErrorMessage('');
        }
        if (!address.value || address.value.length < 1) {
            setAddressError(true);
            setAddressErrorMessage('Address is required.');
            isValid = false;
        } else {
            setAddressError(false);
            setAddressErrorMessage('');
        }
        if (!gender) {
            setGenderError(true);
            setGenderErrorMessage('Please select a gender.');
            isValid = false;
        } else {
            setGenderError(false);
            setGenderErrorMessage('');
        }

        return isValid;
    };

// In SignUp.jsx, replace your existing handleSubmit with this:
    const handleSubmit = async (event) => {
        event.preventDefault();
        if (!validateInputs()) return;

        setLoading(true);
        const API_URL = import.meta.env.VITE_API_URL;
        console.log('🚀 VITE_API_URL =', API_URL);

        const formData = new FormData(event.target);
        const email = formData.get('email');
        const payload = {
            name: formData.get('name'),
            email,
            password: formData.get('password'),
            primary_mobile_no: formData.get('primaryMobileNo'),
            secondary_mobile_no: formData.get('secondaryMobileNo'),
            address: formData.get('address'),
            gender: formData.get('gender'),
        };

        try {
            // Determine endpoint based on button clicked
            const buttonClicked = event.nativeEvent.submitter.value;
            const endpoint =
                buttonClicked === 'doctor'
                    ? `${API_URL}/api/doctors/`
                    : `${API_URL}/api/patients/`;

            // Submit new account
            const response = await fetch(endpoint, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });
            setLoading(false);

            if (response.ok) {
                const result = await response.json();
                if (buttonClicked === 'doctor') {
                    navigate('/doctor-home-page', { state: { doctorUser: result } });
                } else {
                    navigate('/patient-home-page', { state: { patientUser: result } });
                }
            } else {
                const errorData = await response.json();
                console.error('Signup error:', errorData);
                setEmailError(true);
                setEmailErrorMessage(errorData.detail || 'Signup failed');
            }

        } catch (error) {
            console.error('Network error:', error);
            setEmailError(true);
            setEmailErrorMessage('Network error, please try again');
            setLoading(false);
        }
    };



    return (
        <AppTheme {...props}>
            <CssBaseline enableColorScheme />
            <SignUpContainer direction="column" justifyContent="space-between">
                <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
                <Card variant="outlined">
                    {loading && <Preload />}
                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
                    >
                        <LogoIcon style={{ border: '2px solid red' }} />
                        <Typography
                            component="h1"
                            variant="h4"
                            sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                            color={'#3A59D1'}
                        >
                            Sign up
                        </Typography>
                        <FormControl>
                            <FormLabel htmlFor="name">Full name</FormLabel>
                            <TextField
                                autoComplete="name"
                                name="name"
                                required
                                fullWidth
                                id="name"
                                placeholder="Your name"
                                error={nameError}
                                helperText={nameErrorMessage}
                                color={nameError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                placeholder="your@email.com"
                                name="email"
                                autoComplete="email"
                                variant="outlined"
                                error={emailError}
                                helperText={emailErrorMessage}
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="password">Password</FormLabel>
                            <TextField
                                required
                                fullWidth
                                name="password"
                                placeholder="••••••"
                                type={showPassword ? 'text' : 'password'}
                                id="password"
                                autoComplete="new-password"
                                variant="outlined"
                                error={passwordError}
                                helperText={passwordErrorMessage}
                                color={passwordError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    value="showPassword"
                                    color="primary"
                                    onChange={() => setShowPassword(!showPassword)}
                                />
                            }
                            label="Show password"
                        />
                        <FormControl>
                            <FormLabel htmlFor="primaryMobileNo">Primary mobile number</FormLabel>
                            <TextField
                                autoComplete="primaryMobileNo"
                                name="primaryMobileNo"
                                required
                                fullWidth
                                id="primaryMobileNo"
                                placeholder="primary mobile number"
                                error={primaryMobileNoError}
                                helperText={primaryMobileNoErrorMessage}
                                color={primaryMobileNoError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="secondryMobileNo">Secondry mobile number</FormLabel>
                            <TextField
                                autoComplete="secondryMobileNo"
                                name="secondryMobileNo"
                                fullWidth
                                id="secondryMobileNo"
                                placeholder="Secondry mobile number"
                                error={secondryMobileNoError}
                                helperText={secondryMobileNoErrorMessage}
                                color={secondryMobileNoError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl>
                            <FormLabel htmlFor="address">Address</FormLabel>
                            <TextField
                                name="address"
                                required
                                fullWidth
                                id="address"
                                placeholder="Address"
                                error={addressError}
                                helperText={addressErrorMessage}
                                color={addressError ? 'error' : 'primary'}
                            />
                        </FormControl>
                        <FormControl error={genderError}>
                            <FormLabel>Gender</FormLabel>
                            <RadioGroup name="gender" row>
                                <FormControlLabel value="male" control={<Radio />} label="Male" />
                                <FormControlLabel value="female" control={<Radio />} label="Female" />
                            </RadioGroup>
                            {genderError && <FormHelperText>{genderErrorMessage}</FormHelperText>}
                        </FormControl>

                        <Button
                            type="submit"
                            name="submitButton"
                            value="doctor"
                            fullWidth
                            variant="contained"
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#3D90D7',
                                }
                            }}
                        >
                        Sign up as a doctor
                        </Button>
                        <Button
                            type="submit"
                            name="submitButton"
                            value="patient"
                            fullWidth
                            variant="contained"
                            sx={{
                                '&:hover': {
                                    backgroundColor: '#3D90D7',
                                }
                            }}
                        >
                            Sign up as a patient
                        </Button>
                    </Box>
                    <Divider>
                        <Typography sx={{ color: 'text.secondary' }}>or</Typography>
                    </Divider>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                        <Typography sx={{ textAlign: 'center' }}>
                            Already have an account?{' '}
                            <Link
                                onClick={handleClickSignIn}
                                variant="body2"
                                sx={{ alignSelf: 'center' }}
                                color={'#3D90D7'}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Card>
            </SignUpContainer>
        </AppTheme>
    );
}
