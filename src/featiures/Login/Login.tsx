import React from 'react'
import {Checkbox, FormControl, FormControlLabel, FormGroup, FormLabel, TextField, Button, Grid} from '@material-ui/core'
import {useFormik} from "formik";
import {useDispatch, useSelector} from "react-redux";
import {loginTC} from "../../state/auth-reducer";
import {AppRootStateType} from "../../state/store";
import {Redirect} from 'react-router-dom';

type FormikErrorType = {
    email?: string
    password?: string
    rememberMe?: boolean
}


export const Login = () => {
    const dispatch = useDispatch();
    const isLogin = useSelector<AppRootStateType, boolean>(state => state.authReducer.isLoggedIn)

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            rememberMe: false
        },
        validate: (values) => {
            const errors: FormikErrorType = {};
            if (!values.email) {
                errors.email = 'Required';
            } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
                errors.email = 'Invalid email address';
            }
            if (values.password.length === 0) {
                errors.password = 'enter the password'
            } else if (values.password.length < 3) {
                errors.password = 'password is to small';
            }
            return errors;
        },
        onSubmit: values => {
            dispatch(loginTC(values.email, values.password))
            formik.resetForm()
        },
    })
    if (isLogin) {
        return <Redirect to='/'/>
    }

    return <Grid container justify="center">
        <Grid item xs={4}>
            <form onSubmit={formik.handleSubmit}>
                <FormControl>
                    <FormLabel>
                        <p>To log in get registered
                            <a href={'https://social-network.samuraijs.com/'}
                               target={'_blank'}>here
                            </a>
                        </p>
                        <p>or use common test account credentials:</p>
                        <p>Email: free@samuraijs.com</p>
                        <p>Password: free</p>
                    </FormLabel>

                    <FormGroup>
                        <TextField
                            label="Email"
                            margin="normal"
                            type='email'
                            onBlur={formik.handleBlur}
                            {...formik.getFieldProps('email')}
                        />
                        {formik.touched.email && formik.errors.email &&
                        <div style={{color: 'red'}}>{formik.errors.email}</div>}
                        <TextField
                            type="password"
                            label="Password"
                            margin='normal'
                            onBlur={formik.handleBlur}
                            {...formik.getFieldProps('password')}
                        />
                        {formik.touched.password && formik.errors.password &&
                        <div style={{color: 'red'}}>{formik.errors.password}</div>}
                        <FormControlLabel
                            label={'Remember me'}
                            control={<Checkbox
                                name='password'
                                onChange={formik.handleChange}
                                value={formik.values.password}/>}
                        />
                        <Button type={'submit'} variant={'contained'} color={'primary'}>Login</Button>
                    </FormGroup>

                </FormControl>
            </form>
        </Grid>
    </Grid>
}

