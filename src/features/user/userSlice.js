import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import fetchAPI from '../../common/fetchAPI';

const initialState = {
  userList: [],
  error: null,
}

const host = 'http://localhost:8000'
const authtoken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM0NWEyNzhjYjQ3ODBlZDc1MWFlZTdkIn0sImlhdCI6MTY2NTUwODEwOX0._eA0C3D0FxYD-5Efge032pjlhnaDJjRWTuef3IerSbk';

export const getUserAsync = createAsyncThunk(
  'user/getUser',
  async () => {
    const url = `${host}/api/auth/getuser`;
    const response = await fetchAPI(url, 'GET', authtoken);
    const json = response.json()
    return json;
  }
);

export const addUserAsync = createAsyncThunk(
  'user/addUser',
  async (user, { rejectWithValue }) => {
    try {
      const url = `${host}/api/auth/createuser`;
      const body = JSON.stringify({ name: user.user.name, email: user.user.email, password: user.user.password })
      const response = await fetchAPI(url, 'POST', authtoken, body);
      const json = await response.json()
      if (response.status !== 200) {
        return rejectWithValue(json)
      }
      user.modelRef.current.click();
      return json;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const updateUserAsync = createAsyncThunk(
  'user/updateUser',
  async (user, { rejectWithValue }) => {
    try {
      const url = `${host}/api/auth/updateuser/${user.user.id}`;
      const body = JSON.stringify({ name: user.user.name, email: user.user.email })
      const response = await fetchAPI(url, 'PUT', authtoken, body);
      const json = await response.json()
      if (response.status !== 200) {
        return rejectWithValue(json)
      }
      user.modelRef.current.click();
      return json;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue }) => {
    try {
      const url = `${host}/api/auth/deleteuser/${id}`;
      const response = await fetchAPI(url, 'DELETE', authtoken);
      const json = await response.json()
      if (response.status !== 200) {
        return rejectWithValue(json)
      }
      return json;
    } catch (err) {
      return rejectWithValue(err.response.data)
    }
  }
);

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {


  },
  extraReducers: (builder) => {
    builder
      .addCase(getUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        state.userList = action.payload;
      })
      .addCase(addUserAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(addUserAsync.fulfilled, (state, action) => {
        state.status = 'idle';
        // console.log(current(state));
        state.userList.push(action.payload.user);
      }).addCase(addUserAsync.rejected, (state, action) => {
        if (action.payload) {
          // Being that we passed in ValidationErrors to rejectType in `createAsyncThunk`, the payload will be available here.
          state.error = action.payload.errorMessage
        } else {
          state.error = action.error.message
        }
      })
      .addCase(updateUserAsync.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        const updatedPost = payload.user;
        const index = state.userList.findIndex((post) => post._id === updatedPost._id);
        const newArray = [...state.userList];
        newArray[index] = updatedPost;
        return {
          ...state,
          userList: newArray,
        };
      }).addCase(updateUserAsync.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage
        } else {
          state.error = action.error.message
        }
      })
      .addCase(deleteUser.fulfilled, (state, { payload }) => {
        state.status = 'idle';
        const { _id } = payload.user
        const updatedUser = state.userList.filter(c => c._id !== _id);
        return {
          ...state,
          userList: updatedUser,
        };

      }).addCase(deleteUser.rejected, (state, action) => {
        if (action.payload) {
          state.error = action.payload.errorMessage
        } else {
          state.error = action.error.message
        }
      })
  },
})

// Action creators are generated for each case reducer function
export const { getUser } = userSlice.actions

export default userSlice.reducer