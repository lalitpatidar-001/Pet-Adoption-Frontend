import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';
import { userContext } from '../context/UserContextProvider';
import axios from 'axios';
import toast from 'react-hot-toast';
import { useDispatch, useSelector } from 'react-redux';
import { deletePet } from '../redux/slices/petSlice';
import axiosInstance from '../axios';

export default function MenuDialog({isMenuOpen,userId,postId , setIsMenuOpen}) {
    const {User} = React.useContext(userContext);
    const dispatch = useDispatch();
    const anchorRef = React.useRef(null);

    const handleToggle = () => {
        setIsMenuOpen((prevOpen) => !prevOpen);
    };

    const handleClose = (event) => {
        if (anchorRef.current && anchorRef.current.contains(event.target)) {
            return;
        }

        setIsMenuOpen(false);
    };

    function handleListKeyDown(event) {
        if (event.key === 'Tab') {
            event.preventDefault();
            setIsMenuOpen(false);
        } else if (event.key === 'Escape') {
            setIsMenuOpen(false);
        }
    }

    // return focus to the button when we transitioned from !open -> open
    const prevOpen = React.useRef(isMenuOpen);
    React.useEffect(() => {
        if (prevOpen.current === true && isMenuOpen === false) {
            anchorRef.current.focus();
        }

        prevOpen.current = isMenuOpen;
    }, [isMenuOpen]);

    const handleDeletePost = async()=>{
        try{
            const response = await axiosInstance.delete(`/post/delete/${postId}`);
            console.log(response);
            if(response.status===200){
                toast.success("Post Deleted Successfully");
                dispatch(deletePet({data:postId}))
            }
        }catch(error){
            console.log(error);
        }
    }

    return (
        <Stack direction="row" spacing={2}>
            <Paper>
                <MenuList>
                   {User===userId &&  <MenuItem onClick={handleDeletePost}>Delete</MenuItem>}
                </MenuList>
            </Paper>
            <div>
                <Popper
                    open={isMenuOpen}
                    anchorEl={anchorRef.current}
                    role={undefined}
                    placement="bottom-start"
                    transition
                    disablePortal
                >
                    {({ TransitionProps, placement }) => (
                        <Grow
                            {...TransitionProps}
                            style={{
                                transformOrigin:
                                    placement === 'bottom-start' ? 'left top' : 'left bottom',
                            }}
                        >
                            <Paper>
                                <ClickAwayListener onClickAway={handleClose}>
                                    <MenuList
                                        autoFocusItem={isMenuOpen}
                                        id="composition-menu"
                                        aria-labelledby="composition-button"
                                        onKeyDown={handleListKeyDown}
                                    >
                                        {/* <MenuItem onClick={handleClose}>Profile</MenuItem>
                                        <MenuItem onClick={handleClose}>My account</MenuItem>
                                        <MenuItem onClick={handleClose}>Logout</MenuItem> */}
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </div>
        </Stack>
    );
}