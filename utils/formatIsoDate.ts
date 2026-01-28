import { format } from 'date-fns';

function formatIsoDate(date: Parameters<typeof format>[0]) {
	return format(date, 'yyyy-MM-dd');
}

export default formatIsoDate;
