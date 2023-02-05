const REPLACEMENTS = {
  ' ': '_',
  '-': '-',
  '\u00e4': 'ae', // ä
  '\u00fc': 'ue', // ü
  '\u00f6': 'oe', // ö
  '\u00df': 'ss' // ß
};

export function linkify(value) {
  value = value.toLowerCase();
  for (const [k, v] of Object.entries(REPLACEMENTS)) {
    value = value.replaceAll(k, v);
  }
  return value;
}
