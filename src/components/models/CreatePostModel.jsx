import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import CreatePost from '../CreatePost';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  bgcolor: 'background.paper',
  boxShadow: 24,
  overflowY: 'auto', 
  maxHeight: '95vh',
  p: 4,
};

export default function CreatePostModel({isCreatePostModelOpen , setIsCreatePostModelOpen}) {
  const handleOpen = () => setIsCreatePostModelOpen(true);
  const handleClose = () => setIsCreatePostModelOpen(false);

  return (
    <div>
     {/* { <Button onClick={handleOpen}>Open modal</Button>} */}
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isCreatePostModelOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isCreatePostModelOpen}>
          <Box sx={style} className="max-w-[600px] w-[90%] flex items-center justify-center ">
           <CreatePost handleClose={handleClose}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}