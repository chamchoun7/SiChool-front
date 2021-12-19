import React, { useEffect, useState, useContext } from 'react';
import { Container, Grid, Stack, Button } from '@mui/material';
import { Divider, Typography } from '@material-ui/core';
import CardCourses from '../components/CardCourses';
import apiLink from '../_mocks_/apiLink';
import { AuthContext } from '../context/AuthProvider';

function Courses() {
  const userData = useContext(AuthContext);
  const [classRooms, setClassRooms] = useState([]);
  const [classRoomsNames, setClassRoomsNames] = useState([]);
  const [courses, setCourses] = useState([[]]);

  useEffect(() => {
    const _courses = [];
    fetch(`${apiLink}classRoom/fetch/all/and/courses`, {
      mode: 'cors',
      headers: { Authorization: `Bearer ${userData[0].token}` }
    })
      .then((response) => {
        response.json().then((data) => {
          setClassRooms(data);
          console.log(data);
        });
      })
      .catch((err) => console.log(err));
  }, [userData]);
  return (
    <Stack spacing={5} textAlign="center">
      {classRooms &&
        classRooms.map((e, i) => {
          console.log('asdasd');
          if (e.courses.length === 0) return <></>;
          return (
            <>
              <Stack key={i} spacing={1}>
                <Typography variant="h5">
                  {e.name && e.name.charAt(0).toUpperCase() + e.name.slice(1)}
                </Typography>
                <Grid container spacing={3}>
                  {e.courses &&
                    e.courses.map((e, i) => (
                      <Grid key={i} item sm={12} md={4} lg={4} xl={3} alignItems="center">
                        <CardCourses
                          name={e.name}
                          imageUrl={e.imageUrl}
                          subject={e.subject}
                          description={e.description}
                          attachments={e.attachmentsUrls}
                          id={e.id}
                        />
                      </Grid>
                    ))}
                </Grid>
              </Stack>
            </>
          );
        })}
    </Stack>
  );
}

export default Courses;
