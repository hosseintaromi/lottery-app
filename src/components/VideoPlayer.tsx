import { Box, CardMedia } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../useStore.ts";

const VideoPlayer = () => {
    const navigate = useNavigate();
    const { video, phoneNumbers } = useStore();

    useEffect(() => {
        !phoneNumbers.length && navigate('/inputs')
    }, [navigate, phoneNumbers]);

    const handleVideoEnd = () => {
        navigate('/result/');
    };

    return (
        <Box sx={{
            width: '100%',
            height: '99vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            overflow: 'hidden'
        }}>
            <CardMedia
                component="video"
                src={video ? URL.createObjectURL(video) : '/CountDown.mp4'}
                title="Video"
                autoPlay
                onEnded={handleVideoEnd}
                sx={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                }}
            />
        </Box>
    );
};

export default VideoPlayer;
