import { Field, ErrorMessage } from "formik";

export default function SelectInput({ label, name, options, error, touched }) {
    return (
        <div>
            <label
                htmlFor={name}
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
            >
                {label}
            </label>
            <Field
                as="select"
                id={name}
                name={name}
                className={`block w-full px-3 py-3 border rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors ${
                    error && touched
                        ? "border-red-300 focus:ring-red-500 focus:border-red-500"
                        : "border-gray-300 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                }`}
            >
                <option value="">Select {label.toLowerCase()}</option>
                {options.map((opt) => (
                    <option key={opt.value} value={opt.value}>
                        {opt.label}
                    </option>
                ))}
            </Field>
            <ErrorMessage
                name={name}
                component="div"
                className="mt-1 text-sm text-red-600 dark:text-red-400"
            />
        </div>
    );
}
