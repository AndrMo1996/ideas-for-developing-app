import React , { useState, useEffect } from 'react';
import { Container, AppBar, Typography, Grow, Grid } from '@material-ui/core';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import Home from './components/Home/Home';
import Navbar from './components/Navbar/Navbar';
import Auth from './components/Auth/Auth';
import Form from './components/Form/Form';

import { getPosts } from './actions/posts';

import useStyles from './styles';

const App = () => {
  const [currentId, setCurrentId] = useState(0);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
      dispatch(getPosts());
  }, [currentId, dispatch]);

  return (
    <BrowserRouter>
      <Container maxwidth="lg">
        <Navbar />
          <Routes>
            <Route path="/" element={<Home currentId={currentId} setCurrentId={setCurrentId}/>} />
            <Route path="auth" exec element={<Auth />} />
            <Route path="add" exec element={<Form currentId={currentId} setCurrentId={setCurrentId}/>} />
            <Route path="edit" exec element={<Form currentId={currentId} setCurrentId={setCurrentId}/>} />
          </Routes>
      </Container>
    </BrowserRouter>
  );
}

export default App;
