import * as React from 'react';
import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import EditProfile from '../EditProfile';

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

export default function EditProfileModel({isEditProfileModelOpen ,id, setIsEditProfileModelOpen}) {
  const handleOpen = () => setIsEditProfileModelOpen(true);
  const handleClose = () => setIsEditProfileModelOpen(false);

  return (
    <div>
     {/* { <Button onClick={handleOpen}>Open modal</Button>} */}
      <Modal disableEnforceFocus
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={isEditProfileModelOpen}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={isEditProfileModelOpen}>
          <Box sx={style} className="max-w-[600px] ">
           <EditProfile handleClose={handleClose} id={id}/>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}