import { Field, ErrorMessage } from "formik";
import { Eye, EyeOff } from "lucide-react";

export default function TextInput({
    label,
    name,
    type = "text",
    icon: Icon,
    error,
    touched,
    showPasswordToggle,
    showPassword,
    setShowPassword,
}) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
                {label}
            </label>
            <div className="relative">
                {/* Icon */}
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Icon size={20} className="text-gray-400" />
                </div>

                {/* Input field */}
                <Field
                    type={
                        showPasswordToggle && !showPassword ? "password" : type
                    }
                    id={name}
                    name={name}
                    className={`block w-full pl-10 ${
                        showPasswordToggle ? "pr-12" : "pr-3"
                    } py-3 border rounded-xl shadow-sm placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                        error && touched
                            ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                            : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                    }`}
                    placeholder={`Enter your ${name}`}
                />

                {/* Password toggle */}
                {showPasswordToggle && (
                    <button
                        type="button"
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                        onClick={() => setShowPassword(!showPassword)}
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
                )}
            </div>

            {/* Error */}
            <ErrorMessage
                name={name}
                component="div"
                className="mt-1 text-sm text-red-600 dark:text-red-400"
            />
        </div>
    );
}
