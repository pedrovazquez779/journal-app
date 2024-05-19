import {Alert, Button, Grid, Link, TextField, Typography} from '@mui/material';
import {Link as RouterLink} from 'react-router-dom';
import {AuthLayout} from '../layout/AuthLayout';
import {useForm} from '../../hooks';
import {useMemo, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {startCreatingUserWithEmailPassword} from '../../store/auth';

const formData = {
    email: '',
    password: '',
    displayName: '',
};

const formValidations = {
    email: [(value) => value.includes('@'), 'email should contain @'],
    password: [(value) => value.length >= 6, 'password should have more than 5 characters'],
    displayName: [(value) => value.length >= 1, 'name is required'],
};

export const RegisterPage = () => {
    const dispatch = useDispatch();
    const {status, errorMessage} = useSelector(state => state.auth);

    const isCheckingAuthentication = useMemo(() => status === 'checking', [status]);

    const [isFormSubmitted, setIsFormSubmitted] = useState(false);

    const {
        displayName, email, password, formState, onInputChange,
        isFormValid, displayNameValid, emailValid, passwordValid,
    } = useForm(formData, formValidations);

    const onSubmit = (e) => {
        e.preventDefault();
        setIsFormSubmitted(true);

        if (!isFormValid) return;

        dispatch(startCreatingUserWithEmailPassword(formState));
    };

    return (
        <AuthLayout title="Register">
            <form onSubmit={onSubmit} className="animate__animated animate__fadeIn animate__faster">
                <Grid container>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="name"
                            type="text"
                            placeholder="John Doe"
                            fullWidth
                            name="displayName"
                            value={displayName}
                            onChange={onInputChange}
                            error={!!displayNameValid && isFormSubmitted}
                            helperText={displayNameValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="email"
                            type="email"
                            placeholder="email@gmail.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                            error={!!emailValid && isFormSubmitted}
                            helperText={emailValid}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="password"
                            type="password"
                            placeholder="password"
                            name="password"
                            fullWidth
                            value={password}
                            onChange={onInputChange}
                            error={!!passwordValid && isFormSubmitted}
                            helperText={passwordValid}
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{mb: 2, mt: 1}}>

                        <Grid
                            item
                            xs={12}
                            display={!!errorMessage ? '' : 'none'}
                        >
                            <Alert severity="error">
                                {errorMessage}
                            </Alert>
                        </Grid>

                        <Grid item xs={12}>
                            <Button
                                disabled={isCheckingAuthentication}
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Create account
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{mr: 1}}>I have an account</Typography>
                        <Link component={RouterLink} color="inherit" to="/auth/login">
                            Log in
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    );
};
