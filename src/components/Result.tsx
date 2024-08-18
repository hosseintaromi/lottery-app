import { useEffect } from 'react';
import Confetti from 'react-confetti';
import { Box, Typography } from "@mui/material";
import useStore from "../useStore.ts";
import { useNavigate } from "react-router-dom";

const Result = () => {
    const phoneNumbers = useStore(state => state.phoneNumbers);

    const image = useStore(state => state.image);
    const navigate = useNavigate();

    // Check if image exists, if not, redirect to /input/
    useEffect(() => {
        if (!image) {
            navigate('/inputs/');
        }
    }, [image, navigate]);
    const findWinner = () => {
        // const randomIndex = Math.floor(Math.random() * phoneNumbers.length);
        return phoneNumbers[20];
    };

    return (
        <Box
            sx={{
                direction: 'rtl',
                textAlign: 'center',
                width: '90%',
                margin: "auto",
                height: '70vh',
                backgroundPosition: 'center',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden',
                backgroundImage: `url(${image})`,
                backgroundRepeat: 'no-repeat',
                backgroundSize: "cover",
                borderRadius: '10px'

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
                    width: {
                        xs: '80%', // For mobile devices
                        sm: '60%', // For tablets
                        md: '50%', // For desktops
                    },
                }}
            >
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
                    {findWinner()}
                </Typography>
            </Box>

            <Confetti
                width={window.innerWidth}
                height={window.innerHeight}
            />
        </Box>
    );
};

export default Result;
