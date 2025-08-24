import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../helpers/axiosInstance";
const initialState = {
    leadData: [],
};


export const getAllLeads = createAsyncThunk("/lead/get", async () => {
    try {
        const response = axiosInstance.get("/leads/leads");
        toast.promise(response, {
            loading: "Loading course data",
            success: "Course loaded successfully",
            error: "Failed to get courses",
        });
        return (await response).data.courses;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const createLead = createAsyncThunk("/lead/create", async (data) => {
    try {
        const response = axiosInstance.post("/leads/leads", data);
        toast.promise(response, {
            loading: "Creating lead...",
            success: "Lead created successfully",
            error: "Failed to create lead",
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const getSingleLead = createAsyncThunk("/lead/getSingle", async (id) => {
    try {
        const response = axiosInstance.get(`/leads/leads/${id}`);
        toast.promise(response, {
            loading: "Loading lead data...",
            success: "Lead loaded successfully",
            error: "Failed to load lead",
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const updateLead = createAsyncThunk("/lead/update", async ({ id, data }) => {
    try {
        const response = axiosInstance.put(`/leads/leads/${id}`, data);
        toast.promise(response, {
            loading: "Updating lead...",
            success: "Lead updated successfully",
            error: "Failed to update lead",
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

export const deleteLead = createAsyncThunk("/lead/delete", async (id) => {
    try {
        const response = axiosInstance.delete(`/leads/leads/${id}`);
        toast.promise(response, {
            loading: "Deleting lead...",
            success: "Lead deleted successfully",
            error: "Failed to delete lead",
        });
        return (await response).data;
    } catch (error) {
        toast.error(error?.response?.data?.message);
    }
});

const leadSlice = createSlice({
    name: "lead",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllLeads.fulfilled, (state, action) => {
                state.leadData = action.payload;
            })
            .addCase(createLead.fulfilled, (state, action) => {
                state.leadData.push(action.payload);
            })
            .addCase(getSingleLead.fulfilled, (state, action) => {
                const index = state.leadData.findIndex((lead) => lead.id === action.payload.id);
                if (index !== -1) {
                    state.leadData[index] = action.payload;
                }
            })
            .addCase(updateLead.fulfilled, (state, action) => {
                const index = state.leadData.findIndex((lead) => lead.id === action.payload.id);
                if (index !== -1) {
                    state.leadData[index] = action.payload;
                }
            })
            .addCase(deleteLead.fulfilled, (state, action) => {
                state.leadData = state.leadData.filter((lead) => lead.id !== action.payload.id);
            });
    },
});

export default leadSlice.reducer;
