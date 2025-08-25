export default function InfoCard({ icon, title, children }) {
    return (
        <div className="bg-gray-800 rounded-xl shadow p-6 space-x-2 space-y-2 ">
            <h2 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                {icon}
                {title}
            </h2>
            {children}
        </div>
    );
}
