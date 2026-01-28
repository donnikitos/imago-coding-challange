import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginationProps {
	currentPage: number;
	totalPages: number;
	onChange: (page: number) => void;
	totalItems: number;
	pageSize: number;
}

export const Pagination: React.FC<PaginationProps> = ({
	currentPage,
	totalPages,
	onChange,
	totalItems,
	pageSize,
}) => {
	if (totalPages <= 1) return null;

	const startIdx = (currentPage - 1) * pageSize + 1;
	const endIdx = Math.min(currentPage * pageSize, totalItems);

	return (
		<div className="sticky bottom-0 flex flex-col sm:flex-row items-center justify-between px-6 py-4 bg-white border-t border-gray-100 gap-4">
			<div className="text-sm text-gray-500">
				Showing{' '}
				<span className="font-medium text-gray-900">{startIdx}</span> to{' '}
				<span className="font-medium text-gray-900">{endIdx}</span> of{' '}
				<span className="font-medium text-gray-900">{totalItems}</span>{' '}
				results
			</div>

			{totalPages > 10 ? (
				<select
					value={currentPage}
					onChange={(e) => onChange(parseInt(e.target.value))}
				>
					{[...Array(totalPages)].map((_, i) => {
						const pageNum = i + 1;
						return (
							<option key={pageNum} value={pageNum}>
								Page {pageNum}
							</option>
						);
					})}
				</select>
			) : (
				<div className="flex items-center gap-1">
					<button
						onClick={() => onChange(currentPage - 1)}
						disabled={currentPage === 1}
						className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
					>
						<ChevronLeft className="w-5 h-5" />
					</button>

					{[...Array(totalPages)].map((_, i) => {
						const pageNum = i + 1;
						return (
							<button
								key={pageNum}
								onClick={() => onChange(pageNum)}
								className={`min-w-[40px] h-10 px-2 rounded-lg text-sm font-medium transition-colors ${
									currentPage === pageNum
										? 'bg-blue-600 text-white'
										: 'text-gray-600 hover:bg-gray-100'
								}`}
							>
								{pageNum}
							</button>
						);
					})}

					<button
						onClick={() => onChange(currentPage + 1)}
						disabled={currentPage === totalPages}
						className="p-2 rounded-lg hover:bg-gray-100 disabled:opacity-30 disabled:hover:bg-transparent transition-colors"
					>
						<ChevronRight className="w-5 h-5" />
					</button>
				</div>
			)}
		</div>
	);
};
