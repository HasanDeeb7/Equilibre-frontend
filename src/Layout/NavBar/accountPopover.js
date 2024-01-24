import { Box, Divider, MenuItem, MenuList, Popover, Typography } from '@mui/material';
import { Link, useNavigate } from "react-router-dom";
import { useUserStore } from "../../Store.js";
import axios from 'axios'
import {toast} from 'react-toastify'
export const AccountPopover = (props) => {
  const { anchorEl, onClose, open } = props;
  const {user,removeUser} = useUserStore(); 
  const navigate = useNavigate();

  async function logout(){
    try {
      const response = await axios.get(`${process.env.REACT_APP_ENDPOINT}user/logout`)
      if(response){
        toast.success(response.data.message)
        removeUser(); 
        navigate("/");
      }
    } catch (error) {
      console.log(error)
    }
  }
 

  return (
    <Popover
      anchorEl={anchorEl}
      anchorOrigin={{
        horizontal: "left",
        vertical: "bottom",
      }}
      onClose={onClose}
      open={open}
      PaperProps={{ sx: { width: 200 } }}
    >
      <Box
        sx={{
          py: 1.5,
          px: 2,
        }}
      >
        <Typography variant="overline">{(user)? `${user.firstName} ${user.lastName}`: 'Name'}</Typography>
      </Box>
      <Divider />
      <MenuList
        disablePadding
        dense
        sx={{
          p: "8px",
          "& > *": {
            borderRadius: 1,
          },
        }}
      >
        <MenuItem>
          <Link
            style={{
              textDecoration: "none",
              color: "black",
            }}
            to="profile"
          >
            Profile
          </Link>
        </MenuItem>
        {!user && (
          <MenuItem>
            <Link
              style={{
                textDecoration: "none",
                color: "#119c59",
              }}
              to="login"
            >
              Log in
            </Link>
          </MenuItem>
        )}
        {user && (
          <MenuItem
            sx={{
              color: "red",
            }}
            type="submit"
            onClick={logout}
          >
            Sign out
          </MenuItem>
        )}
      </MenuList>
    </Popover>
  );
};