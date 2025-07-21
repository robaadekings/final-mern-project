function Skeleton({ width = 'w-full', height = 'h-6', className = '' }) {
    return (
        <div className={`bg-gray-200 rounded animate-pulse ${width} ${height} ${className}`}></div>
    );
}

export default Skeleton; 