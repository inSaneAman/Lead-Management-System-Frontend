import { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import toast from "react-hot-toast";
import {
    Edit,
    Trash2,
    ArrowLeft,
    Mail,
    Phone,
    Building,
    Target,
    Calendar,
    User,
    DollarSign,
} from "lucide-react";

import { getSingleLead, deleteLead } from "../redux/slices/leadSlice";
import Navbar from "../components/Navbar";
import InfoCard from "../components/infoCard";
import Badge from "../components/badge";
import DeleteModal from "../components/deleteModel";
import QuickActionButton from "../components/quickActions";

export default function SingleLead() {
    const { id } = useParams();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { singleLead, loading, error } = useSelector((state) => state.lead);

    const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
    const [isDeleting, setIsDeleting] = useState(false);

    useEffect(() => {
        if (id) dispatch(getSingleLead(id));
    }, [dispatch, id]);

    const handleDelete = async () => {
        if (!singleLead) return;
        setIsDeleting(true);
        try {
            await dispatch(deleteLead(singleLead.id)).unwrap();
            toast.success("Lead deleted successfully");
            navigate("/leads");
        } catch {
            toast.error("Failed to delete lead");
        } finally {
            setIsDeleting(false);
            setShowDeleteConfirm(false);
        }
    };

    const getStatusBadge = (status) => {
        const statusColors = {
            new: "bg-blue-100 text-blue-800 border-blue-200",
            contacted: "bg-yellow-100 text-yellow-800 border-yellow-200",
            qualified: "bg-green-100 text-green-800 border-green-200",
            won: "bg-emerald-100 text-emerald-800 border-emerald-200",
            lost: "bg-red-100 text-red-800 border-red-200",
        };
        return (
            statusColors[status] || "bg-gray-100 text-gray-800 border-gray-200"
        );
    };

    const getSourceBadge = (source) => {
        const sourceColors = {
            website: "bg-purple-100 text-purple-800 border-purple-200",
            facebook_ads: "bg-blue-100 text-blue-800 border-blue-200",
            google_ads: "bg-red-100 text-red-800 border-red-200",
            referral: "bg-green-100 text-green-800 border-green-200",
            events: "bg-orange-100 text-orange-800 border-orange-200",
            other: "bg-gray-100 text-gray-800 border-gray-200",
        };
        return (
            sourceColors[source] || "bg-gray-100 text-gray-800 border-gray-200"
        );
    };

    const formatCurrency = (value) =>
        new Intl.NumberFormat("en-IN", {
            style: "currency",
            currency: "INR",
        }).format(value);

    const formatDate = (dateString) =>
        dateString
            ? new Date(dateString).toLocaleDateString("en-IN", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
              })
            : "Never";

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p>Loading lead details...</p>
            </div>
        );
    }

    if (error || !singleLead) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <p className="text-red-600">{error || "Lead not found"}</p>
                <Link to="/leads">Back to Leads</Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-black">
            <Navbar />

            <div className="max-w-5xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8 gap-4">
                    <div className="flex items-center gap-4">
                        <Link
                            to="/leads"
                            className="p-2 rounded-lg hover:bg-white dark:hover:bg-gray-700"
                        >
                            <ArrowLeft size={24} />
                        </Link>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-white">
                                Lead Details
                            </h1>
                            <p className="text-white text-sm sm:text-base">
                                {singleLead.first_name} {singleLead.last_name}
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 sm:gap-3">
                        <Link
                            to={`/edit-lead/${singleLead.id}`}
                            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-blue-600 text-white rounded-lg text-sm sm:text-base"
                        >
                            <Edit size={18} /> Edit Lead
                        </Link>
                        <button
                            onClick={() => setShowDeleteConfirm(true)}
                            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 bg-red-600 text-white rounded-lg text-sm sm:text-base"
                        >
                            <Trash2 size={18} /> Delete
                        </button>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 space-y-6">
                        <InfoCard
                            icon={<User size={24} />}
                            title="Personal Information"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm sm:text-base">
                                <p className="font-medium text-white">
                                    First Name:
                                </p>
                                <p className="text-white">
                                    {singleLead.first_name || "N/A"}
                                </p>
                                <p className="font-medium text-white">
                                    Last Name:
                                </p>
                                <p className="text-white">
                                    {singleLead.last_name || "N/A"}
                                </p>
                                <p className="font-medium text-white">Email:</p>
                                <p className="text-white">
                                    {singleLead.email || "N/A"}
                                </p>
                                <p className="font-medium text-white">Phone:</p>
                                <p className="text-white">
                                    {singleLead.phone || "N/A"}
                                </p>
                            </div>
                        </InfoCard>

                        <InfoCard
                            icon={<Building size={24} />}
                            title="Company Information"
                        >
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 text-sm sm:text-base">
                                <p className="font-medium text-white">
                                    Company:
                                </p>
                                <p className="text-white">
                                    {singleLead.company || "N/A"}
                                </p>
                                <p className="font-medium text-white">
                                    Location:
                                </p>
                                <p className="text-white">
                                    {singleLead.city},{" "}
                                    {singleLead.state || "N/A"}
                                </p>
                            </div>
                        </InfoCard>

                        <InfoCard
                            icon={<Target size={24} />}
                            title="Lead Details"
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-2 sm:gap-4 text-sm sm:text-base">
                                <span className="text-white">Source:</span>
                                <Badge
                                    text={singleLead.source.replace("_", " ")}
                                    className={getSourceBadge(
                                        singleLead.source
                                    )}
                                />
                                <span className="text-white">Status:</span>
                                <Badge
                                    text={singleLead.status}
                                    className={getStatusBadge(
                                        singleLead.status
                                    )}
                                />
                            </div>
                        </InfoCard>
                    </div>

                    <div className="space-y-6">
                        <InfoCard
                            icon={<DollarSign size={24} />}
                            title="Lead Value"
                        >
                            <p className="text-2xl sm:text-3xl font-bold text-green-600">
                                {formatCurrency(singleLead.lead_value)}
                            </p>
                        </InfoCard>

                        <InfoCard
                            icon={<Calendar size={24} />}
                            title="Timeline"
                        >
                            <p className="text-white text-sm sm:text-base">
                                Created: {formatDate(singleLead.createdAt)}
                            </p>
                            <p className="text-white text-sm sm:text-base">
                                Updated: {formatDate(singleLead.updatedAt)}
                            </p>
                        </InfoCard>

                        <InfoCard title="Quick Actions">
                            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
                                <QuickActionButton
                                    icon={<Mail size={16} />}
                                    text="Send Email"
                                    className="bg-blue-100 text-blue-700 hover:bg-blue-200"
                                />
                                <QuickActionButton
                                    icon={<Phone size={16} />}
                                    text="Call Lead"
                                    className="bg-green-100 text-green-700 hover:bg-green-200"
                                />
                            </div>
                        </InfoCard>
                    </div>
                </div>
            </div>

            <DeleteModal
                open={showDeleteConfirm}
                onClose={() => setShowDeleteConfirm(false)}
                onConfirm={handleDelete}
                isDeleting={isDeleting}
            />
        </div>
    );
}
