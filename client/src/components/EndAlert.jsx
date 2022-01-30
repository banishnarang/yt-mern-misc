const EndAlert = () => {
	return (
		<div className="alert alert-info mb-20">
			<div className="flex-1 space-x-4 justify-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					className="h-12 w-12 text-accent"
					fill="none"
					viewBox="0 0 24 24"
					stroke="currentColor"
				>
					<path
						strokeLinecap="round"
						strokeLinejoin="round"
						strokeWidth={2}
						d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
					/>
				</svg>
				<label className="text-accent self-center text-xl">
					You've reached the end
				</label>
			</div>
		</div>
	);
};

export default EndAlert;
