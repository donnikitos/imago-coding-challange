'use client';

import useImagesList from '@/app/(pages)/_queries/useImagesList';
import useFilters from '@/app/(pages)/_hooks/useFilters';
import { Pagination } from '@/components/Pagination';

export function PaginationWrapper() {
	const [filters, setFilters] = useFilters();
	const { data } = useImagesList(filters);

	return (
		data && (
			<Pagination
				currentPage={data.page}
				pageSize={data.pageSize}
				totalItems={data.total}
				totalPages={data.totalPages}
				onChange={(page) => setFilters((p) => ({ ...p, seite: page }))}
			/>
		)
	);
}
