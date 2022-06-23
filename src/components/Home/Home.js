import React , { useState, useEffect } from 'react';
import { Container, Grow, Grid } from '@material-ui/core';
import { useDispatch } from 'react-redux';

import Form from '../../components/Form/Form';
import Posts from '../../components/Posts/Posts';

import { getPosts } from '../../actions/posts';
import useStyles from './styles';

function Home({ currentId, setCurrentId }) {
    const classes = useStyles();

    return (
        <Grow in>
            <Container>
                <Grid container justify="space-between" alignItems='stretch' spacing={3}>
                    <Grid item xs={12} sm={12}>
                        <Posts setCurrentId={setCurrentId}/>
                    </Grid>
                    {/* <Grid item xs={12} sm={4}>
                        <Form currentId={currentId} setCurrentId={setCurrentId}/>
                    </Grid> */}
                </Grid>
            </Container>
        </Grow>
    );
}

export default Home;
