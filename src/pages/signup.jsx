import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { Formik, Form } from "formik";
import { UserPlus, ArrowLeft, Mail, Lock, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";

import TextInput from "../components/textInput";
import Spinner from "../components/Spinner";
import { signupSchema } from "../utils/validationSchemas";
import { createNewAccount } from "../redux/slices/authSlice";

export default function Signup() {
    const [showPassword, setShowPassword] = useState(false);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { isLoggedIn } = useSelector((state) => state.auth);

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);

    const handleSubmit = async (values, { setSubmitting, resetForm }) => {
        try {
            const result = await dispatch(createNewAccount(values)).unwrap();
            console.log("Signup successful:", result);
            resetForm();
            navigate("/login");
        } catch (err) {
            console.error("Signup failed:", err);
        } finally {
            setSubmitting(false);
        }
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
                                first_name: "",
                                last_name: "",
                                email: "",
                                password: "",
                            }}
                            validationSchema={signupSchema}
                            onSubmit={handleSubmit}
                        >
                            {({ isSubmitting, errors, touched }) => (
                                <Form className="space-y-4">
                                    <TextInput
                                        label="First Name"
                                        name="first_name"
                                        type="text"
                                        icon={User}
                                        error={errors.first_name}
                                        touched={touched.first_name}
                                    />

                                    <TextInput
                                        label="Last Name"
                                        name="last_name"
                                        type="text"
                                        icon={User}
                                        error={errors.last_name}
                                        touched={touched.last_name}
                                    />

                                    <TextInput
                                        label="Email Address"
                                        name="email"
                                        type="email"
                                        icon={Mail}
                                        error={errors.email}
                                        touched={touched.email}
                                    />

                                    <TextInput
                                        label="Password"
                                        name="password"
                                        type="password"
                                        icon={Lock}
                                        error={errors.password}
                                        touched={touched.password}
                                        showPasswordToggle
                                        showPassword={showPassword}
                                        setShowPassword={setShowPassword}
                                    />
                                    <button
                                        type="submit"
                                        disabled={isSubmitting}
                                        className="w-full flex justify-center items-center gap-2 py-3 px-4 border border-transparent rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
                                    >
                                        {isSubmitting ? (
                                            <Spinner />
                                        ) : (
                                            <>
                                                <UserPlus size={20} /> Create
                                                Account
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
