import MuiAlert, { AlertProps } from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import React from "react";
import { useAppDispatch, useAppSelector } from "../../store/store";
import { setAppMessage } from "../../app/reducers/appReducer";
const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
export const AppSnackBar = React.memo(() => {
  const dispatch = useAppDispatch();
  const { appMessage } = useAppSelector((state) => state.app);
  const { appStatus } = useAppSelector((state) => state.app);
  const isOpen = !!appMessage;
  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(setAppMessage({ appMessage: "" }));
  };
  return (
    <Stack spacing={2} sx={{ minWidth: "360px" }}>
      <Snackbar
        open={isOpen}
        onClose={handleClose}
        autoHideDuration={4000}
        style={{ left: "50%", transform: "translateX(-50%)" }}
      >
        <Alert
          onClose={handleClose}
          severity={appStatus === "failed" ? "error" : "success"}
          sx={{ width: "100%" }}
        >
          {appMessage}
        </Alert>
      </Snackbar>
    </Stack>
  );
});
