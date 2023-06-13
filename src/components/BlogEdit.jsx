import {
  Alert,
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from '@mui/material'
import React, { useState } from 'react'
import { editPost } from '../features/blogSlice'
import { Link, useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getBlogItems } from '../features/blogSlice'

const BlogEdit = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const { title } = useSelector((state) => state.blog.currentBlog)
  const { id } = useSelector((state) => state.blog.currentBlog)
  const { body } = useSelector((state) => state.blog.currentBlog)
  const { isEditing } = useSelector((state) => state.blog.isEditing)

  const [titleR, setTitleR] = useState(title)
  const [bodyR, setBodyR] = useState(body)

  const submitData = (event) => {
    event.preventDefault()

    dispatch(editPost({ id: id, title: titleR, body: bodyR }))

    if (!isEditing) {
      navigate('/')
    }
  }

  return (
    <div>
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
              Edit Blog
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
                    setTitleR(event.target.value)
                  }}
                  backgroundColor={'white'}
                  margin="normal"
                  value={titleR}
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
                    setBodyR(event.target.value)
                  }}
                  margin="normal"
                  fullWidth
                  id="body"
                  label="Content"
                  autoComplete="name"
                  multiline
                  value={bodyR}
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
                  Update Blog
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
    </div>
  )
}

export default BlogEdit
