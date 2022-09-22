# Task Force Hellcat Wiki written in SvelteKit

[![](https://img.shields.io/website?down_color=lightgrey&down_message=offline&label=TFHC%20Wiki&up_color=green&up_message=online&url=https%3A%2F%2Fwiki.taskforcehellcat.de%2F)](https://wiki.taskforcehellcat.de)
[![TFHC Discord](https://img.shields.io/discord/629333468299526164?color=green&label=Discord&logo=Discord)](https://discord.taskforcehellcat.de/)

## Menu entries / Routing
To add a new menu entry, look at the pattern in $lib/menu.js.

A menu entry looks like this:
```
id: 'Sanitätsdienst',
entries: [
    'Sanitäter', 'MEDEVAC',
]
```

These entries will be rendered as:
```
<span>
    Sanitätsdienst
    ...
</span>
<a href="../sanitaeter">Sanitäter</a>
<a href="../medevacsanitaeter">MEDEVAC-Sanitäter</a>
```

## Creating anchor tags

(given [PR 21](https://github.com/Venrix/tfhc-wiki/pull/21) merged) If you want to link to a section using an anchor, use the section name for the anchor except for the following replacements:
Space becomes `_`, `ä` becomes `ae`, `ö` becomes `oe`, `ü` becomes `ue`, `ß` becomes `ss` and capital letters become lower case.

E.g. if you want to link to the section `Funkgerät einstellen` on the page `Funketikette`, use `href="funketikette#funkgeraet_einstellen"`.
