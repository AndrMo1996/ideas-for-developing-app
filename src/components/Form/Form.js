import React, { useState, useEffect } from 'react';
import { Container, TextField, Typography, Button, Paper, Zoom, FormControlLabel, Switch } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';


import useStyles from './styles';
import { createPost, updatePost } from '../../actions/posts';

const Form = ({ currentId, setCurrentId }) => {
    const [postData, setPostData] = useState({
        title: '',
        description: '',
        tags: ''
    })
    const [checked, setChecked] = useState(false);

    const post = useSelector((state) => currentId ? state.posts.find((p) => p._id === currentId) : null)
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const classes = useStyles();

    const user = JSON.parse(localStorage.getItem('profile'));

    useEffect(() => {
        setChecked(true);
        if(post) setPostData(post)
    }, [post])

    const clear = () => {
        setCurrentId(0);
        setPostData({
            title: '',
            description: '',
            tags: '',
        });
    }

    const handleSubmit = (e) => {
        e.preventDefault();

        if(currentId === 0){
            dispatch(createPost({ ...postData, creatorName: user?.result?.name }));
            setChecked(true);
        } else{
            dispatch(updatePost(currentId, { ...postData, creatorName: user?.result?.name }));
            navigate('/');
        }
        clear();
    }

    if(!user?.result?.name){
        return (
            <Container component="main" maxWidth="xs">
                <Paper className={classes.paper}>
                    <Typography>
                        Please Sign In
                    </Typography>
                </Paper>
            </Container>
        )
    }

    const handleChange = () => {
        setChecked((prev) => !prev);
      };

    return(
        <>
            <Zoom in={checked}>
                <Container component="main" maxWidth="xs">
                    <Paper className={classes.paper}>
                        <form autoComplete="off" noValidate className={`${classes.root} ${classes.form}`} onSubmit={handleSubmit}>
                            <Typography variant="h6">{currentId ? 'Edit' : 'Add'} Idea</Typography>
                            <TextField name="title" variant="outlined" label="Title" fullWidth value={postData.title} onChange={(e) => setPostData({ ...postData, title: e.target.value })}/>
                            <TextField name="description" variant="outlined" label="Description" fullWidth multiline rows={12} value={postData.description} onChange={(e) => setPostData({ ...postData, description: e.target.value })}/>
                            <TextField name="tags" variant="outlined" label="Tags (coma separated)" fullWidth value={postData.tags} onChange={(e) => setPostData({ ...postData, tags: e.target.value.split(', ') })}/>
                            <Button className={classes.buttonSubmit} variant='contained' color="primary" size='large' type='submit' fullWidth>Submit</Button>
                            <Button variant='contained' color="secondary" size='small' onClick={clear} fullWidth>Clear</Button>
                        </form>
                    </Paper>
                </Container>
            </Zoom>
        </>
    );
}

export default Form;