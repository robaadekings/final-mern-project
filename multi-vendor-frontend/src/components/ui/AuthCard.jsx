export default function AuthCard({ children, title }) {
    return (
        <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 space-y-6">
            <h2 className="text-2xl font-bold text-gray-800 text-center">{title}</h2>
            {children}
        </div>
    );
}
