import mockData from '@/collections/mockdata.json';
import extractRestrictions from '@/utils/extractRestrictions';

export async function GET() {
	const result = mockData.reduce(
		(acc, item) => {
			if (item.fotografen) {
				acc.creditors.add(item.fotografen);
			}

			const restrictions = extractRestrictions(item.suchtext);
			if (restrictions) {
				restrictions.codes.forEach((item) =>
					acc.restrictions.add(item),
				);
			}

			return acc;
		},
		{
			creditors: new Set<string>(),
			restrictions: new Set<string>(),
		},
	);

	return Response.json({
		creditors: [...result.creditors],
		restrictions: [...result.restrictions],
	});
}
