import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';

import { Grid, Link, Paper } from "@mui/material";
import { useNavigate } from "react-router-dom";

function Login() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState<string | null>(null);
    const navigate = useNavigate();
    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        // Dummy credentials for validation
        const validUsername = 'mashadi';
        const validPassword = 'mashadi@123';

        // Clear previous error
        setError(null);

        // Validate credentials
        if (username === validUsername && password === validPassword) {
            localStorage.setItem("isLogin", "true");
            navigate('inputs')
            // Handle successful login (e.g., redirect to another page)
        } else {
            setError('نام کاربری یا رمز عبور اشتباه است.');
        }
    };


    return (

        <Grid container component="main" sx={{ height: '70vh', marginTop: '50px' }}>
            <Grid
                item
                xs={false}
                sm={false}
                md={6}
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    backgroundImage: `url("/background-form.jpg")`,
                    justifyContent: 'center',
                    alignItems: 'center',
                    backgroundSize: '100%',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'left',
                }}
            />
            <Grid
                item
                xs={12}
                md={6}
                component={Paper}
                elevation={6}
                square
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '12px',
                }}
            >
                <Box
                    sx={{
                        my: 4,
                        mx: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        width: '100%',
                        maxWidth: '300px',
                        padding: '16px',
                    }}
                >
                    <Avatar src='/logo.webp' sx={{ m: 1 }} />

                    <Box component="form" noValidate onSubmit={(e) => handleSubmit(e)} sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="نام کاربری"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoFocus
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="رمز عبور"
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            id="password"
                        />
                        {error && (
                            <Box sx={{ mt: 2, color: '#bd3233' }}>
                                {error}
                            </Box>
                        )}

                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 3, mb: 2 }}
                        >
                            ورود
                        </Button>
                        <Grid container>
                            <Grid item xs>
                                <Link href="#" variant="body2">
                                    فراموشی رمز عبور؟
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
            </Grid>
        </Grid>

    );
}

export default Login;
