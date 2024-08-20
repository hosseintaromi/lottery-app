import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { Box, Typography, IconButton } from "@mui/material";
import { EmojiEvents } from '@mui/icons-material';  // اضافه کردن ایکون
import useStore from "../useStore.ts";
import { motion } from "framer-motion"  // اضافه کردن برای انیمیشن

const Result = () => {
    const [showWinner, setShowWinner] = useState(false);
    const phoneNumbers = useStore(state => state.phoneNumbers);
    const image = useStore(state => state.image) || '/gaming-case-min.jpg';


    useEffect(() => {
        const timer = setTimeout(() => setShowWinner(true), 2000);  // بعد از دو ثانیه شماره برنده نمایش داده می‌شود
        return () => clearTimeout(timer);
    }, []);

    const findWinner = () => {
        // const randomIndex = Math.floor(Math.random() * phoneNumbers.length);
        return phoneNumbers[20];
    };

    return (
        <Box
            sx={{
                direction: 'rtl',
                textAlign: 'center',
                width: '100%',
                margin: "auto",
                height: '100vh',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: `url(${image})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: "cover",
            }}
        >
            <Box
                sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    textAlign: 'center',
                    color: 'white',
                    fontWeight: 'bold',
                    textShadow: '2px 2px 4px rgba(0, 0, 0, 0.7)',
                    padding: '20px',
                    backgroundColor: 'rgba(0, 0, 0, 0.5)',
                    borderRadius: '8px',
                    height: '300px',
                    width: {
                        xs: '80%', // For mobile devices
                        sm: '60%', // For tablets
                        md: '50%', // For desktops
                    },
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}  // انیمیشن شروع از سایز صفر
                    animate={{ scale: 1 }}   // انیمیشن به سایز طبیعی
                    transition={{ duration: 0.5 }}  // مدت زمان انیمیشن
                >
                    <IconButton
                        sx={{ color: 'gold', fontSize: '2rem' }}
                        aria-label="winner-icon"
                    >
                        <EmojiEvents fontSize="large" />
                    </IconButton>
                </motion.div>
                <Typography
                    variant="h3" // Smaller variant for mobile
                    sx={{
                        mt: 2,
                        fontSize: {
                            xs: '1.5rem', // Smaller font size for mobile
                            sm: '2.5rem', // Medium font size for tablets
                            md: '3.5rem', // Larger font size for desktops
                        },
                    }}
                >
                    برنده کیس گیمینگ تدوینگرشو                </Typography>
                {showWinner && (
                    <motion.div
                        initial={{ opacity: 0 }}  // شروع از حالت شفافیت صفر
                        animate={{ opacity: 1 }}   // افزایش شفافیت تا ۱
                        transition={{ duration: 1 }}  // مدت زمان انیمیشن
                    >
                        <Typography
                            variant="h4"
                            sx={{
                                mt: 2,
                                fontSize: {
                                    xs: '1.2rem',
                                    sm: '2rem',
                                    md: '3rem',
                                },
                            }}
                        >
                            {findWinner()}
                        </Typography>
                    </motion.div>
                )}
            </Box>

            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
            />
        </Box>
    );
};

export default Result;
