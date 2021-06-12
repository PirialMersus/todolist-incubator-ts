import React from 'react'
import Snackbar from '@material-ui/core/Snackbar'
import MuiAlert, {AlertProps} from '@material-ui/lab/Alert'
import {useSelector} from "react-redux";
import {AppRootStateType} from "../../state/store";

function Alert(props: AlertProps) {
    return <MuiAlert elevation={6} variant="filled" {...props} />
}

export function ErrorSnackbar() {
    const [open, setOpen] = React.useState(true)
    const error = useSelector<AppRootStateType, null | string>(state => state.app.error)

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        return;
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    return (
        <Snackbar open={ error !== null } autoHideDuration={3000} onClose={handleClose}>
            <Alert onClose={handleClose} severity="error" >
                {error}
            </Alert>
        </Snackbar>
    )
}
