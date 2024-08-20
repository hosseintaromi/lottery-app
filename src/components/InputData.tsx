import Button from "@mui/material/Button";
import { Box, FormControl, FormGroup, Grid, Paper, TextField, Typography } from "@mui/material";
import React, { useState, ChangeEvent, KeyboardEvent, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from '../useStore.ts';

const InputData = () => {
    const setContestNameStore = useStore(state => state.setContestNameStore);
    const contestNameStore = useStore(state => state.contestNameStore);
    const [contestName, setContestName] = useState(contestNameStore);
    const [phoneNumbersRaw, setPhoneNumberRaw] = useState<string[]>([]);
    const [phoneNumbersMask, setPhoneNumberMask] = useState<string[]>([]);
    const [error, setError] = useState<string | null>(null); // State for error messages
    const setPhoneNumbers = useStore(state => state.setPhoneNumbers);

    const navigate = useNavigate();

    useEffect(() => {
        const isLogin = localStorage.getItem("isLogin");
        !isLogin && navigate('/')

    }, [])

    const maskPhoneNumber = (phone: string) => {
        if (phone.length >= 6) {
            return phone.slice(0, 4) + '***' + phone.slice(7);
        }
        return phone;
    };

    const handleChangePhone = (event: ChangeEvent<HTMLInputElement>) => {
        const numbers = event.target.value.split("\n");
        // console.log(phoneNumbersRaw);
        setPhoneNumberRaw([]);
        setPhoneNumberMask([]);
        for (let i = 0; i < numbers.length; i++) {
            // console.log(numbers[i]);
            setPhoneNumberRaw((pre) => [
                ...pre, numbers[i]
            ]);

            const validInput = maskPhoneNumber(numbers[i]);
            setPhoneNumberMask((pre) => [
                ...pre, validInput
            ]);
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

    const handleChangeContestName = (event: ChangeEvent<HTMLInputElement>) => {
        let newValue = event.target.value;

        const persianToEnglishMap: { [key: string]: string } = {
            "۰": "0", "۱": "1", "۲": "2", "۳": "3", "۴": "4", "۵": "5", "۶": "6", "۷": "7", "۸": "8", "۹": "9"
        };
        newValue = newValue.replace(/[۰-۹]/g, (match) => persianToEnglishMap[match]);

        setContestName(newValue);
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();

        if (!contestName || phoneNumbersRaw.length === 0) {
            setError("لطفاً نام مسابقه و شماره‌های قرعه‌کشی را وارد کنید."); // Set error message
            return; // Prevent form submission
        }

        setError(null); // Clear any previous errors
        setPhoneNumbers(phoneNumbersMask);
        setContestNameStore(contestName);
        navigate('/medias/');
    };


    return (
        <Grid container component="main" sx={{
            padding: "100px",
            backgroundImage: `url("/gaming-case-lottery.jpg")`,
            backgroundSize: "100%",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left',
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
                md={6}
                component={Paper}
                elevation={6}
                square
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: '12px',
                    height: '80vh',
                    width: '100%',

                    '@media (max-width:667px)': {
                        height: '95vh',
                    }


                }}>
                <Box component="form" onSubmit={handleSubmit} sx={{ width: '50%' }}>
                    <FormGroup

                    >
                        <FormControl margin="normal" >
                            <TextField
                                name="contestName"
                                value={contestName}
                                onChange={handleChangeContestName}
                                placeholder="نام مسابقه"
                                variant="outlined"
                                fullWidth
                                error={!!error && !contestName} // Show error if contestName is empty
                            />
                        </FormControl>

                        {/* <Uploader /> */}

                        <FormControl margin="normal" >
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
