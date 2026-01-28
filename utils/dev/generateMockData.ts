function generateMockData(count = 10000, seed = 42) {
	// deterministic RNG
	let s = seed;
	const rand = () => (s = (s * 16807) % 2147483647) / 2147483647;

	const people = [
		'Angela Merkel',
		'Lionel Messi',
		'Taylor Swift',
		'Elon Musk',
		'Cristiano Ronaldo',
		'Greta Thunberg',
		'Barack Obama',
		'Michael Jackson',
		'Beyoncé',
		'Brad Pitt',
		'Scarlett Johansson',
	];

	const places = [
		'Berlin',
		'Hamburg',
		'Munich',
		'Paris',
		'London',
		'New York',
		'Tokyo',
		'Rome',
		'Barcelona',
		'Zurich',
		'Vienna',
	];

	const topics = [
		'Portrait',
		'Konzert',
		'Demonstration',
		'Fußballspiel',
		'Pressekonferenz',
		'Interview',
		'Studio',
		'Bühne',
		'Publikum',
		'Event',
		'Premiere',
		'Training',
		'Street Photography',
	];

	const agencies = [
		'IMAGO / United Archives',
		'IMAGO / ZUMA Wire',
		'IMAGO / Westend61',
		'IMAGO / SOPA Images',
		'IMAGO / imagebroker',
		'IMAGO / Depositphotos',
		'IMAGO / Panthermedia',
	];

	const restrictionTokens = [
		null,
		null,
		null,
		'PUBLICATIONxINxGERxONLY',
		'PUBLICATIONxINxGERxSUIxAUTxONLY',
		'PUBLICATIONxINxEUxONLY',
	];

	function randomDate() {
		const start = new Date(1990, 0, 1).getTime();
		const end = new Date(2024, 11, 31).getTime();
		const d = new Date(start + rand() * (end - start));
		return `${String(d.getDate()).padStart(2, '0')}.${String(
			d.getMonth() + 1,
		).padStart(2, '0')}.${d.getFullYear()}`;
	}

	const data = [];
	const bildBase = 6000000000;

	for (let i = 0; i < count; i++) {
		const person = people[Math.floor(rand() * people.length)];
		const place = places[Math.floor(rand() * places.length)];
		const topic = topics[Math.floor(rand() * topics.length)];
		const agency = agencies[Math.floor(rand() * agencies.length)];
		const restriction =
			restrictionTokens[Math.floor(rand() * restrictionTokens.length)];

		const suchtext =
			`${person} ${place} ${topic} Pressefoto Event Menschen Publikum ` +
			(restriction ? restriction : '');

		data.push({
			suchtext: suchtext.trim(),
			bildnummer: String(bildBase + i),
			fotografen: agency,
			datum: randomDate(),
			hoehe: String(2000 + Math.floor(rand() * 2000)),
			breite: String(3000 + Math.floor(rand() * 3000)),
		});
	}

	return data;
}

export default generateMockData;
