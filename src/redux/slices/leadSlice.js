import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import axiosInstance from "../../helpers/axiosInstance";

const initialState = {
    leadData: [],
    pagination: {
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    },
    loading: false,
    error: null,
};

export const getAllLeads = createAsyncThunk(
    "/lead/get",
    async (params = {}, { rejectWithValue }) => {
        try {
            const queryParams = new URLSearchParams();

            // Add pagination parameters
            if (params.page) queryParams.append("page", params.page);
            if (params.limit) queryParams.append("limit", params.limit);

            // Add filter parameters
            if (params.search) queryParams.append("search", params.search);
            if (params.status && params.status !== "all")
                queryParams.append("status", params.status);
            if (params.source && params.source !== "all")
                queryParams.append("source", params.source);
            if (
                params.is_qualified !== undefined &&
                params.is_qualified !== "all"
            ) {
                queryParams.append(
                    "is_qualified",
                    params.is_qualified === "Yes" ? "true" : "false"
                );
            }

            // Add sorting parameters
            if (params.sort_by) queryParams.append("sort_by", params.sort_by);
            if (params.sort_order)
                queryParams.append("sort_order", params.sort_order);

            const response = await axiosInstance.get(
                `/leads/leads?${queryParams.toString()}`
            );

            console.log("this is response", response.data);
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to fetch leads"
            );
        }
    }
);

export const getSingleLead = createAsyncThunk(
    "/lead/getSingle",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.get(`/leads/leads/${id}`);
            console.log("this is response", response.data);
            return response.data.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to load lead"
            );
        }
    }
);

export const createLead = createAsyncThunk(
    "/lead/create",
    async (data, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.post("/leads/leads", data);
            toast.promise(Promise.resolve(response), {
                loading: "Creating lead...",
                success: "Lead created successfully",
                error: "Failed to create lead",
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to create lead"
            );
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
            toast.promise(Promise.resolve(response), {
                loading: "Updating lead...",
                success: "Lead updated successfully",
                error: "Failed to update lead",
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to update lead"
            );
        }
    }
);

export const deleteLead = createAsyncThunk(
    "/lead/delete",
    async (id, { rejectWithValue }) => {
        try {
            const response = await axiosInstance.delete(`/leads/leads/${id}`);
            toast.promise(Promise.resolve(response), {
                loading: "Deleting lead...",
                success: "Lead deleted successfully",
                error: "Failed to delete lead",
            });
            return response.data;
        } catch (error) {
            return rejectWithValue(
                error?.response?.data?.message || "Failed to delete lead"
            );
        }
    }
);

const leadSlice = createSlice({
    name: "lead",
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
        setPage: (state, action) => {
            state.pagination.page = action.payload;
        },
        setLimit: (state, action) => {
            state.pagination.limit = action.payload;
        },
        clearLeads: (state) => {
            state.leadData = [];
            state.pagination = initialState.pagination;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(getAllLeads.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getAllLeads.fulfilled, (state, action) => {
                state.loading = false;
                state.leadData = action.payload.data;
                state.pagination = {
                    page: action.payload.page,
                    limit: action.payload.limit,
                    total: action.payload.total,
                    totalPages: action.payload.totalPages,
                };
            })
            .addCase(getAllLeads.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(getSingleLead.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(getSingleLead.fulfilled, (state, action) => {
                state.loading = false;
                state.singleLead = action.payload;
            })
            .addCase(getSingleLead.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload;
            })
            .addCase(createLead.fulfilled, (state, action) => {
                state.leadData.unshift(action.payload);
            })
            .addCase(updateLead.fulfilled, (state, action) => {
                const index = state.leadData.findIndex(
                    (lead) => lead.id === action.payload.id
                );
                if (index !== -1) {
                    state.leadData[index] = action.payload;
                }
                if (
                    state.singleLead &&
                    state.singleLead.id === action.payload.id
                ) {
                    state.singleLead = action.payload;
                }
            })
            .addCase(deleteLead.fulfilled, (state, action) => {
                state.leadData = state.leadData.filter(
                    (lead) => lead.id !== action.payload.id
                );
                if (
                    state.singleLead &&
                    state.singleLead.id === action.payload.id
                ) {
                    state.singleLead = null;
                }
            });
    },
});

export const { clearError, setPage, setLimit, clearLeads } = leadSlice.actions;
export default leadSlice.reducer;
