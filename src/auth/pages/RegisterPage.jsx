import {Button, Grid, Link, TextField, Typography} from '@mui/material';
import {Google} from '@mui/icons-material';
import {Link as RouterLink} from 'react-router-dom';
import {AuthLayout} from '../layout/AuthLayout';

export const RegisterPage = () => {
    return (
        <AuthLayout title="Register">
            <form>
                <Grid container>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="name"
                            type="text"
                            placeholder="John Doe"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="email"
                            type="email"
                            placeholder="email@gmail.com"
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sx={{mt: 2}}>
                        <TextField
                            label="password"
                            type="password"
                            placeholder="password"
                            fullWidth
                        />
                    </Grid>

                    <Grid container spacing={2} sx={{mb: 2, mt: 1}}>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth>
                                Create account
                            </Button>
                        </Grid>
                    </Grid>

                    <Grid container direction="row" justifyContent="end">
                        <Typography sx={{mr:1}}>I have an account</Typography>
                        <Link component={RouterLink} color="inherit" to="/auth/login">
                            Log in
                        </Link>
                    </Grid>

                </Grid>
            </form>
        </AuthLayout>
    );
};
