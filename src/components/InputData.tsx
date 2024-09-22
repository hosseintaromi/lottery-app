import Button from "@mui/material/Button";
import { Box, FormControl, FormGroup, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../useStore";

const InputData = () => {
    const [phoneNumbersRaw, setPhoneNumberRaw] = useState<string[]>([]);
    const [phoneNumbersMask, setPhoneNumberMask] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null); // State for error messages
    const { cover, setPhoneNumbers, isHide } = useStore();
    const navigate = useNavigate();

    // State for managing background image URL
    const [backgroundImage, setBackgroundImage] = useState<string>("/gaming-case-lottery.jpg");

    useEffect(() => {
        const isLogin = localStorage.getItem("isLogin");
        !isLogin && navigate('/');

        // Update background image when cover changes
        if (cover) {
            setBackgroundImage(URL.createObjectURL(cover));
        } else {
            setBackgroundImage("/gaming-case-lottery.jpg"); // Default background
        }
    }, [cover, navigate]);

    const maskPhoneNumber = (phone: string) => {
        if (phone.length >= 6) {
            return phone.slice(0, 4) + '***' + phone.slice(7);
        }
        return phone;
    };

    const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
        const numbers = event.target.value.split("\n");
        setPhoneNumberRaw([]);
        setPhoneNumberMask([]);
        for (let i = 0; i < numbers.length; i++) {
            setPhoneNumberRaw((pre) => [...pre, numbers[i]]);
            const validInput = isHide ? maskPhoneNumber(numbers[i]) : numbers[i]; // Conditionally mask phone number
            setPhoneNumberMask((pre) => [...pre, validInput]);
        }
    };

    const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
        const key = event.key;
        const isCtrlCmd = event.ctrlKey || event.metaKey;

        if (["ArrowLeft", "ArrowRight", "Tab", "Backspace"].includes(key) || isCtrlCmd) {
            return;
        }

        if (key === " ") {
            event.preventDefault();
            return;
        }

        if (isCtrlCmd && ["c", "v", "x"].includes(key.toLowerCase())) {
            return;
        }

        if (!/[0-9۰-۹]/.test(key)) {
            event.preventDefault();
        }
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setPhoneNumbers(phoneNumbersMask);
        navigate('/medias/');
    };

    return (
        <Grid container component="main" sx={{
            backgroundImage: `url(${backgroundImage})`,
            height: '100dvh',
            backgroundSize: "cover", // این باعث می‌شود که بک‌گراند تمام صفحه را بپوشاند
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'center', // مرکز کردن تصویر بک‌گراند
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            '@media (max-width:667px)': {
                padding: "40px",
            }
        }}>
            <Grid
                item
                xs={false}
                sm={false}
                md={6}
                sx={{
                    display: { xs: 'none', md: 'flex' },
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            />
            <Grid item
                xs={12}
                md={4}
                component={Paper}
                elevation={6}
                square
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '12px',
                    height: '60vh',
                    width: '100%',
                    '@media (max-width:667px)': {
                        height: '95vh',
                    }
                }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '60%' }}>
                    <FormGroup>
                        <FormControl margin="normal">
                            <TextField
                                name="phoneNumberInput"
                                value={phoneNumbersMask.join('\n')}
                                onChange={handleChangePhone}
                                onKeyDown={handleKeyDown}
                                placeholder="شماره های قرعه کشی"
                                variant="outlined"
                                fullWidth
                                multiline
                                rows={8}
                                maxRows={10}
                                error={!!error && phoneNumbersRaw.length === 0}
                                inputProps={{
                                    sx: { direction: 'rtl', textAlign: 'left' }, // Align placeholder to the right, but keep the text left-aligned
                                }}
                                InputLabelProps={{
                                    sx: { direction: 'rtl', textAlign: 'right' }, // Ensure the placeholder is right-aligned
                                }}
                            />
                        </FormControl>

                        {error && (
                            <Typography color="#bd3233" variant="body2">
                                {error}
                            </Typography>
                        )}

                        <Button variant="contained" color="primary" type="submit" sx={{ marginTop: '20px' }}>
                            شروع قرعه کشی
                        </Button>
                    </FormGroup>
                </Box>
            </Grid>
        </Grid>
    );
};

export default InputData;
