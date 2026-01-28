'use client';

import { Hash } from 'lucide-react';
import ImageCard from './components/ImageCard';
import useImagesList from '@/app/(pages)/_queries/useImagesList';
import useFilters from '@/app/(pages)/_hooks/useFilters';

export function ImageGrid() {
	const [filters] = useFilters();
	const { data, isLoading, error } = useImagesList(filters);

	if (!isLoading && data?.items.length === 0) {
		return (
			<div className="flex flex-col items-center justify-center py-24 px-6 text-center">
				<div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
					<Hash className="w-10 h-10 text-gray-200" />
				</div>
				<h3 className="text-lg font-bold text-gray-900">
					No results found
				</h3>
				<p className="text-gray-500 max-w-xs mt-1">
					{`Try adjusting your search or filters to find what you're looking for.`}
				</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="p-12 text-center text-red-500 font-medium">
				Error loading images. Please try again later.
			</div>
		);
	}

	return (
		<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6 p-6">
			{isLoading
				? [...Array(6)].map((_, i) => (
						<div
							key={i}
							className="animate-pulse bg-white border border-gray-200 rounded-xl overflow-hidden h-80"
						>
							<div className="bg-gray-200 aspect-4/3" />
							<div className="p-4 space-y-4">
								<div className="h-4 bg-gray-200 rounded w-1/3" />
								<div className="h-3 bg-gray-200 rounded w-full" />
								<div className="h-3 bg-gray-200 rounded w-2/3" />
							</div>
						</div>
					))
				: data?.items.map((image) => (
						<ImageCard
							key={image.bildnummer}
							image={image}
							searchQuery={filters.suche}
						/>
					))}
		</div>
	);
}
