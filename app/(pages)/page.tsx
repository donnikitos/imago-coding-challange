import { Filters } from '@/app/(pages)/_components/Filters';
import { PaginationWrapper } from '@/app/(pages)/_components/PaginationWrapper';
import { ImageGrid } from '@/app/(pages)/_components/ImageGrid';

export default function Home() {
	return (
		<main className="flex-1 flex flex-col max-w-7xl w-full mx-auto">
			<Filters />

			<ImageGrid />

			<PaginationWrapper />
		</main>
	);
}
