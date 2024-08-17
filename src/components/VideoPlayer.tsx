import { Card, CardMedia } from "@mui/material";
import { useNavigate } from "react-router-dom";

const VideoPlayer = () => {
    const navigate = useNavigate();

    const handleVideoEnd = () => {

        navigate('/result/');
    };
    return (
        <Card sx={{ width: '90%', margin: "auto" }}>
            <CardMedia
                component="video"
                src='/src/assets/CountDown.mp4'
                title="Video"
                autoPlay
                onEnded={handleVideoEnd}
            />
        </Card>
    );
};

export default VideoPlayer;
