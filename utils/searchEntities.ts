function searchEntities<Data extends Record<string, string>>(
	search: string,
	data: Data[],
	fields: Partial<Record<keyof Data, number>>,
) {
	if (!search?.trim()) {
		return data;
	}

	const terms = search.toLowerCase().split(/\s+/).filter(Boolean);

	return data
		.map((item) => ({
			...item,
			_score: Object.entries(fields).reduce((acc, [field, weight]) => {
				const fieldData = item[field].toLowerCase();

				return (
					acc +
					terms.reduce((acc, term) => {
						return acc + (fieldData.includes(term) ? weight! : 0);
					}, 0)
				);
			}, 0),
		}))
		.filter(({ _score }) => _score > 0)
		.sort((a, b) => b._score - a._score);
}

export default searchEntities;
