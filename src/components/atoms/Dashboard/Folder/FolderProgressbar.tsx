import React, { Fragment } from 'react';
import { useSelector } from 'react-redux';
import { Box, LinearProgress, Typography, Snackbar } from '@mui/material';
import { useAppSelector } from '../../../../Redux/Hooks';

const ProgressSnackbar: React.FC = () => {
    const { uploadFolderProgress, currentCompressingFolder } = useAppSelector((state) => state.album);


    return (
        <Fragment>
            {
                uploadFolderProgress
                && uploadFolderProgress.length > 0
                && uploadFolderProgress.map((data, index) =>
                    <Snackbar
                        key={index}
                        open={data.totalProgress > 0 && data.totalProgress < 100}
                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                        style={{ bottom: 100 * index + 20 }}
                    >
                        <Box
                            sx={{
                                minWidth: '250px',
                                p: 2,
                                backgroundColor: '#fff',
                                boxShadow: 1,
                                borderRadius: 1,
                            }}
                        >
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                {data.folderName}
                            </Typography>
                            <Typography variant="body2" sx={{ mb: 1 }}>
                                {data.totalProgress.toFixed(2)}% Images Uploaded
                            </Typography>
                            <LinearProgress variant="determinate" value={data.totalProgress} sx={{
                                '& .MuiLinearProgress-bar': {
                                    backgroundColor: '#AE2AB1',
                                }
                            }} />
                        </Box>
                    </Snackbar>
                )


            }

            {
                currentCompressingFolder
                && currentCompressingFolder.length > 0
                && currentCompressingFolder.map((data, index) => {
                    // console.log(uploadFolderProgress.length + index)
                    return (

                        <Snackbar
                            key={index}
                            open={data.totalProgress > 0 && data.totalProgress < 100}
                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                            style={{ bottom: (100 * (uploadFolderProgress.length + index)) + 20 }}
                        >
                            <Box
                                sx={{
                                    minWidth: '250px',
                                    p: 2,
                                    backgroundColor: '#fff',
                                    boxShadow: 1,
                                    borderRadius: 1,
                                }}
                            >
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    {data.folderName}
                                </Typography>
                                <Typography variant="body2" sx={{ mb: 1 }}>
                                    {data.totalProgress.toFixed(2)}% Images Compressed
                                </Typography>
                                <LinearProgress variant="determinate" value={data.totalProgress} sx={{
                                    '& .MuiLinearProgress-bar': {
                                        backgroundColor: '#AE2AB1',
                                    }
                                }} />
                            </Box>
                        </Snackbar>
                    )
                }
                )


            }

        </Fragment>
    );
};

export default ProgressSnackbar;
