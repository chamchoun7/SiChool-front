/* eslint-disable jsx-a11y/label-has-associated-control */
import React from 'react';
import { Stack, Button, Box, FormControl, TextField, Grid, IconButton } from '@mui/material';
import { Upload, UploadFile } from '@mui/icons-material';
import { styled } from '@mui/system';
import { DropzoneArea } from 'material-ui-dropzone';
import { useLocation } from 'react-router-dom';
import apiLink from '../_mocks_/apiLink';
import { AuthContext } from '../context/AuthProvider';

function useQuery() {
  const { search } = useLocation();

  return React.useMemo(() => new URLSearchParams(search), [search]);
}

function QuizUpload() {
  const [imageUrl, setImageUrl] = React.useState(null);
  const [courseName, setCourseName] = React.useState('');
  const [subject, setSubject] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [files, setFiles] = React.useState(null);
  const [listUrls, setListUrls] = React.useState([]);
  const userData = React.useContext(AuthContext);
  const query = useQuery();
  const Input = styled('input')({
    display: 'none'
  });
  const courseId = query.get('courseId');

  const handleDropImageSave = (files) => {
    if (files.length < 1) return;
    const formData = new FormData();
    formData.append('file', files[0]);
    console.log(files[0]);
    fetch(`${apiLink}attachments/upload`, {
      mode: 'cors',
      method: 'POST',
      headers: {
        Authorization: `Bearer ${userData[0].token} `
      },
      body: formData
    })
      .then((response) => {
        response.text().then((data) => setImageUrl(data));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleDropAttachments = (files) => setFiles(files);

  const handleSubmit = async () => {
    const listUrlsTmp = [];
    // eslint-disable-next-line no-restricted-syntax
    for await (const e of files) {
      const formData = new FormData();
      formData.append('file', e);
      await fetch(`${apiLink}attachments/upload`, {
        mode: 'cors',
        method: 'POST',
        headers: {
          Authorization: `Bearer ${userData[0].token} `
        },
        body: formData
      })
        .then(async (response) => {
          await response.text().then((data) => listUrlsTmp.push(data));
        })
        .catch((err) => {
          console.log(err);
        });
    }

    console.log(listUrlsTmp);
    setListUrls(listUrlsTmp);
    console.log({
      name: courseName,
      description,
      subject,
      imageUrl,
      courseId,
      attachementsUrls: listUrlsTmp
    });
    fetch(`${apiLink}quiz/create`, {
      mode: 'cors',
      method: 'POST',
      headers: { Authorization: `Bearer ${userData[0].token}`, 'Content-Type': 'Application/JSON' },
      body: JSON.stringify({
        name: courseName,
        description,
        subject,
        courseId,
        attachmentsUrls: listUrlsTmp
      })
    })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => console.log(err));
  };
  const handleCourseNameChange = (e) => setCourseName(e.target.value);
  const handleSubject = (e) => setSubject(e.target.value);
  const handleDescription = (e) => setDescription(e.target.value);

  return (
    <Stack sx={{ alignItems: 'center', justifyContent: 'center' }}>
      <FormControl>
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              value={courseName}
              onChange={handleCourseNameChange}
              size="medium"
              label="Course name"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              value={subject}
              onChange={handleSubject}
              label="Subject"
              sx={{ width: '100%' }}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              value={description}
              onChange={handleDescription}
              label="Description"
              sx={{ width: '100%' }}
              multiline
            />
          </Grid>
          <Grid item xs={12}>
            <Box sx={{ width: '100%' }}>
              <DropzoneArea
                showAlerts={false}
                useChipsForPreview
                showPreviews
                showPreviewsInDropzone={false}
                dropzoneText="Drag & drop your attachements or click to select!"
                previewText="Selected attachements:"
                onChange={handleDropAttachments}
              />
            </Box>
          </Grid>
        </Grid>
      </FormControl>
      <br />
      <Button endIcon={<UploadFile />} sx={{ width: '30%', fontSize: 18 }} onClick={handleSubmit}>
        Submit
      </Button>
    </Stack>
  );
}

export default QuizUpload;
