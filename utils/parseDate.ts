import { UTCDate } from "@date-fns/utc";
import { parse } from "date-fns";

function parseDate(
	date: string,
	inputFormat = 'dd.MM.yyyy',
) {
	return parse(date, inputFormat, new UTCDate());
}

export default parseDate
