import {
  Alert,
  Box,
  Button,
  Container,
  FormControl,
  FormHelperText,
  Grid,
  Input,
  InputLabel,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { addNewPost } from '../features/blogSlice'
import { useNavigate } from 'react-router-dom'
const BlogForm = () => {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const submitData = (event) => {
    event.preventDefault()

    dispatch(addNewPost({ title: title, body: content }))
    navigate('/')
  }

  return (
    <>
      <Box display="flex" justifyContent="center">
        <Container component="main" maxWidth="md">
          <Box
            sx={{
              marginTop: 8,
              display: 'flex',
              maxWidth: 'md',
              flexDirection: 'column',
              alignItems: 'center',
              backgroundColor: '#ffff',
              border: '2px solid black',
            }}
          >
            <Typography component="h1" variant="h5" color={'black'}>
              New Blog
            </Typography>
            <Grid
              container
              component="form"
              onSubmit={submitData}
              spacing={5}
              sx={{ mt: 1, p: 5 }}
            >
              <Grid item xs={12} md={12}>
                <Alert severity="info">...</Alert>
              </Grid>
              <Grid item xs={12} md={12}>
                <TextField
                  onChange={(event) => {
                    setTitle(event.target.value)
                  }}
                  backgroundColor={'white'}
                  margin="normal"
                  fullWidth
                  id="title"
                  label="Title"
                  autoComplete="name"
                  autoFocus
                  sx={{ backgroundColor: 'white' }}
                  InputLabelProps={{
                    style: { color: 'darkblue' },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={12}>
                <TextField
                  backgroundColor={'white'}
                  onChange={(event) => {
                    setContent(event.target.value)
                  }}
                  margin="normal"
                  fullWidth
                  id="body"
                  label="Content"
                  autoComplete="name"
                  multiline
                  rows={20}
                  autoFocus
                  sx={{ backgroundColor: 'white' }}
                  InputLabelProps={{
                    style: { color: 'darkblue' },
                  }}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ backgroundColor: 'darkred', mt: 3, mb: 2 }}
                >
                  Post Blog
                </Button>
              </Grid>
              <Grid item xs={12} md={6}>
                <Link to="/">
                  <Button
                    fullWidth
                    variant="contained"
                    sx={{ backgroundColor: 'darkgrey', mt: 3, mb: 2 }}
                  >
                    Discard
                  </Button>
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  )
}

export default BlogForm
