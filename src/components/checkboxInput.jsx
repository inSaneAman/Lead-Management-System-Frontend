import { Field } from "formik";

export default function CheckboxInput({ name, label, description }) {
    return (
        <div className="flex items-center">
            <Field
                type="checkbox"
                id={name}
                name={name}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
            />
            <div className="ml-3 text-sm">
                <label
                    htmlFor={name}
                    className="font-medium text-gray-700 dark:text-gray-300"
                >
                    {label}
                </label>
                {description && (
                    <p className="text-gray-500 dark:text-gray-400">
                        {description}
                    </p>
                )}
            </div>
        </div>
    );
}
