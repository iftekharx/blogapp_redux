import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const url = 'https://jsonplaceholder.typicode.com/posts'

const initialState = {
  blogs: [],
  currentBlog: {},
  total: 0,
  isLoading: true,
  isEditing: true,
  isDeleting: true,
}

export const addNewPost = createAsyncThunk(
  'blogs/addNewPost',
  async (initialPost) => {
    const response = await axios.post(url, initialPost)
    return response.data
  }
)

export const deletePost = createAsyncThunk(
  'blogs/deletePost',
  async (initialPost) => {
    const response = await axios.delete(url + `/${initialPost.id}`, initialPost)
    return initialPost
  }
)

export const editPost = createAsyncThunk(
  'blogs/editPost',
  async (initialPost) => {
    const response = await axios.put(url + `/${initialPost.id}`, initialPost)
    return response.data
  }
)

export const getBlogItems = createAsyncThunk(
  'blogs/getBlogItems',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      const resp = await axios(url)

      return resp.data
    } catch (error) {
      console.log(error)
      return thunkAPI.rejectWithValue('something went wrong')
    }
  }
)

const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    clearBlogs: (state) => {
      state.blogs = []
    },

    setCurrentBlog: (state, action) => {
      const blog = action.payload
      state.currentBlog = blog
    },
    addItem: (state, action) => {
      const blog = action.payload
      state.blogs.push(blog)
    },
    editItem: (state, action) => {
      const itemId = action.payload.id
      let blogEdit = state.blogs.filter((item) => item.id === itemId)
      blogEdit = action.payload.blog
      state.blogs = [...state.blogs, blogEdit]
    },

    calculateTotals: (state) => {
      let total = 0
      state.blogs.forEach((item) => {
        total += 1
      })
      state.total = total
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getBlogItems.pending, (state) => {
        state.isLoading = true
      })
      .addCase(getBlogItems.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false
        state.blogs = action.payload
      })
      .addCase(getBlogItems.rejected, (state, action) => {
        state.isLoading = false
      })

      .addCase(addNewPost.fulfilled, (state, action) => {
        // Fix for API post IDs:
        // Creating sortedPosts & assigning the id
        // would be not be needed if the fake API
        // returned accurate new post IDs
        const sortedPosts = state.blogs.sort((a, b) => {
          if (a.id > b.id) return 1
          if (a.id < b.id) return -1
          return 0
        })

        action.payload.id = sortedPosts[sortedPosts.length - 1].id + 1
        // End fix for fake API post IDs

        // console.log(action.payload)
        state.blogs.push({ userId: 1, ...action.payload })
      })
      .addCase(editPost.fulfilled, (state, action) => {
        const blog = state.blogs.find((blog) => blog.id === action.payload.id)
        blog.title = action.payload.title
        blog.body = action.payload.body
        state.isEditing = false
      })
      .addCase(editPost.pending, (state) => {
        state.isEditing = true
      })
      .addCase(editPost.rejected, (state, action) => {
        state.isEditing = false
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        const itemId = action.payload.id
        console.log(itemId)
        state.blogs = state.blogs.filter((item) => item.id !== itemId)

        state.isDeleting = false
      })
      .addCase(deletePost.pending, (state, action) => {
        state.isDeleting = true
      })
  },
})

// console.log(cartSlice);
export const {
  clearBlogs,
  removeItem,
  calculateTotals,
  addItem,
  editItem,
  setCurrentBlog,
} = blogSlice.actions

export default blogSlice.reducer
