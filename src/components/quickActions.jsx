export default function QuickActionButton({ icon, text, className }) {
    return (
        <button
            className={`w-full flex items-center justify-center gap-2 px-4 py-2 rounded-lg transition-colors ${className}`}
        >
            {icon}
            {text}
        </button>
    );
}
