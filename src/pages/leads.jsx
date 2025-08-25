import { useState, useEffect, useMemo, useCallback } from "react";
import { Link } from "react-router-dom";
import {
    Search,
    Plus,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    ChevronsLeft,
    ChevronsRight,
} from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import Navbar from "../components/Navbar";
import { getAllLeads, deleteLead, setPage } from "../redux/slices/leadSlice";

export default function Leads() {
    const dispatch = useDispatch();
    const { leadData, pagination, loading, error } = useSelector(
        (state) => state.lead
    );

    const [searchTerm, setSearchTerm] = useState("");
    const [filters, setFilters] = useState({
        status: "all",
        source: "all",
        qualified: "all",
    });
    const [sortConfig, setSortConfig] = useState({
        sort_by: "created_at",
        sort_order: "desc",
    });

    useEffect(() => {
        const timer = setTimeout(() => {
            if (searchTerm !== "") {
                fetchLeadsWithFilters();
            }
        }, 500);

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const fetchLeadsWithFilters = useCallback(
        (page = 1) => {
            const params = {
                page,
                limit: pagination.limit,
                search: searchTerm || undefined,
                status: filters.status !== "all" ? filters.status : undefined,
                source: filters.source !== "all" ? filters.source : undefined,
                is_qualified:
                    filters.qualified !== "all" ? filters.qualified : undefined,
                sort_by: sortConfig.sort_by,
                sort_order: sortConfig.sort_order,
            };

            dispatch(getAllLeads(params)).then((result) => {
                if (result.meta.requestStatus === "fulfilled") {
                    toast.success(`Loaded ${result.payload.data.length} leads`);
                }
            });
        },
        [dispatch, searchTerm, filters, sortConfig, pagination.limit]
    );

    useEffect(() => {
        fetchLeadsWithFilters(1);
    }, [fetchLeadsWithFilters]);

    const handleFilterChange = (filterType, value) => {
        setFilters((prev) => ({ ...prev, [filterType]: value }));
        dispatch(setPage(1));
    };
    const handlePageChange = (newPage) => {
        if (newPage >= 1 && newPage <= pagination.totalPages) {
            dispatch(setPage(newPage));
            fetchLeadsWithFilters(newPage);
        }
    };
    const handleSort = (field) => {
        setSortConfig((prev) => ({
            sort_by: field,
            sort_order:
                prev.sort_by === field && prev.sort_order === "asc"
                    ? "desc"
                    : "asc",
        }));
    };

    const handleEditLead = (id) => {
        toast.info(
            `Edit lead functionality would be implemented for ID: ${id}`
        );
    };

    const handleDeleteLead = async (id) => {
        if (window.confirm("Are you sure you want to delete this lead?")) {
            try {
                await dispatch(deleteLead(id)).unwrap();
                fetchLeadsWithFilters(pagination.page);
                toast.success("Lead deleted successfully!");
            } catch (error) {
                toast.error("Failed to delete lead.");
                console.error("Failed to delete lead:", error);
            }
        }
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            new: "bg-blue-100 text-blue-800",
            contacted: "bg-yellow-100 text-yellow-800",
            qualified: "bg-green-100 text-green-800",
            won: "bg-emerald-100 text-emerald-800",
            lost: "bg-red-100 text-red-800",
        };
        return statusColors[status] || "bg-gray-100 text-gray-800";
    };

    const formatCurrency = (value) => {
        return new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(value);
    };

    const getSortIcon = (field) => {
        if (sortConfig.sort_by !== field) return null;
        return sortConfig.sort_order === "asc" ? "↑" : "↓";
    };

    if (loading && (!leadData || leadData.length === 0)) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
                <Navbar />
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <div className="w-8 h-8 border-4 border-indigo-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                        <p className="text-gray-600 dark:text-gray-300">
                            Loading leads...
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    if (error && (!leadData || leadData.length === 0)) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
                <Navbar />
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <p className="text-red-600 dark:text-red-400">
                            Error: {error}
                        </p>
                        <button
                            onClick={() => fetchLeadsWithFilters(1)}
                            className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                        >
                            Retry
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
            <Navbar />

            <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
                    <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white">
                        Lead Management
                    </h1>
                    <Link
                        to="/create-lead"
                        className="flex items-center gap-2 px-3 sm:px-4 py-2 bg-indigo-600 text-white rounded-lg shadow hover:bg-indigo-700 transition-colors duration-200 text-sm sm:text-base"
                    >
                        <Plus size={20} /> Create Lead
                    </Link>
                </div>
                <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow mb-6">
                    <div className="flex flex-col sm:flex-row flex-wrap gap-4">
                        <div className="relative flex-1 min-w-[200px]">
                            <Search
                                size={20}
                                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                            />
                            <input
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Search leads..."
                                className="w-full pl-10 pr-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white text-sm sm:text-base"
                            />
                        </div>
                        {["status", "source", "qualified"].map((filter) => (
                            <select
                                key={filter}
                                value={filters[filter]}
                                onChange={(e) =>
                                    handleFilterChange(filter, e.target.value)
                                }
                                className="border rounded-lg px-4 py-2 dark:bg-gray-700 dark:text-white text-sm sm:text-base min-w-[120px]"
                            >
                                {filter === "status" && (
                                    <>
                                        <option value="all">All Status</option>
                                        <option value="new">New</option>
                                        <option value="contacted">
                                            Contacted
                                        </option>
                                        <option value="qualified">
                                            Qualified
                                        </option>
                                        <option value="lost">Lost</option>
                                        <option value="won">Won</option>
                                    </>
                                )}
                                {filter === "source" && (
                                    <>
                                        <option value="all">All Sources</option>
                                        <option value="website">Website</option>
                                        <option value="facebook_ads">
                                            Facebook Ads
                                        </option>
                                        <option value="google_ads">
                                            Google Ads
                                        </option>
                                        <option value="referral">
                                            Referral
                                        </option>
                                        <option value="events">Events</option>
                                        <option value="other">Other</option>
                                    </>
                                )}
                                {filter === "qualified" && (
                                    <>
                                        <option value="all">All</option>
                                        <option value="Yes">Yes</option>
                                        <option value="No">No</option>
                                    </>
                                )}
                            </select>
                        ))}
                    </div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="border-b border-gray-200 dark:border-gray-700 text-sm sm:text-base">
                                {[
                                    "S.No",
                                    "Name",
                                    "Email",
                                    "Phone",
                                    "Company",
                                    "Location",
                                    "Source",
                                    "Status",
                                    "Score",
                                    "Lead Value",
                                    "Qualified",
                                    "Actions",
                                ].map((col, idx) => (
                                    <th
                                        key={idx}
                                        className="text-left py-3 px-2 sm:px-4 font-medium text-gray-900 dark:text-white cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-700"
                                        onClick={() =>
                                            [
                                                "Name",
                                                "Email",
                                                "Company",
                                                "Score",
                                                "Lead Value",
                                            ].includes(col) &&
                                            handleSort(
                                                col
                                                    .toLowerCase()
                                                    .replace(" ", "_")
                                            )
                                        }
                                    >
                                        {col}{" "}
                                        {getSortIcon(
                                            col.toLowerCase().replace(" ", "_")
                                        )}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody>
                            {leadData.map((lead, index) => (
                                <tr
                                    key={lead.id}
                                    className="border-b border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 text-sm sm:text-base"
                                >
                                    <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300">
                                        {(pagination.page - 1) *
                                            pagination.limit +
                                            index +
                                            1}
                                    </td>
                                    <td className="py-2 px-2 sm:px-4 font-medium text-gray-900 dark:text-white">
                                        <Link
                                            to={`/lead/${lead.id}`}
                                            className="text-blue-600 hover:text-blue-800 hover:underline transition-colors"
                                        >
                                            {lead.first_name} {lead.last_name}
                                        </Link>
                                    </td>
                                    <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300">
                                        {lead.email}
                                    </td>
                                    <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300">
                                        {lead.phone}
                                    </td>
                                    <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300">
                                        {lead.company}
                                    </td>
                                    <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300">
                                        {lead.city}, {lead.state}
                                    </td>
                                    <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300 capitalize">
                                        {lead.source.replace("_", " ")}
                                    </td>
                                    <td className="py-2 px-2 sm:px-4">
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${getStatusBadge(
                                                lead.status
                                            )}`}
                                        >
                                            {lead.status
                                                .charAt(0)
                                                .toUpperCase() +
                                                lead.status.slice(1)}
                                        </span>
                                    </td>
                                    <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300">
                                        {lead.score}
                                    </td>
                                    <td className="py-2 px-2 sm:px-4 text-gray-600 dark:text-gray-300">
                                        {formatCurrency(lead.lead_value)}
                                    </td>
                                    <td className="py-2 px-2 sm:px-4">
                                        <span
                                            className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                                                lead.is_qualified
                                                    ? "bg-green-100 text-green-800"
                                                    : "bg-gray-100 text-gray-800"
                                            }`}
                                        >
                                            {lead.is_qualified ? "Yes" : "No"}
                                        </span>
                                    </td>
                                    <td className="py-2 px-2 sm:px-4">
                                        <div className="flex flex-wrap gap-1">
                                            <button
                                                onClick={() =>
                                                    handleEditLead(lead.id)
                                                }
                                                className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                                                title="Edit Lead"
                                            >
                                                <Edit size={16} />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    handleDeleteLead(lead.id)
                                                }
                                                className="p-1 text-red-600 hover:text-red-800 hover:bg-red-50 rounded"
                                                title="Delete Lead"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>

                    {leadData.length === 0 && !loading && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No leads found matching your criteria.
                        </div>
                    )}
                </div>
                {pagination.totalPages > 1 && (
                    <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm sm:text-base">
                        <div className="text-gray-600 dark:text-gray-400">
                            Showing{" "}
                            {(pagination.page - 1) * pagination.limit + 1} to{" "}
                            {Math.min(
                                pagination.page * pagination.limit,
                                pagination.total
                            )}{" "}
                            of {pagination.total} leads
                        </div>

                        <div className="flex items-center gap-2 flex-wrap">
                            <button
                                onClick={() => handlePageChange(1)}
                                disabled={pagination.page === 1}
                                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronsLeft size={20} />
                            </button>
                            <button
                                onClick={() =>
                                    handlePageChange(pagination.page - 1)
                                }
                                disabled={pagination.page === 1}
                                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronLeft size={20} />
                            </button>
                            <span className="px-3 py-2 text-gray-700 dark:text-gray-300">
                                Page {pagination.page} of{" "}
                                {pagination.totalPages}
                            </span>
                            <button
                                onClick={() =>
                                    handlePageChange(pagination.page + 1)
                                }
                                disabled={
                                    pagination.page === pagination.totalPages
                                }
                                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronRight size={20} />
                            </button>
                            <button
                                onClick={() =>
                                    handlePageChange(pagination.totalPages)
                                }
                                disabled={
                                    pagination.page === pagination.totalPages
                                }
                                className="p-2 text-gray-500 hover:text-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                <ChevronsRight size={20} />
                            </button>
                        </div>
                    </div>
                )}
                <div className="mt-4 flex justify-end">
                    <button
                        onClick={() => fetchLeadsWithFilters(pagination.page)}
                        disabled={loading}
                        className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200 disabled:opacity-50"
                    >
                        {loading ? "Refreshing..." : "Refresh"}
                    </button>
                </div>
            </div>
        </div>
    );
}
