'use client';

import { Filters } from '@/components/Filters';
import { Pagination } from '@/components/Pagination';
import { useQuery } from '@tanstack/react-query';
import { IImageEntry } from '@/interfaces/image-entry';
import { ListResponse } from '@/interfaces/ListResponse';
import { ImageGrid } from '@/components/ImageGrid';
import makeSearchUrl from '@/utils/makeSearchUrl';
import {
	parseAsArrayOf,
	parseAsInteger,
	parseAsIsoDate,
	parseAsString,
	parseAsStringEnum,
	useQueryStates,
} from 'nuqs';
import formatIsoDate from '@/utils/formatIsoDate';

export default function Home() {
	const [filters, setFilters] = useQueryStates({
		credit: parseAsString.withDefault(''),
		date: parseAsArrayOf(parseAsIsoDate, ':').withDefault([]),
		restrictions: parseAsArrayOf(parseAsString, 'x').withDefault([]),
		suche: parseAsString.withDefault(''),
		sort: parseAsStringEnum(['asc', 'desc']).withDefault('desc'),
		seite: parseAsInteger.withDefault(1),
	});

	const { data, isLoading, error } = useQuery({
		queryKey: ['images', filters],
		queryFn() {
			const url = makeSearchUrl(
				{
					suche: filters.suche,
					credit: filters.credit,
					page: filters.seite,
					date: filters.date
						?.map((item) => formatIsoDate(item))
						.join(':'),
					sort: filters.sort ? `datum:${filters.sort}` : undefined,
					restrictions: filters.restrictions
						?.map((item) => item.toUpperCase())
						.join('x'),
				},
				{
					basePath: '/api/search',
				},
			);

			return fetch(url).then(
				async (response) =>
					(await response.json()) as ListResponse<IImageEntry>,
			);
		},
	});

	return (
		<main className="flex-1 flex flex-col max-w-7xl w-full mx-auto">
			<Filters
				values={filters}
				onChange={(name, value) => {
					setFilters((p) => ({
						...p,
						[name]: value,
						seite: 1,
					}));
				}}
			/>

			<div className="flex-1">
				{error ? (
					<div className="p-12 text-center text-red-500 font-medium">
						Error loading images. Please try again later.
					</div>
				) : (
					<ImageGrid
						images={data?.items || []}
						loading={isLoading}
						searchQuery={filters.suche}
					/>
				)}
			</div>

			<Pagination
				currentPage={data?.page || 1}
				totalPages={data?.totalPages || 1}
				onChange={(page) => {
					setFilters((p) => ({ ...p, seite: page }));
				}}
				totalItems={data?.total || 0}
				pageSize={data?.pageSize || 1}
			/>
		</main>
	);
}
