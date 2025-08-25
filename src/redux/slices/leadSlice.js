import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../helpers/axiosInstance";
const initialState = {
    leadData: [],
    loading: false,
    error: null,
};

export const getAllLeads = createAsyncThunk(
    "/lead/get",
    async (_, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get("/leads/leads");
            toast.success("Leads loaded successfully");
            console.log(response.data.data);
            // Handle the nested data structure from the API response
            return response.data.data || response.data.leads || response.data.courses || [];
        } catch (error) {
            const msg = error?.response?.data?.message || "Failed to get leads";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

export const createLead = createAsyncThunk(
    "/lead/create",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/leads/leads", data);
            toast.success("Lead created successfully");
            return response.data;
        } catch (error) {
            const msg =
                error?.response?.data?.message || "Failed to create lead";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

export const getSingleLead = createAsyncThunk(
    "/lead/getSingle",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/leads/leads/${id}`);
            return response.data;
        } catch (error) {
            const msg = error?.response?.data?.message || "Failed to load lead";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

export const updateLead = createAsyncThunk(
    "/lead/update",
    async ({ id, data }, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.put(
                `/leads/leads/${id}`,
                data
            );
            toast.success("Lead updated successfully");
            return response.data;
        } catch (error) {
            const msg =
                error?.response?.data?.message || "Failed to update lead";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

export const deleteLead = createAsyncThunk(
    "/lead/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/leads/leads/${id}`);
            toast.success("Lead deleted successfully");
            return response.data;
        } catch (error) {
            const msg =
                error?.response?.data?.message || "Failed to delete lead";
            toast.error(msg);
            return rejectWithValue(msg);
        }
    }
);

const leadSlice = createSlice({
    name: "lead",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // getAllLeads
            .addCase(getAllLeads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllLeads.fulfilled, (state, action) => {
                state.loading = false;
                state.leadData = action.payload;
            })
            .addCase(getAllLeads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // createLead
            .addCase(createLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(createLead.fulfilled, (state, action) => {
                state.loading = false;
                state.leadData.push(action.payload);
            })
            .addCase(createLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // getSingleLead
            .addCase(getSingleLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleLead.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.leadData.findIndex(
                    (lead) => lead.id === action.payload.id
                );
                if (index !== -1) {
                    state.leadData[index] = action.payload;
                }
            })
            .addCase(getSingleLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // updateLead
            .addCase(updateLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(updateLead.fulfilled, (state, action) => {
                state.loading = false;
                const index = state.leadData.findIndex(
                    (lead) => lead.id === action.payload.id
                );
                if (index !== -1) {
                    state.leadData[index] = action.payload;
                }
            })
            .addCase(updateLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            // deleteLead
            .addCase(deleteLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(deleteLead.fulfilled, (state, action) => {
                state.loading = false;
                state.leadData = state.leadData.filter(
                    (lead) => lead.id !== action.payload.id
                );
            })
            .addCase(deleteLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            });
    },
});

export default leadSlice.reducer;
