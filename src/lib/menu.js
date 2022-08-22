export const NAV_MENU = [
	{
		id: 'Grundlagen',
		entries: ['Allgemeines', 'Funketikette', 'Erste Hilfe', 'Abteilungen', 'Sonstiges']
	},
	{
		id: 'Ausbildung',
		entries: ['Befehlsausgabe', 'Steuerung', 'Truppenteile']
	},
	{
		id: 'Streitkräfte',
		entries: ['Schütze', 'Funker', 'MG-Schütze', 'AT-Schütze', 'Präzisionsschütze', 'Breacher', 'Grenadier']
	},
	{
		id: 'Sanitätsdienst',
		entries: ['Sanitäter', 'MEDEVAC-Sanitäter']
	},
	{
		id: 'Panzertruppen',
		entries: ['Kommandant', 'Richtschütze', 'Fahrer']
	},
	{
		id: 'Logistik',
		entries: ['Kampfpionier', 'Helikopterpilot']
	},
	{
		id: 'Aufklärer',
		entries: ['JTAC', 'Scharfschütze', 'Spotter', 'EOD']
	},
	{
		id: 'Fuhrpark',
		entries: ['Bodenfahrzeuge', 'Luftfahrzeuge']
	}
];

const REPLACEMENTS = {
	' ': '',
	'-': '',
	'\u00e4': 'ae', // ä
	'\u00fc': 'ue', // ü
	'\u00f6': 'oe', // ö
	'\u00df': 'ss' // ß
};

export function linkify(value) {
	value = value.toLowerCase();
	for (const [k, v] of Object.entries(REPLACEMENTS)) {
		value = value.replace(k, v);
	}
	return value;
}
