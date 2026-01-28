import { IImageEntry } from '@/interfaces/image-entry';
import { ListResponse } from '@/interfaces/ListResponse';
import formatIsoDate from '@/utils/formatIsoDate';
import makeSearchUrl from '@/utils/makeSearchUrl';
import { useQuery } from '@tanstack/react-query';

function useImagesList(filters: {
	suche: string;
	credit: string;
	seite: number;
	date: Date[];
	sort: 'asc' | 'desc';
	restrictions: string[];
}) {
	return useQuery({
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
}

export default useImagesList;
