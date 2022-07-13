# Task Force Hellcat Wiki migration from Svelte to SvelteKit

## Menu entries / Routing
To add a new menu entry, look at the pattern in menu.js.

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
