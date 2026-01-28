import { Filters } from '@/app/(pages)/_components/Filters';
import { PaginationWrapper } from '@/app/(pages)/_components/PaginationWrapper';
import { ImageGrid } from '@/app/(pages)/_components/ImageGrid';
import { Suspense } from 'react';

export default function Home() {
	return (
		<main className="flex-1 flex flex-col max-w-7xl w-full mx-auto">
			<Suspense>
				<Filters />

				<div className="flex-1">
					<ImageGrid />
				</div>

				<PaginationWrapper />
			</Suspense>
		</main>
	);
}
