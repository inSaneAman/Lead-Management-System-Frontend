import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
    UserPlus,
    ArrowLeft,
    Mail,
    User,
    Phone,
    Building,
    Target,
    Activity,
    DollarSign,
    Calendar,
} from "lucide-react";
import * as Yup from "yup";

export default function CreateLead() {
    const validationSchema = Yup.object({
        first_name: Yup.string()
            .min(2, "First name must be at least 2 characters")
            .required("First name is required"),
        last_name: Yup.string()
            .min(2, "Last name must be at least 2 characters")
            .required("Last name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        phone: Yup.string()
            .matches(
                /^[\+]?[1-9][\d]{0,15}$/,
                "Please enter a valid phone number"
            )
            .required("Phone number is required"),
        company: Yup.string()
            .min(2, "Company name must be at least 2 characters")
            .required("Company name is required"),
        city: Yup.string()
            .min(2, "City must be at least 2 characters")
            .required("City is required"),
        state: Yup.string()
            .min(2, "State must be at least 2 characters")
            .required("State is required"),
        source: Yup.string()
            .oneOf(
                [
                    "website",
                    "facebook_ads",
                    "google_ads",
                    "referral",
                    "events",
                    "other",
                ],
                "Please select a valid source"
            )
            .required("Source is required"),
        status: Yup.string()
            .oneOf(
                ["new", "contacted", "qualified", "lost", "won"],
                "Please select a valid status"
            )
            .required("Status is required"),
        score: Yup.number()
            .min(0, "Score must be at least 0")
            .max(100, "Score must be at most 100")
            .integer("Score must be a whole number")
            .required("Score is required"),
        lead_value: Yup.number()
            .min(0, "Lead value must be at least 0")
            .required("Lead value is required"),
        last_activity_at: Yup.date()
            .nullable()
            .max(new Date(), "Last activity cannot be in the future"),
        is_qualified: Yup.boolean(),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log("Lead creation values:", values);
        setTimeout(() => {
            alert("Lead created successfully!");
            setSubmitting(false);
            resetForm();
        }, 1000);
    };

    const sourceOptions = [
        { value: "website", label: "Website" },
        { value: "facebook_ads", label: "Facebook Ads" },
        { value: "google_ads", label: "Google Ads" },
        { value: "referral", label: "Referral" },
        { value: "events", label: "Events" },
        { value: "other", label: "Other" },
    ];

    const statusOptions = [
        { value: "new", label: "New" },
        { value: "contacted", label: "Contacted" },
        { value: "qualified", label: "Qualified" },
        { value: "lost", label: "Lost" },
        { value: "won", label: "Won" },
    ];

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-700">
            <Link
                to="/"
                className="fixed top-6 left-6 z-50 p-3 rounded-full bg-white/80 dark:bg-gray-800/80 text-gray-700 dark:text-gray-200 hover:scale-110 hover:bg-white dark:hover:bg-gray-700 transition-all duration-300 shadow-lg backdrop-blur-sm"
            >
                <ArrowLeft size={24} />
            </Link>

            <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8 py-8">
                <div className="max-w-4xl w-full">
                    <div className="text-center mb-8">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 rounded-full shadow-lg mb-4">
                            <UserPlus size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Create New Lead
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Add a new lead to your management system
                        </p>
                    </div>

                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8">
                        <Formik
                            initialValues={{
                                first_name: "",
                                last_name: "",
                                email: "",
                                phone: "",
                                company: "",
                                city: "",
                                state: "",
                                source: "",
                                status: "new",
                                score: 0,
                                lead_value: "",
                                last_activity_at: "",
                                is_qualified: false,
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, touched, values }) => (
                                <Form className="space-y-6">
                                    <div className="border-b border-gray-200 dark:border-gray-600 pb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <User
                                                size={20}
                                                className="text-indigo-600 dark:text-indigo-400"
                                            />
                                            Personal Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label
                                                    htmlFor="first_name"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                                >
                                                    First Name *
                                                </label>
                                                <Field
                                                    type="text"
                                                    id="first_name"
                                                    name="first_name"
                                                    className={`block w-full px-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                        errors.first_name &&
                                                        touched.first_name
                                                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                            : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                    }`}
                                                    placeholder="Enter first name"
                                                />
                                                <ErrorMessage
                                                    name="first_name"
                                                    component="div"
                                                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="last_name"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                                >
                                                    Last Name *
                                                </label>
                                                <Field
                                                    type="text"
                                                    id="last_name"
                                                    name="last_name"
                                                    className={`block w-full px-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                        errors.last_name &&
                                                        touched.last_name
                                                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                            : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                    }`}
                                                    placeholder="Enter last name"
                                                />
                                                <ErrorMessage
                                                    name="last_name"
                                                    component="div"
                                                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="email"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                                >
                                                    Email Address *
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Mail
                                                            size={20}
                                                            className="text-gray-400"
                                                        />
                                                    </div>
                                                    <Field
                                                        type="email"
                                                        id="email"
                                                        name="email"
                                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                            errors.email &&
                                                            touched.email
                                                                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                                : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        }`}
                                                        placeholder="Enter email address"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="email"
                                                    component="div"
                                                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                                                />
                                            </div>
                                            <div>
                                                <label
                                                    htmlFor="phone"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                                >
                                                    Phone Number *
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Phone
                                                            size={20}
                                                            className="text-gray-400"
                                                        />
                                                    </div>
                                                    <Field
                                                        type="tel"
                                                        id="phone"
                                                        name="phone"
                                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                            errors.phone &&
                                                            touched.phone
                                                                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                                : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        }`}
                                                        placeholder="Enter phone number"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="phone"
                                                    component="div"
                                                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-b border-gray-200 dark:border-gray-600 pb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <Building
                                                size={20}
                                                className="text-indigo-600 dark:text-indigo-400"
                                            />
                                            Company Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <div className="md:col-span-1">
                                                <label
                                                    htmlFor="company"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                                >
                                                    Company *
                                                </label>
                                                <Field
                                                    type="text"
                                                    id="company"
                                                    name="company"
                                                    className={`block w-full px-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                        errors.company &&
                                                        touched.company
                                                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                            : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                    }`}
                                                    placeholder="Enter company name"
                                                />
                                                <ErrorMessage
                                                    name="company"
                                                    component="div"
                                                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="city"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                                >
                                                    City *
                                                </label>
                                                <Field
                                                    type="text"
                                                    id="city"
                                                    name="city"
                                                    className={`block w-full px-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                        errors.city &&
                                                        touched.city
                                                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                            : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                    }`}
                                                    placeholder="Enter city"
                                                />
                                                <ErrorMessage
                                                    name="city"
                                                    component="div"
                                                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="state"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                                >
                                                    State *
                                                </label>
                                                <Field
                                                    type="text"
                                                    id="state"
                                                    name="state"
                                                    className={`block w-full px-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                        errors.state &&
                                                        touched.state
                                                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                            : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                    }`}
                                                    placeholder="Enter state"
                                                />
                                                <ErrorMessage
                                                    name="state"
                                                    component="div"
                                                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="border-b border-gray-200 dark:border-gray-600 pb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <Target
                                                size={20}
                                                className="text-indigo-600 dark:text-indigo-400"
                                            />
                                            Lead Details
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label
                                                    htmlFor="source"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                                >
                                                    Lead Source *
                                                </label>
                                                <Field
                                                    as="select"
                                                    id="source"
                                                    name="source"
                                                    className={`block w-full px-3 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                        errors.source &&
                                                        touched.source
                                                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                            : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                    }`}
                                                >
                                                    <option value="">
                                                        Select source
                                                    </option>
                                                    {sourceOptions.map(
                                                        (option) => (
                                                            <option
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label}
                                                            </option>
                                                        )
                                                    )}
                                                </Field>
                                                <ErrorMessage
                                                    name="source"
                                                    component="div"
                                                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="status"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                                >
                                                    Status *
                                                </label>
                                                <Field
                                                    as="select"
                                                    id="status"
                                                    name="status"
                                                    className={`block w-full px-3 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                        errors.status &&
                                                        touched.status
                                                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                            : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                    }`}
                                                >
                                                    {statusOptions.map(
                                                        (option) => (
                                                            <option
                                                                key={
                                                                    option.value
                                                                }
                                                                value={
                                                                    option.value
                                                                }
                                                            >
                                                                {option.label}
                                                            </option>
                                                        )
                                                    )}
                                                </Field>
                                                <ErrorMessage
                                                    name="status"
                                                    component="div"
                                                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="score"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                                >
                                                    Lead Score (0-100) *
                                                </label>
                                                <div className="relative">
                                                    <Field
                                                        type="number"
                                                        id="score"
                                                        name="score"
                                                        min="0"
                                                        max="100"
                                                        className={`block w-full px-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                            errors.score &&
                                                            touched.score
                                                                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                                : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        }`}
                                                        placeholder="Enter score (0-100)"
                                                    />
                                                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                                        <span className="text-sm text-gray-500 dark:text-gray-400">
                                                            {values.score}/100
                                                        </span>
                                                    </div>
                                                </div>
                                                <ErrorMessage
                                                    name="score"
                                                    component="div"
                                                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                                                />
                                            </div>

                                            <div>
                                                <label
                                                    htmlFor="lead_value"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                                >
                                                    Lead Value ($) *
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <DollarSign
                                                            size={20}
                                                            className="text-gray-400"
                                                        />
                                                    </div>
                                                    <Field
                                                        type="number"
                                                        id="lead_value"
                                                        name="lead_value"
                                                        min="0"
                                                        step="0.01"
                                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                            errors.lead_value &&
                                                            touched.lead_value
                                                                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                                : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        }`}
                                                        placeholder="Enter lead value"
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="lead_value"
                                                    component="div"
                                                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pb-6">
                                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                                            <Activity
                                                size={20}
                                                className="text-indigo-600 dark:text-indigo-400"
                                            />
                                            Additional Information
                                        </h3>
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <div>
                                                <label
                                                    htmlFor="last_activity_at"
                                                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                                >
                                                    Last Activity Date
                                                </label>
                                                <div className="relative">
                                                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                        <Calendar
                                                            size={20}
                                                            className="text-gray-400"
                                                        />
                                                    </div>
                                                    <Field
                                                        type="datetime-local"
                                                        id="last_activity_at"
                                                        name="last_activity_at"
                                                        className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                            errors.last_activity_at &&
                                                            touched.last_activity_at
                                                                ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                                : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                        }`}
                                                    />
                                                </div>
                                                <ErrorMessage
                                                    name="last_activity_at"
                                                    component="div"
                                                    className="mt-1 text-sm text-red-600 dark:text-red-400"
                                                />
                                            </div>

                                            <div className="flex items-center">
                                                <div className="flex items-center h-5">
                                                    <Field
                                                        type="checkbox"
                                                        id="is_qualified"
                                                        name="is_qualified"
                                                        className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                                                    />
                                                </div>
                                                <div className="ml-3 text-sm">
                                                    <label
                                                        htmlFor="is_qualified"
                                                        className="font-medium text-gray-700 dark:text-gray-300"
                                                    >
                                                        Mark as Qualified
                                                    </label>
                                                    <p className="text-gray-500 dark:text-gray-400">
                                                        This lead meets
                                                        qualification criteria
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full flex justify-center items-center gap-2 py-4 px-6 border border-transparent rounded-xl shadow-sm text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    <UserPlus size={24} />
                                                    Create Lead
                                                </>
                                            )}
                                        </button>
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            </div>
        </div>
    );
}
