import { format } from 'date-fns';
import parseDate from './parseDate';

function transformDate(
	date: string,
	outputFormat = 'yyyy-MM-dd',
	inputFormat = 'dd.MM.yyyy',
) {
	const parsedDate = parseDate(date, inputFormat);

	return format(parsedDate, outputFormat);
}

export default transformDate;
