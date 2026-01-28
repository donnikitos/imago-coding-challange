'use client';

import { useCallback, useState } from 'react';
import {
	Search,
	Filter,
	Calendar,
	Tag,
	ChevronDown,
	SortAsc,
	SortDesc,
} from 'lucide-react';
import debounce from 'just-debounce-it';
import formatIsoDate from '@/utils/formatIsoDate';
import { useQuery } from '@tanstack/react-query';
import useFilters from '../_hooks/useFilters';

export type FiltersProps = {
	values: {
		suche: string;
		credit: string;
		date: Date[];
		restrictions: string[];
		sort: 'desc' | 'asc';
	};
	onChange: <K extends keyof FiltersProps['values']>(
		key: K,
		value: FiltersProps['values'][K],
	) => void;
};

export function Filters() {
	const [filters, setFilters] = useFilters();
	function onChange<K extends keyof FiltersProps['values']>(
		key: K,
		value: FiltersProps['values'][K],
	) {
		setFilters((p) => ({ ...p, [key]: value }));
	}

	const { data } = useQuery({
		queryKey: ['search-suggestions'],
		queryFn() {
			return fetch('/api/search/suggestions').then(
				async (response) =>
					(await response.json()) as {
						creditors: string[];
						restrictions: string[];
					},
			);
		},
	});

	const [search, setSearch] = useState(filters.suche);

	const debouncedSearch = useCallback(
		debounce((search: string) => {
			onChange('suche', search);
		}, 300),
		[],
	);

	return (
		<div className="flex flex-col gap-6 p-6 bg-white border-b border-gray-100">
			<div className="flex flex-col md:flex-row gap-4 items-start md:items-center">
				{/* Search Input */}
				<div className="relative flex-1 w-full">
					<Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
					<input
						type="text"
						placeholder="Search by ID, photographer, or description..."
						className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
						value={search}
						onChange={(e) => {
							setSearch(e.target.value);
							debouncedSearch(e.target.value);
						}}
					/>
				</div>

				{/* Sorting */}
				<button
					onClick={() =>
						onChange(
							'sort',
							filters.sort === 'asc' ? 'desc' : 'asc',
						)
					}
					className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
				>
					{
						{
							asc: <SortDesc className="w-4 h-4" />,
							desc: <SortAsc className="w-4 h-4" />,
						}[filters.sort]
					}
					<span className="text-sm font-medium">
						{
							{
								asc: 'Oldest First',
								desc: 'Newest First',
							}[filters.sort]
						}
					</span>
				</button>
			</div>

			<div className="grid grid-cols-1 md:grid-cols-3 gap-6">
				{/* Credit Dropdown */}
				<div className="space-y-2">
					<label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
						<Filter className="w-3.5 h-3.5" /> Credit
					</label>
					<div className="relative">
						<select
							className="w-full appearance-none px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 pr-10"
							value={filters.credit}
							onChange={(e) => onChange('credit', e.target.value)}
						>
							<option value="">All Sources</option>
							{data?.creditors.map((credit) => (
								<option key={credit} value={credit}>
									{credit}
								</option>
							))}
						</select>
						<ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
					</div>
				</div>

				{/* Date Range */}
				<div className="space-y-2">
					<label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
						<Calendar className="w-3.5 h-3.5" /> Date Range
					</label>
					<div className="grid grid-cols-[1fr_max-content_1fr] gap-2 items-center">
						<input
							type="date"
							className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
							value={
								filters.date[0]
									? formatIsoDate(filters.date[0])
									: ''
							}
							onChange={(e) => {
								onChange(
									'date',
									(
										[
											e.target.value &&
												new Date(e.target.value),
											filters.date[1],
										] as Date[]
									).filter(Boolean),
								);
							}}
						/>
						{filters.date.length >= 1 && (
							<>
								<span className="text-gray-400">–</span>
								<input
									type="date"
									className="flex-1 px-3 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
									value={
										filters.date[1]
											? formatIsoDate(filters.date[1])
											: ''
									}
									min={formatIsoDate(filters.date[0])}
									onChange={(e) =>
										onChange(
											'date',
											(
												[
													filters.date[0],
													e.target.value &&
														new Date(
															e.target.value,
														),
												] as Date[]
											).filter(Boolean),
										)
									}
								/>
							</>
						)}
					</div>
				</div>

				{/* Restrictions Multi-select/Chips */}
				<div className="space-y-2">
					<label className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-1.5">
						<Tag className="w-3.5 h-3.5" /> Restrictions
					</label>
					<div className="flex flex-wrap gap-2">
						{data?.restrictions.map((restriction) => {
							const isActive =
								filters.restrictions.includes(restriction);

							return (
								<button
									key={restriction}
									onClick={() => {
										const vals = new Set(
											filters.restrictions,
										);
										if (isActive) {
											vals.delete(restriction);
										} else {
											vals.add(restriction);
										}

										onChange('restrictions', [...vals]);
									}}
									className={`px-3 py-1 rounded-full text-xs font-medium transition-all border ${
										isActive
											? 'bg-blue-100 border-blue-200 text-blue-700'
											: 'bg-gray-100 border-gray-200 text-gray-600 hover:bg-gray-200'
									}`}
								>
									{restriction}
								</button>
							);
						})}
					</div>
				</div>
			</div>
		</div>
	);
}
