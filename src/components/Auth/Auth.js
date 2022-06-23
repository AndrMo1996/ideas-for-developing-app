import React, { useState, useEffect } from 'react';
import { Avatar, Button, Container, Grid, Paper, Typography, Zoom } from '@material-ui/core';
import Input from './Input'

import { GoogleLogin } from 'react-google-login'; 
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signin, signup } from '../../actions/auth';

import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import useStyles from './styles';
import { AUTH } from '../../constants/actionTypes';

const Auth = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [checked, setChecked] = useState(false);
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        confirmPassword: ''

    })

    const [isSignUp, setIsSignUp] = useState(false)

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const classes = useStyles();

    useEffect(() => {
        setChecked(true);
    }, [])

    const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword)

    const handleSubmit = (e) => {
        e.preventDefault();
        if(isSignUp){
            dispatch(signup(userData, navigate))
        } else{
            dispatch(signin(userData, navigate))
        }
    }

    const handleChange = (e) => {
        setUserData({ ...userData, [e.target.name]: e.target.value });
    }

    const switchMode = () => {
        setIsSignUp((prevIsSignUp) => !prevIsSignUp);
        setShowPassword(false);
    }

    const googleSuccess = async (res) => {
        const result = res?.profileObj;
        const token = res?.tokenId;

        try {
            dispatch({type: AUTH, data: { result, token }})
            navigate('/');
        } catch (error) {
            console.log(error);
        }
    }

    const googleFailure = (error) => {
        alert('Google Sign In was unsuccessful. Try again later');
        console.log(error);
    }

    return (
        <>
        <Zoom in={checked}>
        <Container component="main" maxWidth="xs">
            <Paper className={classes.paper} elevation={3}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography variant='h5'>{isSignUp ? 'Sing Up' : 'Sign In'}</Typography>
                <form className={classes.form} onSubmit={handleSubmit}>
                    <Grid container spacing={2}>
                        {
                            isSignUp && (
                                <>
                                    <Input name='firstName' label="First Name" autoFocus half handleChange={handleChange}/>
                                    <Input name='lastName' label="Last Name" half handleChange={handleChange}/>
                                </>
                            )
                        }
                        <Input name='email' label="Email Address" type="email" handleChange={handleChange} />
                        <Input name='password' label="Password" type={showPassword ? 'text' : 'password'} handleChange={handleChange} handleShowPassword={handleShowPassword} />
                            {
                                isSignUp && <Input name="confirmPassword" label="Confirm Password" handleChange={handleChange} type="password" />
                            }
                    </Grid>
                
                    <Button className={classes.submit} type="submit" fullWidth varianr="conteined" color="primary">
                        {
                            isSignUp ? 'Sign Up' : 'Sign In'
                        }
                    </Button>
                    <GoogleLogin 
                        clientId="245176660559-lnav3pmfkgk3s862oc5aepfgfvvn70j8.apps.googleusercontent.com"
                        render={(renderProps) => (
                            <Button className={classes.googleButton} color='primary' variant="contained" fullWidth onClick={renderProps.onClick} disabled={renderProps.disabled}>Sign In With Google</Button>
                        )}
                        onSuccess={googleSuccess}
                        onFailure={googleFailure}
                        cookiePolicy="single_host_origin"
                    />
                    <Grid container justify='flex-end'>
                        <Grid item>
                            <Button onClick={switchMode}>
                                {
                                    isSignUp ? 'Already have account? Sign in' : "Don't have account? Sign Up"
                                }
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

        </Container>
        </Zoom>
        </>
    )
}

export default Auth;
