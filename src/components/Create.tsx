import Button from "@mui/material/Button";
import { Box, FormControlLabel, FormGroup, Grid, Paper, Switch, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from '../useStore.ts';
import FileUploader from "./Uploader.tsx";

const Create = () => {
    const [error, setError] = useState<string | null>(null);
    const [isRandom, setIsRandom] = useState<boolean>(true);
    const { setCover, setImage, setVideo, cover, image, video, setWinnerIndex, winnerIndex, isHide, setIsHide } = useStore();
    const navigate = useNavigate();

    // State for managing background image URL
    const [backgroundImage, setBackgroundImage] = useState<string>("/gaming-case-lottery.jpg");

    // useEffect to update backgroundImage when cover changes
    useEffect(() => {
        if (cover) {
            setBackgroundImage(URL.createObjectURL(cover));
        } else {
            setBackgroundImage("/gaming-case-lottery.jpg"); // Default background
        }
        return () => {
            if (cover) {
                URL.revokeObjectURL(backgroundImage); // Clean up URL object
            }
        };
    }, [cover]);

    const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsRandom(event.target.checked);
        if (!event.target.checked) {
            setWinnerIndex(null); // Reset winnerIndex if switch is turned off
        }
    };

    const handleHideSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsHide(event.target.checked); // Handle change for isHide
    };

    const handleWinnerIndexChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setWinnerIndex(Number(event.target.value));
    };

    const handleSubmit = (event: React.FormEvent) => {
        event.preventDefault();
        setError(null);

        // // Validation logic
        // if (!video) {
        //     setError("آپلود ویدئو الزامی است.");
        //     return;
        // }
        // if (!cover) {
        //     setError("آپلود عکس نتایج الزامی است.");
        //     return;
        // }
        // if (!image) {
        //     setError("آپلود عکس اصلی الزامی است.");
        //     return;
        // }
        // if (!isRandom && (winnerIndex === null || winnerIndex < 0)) {
        //     setError("لطفا شماره برنده معتبر وارد کنید.");
        //     return;
        // }

        // Proceed with the logic if validations pass
        navigate('/medias/');
    };
    return (
        <Grid container component="main" sx={{
            backgroundImage: `url(${backgroundImage})`,
            height: '100dvh',
            backgroundSize: "100%",
            backgroundRepeat: 'no-repeat',
            backgroundPosition: 'left',
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
                <Box sx={{ width: '50%' }}>
                    <FormGroup sx={{ display: 'flex', gap: '30px' }} onSubmit={handleSubmit}>
                        <FileUploader label="فیلم" onFileSelect={setVideo} />
                        <FileUploader label="عکس نتایج" onFileSelect={setCover} />
                        <FileUploader label="عکس اصلی" onFileSelect={setImage} />
                        <FormControlLabel
                            control={<Switch checked={isRandom} onChange={handleSwitchChange} />}
                            label="انتخاب برنده به صورت تصادفی"
                        />
                        {!isRandom && (
                            <TextField
                                label="شماره برنده"
                                type="number"
                                variant="outlined"
                                onChange={handleWinnerIndexChange}
                            />
                        )}
                        <FormControlLabel
                            control={<Switch checked={isHide} onChange={handleHideSwitchChange} />}
                            label="پنهان کردن اطلاعات"
                        />
                        {error && (
                            <Typography color="#bd3233" variant="body2">
                                {error}
                            </Typography>
                        )}
                        <Button variant="contained" color="primary" type="submit" onClick={handleSubmit}>
                            شروع قرعه کشی
                        </Button>
                    </FormGroup>
                </Box>
            </Grid>
        </Grid>
    );
};

export default Create;
