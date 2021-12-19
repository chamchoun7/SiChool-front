import React, { useContext } from 'react';
import {
  Card,
  CardHeader,
  Avatar,
  IconButton,
  CardMedia,
  CardContent,
  Typography,
  CardActions,
  Button
} from '@mui/material';
import { Download, Favorite, Share, Add } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import Image from './image.jpeg';
import apiLink from '../_mocks_/apiLink';
import { AuthContext } from '../context/AuthProvider';

function CardCourses({
  name,
  description,
  imageUrl,
  subject,
  attachments,
  id,
  isQuiz,
  isAnswer,
  quizId
}) {
  console.log(attachments);
  console.log(Image);
  const navigate = useNavigate();
  const handleClick = () => {
    if (!attachments) return;
    attachments.map((e) => window.open(`${apiLink}${e}`, '_blank'));
  };
  const userData = useContext(AuthContext);
  return (
    <Card sx={{ width: 300, justifyContent: 'center' }} justifyContent="center">
      <CardHeader
        avatar={
          <Avatar sx={{ backgroundColor: 'rgb(0, 171, 85)' }}>
            {name && name[0].toUpperCase()}
          </Avatar>
        }
        action={
          <IconButton onClick={handleClick}>
            <Download />
          </IconButton>
        }
        title={name}
        subheader={subject}
      >
        s
      </CardHeader>
      {imageUrl && <img src={`${apiLink}${imageUrl}`} alt="course" style={{ paddingTop: 10 }} />}
      <CardContent>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
      {!isQuiz && (
        <>
          {['ADMIN', 'PROF'].includes(userData[0].role) && (
            <Button
              sx={{ marginBottom: 2 }}
              onClick={() => navigate(`/dashboard/create_quiz?courseId=${id}`, { replace: true })}
              endIcon={<Add />}
            >
              Add Quiz
            </Button>
          )}
          <Button
            sx={{ marginBottom: 2 }}
            onClick={() => navigate(`/dashboard/quiz?course_id=${id}`, { replace: true })}
            endIcon={<Add />}
          >
            Vew Quiz
          </Button>
        </>
      )}
      {isAnswer && (
        <>
          {['STUDENT'].includes(userData[0].role) && (
            <Button
              sx={{ marginBottom: 2 }}
              onClick={() => navigate(`/dashboard/edit_quiz?quizId=${id}`)}
            >
              Add Answer
            </Button>
          )}
          {['PROF', 'ADMIN'].includes(userData[0].role) && (
            <Button
              sx={{ marginBottom: 2 }}
              onClick={() => navigate(`/dashboard/view_answer?quizId=${id}`)}
            >
              View Answers
            </Button>
          )}
        </>
      )}
    </Card>
  );
}

export default CardCourses;
