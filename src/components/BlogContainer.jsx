import { Box, Grid } from '@mui/material'
import React from 'react'

import { useDispatch, useSelector } from 'react-redux'
import Blog from './Blog'

const BlogContainer = () => {
  const { blogs } = useSelector((store) => store.blog)

  return (
    <Box display="flex" justifyContent="center">
      <Grid
        container
        spacing={10}
        direction="row"
        alignItems="center"
        justifyContent="center"
      >
        {blogs.map((blog, index) => (
          <Blog key={index} blog={blog} />
        ))}
      </Grid>
    </Box>
  )
}

export default BlogContainer
