import * as React from 'react';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';
import { useAppDispatch, useAppSelector } from '../../store/store';
import { setAppErrorAC } from '../../store/reducers/appReducer';

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
    props,
    ref,
) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const ErrorSnackbars = React.memo(() => {
    const dispatch = useAppDispatch()
    const errorText = useAppSelector(state => state.app.error)
    const isOpen = !!errorText
    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(setAppErrorAC({ error: '' }))
    };
    return (
        <Stack spacing={2} sx={{ minWidth: '360px' }}>
            <Snackbar open={isOpen} onClose={handleClose} autoHideDuration={6000} style={{ left: '50%', transform: 'translateX(-50%)' }}>
                <Alert onClose={handleClose} severity={"error"} sx={{ width: '100%' }}>
                    {errorText}
                </Alert>
            </Snackbar>
        </Stack>
    );
})