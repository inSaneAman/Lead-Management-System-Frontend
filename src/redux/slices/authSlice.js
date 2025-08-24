import {createAsyncThunk, creatSlice} from "@reduxjs/toolkit"
import toast from "react-hot-toast"

import axiosInstance from "../../helpers/axiosInstance";
const initialState = {
    isLoggedIn: localStorage.getItem("isLoggedIn") || false,
    data: localStorage.getItem("data")
        ? JSON.parse(localStorage.getItem("data"))
        : {},
};

export const createNewAccount = createAsyncThunk(
    "/auth/signup",
    async (data, { rejectWithValue }) => {
        try {
            const res = axiosInstance.post("users/register", data);
            toast.promise(res, {
                loading: "Creating your account...",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Failed to create your account",
            });

            return (await res).data;
        } catch (error) {
            const errorMessage =
                error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

export const login = createAsyncThunk("/auth/login", async (data) => {
    try {
        const res = axiosInstance.post("users/login", data);
        toast.promise(res, {
            loading: "Authentication in progress",
            success: (data) => {
                return data?.data?.message;
            },
            error: "Failed to login",
        });

        return (await res).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const logout = createAsyncThunk(
    "/auth/logout",
    async (_, { rejectWithValue }) => {
        try {
            const res = axiosInstance.post("users/logout");
            toast.promise(res, {
                loading: "Logging you out",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Failed to logout",
            });

            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
            return rejectWithValue(error?.response?.data);
        }
    }
);

export const getUserData = createAsyncThunk("/user/details", async () => {
    try {
        const res = axiosInstance.get("users/profile");
        return (await res).data;
    } catch (error) {
        toast.error(error.message);
    }
});

export const updateProfile = createAsyncThunk(
    "/user/update/profile",
    async (data) => {
        try {
            const res = axiosInstance.put(
                `users/update-profile/${data[0]}`,
                data[1]
            );
            toast.promise(res, {
                loading: "Updating your profile",
                success: (data) => {
                    return data?.data?.message;
                },
                error: "Profile updation failed",
            });

            return (await res).data;
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
);

export const changePassword = createAsyncThunk(
    "/user/change-password",
    async (data, { rejectWithValue }) => {
        try {
            const res = await axiosInstance.post("users/change-password", data);
            toast.promise(res, {
                loading: "Changing your password...",
                success: (data) => data?.data?.message || "Password changed successfully",
                error: "Failed to change password",
            });
            return res.data;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
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
                success: (data) => data?.data?.message || "Account deleted successfully",
                error: "Failed to delete account",
            });
            return res.data;
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
            return rejectWithValue(errorMessage);
        }
    }
);

const authSlice = creatSlice({
    name : "auth",
    initialState,
    reducers:{},

    extraReducers: (builder) => {
        builder
            .addCase(createNewAccount.fulfilled, (state, action) => {
                state.isLoggedIn = false;
            })
            .addCase(login.fulfilled, (state, action) => {
                localStorage.setItem(
                    "data",
                    JSON.stringify(action?.payload?.user)
                );
                localStorage.setItem("isLoggedIn", true);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
            })
            .addCase(logout.fulfilled, (state) => {
                localStorage.clear();
                state.data = {};
                state.isLoggedIn = false;
            })
            .addCase(getUserData.fulfilled, (state, action) => {
                localStorage.setItem(
                    "data",
                    JSON.stringify(action?.payload?.user)
                );
                localStorage.setItem("isLoggedIn", true);
                state.isLoggedIn = true;
                state.data = action?.payload?.user;
            })
            .addCase(updateProfile.fulfilled, (state, action) => {
                localStorage.setItem(
                    "data",
                    JSON.stringify(action?.payload?.user)
                );
                state.data = action?.payload?.user;
            })
            .addCase(changePassword.fulfilled, (state, action) => {
                // Password change does not affect auth state
            })
            .addCase(deleteProfile.fulfilled, (state, action) => {
                state.isLoggedIn = false;
                state.data = {};
                localStorage.removeItem("isLoggedIn");
                localStorage.removeItem("data");
            });
    },
})

export default authSlice.reducer;