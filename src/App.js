import { Typography } from '@mui/material'
import './App.css'
import BlogContainer from './components/BlogContainer'
import Navbar from './components/Navbar'
import { useSelector, useDispatch } from 'react-redux'
import axios from 'axios'
import { getBlogItems } from './features/blogSlice'
import { useEffect } from 'react'
import ReactDOM from 'react-dom'
import { Router, Routes, Route } from 'react-router-dom'
import BlogForm from './components/BlogForm'
import BlogDetails from './components/BlogDetails'
import BlogEdit from './components/BlogEdit'

function App() {
  const { isLoading, blogs } = useSelector((store) => store.blog)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getBlogItems())
    console.log(isLoading)
  }, [])

  return (
    <>
      <Navbar />

      <Routes>
        <Route
          path="/"
          element={
            isLoading === false ? (
              <>
                <BlogContainer />
              </>
            ) : (
              <>
                <Typography textAlign={'center'} variant="h2">
                  Loading . . .
                </Typography>
              </>
            )
          }
        />

        <Route path="/addblog" element={<BlogForm />} />

        <Route path="/viewblog" element={<BlogDetails />} />
        <Route path="/editblog" element={<BlogEdit />} />
      </Routes>
    </>
  )
}

export default App
