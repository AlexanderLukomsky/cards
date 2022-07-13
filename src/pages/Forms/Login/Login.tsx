import { Button, Grid, TextField } from "@mui/material"

export const Login = () => {
    return (
        <div className="form__item login">
            <TextField variant="standard" label="Email" />
            <TextField variant="standard" label="Password" />
            <Button>Forgot Password</Button>
            <Button>Login</Button>
            <Button>Sign Up</Button>
        </div>
    )
}