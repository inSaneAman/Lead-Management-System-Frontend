import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import axiosInstance from "../../helpers/axiosInstance";

const storedData = localStorage.getItem("data");
const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") === "false" || false,
    data:
        storedData && storedData !== "undefined" ? JSON.parse(storedData) : {},
};

export const createNewAccount = createAsyncThunk(
    "/auth/signup",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("users/register", data);
            toast.success(res?.data?.message || "Account created successfully!");
            return res.data;
        } catch (error) {
            const msg = error?.response?.data?.message || "An error occurred";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

export const login = createAsyncThunk(
    "/auth/login",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("users/login", data);
            toast.success(res?.data?.message || "Login successful!");
            return res.data;
        } catch (error) {
            const msg = error?.response?.data?.message || "An error occurred";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

export const logout = createAsyncThunk(
    "/auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("users/logout");
            toast.success(res?.data?.message || "Logout successful!");
            return res.data;
        } catch (error) {
            const msg = error?.response?.data?.message || "An error occurred";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

export const getUserData = createAsyncThunk(
    "/user/details",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.get("users/profile");
            return res.data;
        } catch (error) {
            toast.error(error?.message || "Failed to fetch user data");
            return rejectWithValue(error?.message);
        }
    }
);

export const updateProfile = createAsyncThunk(
    "/user/update/profile",
    async ([userId, profileData], { rejectWithValue }) => {
        try {
            const res = await axiosInstance.put(
                `users/update-profile/${userId}`,
                profileData
            );
            toast.success(res?.data?.message || "Profile updated successfully!");
            return res.data;
        } catch (error) {
            const msg = error?.response?.data?.message || "An error occurred";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

export const changePassword = createAsyncThunk(
    "/user/change-password",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("users/change-password", data);
            toast.success(res?.data?.message || "Password changed successfully!");
            return res.data;
        } catch (error) {
            const msg = error?.response?.data?.message || "An error occurred";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

export const deleteProfile = createAsyncThunk(
    "/user/delete-profile",
    async (_, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.delete("users/delete-profile");
            toast.promise(res, {
                loading: "Deleting your account...",
                success: (data) =>
                    data?.data?.message || "Account deleted successfully",
                error: "Failed to delete account",
            });
            return res.data;
        } catch (error) {
            const msg = error?.response?.data?.message || "An error occurred";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(createNewAccount.fulfilled, (state) => {
                state.isLoggedIn = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                const user = action?.payload?.user || {};
                localStorage.setItem("data", JSON.stringify(user));
                localStorage.setItem("isLoggedIn", true);
                state.isLoggedIn = true;
                state.data = user;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.removeItem("data");
                localStorage.removeItem("isLoggedIn");
                state.isLoggedIn = false;
                state.data = {};
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                const user = action?.payload?.user || {};
                localStorage.setItem("data", JSON.stringify(user));
                localStorage.setItem("isLoggedIn", true);
                state.isLoggedIn = true;
                state.data = user;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                const user = action?.payload?.user || {};
                localStorage.setItem("data", JSON.stringify(user));
                state.data = user;
            })
            .addCase(changePassword.fulfilled, (state) => {
                // Password change does not affect auth state
            })
            .addCase(deleteProfile.fulfilled, (state) => {
                localStorage.removeItem("data");
                localStorage.removeItem("isLoggedIn");
                state.isLoggedIn = false;
                state.data = {};
            });
    },
});

export default authSlice.reducer;
