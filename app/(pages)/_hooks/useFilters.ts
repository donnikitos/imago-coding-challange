import {
	parseAsArrayOf,
	parseAsInteger,
	parseAsIsoDate,
	parseAsString,
	parseAsStringEnum,
	useQueryStates,
} from 'nuqs';

function useFilters() {
	return useQueryStates({
		credit: parseAsString.withDefault(''),
		date: parseAsArrayOf(parseAsIsoDate, ':').withDefault([]),
		restrictions: parseAsArrayOf(parseAsString, 'x').withDefault([]),
		suche: parseAsString.withDefault(''),
		sort: parseAsStringEnum(['asc', 'desc']).withDefault('desc'),
		seite: parseAsInteger.withDefault(1),
	});
}

export default useFilters;
