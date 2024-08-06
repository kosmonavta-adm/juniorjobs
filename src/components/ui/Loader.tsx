const Loader = () => {
    return (
        <div className="flex h-full w-full flex-1 items-center justify-center">
            <svg
                className="flex h-10 w-10 animate-spin"
                viewBox="0 0 100 100"
            >
                <circle
                    fill="none"
                    strokeWidth="10"
                    className="opacity-0"
                    cx="50"
                    cy="50"
                    r="40"
                />
                <circle
                    fill="none"
                    strokeWidth="10"
                    className="stroke-purple-600"
                    strokeDasharray="180"
                    strokeDashoffset="0"
                    cx="50"
                    cy="50"
                    r="40"
                />
            </svg>
        </div>
    );
};

export default Loader;
