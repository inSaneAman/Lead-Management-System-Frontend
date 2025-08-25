import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import { AgGridReact } from "ag-grid-react";
import {
    Search,
    Plus,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
    Edit,
    Trash2,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import Navbar from "../components/Navbar";
import { getAllLeads, deleteLead } from "../redux/slices/leadSlice";

export default function Leads() {
    const dispatch = useDispatch();
    const { leadData, loading, error } = useSelector((state) => state.lead);
    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        status: "",
        source: "",
        qualified: "",
    });
    const [pagination, setPagination] = useState({
        page: 1,
        limit: 20,
        total: 0,
        totalPages: 0,
    });


    // Column Definitions
console.log(leadData[0]);

const [gridApi, setGridApi] = useState(null);




    const columnDefs = useMemo(
        
        () => [
            {
                headerName: "S.No",
                valueGetter: (params) => params.node.rowIndex + 1,
                width: 80,
            },
            { headerName: "First Name", field: "first_name" },
            { headerName: "Last Name", field: "last_name" },
            { headerName: "Email", field: "email" },
            { headerName: "Phone", field: "phone" },
            { headerName: "Company", field: "company" },
            { headerName: "City", field: "city" },
            { headerName: "State", field: "state" },
            { headerName: "Source", field: "source" },
            { headerName: "Status", field: "status" },
            { headerName: "Score", field: "score" },
            { headerName: "Lead Value", field: "lead_value" },
            { headerName: "Last Activity", field: "last_activity_at" },
            { headerName: "Qualified", field: "is_qualified" },
            {
                headerName: "Actions",
                width: 120,
                cellRenderer: (params) => (
                    <div className="flex gap-2">
                        <button
                            onClick={() => handleEditLead(params.data.id)}
                            className="p-1 text-blue-600 hover:text-blue-800"
                            title="Edit Lead"
                        >
                            <Edit size={16} />
                        </button>
                        <button
                            onClick={() => handleDeleteLead(params.data.id)}
                            className="p-1 text-red-600 hover:text-red-800"
                            title="Delete Lead"
                        >
                            <Trash2 size={16} />
                        </button>
                    </div>
                ),
            },
        ],
        []
    );

    const gridOptions = useMemo(
        () => ({
            defaultColDef: {
                sortable: true,
                filter: true,
                resizable: true,
                minWidth: 120,
            },
            rowSelection: "multiple",
            pagination: false,
        }),
        []
    );

    const onGridReady = (params) => {
        setGridApi(params.api);
    };

    console.log(gridApi);
   useEffect(() => {
       if (gridApi && leadData) {
           gridApi.setRowData(leadData);
       }
   }, [leadData, gridApi]);

   useEffect(() => {
       dispatch(getAllLeads());
   }, [dispatch]);
    // Action handlers
    const handleEditLead = (id) => {
        // Navigate to edit page or open edit modal
        console.log("Edit lead:", id);
    };

    const handleDeleteLead = async (id) => {
        if (window.confirm("Are you sure you want to delete this lead?")) {
            try {
                await dispatch(deleteLead(id)).unwrap();
                // Refresh leads after deletion
                dispatch(getAllLeads());
            } catch (error) {
                console.error("Failed to delete lead:", error);
            }
        }
    };

    // Fetch Leads using Redux
    // const fetchLeads = useCallback(async () => {
    //     try {
    //         await dispatch(getAllLeads()).unwrap();
    //     } catch (err) {
    //         console.error("Error fetching leads", err);
    //     }
    // }, [dispatch]);

    // useEffect(() => {
    //     fetchLeads();
    // }, []);

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
            {/* Navigation Bar */}
            <Navbar />

            <div className="max-w-7xl mx-auto py-8 px-6">
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Lead Management
                    </h1>
                    <Link
                        to="/create-lead"
                        className="flex items-center gap-2 px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700"
                    >
                        <Plus size={20} /> Create Lead
                    </Link>
                </div>

                {/* Error Display */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                        <p className="text-red-800">Error: {error}</p>
                    </div>
                )}

                {/* Search + Filters */}
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6 flex flex-wrap gap-4">
                    {/* Search */}
                    <div className="relative flex-1 min-w-[250px]">
                        <Search
                            size={20}
                            className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                        />
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setPagination((p) => ({ ...p, page: 1 }));
                            }}
                            placeholder="Search leads..."
                            className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                        />
                    </div>

                    {/* Status Filter */}
                    <select
                        value={filters.status}
                        onChange={(e) =>
                            setFilters((f) => ({
                                ...f,
                                status: e.target.value,
                            }))
                        }
                        className="border rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">All Status</option>
                        <option value="New">New</option>
                        <option value="Contacted">Contacted</option>
                        <option value="Qualified">Qualified</option>
                        <option value="Lost">Lost</option>
                        <option value="Won">Won</option>
                    </select>

                    {/* Source Filter */}
                    <select
                        value={filters.source}
                        onChange={(e) =>
                            setFilters((f) => ({
                                ...f,
                                source: e.target.value,
                            }))
                        }
                        className="border rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">All Sources</option>
                        <option value="Website">Website</option>
                        <option value="Facebook Ads">Facebook Ads</option>
                        <option value="Google Ads">Google Ads</option>
                        <option value="Referral">Referral</option>
                        <option value="Events">Events</option>
                        <option value="Other">Other</option>
                    </select>

                    {/* Qualified Filter */}
                    <select
                        value={filters.qualified}
                        onChange={(e) =>
                            setFilters((f) => ({
                                ...f,
                                qualified: e.target.value,
                            }))
                        }
                        className="border rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white"
                    >
                        <option value="">Qualified?</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                    </select>
                </div>

                {/* AG Grid */}
                <div className="ag-theme-alpine w-full h-[600px]">
                    {/* {loading && leadData.length === 0 ? (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center">
                                <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                                <p className="text-gray-600">
                                    Loading leads...
                                </p>
                            </div>
                        </div>
                    ) : leadData.length > 0 ? ( */}
                    <AgGridReact
                        onGridReady={onGridReady}
                        columnDefs={columnDefs}
                        gridOptions={gridOptions}
                        rowData={[]} // start empty, then use gridApi.setRowData
                    />
                    {/* ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-600">No leads found</p>
                        </div>
                    )} */}
                </div>

                <div className="flex justify-between items-center mt-4">
                    <p className="text-sm text-gray-600">
                        Showing {leadData?.length || 0} leads
                    </p>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => fetchLeads()}
                            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200"
                        >
                            Refresh
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
