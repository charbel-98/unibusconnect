import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../../api/axios";
export const fetchGoogleUser = createAsyncThunk(
  "auth/fetchGoogleUser",
  async () => {
    const response = await axios.get("/auth/login/user", {
      withCredentials: true,
    });
    return response.data;
  }
);
export const signup = createAsyncThunk("register/signup", async (data) => {
  const response = await axios.post("register/signup", data, {
    withCredentials: true,
  });
  return response.data;
});
export const login = createAsyncThunk("auth/login", async (data) => {
  const response = await axios.post("/auth/login", data, {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  });
  return response.data;
});
export const logout = createAsyncThunk("auth/logout", async () => {
  await axios.get("logout", { withCredentials: true });
});
// export const refreshToken = createAsyncThunk("auth/refreshToken", async () => {
//   const response = await axios.get("/refresh", {
//     withCredentials: true,
//   });
//   return response.data;
// });
const authSlice = createSlice({
  name: "auth",
  initialState: {
    user: null,
    accessToken: null,
    status: "idle",
    error: null,
  },
  reducers: {
    setAuth: (state, action) => {
      state.accessToken = action.payload.accessToken;
      state.user = action.payload.user;
      state.status = action.payload.status;
    },
    setDefaultLocation: (state, action) => {
      state.user = { ...state.user, defaultLocation: action.payload.location };
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchGoogleUser.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchGoogleUser.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
      })
      .addCase(fetchGoogleUser.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(signup.pending, (state) => {
        state.status = "loading";
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.status = "succeeded";
      })
      .addCase(signup.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(login.pending, (state) => {
        state.status = "loading";
      })
      .addCase(login.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.user = action.payload.user;
        state.accessToken = action.payload.accessToken;
      })
      .addCase(login.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(logout.pending, (state) => {
        state.status = "loading";
      })
      .addCase(logout.fulfilled, (state) => {
        state.status = "succeeded";
        state.user = null;
        state.accessToken = null;
      })
      .addCase(logout.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    // .addCase(refreshToken.pending, (state) => {
    //   state.status = "loading";
    // })
    // .addCase(refreshToken.fulfilled, (state, action) => {
    //   state.status = "succeeded";
    //   state.accessToken = action.payload.accessToken;
    // })
    // .addCase(refreshToken.rejected, (state, action) => {
    //   state.status = "failed";
    //   state.error = action.error.message;
    // });
  },
});

export default authSlice.reducer;
export const { setAuth, setDefaultLocation } = authSlice.actions;
