import {Link as RouterLink} from 'react-router-dom';
import {Alert, Button, Grid, Link, TextField, Typography} from '@mui/material';
import {Google} from '@mui/icons-material';
import {AuthLayout} from '../layout/AuthLayout';
import {useForm} from '../../hooks';
import {useDispatch, useSelector} from 'react-redux';
import {startGoogleSignIn, startLoginWithEmailPassword} from '../../store/auth';
import {useMemo} from 'react';

// This needs to be a constant, otherwise the useEffect inside the useForm generates an infinite loop because it thinks
// we are creating a new form all the time
const formData = {
    email: '',
    password: '',
};

export const LoginPage = () => {

    const dispatch = useDispatch();
    const {status, errorMessage} = useSelector(state => state.auth);

    const {email, password, onInputChange} = useForm(formData);

    const isAuthenticating = useMemo(() => status === 'checking', [status]);

    const onSubmit = (e) => {
        e.preventDefault();

        // dispatch(checkingAuthentication());
        dispatch(startLoginWithEmailPassword({email, password}));
    };

    const onGoogleSignIn = (e) => {
        e.preventDefault();

        dispatch(startGoogleSignIn());
    };

    return (
        <AuthLayout title="Login">
            <form
                onSubmit={onSubmit}
                className="animate__animated animate__fadeIn animate__faster"
                aria-label="submit-form"
            >
                <Grid container>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="email"
                            type="email"
                            placeholder="email@gmail.com"
                            fullWidth
                            name="email"
                            value={email}
                            onChange={onInputChange}
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="password"
                            type="password"
                            placeholder="password"
                            fullWidth
                            name="password"
                            inputProps={{ // This is required for tests, label can also be sent
                                'data-testid': 'password',
                            }}
                            value={password}
                            onChange={onInputChange}
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

                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                type="submit"
                                variant="contained"
                                fullWidth
                            >
                                Login
                            </Button>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <Button
                                disabled={isAuthenticating}
                                onClick={onGoogleSignIn}
                                variant="contained"
                                fullWidth
                                aria-label="google-btn"
                            >
                                <Google/>
                                <Typography sx={{ml: 1}}>Google</Typography>
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Link component={RouterLink} color="inherit" to="/auth/register">
                            Create account
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    );
};
