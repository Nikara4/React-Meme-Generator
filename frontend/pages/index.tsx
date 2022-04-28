import type { NextPage } from 'next';
import Head from 'next/head';
import { Container, Grow, Grid, CircularProgress } from '@mui/material';
import { Post } from '../components';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getPosts } from '../state/actions/posts';
import useStyles from '../styles/indexStyles';
import { EditForm } from '../containers';
import { PostTypeState } from '../state/types';

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const [currentId, setCurrentId] = useState(null);
  const classes = useStyles();
  const posts = useSelector(
    (state: PostTypeState) => state
  );
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPosts());
  }, [currentId, dispatch]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setCurrentId(null);
    setOpen(false);
  };

  return (
    <>
      <Head>
        <title>IT Memes World</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Container>
        <Grow in>
          <Grid
            container={true}
            direction='column'
            justifyContent='space-between'
            alignItems='stretch'
            spacing={3}
            xs={12} 
            sm={12}
          >
            <Grid item xs={12} sm={12} className={classes.mainGridItem}>
              {!posts?.posts.length ? (
                <CircularProgress />
              ) : (
                <Grid
                  className={classes.mainGridContainer}
                  container
                  alignItems='stretch'
                  spacing={3}
                >
                  {posts.posts.map((post: any) => (
                    <Grid item key={post.id} xs={12} sm={12} className={classes.gridItem}>
                      <Post
                        post={post}
                        currentId={currentId}
                        setCurrentId={setCurrentId}
                        handleClickOpen={handleClickOpen}
                      />
                    </Grid>
                  ))}
                </Grid>
              )}
              {open && (
                <EditForm
                  currentId={currentId}
                  handleClose={handleClose}
                  open={open}
                />
              )}
            </Grid>
          </Grid>
        </Grow>
      </Container>
    </>
  );
};

export default Home;
