import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { Sun, Moon, ArrowRight, UserPlus, LogIn } from "lucide-react";

export default function LandingPage() {
    

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-100 to-purple-100 dark:from-gray-900 dark:via-gray-800 dark:to-black transition-all duration-700">
            

            <div className="min-h-screen flex flex-col items-center justify-center px-4 sm:px-6 lg:px-8">
                <div className="text-center max-w-4xl mx-auto">
                    <div className="m-8">
                        <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-br from-indigo-500 to-purple-600 dark:from-indigo-400 dark:to-purple-500 rounded-full shadow-2xl">
                            <UserPlus size={48} className="text-white" />
                        </div>
                    </div>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-gray-900 dark:text-white leading-tight">
                        Lead Management
                        <span className="block bg-gradient-to-r from-indigo-600 to-purple-600 dark:from-indigo-400 dark:to-purple-400 bg-clip-text text-transparent">
                            System
                        </span>
                    </h1>

                    <p className="text-lg sm:text-xl md:text-2xl text-gray-600 dark:text-gray-300 mb-4 max-w-2xl mx-auto leading-relaxed">
                        Streamline your business leads with our powerful and intuitive management platform
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6 justify-center items-center">
                        <Link
                            to="/login"
                            className="group flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform"
                        >
                            <LogIn size={20} />
                            Sign In
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                        
                        <Link
                            to="/signup"
                            className="group flex items-center gap-2 px-8 py-4 bg-white dark:bg-gray-800 text-gray-900 dark:text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 transform border-2 border-gray-200 dark:border-gray-600 hover:border-indigo-300 dark:hover:border-indigo-400"
                        >
                            <UserPlus size={20} />
                            Get Started
                            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-300" />
                        </Link>
                    </div>

                    <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                        <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
                            <div className="w-12 h-12 bg-indigo-100 dark:bg-indigo-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <UserPlus size={24} className="text-indigo-600 dark:text-indigo-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Lead Capture</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Efficiently capture and organize leads from multiple sources</p>
                        </div>
                        
                        <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
                            <div className="w-12 h-12 bg-purple-100 dark:bg-purple-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <LogIn size={24} className="text-purple-600 dark:text-purple-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Smart Analytics</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">Track performance and optimize your lead conversion process</p>
                        </div>
                        
                        <div className="text-center p-6 bg-white/60 dark:bg-gray-800/60 rounded-2xl backdrop-blur-sm border border-white/20 dark:border-gray-700/20">
                            <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                                <ArrowRight size={24} className="text-blue-600 dark:text-blue-400" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Management</h3>
                            <p className="text-gray-600 dark:text-gray-300 text-sm">User-friendly interface for seamless lead management</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

