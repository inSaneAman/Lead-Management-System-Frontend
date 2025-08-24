import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import {
    UserPlus,
    ArrowLeft,
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
} from "lucide-react";
import * as Yup from "yup";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const validationSchema = Yup.object({
        firstName: Yup.string()
            .min(2, "First name must be at least 2 characters")
            .required("First name is required"),
        lastName: Yup.string()
            .min(2, "Last name must be at least 2 characters")
            .required("Last name is required"),
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),
        password: Yup.string()
            .min(8, "Password must be at least 8 characters")
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
                "Password must contain at least one uppercase letter, one lowercase letter, and one number"
            )
            .required("Password is required"),
    });

    const handleSubmit = (values, { setSubmitting, resetForm }) => {
        console.log("Signup values:", values);
        setTimeout(() => {
            alert("Account created successfully!");
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

            <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="max-w-md w-full">
                    <div className="text-center mb-2">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 rounded-full shadow-lg mb-4">
                            <UserPlus size={24} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                            Create Account
                        </h1>
                        <p className="text-gray-600 dark:text-gray-300">
                            Join our lead management platform
                        </p>
                    </div>

                    <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-3xl shadow-2xl border border-white/20 dark:border-gray-700/20 p-8">
                        <Formik
                            initialValues={{
                                firstName: "",
                                lastName: "",
                                email: "",
                                password: "",
                            }}
                            validationSchema={validationSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form className="space-y-3">
                                    <div>
                                        <label
                                            htmlFor="firstName"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            First Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User
                                                    size={20}
                                                    className="text-gray-400"
                                                />
                                            </div>
                                            <Field
                                                type="text"
                                                id="firstName"
                                                name="firstName"
                                                className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                    errors.firstName &&
                                                    touched.firstName
                                                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                        : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                }`}
                                                placeholder="Enter your first name"
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="firstName"
                                            component="div"
                                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="lastName"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            Last Name
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <User
                                                    size={20}
                                                    className="text-gray-400"
                                                />
                                            </div>
                                            <Field
                                                type="text"
                                                id="lastName"
                                                name="lastName"
                                                className={`block w-full pl-10 pr-3 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                    errors.lastName &&
                                                    touched.lastName
                                                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                        : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                }`}
                                                placeholder="Enter your last name"
                                            />
                                        </div>
                                        <ErrorMessage
                                            name="lastName"
                                            component="div"
                                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                                        />
                                    </div>

                                    <div>
                                        <label
                                            htmlFor="email"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            Email Address
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
                                                placeholder="Enter your email"
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
                                            htmlFor="password"
                                            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
                                        >
                                            Password
                                        </label>
                                        <div className="relative">
                                            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                                <Lock
                                                    size={20}
                                                    className="text-gray-400"
                                                />
                                            </div>
                                            <Field
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                id="password"
                                                name="password"
                                                className={`block w-full pl-10 pr-12 py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                                                    errors.password &&
                                                    touched.password
                                                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                                                        : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                                }`}
                                                placeholder="Create a password"
                                            />
                                            <button
                                                type="button"
                                                className="absolute inset-y-0 right-0 pr-3 flex items-center"
                                                onClick={() =>
                                                    setShowPassword(
                                                        !showPassword
                                                    )
                                                }
                                            >
                                                {showPassword ? (
                                                    <EyeOff
                                                        size={20}
                                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                    />
                                                ) : (
                                                    <Eye
                                                        size={20}
                                                        className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                    />
                                                )}
                                            </button>
                                        </div>
                                        <ErrorMessage
                                            name="password"
                                            component="div"
                                            className="mt-1 text-sm text-red-600 dark:text-red-400"
                                        />
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                                    >
                                        {isSubmitting ? (
                                            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                        ) : (
                                            <>
                                                <UserPlus size={20} />
                                                Create Account
                                            </>
                                        )}
                                    </button>
                                </Form>
                            )}
                        </Formik>

                        <div className="mt-6">
                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-gray-300 dark:border-gray-600" />
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-white/80 dark:bg-gray-800/80 text-gray-500 dark:text-gray-400">
                                        Already have an account?
                                    </span>
                                </div>
                            </div>
                        </div>

                        <div className="mt-6 text-center">
                            <Link
                                to="/login"
                                className="text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300 font-medium transition-colors duration-200"
                            >
                                Sign In
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
