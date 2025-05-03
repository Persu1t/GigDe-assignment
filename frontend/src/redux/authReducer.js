import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const initialState = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const register = createAsyncThunk("auth/register", async (userData, thunkAPI) => {
    try {
        const res = await fetch("http://localhost:3000/api/v1/auth/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Registration failed");
        }

        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});


export const login = createAsyncThunk("auth/login", async (userData, thunkAPI) => {
    try {
        const res = await fetch("http://localhost:3000/api/v1/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(userData),
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Login failed");
        }

        const data = await res.json();
        console.log(data);
        return data;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const getCurrentUser = createAsyncThunk("auth/getCurrentUser", async (_, thunkAPI) => {
    try {
        const res = await fetch("http://localhost:3000/api/v1/auth/user", {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
        });

        if (!res.ok) {
            const errorData = await res.json();
            throw new Error(errorData.message || "Failed to fetch user data");
        }

        const data = await res.json();
        return data.user;
    } catch (err) {
        return thunkAPI.rejectWithValue(err.message);
    }
});

export const logout = createAsyncThunk("auth/logout", async () => {
    localStorage.removeItem("token");
})

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(login.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.currentUser = action.payload;
            })
            .addCase(getCurrentUser.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload;
                state.user = null;
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLoading = false;
                state.currentUser = null;
            })
    }
})


export const authReducer = authSlice.reducer;