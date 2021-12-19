import { filter } from 'lodash';
import { Icon } from '@iconify/react';
import React, { useContext, useEffect, useState } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
// material
import { Stack, Button, Container, Box, TextField, IconButton } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { DataGrid } from '@mui/x-data-grid';
import InputAdornment from '@mui/material/InputAdornment';
import { Search } from '@mui/icons-material';

// components
import Page from '../components/Page';
import { RegisterForm } from '../components/authentication/register';
//
// import USERLIST from '../_mocks_/user';
import apiLink from '../_mocks_/apiLink';
import { AuthContext } from '../context/AuthProvider';

export default function User() {
  const [searchWorld, setSearchWorld] = useState('');
  const [open, setOpen] = useState(false);
  const [userRole, setUserRole] = useState(1);
  const userData = useContext(AuthContext);
  const roles = ['STUDENT', 'PROF', 'DOCTOR'];
  const navigate = useNavigate();
  const [USERLIST, setUSERLIST] = useState([]);
  const columns = [
    { field: 'id', headerName: 'ID', width: 120 },
    {
      field: 'email',
      headerName: 'Email',
      width: 150
    },
    {
      field: 'fullName',
      headerName: 'Full Name',
      width: 150
    },
    {
      field: 'role',
      headerName: 'Role',
      width: 100
    }
  ];

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const [anchorEl, setAnchorEl] = React.useState(null);
  const opens = Boolean(anchorEl);
  const handleClickO = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleCloses = (e) => {
    setAnchorEl(null);
    setUserRole(e);
    if (e === 1) {
      fetch(`${apiLink}account/search/students`, {
        mode: 'cors',
        headers: { Authorization: `Bearer ${userData[0].token}` }
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setUSERLIST([]);
              setUSERLIST(data);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (e === 2) {
      fetch(`${apiLink}account/search/proofs`, {
        mode: 'cors',
        headers: { Authorization: `Bearer ${userData[0].token}` }
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              console.log(data);
              setUSERLIST(data);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (e === 3) {
      fetch(`${apiLink}account/fetch/doctors`, {
        mode: 'cors',
        headers: { Authorization: `Bearer ${userData[0].token}` }
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              console.log(data);
              setUSERLIST([]);
              setUSERLIST(data);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSearchChange = (e) => {
    setSearchWorld(e.target.value);
  };
  const handleSearch = () => {
    if (userRole === 1) {
      fetch(`${apiLink}account/search/students?keyWord=${searchWorld}`, {
        mode: 'cors',
        headers: { Authorization: `Bearer ${userData[0].token}` }
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setUSERLIST([]);
              setUSERLIST(data);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (userRole === 2) {
      fetch(`${apiLink}account/search/proofs?keyWord=${searchWorld}`, {
        mode: 'cors',
        headers: { Authorization: `Bearer ${userData[0].token}` }
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setUSERLIST([]);
              setUSERLIST(data);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else if (userRole === 3) {
      fetch(`${apiLink}account/search/doctors?keyWord=${searchWorld}`, {
        mode: 'cors',
        headers: { Authorization: `Bearer ${userData[0].token}` }
      })
        .then((response) => {
          if (response.status === 200) {
            response.json().then((data) => {
              setUSERLIST([]);
              setUSERLIST(data);
            });
          }
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    fetch(`${apiLink}account/search/students`, {
      mode: 'cors',
      headers: { Authorization: `Bearer ${userData[0].token}` }
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            console.log(data);
            setUSERLIST([]);
            setUSERLIST(data);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData]);

  return (
    <Page title="User | Minimal-UI">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Button
            id="basic-button"
            aria-controls="basic-menu"
            aria-haspopup="true"
            aria-expanded={opens ? 'true' : undefined}
            onClick={handleClickO}
          >
            {roles[userRole - 1] && roles[userRole - 1].toLowerCase()}
          </Button>
          <Button
            variant="contained"
            component={RouterLink}
            to="#"
            startIcon={<Icon icon={plusFill} />}
            onClick={handleClickOpen}
          >
            New {roles[userRole - 1] && roles[userRole - 1].toLowerCase()}
          </Button>
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={opens}
            onClose={handleCloses}
            MenuListProps={{
              'aria-labelledby': 'basic-button'
            }}
          >
            <MenuItem onClick={() => handleCloses(1)}>Students</MenuItem>
            <MenuItem onClick={() => handleCloses(2)}>Profs</MenuItem>
            <MenuItem onClick={() => handleCloses(3)}>Doctors</MenuItem>
          </Menu>
          <Dialog open={open} onClose={handleClose}>
            <DialogTitle>Add User</DialogTitle>
            <DialogContent>
              <Box sx={{ p: 2 }}>
                <RegisterForm userRole={userRole} />
              </Box>
            </DialogContent>
          </Dialog>
        </Stack>
      </Container>
      <Container style={{ height: 400, width: 'auto' }}>
        <TextField
          id="input-with-icon-textfield"
          label="Search"
          InputProps={{
            startAdornment: (
              <IconButton position="start" onClick={handleSearch}>
                <Search />
              </IconButton>
            )
          }}
          variant="standard"
          sx={{ pb: 1 }}
          value={searchWorld}
          onChange={handleSearchChange}
          onKeyPress={handleSearchChange}
        />
        <DataGrid
          rows={USERLIST}
          columns={columns}
          pageSize={5}
          rowsPerPageOptions={[5]}
          checkboxSelection
          disableSelectionOnClick
          textAlign="center"
        />
      </Container>
    </Page>
  );
}
