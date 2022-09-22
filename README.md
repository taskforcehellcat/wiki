# Task Force Hellcat Wiki written in SvelteKit

[![TFHC Discord](https://img.shields.io/discord/629333468299526164?color=green&label=Discord&logo=Discord)](https://discord.taskforcehellcat.de/)
[![](https://img.shields.io/website?down_color=lightgrey&down_message=offline&label=TFHC%20Wiki&up_color=green&up_message=online&url=https%3A%2F%2Fwiki.taskforcehellcat.de%2F)](https://wiki.taskforcehellcat.de)

## Menu entries / Routing
To add a new menu entry, look at the pattern in $lib/menu.js.

A menu entry looks like this:
```
id: 'Sanitätsdienst',
entries: [
    'Sanitäter',
    'MEDEVAC-Sanitäter',
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

**Make sure that there is a proper route to your components.**
