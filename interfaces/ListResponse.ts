export type ListResponse<Data> = {
	items: Data[];
	page: number;
	pageSize: number;
	total: number;
	totalPages: number;
};
