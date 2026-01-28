import { IImageEntry } from '@/interfaces/image-entry';
import parseDate from '@/utils/parseDate';
import searchEntities from '@/utils/searchEntities';
import transformDate from '@/utils/transformDate';
import { isAfter, isBefore } from 'date-fns';
import type { NextRequest } from 'next/server';
import mockData from '@/collections/mockdata.json';

const stats = {
	count: 0,
	keywords: {} as Record<string, number>,
};

export async function GET(request: NextRequest) {
	const start = performance.now();

	const url = request.nextUrl;
	const isSearch = ['credit', 'restrictions', 'date', 'sort'].some((item) =>
		url.searchParams.has(item),
	);

	if (isSearch) {
		stats.count++;
	}

	const perPage = parseInt(url.searchParams.get('pageSize') || '') || 10;
	const page = parseInt(url.searchParams.get('page') || '') || 1;

	let result: IImageEntry[] = mockData;

	const creditFilter = url.searchParams.get('credit')?.toLowerCase();
	if (creditFilter) {
		result = result.filter(
			({ fotografen }) => fotografen.toLowerCase() === creditFilter,
		);
	}

	const restrictionFilter = url.searchParams.get('restrictions')?.split('x');
	if (restrictionFilter) {
		result = result.filter(
			({ suchtext }) =>
				suchtext.includes('PUBLICATIONxINx') &&
				restrictionFilter.some((item) =>
					suchtext.includes(`x${item}x`),
				),
		);
	}

	const dateFilter = url.searchParams.get('date') || '';
	if (dateFilter) {
		const [startDate, endDate] = dateFilter.split(':');

		if (endDate) {
			result = result.filter(({ datum }) => {
				const parsedDate = parseDate(datum);

				return (
					isAfter(parsedDate, startDate) &&
					isBefore(parsedDate, endDate)
				);
			});
		} else {
			result = result.filter(
				({ datum }) => transformDate(datum) === startDate,
			);
		}
	}

	const searchTerm = url.searchParams.get('suche');
	if (searchTerm) {
		if (!stats.keywords[searchTerm]) {
			stats.keywords[searchTerm] = 0;
		}
		stats.keywords[searchTerm]++;

		result = searchEntities(searchTerm, result, {
			suchtext: 5,
			fotografen: 2,
			bildnummer: 1,
		});
	}

	const sort = url.searchParams.get('sort');
	if (sort) {
		const [field, direction] = sort.split(':');

		let sortDirection = 1;
		if (direction === 'desc') {
			sortDirection = -1;
		}

		result.sort((a, b) => {
			if (!(field in a) || !(field in b)) {
				return 0;
			}
			let valA = a[field as keyof typeof a];
			let valB = b[field as keyof typeof b];
			if (field === 'datum') {
				valA = valA.split('.').reverse().join('-');
				valB = valB.split('.').reverse().join('-');
			}

			return valA.localeCompare(valB) * sortDirection;
		});
	}

	const total = result.length;
	const totalPages = Math.ceil(total / perPage);

	const duration = performance.now() - start;
	console.log(`\nSearch duration: ${duration.toFixed(2)}ms`);
	console.log(`Searches total: ${stats.count}`);
	const popular = Object.entries(stats.keywords);
	popular.sort(([, countA], [, countB]) => countB - countA);
	console.log(
		`Popular searches: ${
			popular
				.slice(0, 5)
				.map(([search]) => search)
				.join(', ') || '-'
		}`,
	);

	return Response.json({
		items: result.slice((page - 1) * perPage, page * perPage),
		page,
		pageSize: perPage,
		total,
		totalPages,
	});
}
