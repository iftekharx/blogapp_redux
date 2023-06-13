import { Grid } from '@mui/material'
import React from 'react'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import CardMedia from '@mui/material/CardMedia'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { deletePost, removeItem, setCurrentBlog } from '../features/blogSlice'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  return (
    <Grid item xs={12} md={10} xl={7} margin={5}>
      <Card>
        <CardMedia
          sx={{ height: 300 }}
          image="../../images/black.png"
          title="green iguana"
        />
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {blog.title}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {blog.body.substring(0, blog.body.length * 0.5)}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            By User: {blog.userId}
          </Typography>
        </CardContent>
        <CardActions>
          <Link to={'/viewblog'}>
            <Button
              size="small"
              onClick={() => {
                dispatch(setCurrentBlog(blog))
              }}
            >
              View Details
            </Button>
          </Link>

          <Button
            sx={{ color: 'red' }}
            size="small"
            onClick={() => {
              dispatch(deletePost(blog))
            }}
          >
            X Delete Blog
          </Button>
        </CardActions>
      </Card>
    </Grid>
  )
}

export default Blog
