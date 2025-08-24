import { Link } from "react-router-dom";
import { Formik, Form } from "formik";
import {
    UserPlus,
    ArrowLeft,
    User,
    Building,
    Target,
    Activity,
} from "lucide-react";

import TextInput from "../components/textInput";
import SelectInput from "../components/selectInput";
import CheckboxInput from "../components/checkboxInput";
import { createLeadSchema } from "../utils/validationSchemas";

export default function CreateLead() {
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

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log("Lead creation values:", values);
        setTimeout(() => {
            alert("Lead created successfully!");
            setSubmitting(false);
            resetForm();
        }, 1000);
    };

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
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-full shadow-lg mb-4">
                            <UserPlus size={32} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Create New Lead
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Add a new lead to your management system
                        </p>
                    </div>
                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 p-8">
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
                            validationSchema={createLeadSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form className="space-y-6">
                                    <Section
                                        title="Personal Information"
                                        icon={
                                            <User className="text-indigo-600" />
                                        }
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <TextInput
                                                label="First Name"
                                                name="first_name"
                                                type="text"
                                                error={errors.first_name}
                                                touched={touched.first_name}
                                            />
                                            <TextInput
                                                label="Last Name"
                                                name="last_name"
                                                type="text"
                                                error={errors.last_name}
                                                touched={touched.last_name}
                                            />
                                            <TextInput
                                                label="Email"
                                                name="email"
                                                type="email"
                                                error={errors.email}
                                                touched={touched.email}
                                            />
                                            <TextInput
                                                label="Phone"
                                                name="phone"
                                                type="tel"
                                                error={errors.phone}
                                                touched={touched.phone}
                                            />
                                        </div>
                                    </Section>

                                    <Section
                                        title="Company Information"
                                        icon={
                                            <Building className="text-indigo-600" />
                                        }
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                            <TextInput
                                                label="Company"
                                                name="company"
                                                type="text"
                                                error={errors.company}
                                                touched={touched.company}
                                            />
                                            <TextInput
                                                label="City"
                                                name="city"
                                                type="text"
                                                error={errors.city}
                                                touched={touched.city}
                                            />
                                            <TextInput
                                                label="State"
                                                name="state"
                                                type="text"
                                                error={errors.state}
                                                touched={touched.state}
                                            />
                                        </div>
                                    </Section>
                                    <Section
                                        title="Lead Details"
                                        icon={
                                            <Target className="text-indigo-600" />
                                        }
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <SelectInput
                                                label="Source"
                                                name="source"
                                                options={sourceOptions}
                                                error={errors.source}
                                                touched={touched.source}
                                            />
                                            <SelectInput
                                                label="Status"
                                                name="status"
                                                options={statusOptions}
                                                error={errors.status}
                                                touched={touched.status}
                                            />
                                            <TextInput
                                                label="Score"
                                                name="score"
                                                type="number"
                                                error={errors.score}
                                                touched={touched.score}
                                            />
                                            <TextInput
                                                label="Lead Value"
                                                name="lead value"
                                                type="number"
                                                error={errors.lead_value}
                                                touched={touched.lead_value}
                                            />
                                        </div>
                                    </Section>
                                    <Section
                                        title="Additional Information"
                                        icon={
                                            <Activity className="text-indigo-600" />
                                        }
                                    >
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <TextInput
                                                label="Last Activity Date"
                                                name="last_activity_at"
                                                type="datetime-local"
                                                error={errors.last_activity_at}
                                                touched={
                                                    touched.last_activity_at
                                                }
                                            />
                                            <CheckboxInput
                                                name="is_qualified"
                                                label="Mark as Qualified"
                                                description="This lead meets qualification criteria"
                                            />
                                        </div>
                                    </Section>
                                    <div className="pt-6 border-t border-gray-200 dark:border-gray-600">
                                        <button
                                            type="submit"
                                            disabled={isSubmitting}
                                            className="w-full flex justify-center items-center gap-2 py-4 px-6 rounded-xl text-lg font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:scale-105 transition-all"
                                        >
                                            {isSubmitting ? (
                                                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                            ) : (
                                                <>
                                                    {" "}
                                                    <UserPlus size={24} />{" "}
                                                    Create Lead{" "}
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

function Section({ title, icon, children }) {
    return (
        <div className="border-b border-gray-200 dark:border-gray-600 pb-6">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                {icon}
                {title}
            </h3>
            {children}
        </div>
    );
}
