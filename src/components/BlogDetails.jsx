import {
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Typography,
} from '@mui/material'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const BlogDetails = () => {
  const dispatch = useDispatch()

  const { currentBlog } = useSelector((state) => state.blog)

  return (
    <>
      <Grid item xs={12} md={10} xl={7} margin={5}>
        <Card>
          <CardMedia
            sx={{ height: 300 }}
            image="../../images/black.png"
            title="green iguana"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="div">
              {currentBlog.title}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {currentBlog.body}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              By User: {currentBlog.userId}
            </Typography>
          </CardContent>
          <CardActions>
            <Link to="/">
              <Button size="small">Go Back</Button>
            </Link>
            <Link to="/editblog">
              <Button size="small">Edit</Button>
            </Link>
          </CardActions>
        </Card>
      </Grid>
    </>
  )
}

export default BlogDetails
