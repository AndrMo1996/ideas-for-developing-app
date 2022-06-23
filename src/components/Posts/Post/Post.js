import React from 'react';
import { Card, CardActions, CardContent, CardMedia, Typography, Button } from '@material-ui/core';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import ThumbUpAltOutlined from '@material-ui/icons/ThumbUpAltOutlined';
import moment from 'moment';
import useStyle from './styles';
import { useDispatch } from 'react-redux';
import { deletePost, likePost } from '../../../actions/posts';
import logo from '../../../assets/img/post_logo.png';

const Post = ({ post, setCurrentId }) => {
    const classes = useStyle();
    const dispatch = useDispatch();

    const user = JSON.parse(localStorage.getItem('profile'));
    
    const Likes = () => {
        if (post.likes.length > 0) {
            return post.likes.find((like) => like === (user?.result?.googleId || user?.result?._id))
              ? (
                <><ThumbUpAltIcon fontSize="small" />&nbsp; {post.likes.length}</>
              ) : (
                <><ThumbUpAltOutlined fontSize="small" />&nbsp;{post.likes.length}</>
              );
        }
      
        return <><ThumbUpAltOutlined fontSize="small" /></>;
    };
    
    const handleOnMouseOver = () => {
        console.log('good');
        console.log(classes.card);
    }

    return(
        <Card className={classes.card}
            onMouseOver={handleOnMouseOver}
        >
            <CardMedia className={classes.media} 
                title={post.title} 
                image={logo}
            />
            <div className={classes.overlay}>
                <Typography variant="h6">{post.creatorName}</Typography>
                <Typography variant="body2">{moment(post.createdAt).fromNow()}</Typography>
            </div>
            {(user?.result?.googleId === post?.createdBy || user?.result?._id === post?.createdBy) && (
                <div className={classes.overlay2}>
                    <Button 
                        style={{color: 'white'}}
                        size="small" 
                        component={Link} 
                        to="/edit" 
                        onClick={() => setCurrentId(post._id)}
                    >
                        <EditIcon fontSize='medium' />
                    </Button>
                </div>
            )} 
            <div className={classes.details}>
                <Typography variant="body2">{post.tags.map((tag) => `#${tag}`)}</Typography>
            </div>
            <Typography className={classes.title} variant="h5" gutterBottom>{post.title}</Typography>
            <CardContent>
                <Typography variant='body2' color='textSecondary' component='span' gutterBottom>{post.description}</Typography>
            </CardContent>
            <CardActions className={classes.cardActions}>
                <Button size="small" color="primary" disabled={!user?.result} onClick={() => dispatch(likePost(post._id))}>
                    <Likes />
                </Button>
                {(user?.result?.googleId === post?.createdBy || user?.result?._id === post?.createdBy) && (
                    <Button size="small" color="secondary" onClick={() => dispatch(deletePost(post._id))}>
                        <DeleteIcon fontSize="small" />
                    </Button>
                )}      
            </CardActions>
        </Card>
    )
}

export default Post;