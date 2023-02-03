# Task Force Hellcat Wiki written in SvelteKit

[![](https://img.shields.io/website?down_color=red&down_message=offline&label=TFHC%20Wiki&up_color=green&up_message=online&url=https%3A%2F%2Fwiki.taskforcehellcat.de%2F)](https://wiki.taskforcehellcat.de)
[![TFHC Discord](https://img.shields.io/discord/629333468299526164?color=green&label=Discord&logo=Discord)](https://discord.taskforcehellcat.de/)

## Adding new pages

To add a new wiki page, just add a `[name].svx` file in `/src/content` where `[name]` is the short name of the page:

```
|__ src
    |__ content
        |__ article-name.svx
```

The name should not contain any special characters except for `-` and `_`, should be lower case & **should not contain any spaces** as the name is used to generate the URL.

The top of the file should contain the following metadata:

```
---
title:      [Full Page Title]
date:       [Date of last edit in 'YYYY-MM-DD' format]
nav_index:  [Order of the page in the navigation]
---
```

## Creating links

To link to another wiki page, use the following syntax:

```
[Sanitäter](../sanitaetsdienst/sanitaeter)
```

The square brackets contain the text that is displayed and the round brackets contain the path to the page.

To link to a section on the same page, append `#` and the section name to the path.

The following characters have to be replaced in order to create a valid link:

Space becomes `_`, `ä` becomes `ae`, `ö` becomes `oe`, `ü` becomes `ue`, `ß` becomes `ss` and capital letters become lower case.

```
[Sanitäter](../sanitaetsdienst/sanitaeter#ausruestung)
```

To link to an external page, use the following syntax:

```
[Wikipedia](https://wikipedia.org)
```

## Creating tooltips

Tooltips can be added by using `<Tooltip>` tags:

```html
<Tooltip text="Main Battle Tank">MBT</Tooltip>
```

They will look like this when hovered over:

![tooltip image](https://github.com/Venrix/tfhc-wiki/raw/markdown/src/lib/images/readme/tooltip-example.png)

## Creating Example Boxes

```html
<ExampleBox>I'm an example box!</ExampleBox>
```

They will look like this when rendered:

![example box image](https://github.com/Venrix/tfhc-wiki/raw/markdown/src/lib/images/readme/exampe-box-example.png)
