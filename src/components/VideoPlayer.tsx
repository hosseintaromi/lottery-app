import { Card, CardMedia } from "@mui/material";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useStore from "../useStore.ts";

const VideoPlayer = () => {
    const navigate = useNavigate();
    const phoneNumbers = useStore(state => state.phoneNumbers);


    useEffect(() => {
        const isLogin = localStorage.getItem("isLogin");
        !isLogin && navigate('/')
        !phoneNumbers.length && navigate('/inputs')

    }, [])

    const handleVideoEnd = () => {
        navigate('/result/');
    };
    return (
        <Card sx={{
            width: '100%', margin: " auto",
        }}>
            <CardMedia
                component="video"
                src='/CountDown.mp4'
                title="Video"
                autoPlay

                onEnded={handleVideoEnd}
            />
        </Card>
    );
};

export default VideoPlayer;
