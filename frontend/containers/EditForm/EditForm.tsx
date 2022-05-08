import { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from '@mui/material';
import FileBase64 from 'react-file-base64';
import { useDispatch, useSelector } from 'react-redux';
import { PostInterface, PostTypeState } from '../../state/types';
import { updatePost } from '../../state/actions/posts';
import useStyles from './styles';

const EditForm = ({ post, currentId, handleClose, open }: any) => {
  const [postData, setPostData] = useState<PostInterface>({
    ...post,
    title: '',
    tags: [],
    selectedFile: '',
  });

  const classes = useStyles();
  const dispatch = useDispatch();
  const updatedPost = useSelector((state: PostTypeState) =>
    currentId ? state?.posts?.find((post) => post._id === currentId) : null
  );

  useEffect(() => {
    setPostData(updatedPost);
  }, [updatedPost]);

  // const user = JSON.parse(localStorage.getItem('profile'));

  const handleSubmit = (e: any) => {
    e.preventDefault();
    dispatch(updatePost(currentId, postData));
    console.log('Post has been updated.');
    handleClose();

    //name: user?.result?.name
  };

  // useEffect(() => {
  //     if (post) setPostData(post);
  // }, [post]);
  // if (!user?.result?.name) {
  //     return (
  //         <Paper className={classes.paper}>
  //             <Typography variant="h5" align="center">
  //                 You need to be signed in to upload memes to the gallery.
  //             </Typography>
  //             {/* sign in / sign up button */}
  //         </Paper>
  //     )
  // }
  return (
    <Dialog className={classes.dialog} open={open} onClose={handleClose}>
      <DialogTitle className={classes.formTitle}>Edit post</DialogTitle>
      <DialogContent>
        <form
          autoComplete='off'
          noValidate
          className={`${classes.root} ${classes.form}`}
          onSubmit={handleSubmit}
        >
          <TextField
            className={classes.formTextField}
            name='title'
            variant='outlined'
            label='Title'
            fullWidth
            value={postData?.title}
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
          />
          <TextField
            className={classes.formTextField}
            name='tags'
            variant='outlined'
            label='Tags (separate by comma)'
            fullWidth
            value={postData?.tags}
            onChange={(e) =>
              setPostData({ ...postData, tags: e.target.value.split(', ') })
            }
          />
          <div className={classes.formFileInput}>
            <FileBase64
              type='File'
              multiple={false}
              onDone={({ base64 }: any) =>
                setPostData({ ...postData, selectedFile: base64 })
              }
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button className={classes.formButton} onClick={handleClose}>
          Cancel
        </Button>
        <Button className={classes.formButton} onClick={handleSubmit}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditForm;
