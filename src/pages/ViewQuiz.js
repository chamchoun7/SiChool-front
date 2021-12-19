import React, { useEffect, useState, useContext } from 'react';
import { Container, Grid, Stack, Button } from '@mui/material';
import { Divider, Typography } from '@material-ui/core';
import { useLocation } from 'react-router-dom';
import CardCourses from '../components/CardCourses';
import apiLink from '../_mocks_/apiLink';
import { AuthContext } from '../context/AuthProvider';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}
function Courses() {
  const userData = useContext(AuthContext);
  const [classRooms, setClassRooms] = useState([]);
  const [classRoomsNames, setClassRoomsNames] = useState([]);
  const [courses, setCourses] = useState([[]]);
  const query = useQuery();
  const courseId = query.get('course_id');
  useEffect(() => {
    const _courses = [];

    fetch(`${apiLink}quiz/fetch/by/courseId/${courseId}`, {
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
      <Stack spacing={1}>
        <Grid container spacing={3}>
          {classRooms &&
            classRooms.map((e, i) => {
              if (!e) return;
              return (
                <Grid key={i} item sm={12} md={6} lg={4} alignItems="center">
                  <CardCourses
                    name={e.name}
                    subject={e.subject}
                    description={e.description}
                    attachments={e.attachmentsUrls}
                    id={e.id}
                    quizId={e.quizId}
                    isQuiz
                    isAnswer
                  />
                </Grid>
              );
            })}
        </Grid>
      </Stack>
    </Stack>
  );
}

export default Courses;
