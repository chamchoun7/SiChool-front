import {
  Button,
  Container,
  Stack,
  TextField,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Dialog,
  OutlinedInput,
  Box,
  FormControl,
  Chip,
  Divider,
  Typography,
  ListItemText,
  List,
  ListItem,
  CircularProgress,
  ListItemAvatar,
  Avatar
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import React, { useContext, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import saveOutline from '@iconify/icons-eva/save-outline';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import Snackbar from '@mui/material/Snackbar';
import CloseIcon from '@mui/icons-material/Close';
import IconButton from '@mui/material/IconButton';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import Page from '../components/Page';
import apiLink from '../_mocks_/apiLink';
import { AuthContext } from '../context/AuthProvider';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

let namesStudents = [];
let idsStudents = [];

let namesProfs = [];
let idsProfs = [];

function getStyles(name, personName, theme) {
  return {
    fontWeight:
      personName.indexOf(name) === -1
        ? theme.typography.fontWeightRegular
        : theme.typography.fontWeightMedium
  };
}

function Classrooms() {
  const [open, setOpen] = useState(false);
  const [openNd, setOpenNd] = useState(false);
  const theme = useTheme();
  const [selectedClassroom, setSelectedClassroom] = useState('');
  const [personName, setPersonName] = React.useState([]);
  const [personName_, setPersonName_] = React.useState([]);
  const [classroomName, setClassroomName] = React.useState([]);
  const [studentsIds, setStudentsIds] = useState([]);
  const [profsIds, setProfsIds] = useState([]);
  const [studentsToSend, setStudentsToSend] = useState([]);
  const [profsToSend, setProfsToSend] = useState([]);
  const userData = useContext(AuthContext);
  const [loadingData, setLoadingData] = useState(false);
  const [openSnack, setOpenSnack] = React.useState(false);
  const [classrooms, setClassrooms] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const columns = [{ field: 'name', headerName: 'Classroom name', width: 150 }];
  const navigate = useNavigate();
  const handleClickOpenSnack = () => {
    setOpenSnack(true);
  };

  const getStudentByEmail = (email) => {
    const usersToSend = [];
    studentsToSend.forEach((e) => {
      const index = namesStudents.indexOf(e);
      usersToSend.push(idsStudents[index]);
    });
    return usersToSend;
  };

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenSnack(false);
  };

  const action = (
    <>
      <Button color="secondary" size="small" onClick={handleCloseSnack}>
        UNDO
      </Button>
      <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnack}>
        <CloseIcon fontSize="small" />
      </IconButton>
    </>
  );

  const handleChange = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    setStudentsToSend(value);
  };

  const handleChangeP = (event) => {
    const {
      target: { value }
    } = event;
    setPersonName_(
      // On autofill we get a the stringified value.
      typeof value === 'string' ? value.split(',') : value
    );
    setProfsToSend(value);
  };

  const handleSave = () => {
    console.log(studentsToSend);
    const arr = [];
    studentsToSend.forEach((e) => {
      const index = namesStudents.indexOf(e);
      if (index !== -1) arr.push(idsStudents[index]);
    });
    console.log(JSON.stringify({ arr }));
    if (selectedClassroom) {
      fetch(`${apiLink}classRoom/link/student/${selectedClassroom}`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userData[0].token}`,
          'Content-Type': 'Application/Json'
        },
        body: JSON.stringify({ studentIds: arr })
      })
        .then(() => {
          profsToSend.map((e) => {
            const index = namesProfs.indexOf(e);
            if (index !== -1) arr.push(idsProfs[index]);
            return 0;
          });
          fetch(`${apiLink}classRoom/link/proof/${selectedClassroom}`, {
            mode: 'cors',
            method: 'POST',
            headers: {
              Authorization: `Bearer ${userData[0].token}`,
              'Content-Type': 'Application/json'
            },
            body: JSON.stringify({ proofIds: arr })
          }).catch(() => {
            console.log();
          });
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  const handleSelection = (e) => {
    console.log(e);
    setLoadingData(true);
    setSelectedClassroom(e[0]);
    fetch(`${apiLink}classRoom/fetch/by/id/${e[0]}`, {
      mode: 'cors',
      headers: { Authorization: `Bearer ${userData[0].token}` }
    }).then((response) => {
      console.log(response.status);
      response
        .json()
        .then((data) => {
          console.log(data.proofs);
          console.log(data.students);
          setStudentsIds(data.students);
          setProfsIds(data.proofs);
        })
        .catch((err) => console.log(err));
    });
    setLoadingData(false);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClickOpenNd = () => {
    setOpenNd(true);
  };

  const handleClose = () => {
    const usersToSend = [];
    const profsToSend_ = [];
    studentsToSend.forEach((e) => {
      const index = namesStudents.indexOf(e);
      usersToSend.push(idsStudents[index]);
    });
    profsToSend.forEach((e) => {
      console.log(`THIS IS E11111 ${e}`, idsStudents);
      const index = namesProfs.indexOf(e);
      console.log(index);
      profsToSend_.push(idsProfs[index]);
    });
    console.log({ name: classroomName, studentIds: usersToSend, proofIds: profsToSend });
    fetch(`${apiLink}classRoom/create`, {
      mode: 'cors',
      method: 'POST',
      headers: { Authorization: `Bearer ${userData[0].token}`, 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({ name: classroomName, studentIds: usersToSend, proofIds: profsToSend_ })
    }).then((response) => {
      console.log(response.status);
      if (response.status === 200) {
        handleClickOpenSnack();
      }
      setOpen(false);
    });
  };

  const handleCloseNd = () => {
    setOpenNd(false);
  };

  const handleAddCourse = () => {
    if (!selectedClassroom) {
      setErrorMessage('Please select a classroom!');
      setTimeout(() => {
        setErrorMessage('');
      }, 2000);
    }
    navigate(`/dashboard/create_course?classroom_id=${selectedClassroom}`);
  };

  const deleteUserFromClassroom = () => {};

  useEffect(() => {
    namesStudents = [];
    idsStudents = [];
    namesProfs = [];
    idsProfs = [];
    fetch(`${apiLink}account/search/students`, {
      mode: 'cors',
      headers: { Authorization: `Bearer ${userData[0].token}` }
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            console.log(data);
            data.forEach((e, i) => {
              namesStudents.push(e.email);
              idsStudents.push(e.id);
            });
          });
        }
      })
      .catch(() => {});

    fetch(`${apiLink}account/search/proofs`, {
      mode: 'cors',
      headers: { Authorization: `Bearer ${userData[0].token}` }
    })
      .then((response) => {
        if (response.status === 200) {
          response.json().then((data) => {
            data.forEach((e, i) => {
              namesProfs.push(e.email);
              idsProfs.push(e.id);
            });
          });
        }
      })
      .catch(() => {});
    fetch(`${apiLink}classRoom/fetch/all`, {
      mode: 'cors',
      headers: { Authorization: `Bearer ${userData[0].token}` }
    })
      .then((response) => {
        console.log(response.status);
        if (response.status === 200) {
          response.json().then((data) => {
            console.log(data);
            setClassrooms(data);
          });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userData]);
  const allowed = ['ADMIN', 'DOCTOR'];
  return (
    <Page title="Dashboard: Classrooms">
      <Container>
        <Stack direction="row" alignItems="center" justifyContent="space-between" md={5}>
          {allowed.includes(userData[0].role) && (
            <>
              <Button onClick={handleClickOpenNd}>Add Users To Existant Classroom</Button>
              <Button
                variant="contained"
                component={RouterLink}
                to="#"
                startIcon={<Icon icon={plusFill} />}
                onClick={handleClickOpen}
              >
                Add New Classroom
              </Button>
            </>
          )}

          <Dialog open={open} onClose={handleClose} sx={{ textAlign: 'center' }}>
            <DialogTitle>
              <Typography variant="h3">Add Classroom</Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={4}>
                <Grid item xs={12}>
                  <TextField
                    sx={{ width: '100%' }}
                    required
                    id="standard-required"
                    label="Classroom name"
                    variant="standard"
                    size="medium"
                    value={classroomName}
                    onChange={(e) => setClassroomName(e.target.value)}
                  />
                </Grid>
                <Grid item xs={6}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="demo-multiple-chip-label">Students</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput id="select-multiple-chip" label="Students" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {namesStudents.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="demo-multiple-chip-label-">Proofs</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label-"
                      id="demo-multiple-chip-"
                      multiple
                      value={personName_}
                      onChange={handleChangeP}
                      input={<OutlinedInput id="select-multiple-chip-" label="Proofs" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {namesProfs.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName_, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    startIcon={<Icon icon={saveOutline} />}
                    onClick={handleClose}
                  >
                    Save!
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
          <Dialog open={openNd} onClose={handleCloseNd} sx={{ textAlign: 'center' }}>
            <DialogTitle>
              <Typography variant="h3">Add Students/Professors Classroom</Typography>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="demo-multiple-chip-label">Students</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label"
                      id="demo-multiple-chip"
                      multiple
                      value={personName}
                      onChange={handleChange}
                      input={<OutlinedInput id="select-multiple-chip" label="Students" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {namesStudents.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <FormControl sx={{ width: '100%' }}>
                    <InputLabel id="demo-multiple-chip-label-">Proofs</InputLabel>
                    <Select
                      labelId="demo-multiple-chip-label-"
                      id="demo-multiple-chip-"
                      multiple
                      value={personName_}
                      onChange={handleChangeP}
                      input={<OutlinedInput id="select-multiple-chip-" label="Proofs" />}
                      renderValue={(selected) => (
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                          {selected.map((value) => (
                            <Chip key={value} label={value} />
                          ))}
                        </Box>
                      )}
                      MenuProps={MenuProps}
                    >
                      {namesProfs.map((name) => (
                        <MenuItem
                          key={name}
                          value={name}
                          style={getStyles(name, personName_, theme)}
                        >
                          {name}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to="#"
                    startIcon={<Icon icon={saveOutline} />}
                    onClick={handleSave}
                  >
                    Save!
                  </Button>
                </Grid>
              </Grid>
            </DialogContent>
          </Dialog>
        </Stack>
      </Container>
      <Snackbar
        open={openSnack}
        autoHideDuration={6000}
        onClose={handleCloseSnack}
        message="Saved Successfully!"
        action={action}
      />
      <Container sx={{ height: 400, marginTop: 8 }}>
        <Grid
          container
          spacing={4}
          direction="row"
          sx={{ height: 400 }}
          justifyContent="space-between"
        >
          <Grid item xs={4} sx={{ textAlign: 'center' }}>
            <DataGrid
              rows={classrooms}
              columns={columns}
              pageSize={5}
              disableSelectionOnClick={loadingData}
              rowsPerPageOptions={[5]}
              textAlign="center"
              onSelectionModelChange={handleSelection}
            />
            <br />
            <Button onClick={handleAddCourse} startIcon={<Icon icon={plusFill} />}>
              Add course
            </Button>
            <Typography
              variant="subtitle1"
              sx={{ p: 1, fontSize: 14, opacity: 0.5, textAlign: 'center', color: 'red' }}
            >
              {errorMessage}
            </Typography>
          </Grid>
          <Divider orientation="vertical" style={{ marginLeft: '20px' }} />
          <Grid item xs={7} textAlign="center">
            <Grid container direction="row" justifyContent="space-between" spacing={1}>
              <Grid item xs={5}>
                <Box
                  sx={{
                    textAlign: 'center',
                    border: 1,
                    borderColor: 'grey.400',
                    borderRadius: 1,
                    p: 2,
                    pb: 0
                  }}
                >
                  <Typography variant="subtitle1">Students</Typography>
                  <List>
                    {studentsIds.length > 0 ? (
                      studentsIds.map((e, i) => (
                        <>
                          <ListItem key={i} sx={{ textAlign: 'left' }}>
                            <ListItemAvatar>
                              <Avatar {...(e.avatarUrl && e.avatarUrl)} />
                            </ListItemAvatar>
                            <ListItemText>
                              <Grid container direction="column">
                                <Grid item xs={6}>
                                  <Grid container direction="row">
                                    <Grid item xs={10}>
                                      <Typography variant="subtitle2">{e.fullName}</Typography>
                                    </Grid>
                                    <Grid item xs={2} sx={{ position: 'relative' }}>
                                      <IconButton sx={{ p: 0, position: 'absolute', right: 0 }}>
                                        <CloseIcon sx={{ fontSize: 16 }} />
                                      </IconButton>
                                    </Grid>
                                  </Grid>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography sx={{ fontSize: 10 }} variant="subtitle2">
                                    {e.username}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </ListItemText>
                          </ListItem>
                          {studentsIds.length - 1 !== i ? (
                            <Divider variant="middle" />
                          ) : (
                            <Typography variant="subtitle2">
                              Total: <b>{studentsIds.length}</b>
                            </Typography>
                          )}
                        </>
                      ))
                    ) : (
                      <Stack alignItems="center" justifyContent="center" spacing={1}>
                        <Typography sx={{ textAlign: 'center' }} variant="caption">
                          No students to display!
                        </Typography>
                        {loadingData ? (
                          <CircularProgress size={25} />
                        ) : (
                          <PeopleOutlineIcon color="inherit" />
                        )}
                      </Stack>
                    )}
                  </List>
                </Box>
              </Grid>
              <Grid item xs={5}>
                <Box
                  sx={{
                    textAlign: 'center',
                    border: 1,
                    borderColor: 'grey.400',
                    borderRadius: 1,
                    p: 2,
                    pb: 0
                  }}
                >
                  <Typography variant="subtitle1">Professors</Typography>
                  <List>
                    {profsIds.length > 0 ? (
                      profsIds.map((e, i) => (
                        <>
                          <ListItem key={i} sx={{ textAlign: 'left' }}>
                            <ListItemAvatar>
                              <Avatar {...(e.avatarUrl && e.avatarUrl)} />
                            </ListItemAvatar>
                            <ListItemText>
                              <Grid container direction="column">
                                <Grid item xs={6}>
                                  <Typography variant="subtitle2">{e.fullName}</Typography>
                                </Grid>
                                <Grid item xs={6}>
                                  <Typography sx={{ fontSize: 10 }} variant="subtitle2">
                                    {e.username}
                                  </Typography>
                                </Grid>
                              </Grid>
                            </ListItemText>
                          </ListItem>
                          {profsIds.length - 1 !== i ? (
                            <Divider variant="middle" />
                          ) : (
                            <Typography variant="subtitle2">
                              Total: <b>{profsIds.length}</b>
                            </Typography>
                          )}
                        </>
                      ))
                    ) : (
                      <Stack alignItems="center" justifyContent="center" spacing={1}>
                        <Typography sx={{ textAlign: 'center' }} variant="caption">
                          No Professors to display!
                        </Typography>
                        {loadingData ? (
                          <CircularProgress size={25} />
                        ) : (
                          <PeopleOutlineIcon color="inherit" />
                        )}
                      </Stack>
                    )}
                  </List>
                </Box>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
}

export default Classrooms;
