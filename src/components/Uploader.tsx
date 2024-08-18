import React, { useState, ChangeEvent } from 'react';
import { Box, Button } from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import useStore from "../useStore.ts";

const Uploader: React.FC = () => {
    const [selectedFile, setSelectedFile] = useState<File | null>(null);
    const [previewUrl, setPreviewUrl] = useState<string | null>(null);
    const setImage = useStore(state => state.setImage)

    const defaultImageUrl = '/default-image.jpeg'; // Replace with your default image path

    // Set default preview URL if no file is selected
    React.useEffect(() => {
        setImage(defaultImageUrl);
    }, [setImage]);
    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0] || null;
        console.log(selectedFile)
        setSelectedFile(file);

        if (file) {
            const objectUrl = URL.createObjectURL(file);
            setPreviewUrl(objectUrl);
            setImage(objectUrl);

        }
    };


    return (
        <Box sx={{ width: '300px', margin: 'auto', textAlign: 'center', padding: 2 }}>

            <input
                accept="image/*"
                style={{ display: 'none' }}
                id="upload-file"
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor="upload-file">
                <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    sx={{ margin: 2 }}
                >
                    انتخاب عکس                </Button>
            </label>

            {previewUrl && (
                <Box sx={{ marginTop: 2 }}>
                    <img src={previewUrl} alt="Preview" style={{ width: '100%', maxHeight: '60px', objectFit: 'contain' }} />
                </Box>
            )}

        </Box>
    );
};

export default Uploader;
