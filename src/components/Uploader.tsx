import React, { useState } from 'react';
import { Box, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

interface FileUploaderProps {
    label: string;
    onFileSelect: (file: File) => void;
}

// ایجاد دکمه با استایل مشخص
const StyledButton = styled(Button)(({ theme }) => ({
    maxWidth: '200px', // حداکثر عرض دکمه
    textOverflow: 'ellipsis',
    overflow: 'hidden',
    whiteSpace: 'nowrap',
}));

const FileUploader: React.FC<FileUploaderProps> = ({ label, onFileSelect }) => {
    const [fileName, setFileName] = useState<string>('');

    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            setFileName(file.name);
            onFileSelect(file);
        }
    };

    return (
        <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
        }}>
            <input
                accept="*"
                style={{ display: 'none' }}
                id={`file-upload-${label}`}
                type="file"
                onChange={handleFileChange}
            />
            <label htmlFor={`file-upload-${label}`} >
                <Button
                    variant="contained"
                    color="primary"
                    component="span"
                    startIcon={<CloudUploadIcon />}
                    sx={{
                        // width: '200px',
                        // margin: 'auto'
                    }}
                >
                    <Box
                        sx={{
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            overflow: 'hidden',
                            width: '140px',
                            direction: 'rtl',
                            textAlign: 'center'
                        }}
                    >

                        {fileName || `بارگذاری ${label}`}
                    </Box>
                </Button>
            </label>
        </Box>
    );
};

export default FileUploader;
