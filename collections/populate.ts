import generateMockData from '@/utils/dev/generateMockData';
import { writeFileSync } from 'node:fs';

const data = generateMockData(10000);

writeFileSync('./collections/mockdata.json', JSON.stringify(data, null, 2));
