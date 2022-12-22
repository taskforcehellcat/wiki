function sortArticlesByNavIndex(a, b) {
    if (!(a.meta.nav_index && b.meta.nav_index)) {
        return a.meta.title.localeCompare(b.meta.title)
    } else {
        return a.meta.nav_index - b.meta.nav_index
    }
}

function sortDirectoriesByNavIndex(a, b) {
    console.log(a)
    if (!(a.config.nav_index && b.config.nav_index)) {
        return a.config.title.localeCompare(b.config.title)
    } else {
        return a.config.nav_index - b.config.nav_index
    }
}

export async function load({fetch}) {
    const response = await fetch(`/api/articles`)
    const articles = await response.json()

    let menu = {}

    for (const element of articles) {
        menu[element.directory] ??= {entries: [], id: element.directory}
        menu[element.directory].entries.push(element)
    }

    for (const [key] of Object.entries(menu)) {
        menu[key].config = (await import(`../../../../content/${key}/metadata.js`)).config
        menu[key].entries.sort((a, b) => sortArticlesByNavIndex(a, b))
    }
    console.log(menu)

    let menuList = Array.from(menu)
    menuList.sort((a, b) => sortDirectoriesByNavIndex(a, b))

    return {
        posts: articles,
        menu: menuList,
    }
}
