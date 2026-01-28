'use client';

type Options = {
	basePath?: string;
	searchParams?: URLSearchParams | string;
};

function makeSearchUrl(params: Record<string, unknown>, options: Options = {}) {
	const url = options.basePath || window.location.pathname;

	const searchParams = new URLSearchParams(options.searchParams);
	Object.entries(params).forEach(([key, value]) => {
		if (Array.isArray(value)) {
			value.forEach((item) => searchParams.append(key, `${item}`));
		} else if (value !== '') {
			searchParams.set(key, `${value}`);
		} else {
			searchParams.delete(key);
		}
	});

	return `${url}?${searchParams}`;
}

export default makeSearchUrl;
