import { useEffect, useState } from 'react';
import Confetti from 'react-confetti';
import { Box, Typography, IconButton } from "@mui/material";
import { EmojiEvents } from '@mui/icons-material';
import useStore from "../useStore.ts";
import { motion } from "framer-motion";
import { useNavigate } from 'react-router-dom';

const Result = () => {
    const [showWinner, setShowWinner] = useState(false);
    const { image, phoneNumbers, winnerIndex } = useStore();
    const [backgroundImage, setBackgroundImage] = useState<string>('/gaming-case-min.jpg');
    const navigate = useNavigate();

    useEffect(() => {
        if (!phoneNumbers.length) {
            navigate('/inputs');
        }
        const timer = setTimeout(() => setShowWinner(true), 2000);

        return () => {
            clearTimeout(timer);
        };
    }, [phoneNumbers, navigate]);
    useEffect(() => {
        // Update the background image when `image` changes
        if (image) {
            setBackgroundImage(URL.createObjectURL(image));
        }

        return () => {
            if (image) {
                URL.revokeObjectURL(backgroundImage);  // Clean up URL object
            }
        };
    }, [image]);

    const findWinner = () => {
        return winnerIndex
            ? phoneNumbers[winnerIndex - 1]
            : phoneNumbers[Math.floor(Math.random() * phoneNumbers.length)];
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
                backgroundImage: `url(${backgroundImage})`,
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
                        xs: '80%',
                        sm: '60%',
                        md: '50%',
                    },
                }}
            >
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <IconButton
                        sx={{ color: 'gold', fontSize: '2rem' }}
                        aria-label="winner-icon"
                    >
                        <EmojiEvents fontSize="large" />
                    </IconButton>
                </motion.div>
                <Typography
                    variant="h3"
                    sx={{
                        mt: 2,
                        fontSize: {
                            xs: '1.5rem',
                            sm: '2.5rem',
                            md: '3.5rem',
                        },
                    }}
                >
                    برنده قرعه کشی
                </Typography>
                {showWinner && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
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
