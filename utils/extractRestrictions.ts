function extractRestrictions(input = '') {
	const matches = input.match(
		/\bPUBLICATIONxINx[A-Z]{2,6}(?:x[A-Z]{2,6})*(?:xONLY)?\b/i,
	);

	if (!matches) {
		return null;
	}

	const raw = matches[0];
	const parts = raw.split('x').filter(Boolean);

	const only = parts[parts.length - 1] === 'ONLY';
	const codes = parts
		.slice(2, only ? -1 : undefined) // drop ["PUBLICATION","IN"], drop "ONLY" if present
		.map((s) => s.trim())
		.filter(Boolean);

	return { raw, codes, only };
}

export default extractRestrictions;
