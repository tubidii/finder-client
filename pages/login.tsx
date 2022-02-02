import * as React from 'react';
import Box from '@mui/material/Box';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import TextField from '@mui/material/TextField';
import AccountCircle from '@mui/icons-material/AccountCircle';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import PasswordIcon from '@mui/icons-material/Password';

export default function Login() {
    return (
        <Grid container justifyContent={'center'}>
            <Grid item xs={6} md={4}>
                <Card variant="outlined" sx={{ marginTop: '10rem', padding: '2rem', paddingBottom: '1rem',  borderRadius: '1rem' }}>
                    <Box sx={{ '& > :not(style)': { m: 1 } }}>
                        <Grid container justifyContent={'center'}>
                        <Grid item xs={12}>
                            <TextField fullWidth
                                id="input-with-icon-textfield"
                                label="Username"
                                type="text"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <AccountCircle />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </Grid>

                        <div />
                        <Grid item xs={12} sx={{ marginTop: '2rem'}}>
                            <TextField fullWidth
                                id="input-with-icon-textfield"
                                label="Password"
                                type="password"
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start">
                                            <PasswordIcon />
                                        </InputAdornment>
                                    ),
                                }}
                                variant="standard"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <Button sx={{ marginTop: '2rem', width: '100%' }}variant="contained">Log In</Button>
                        </Grid>
                        </Grid>
                    </Box>
                </Card>
            </Grid>
        </Grid>
    );
}
