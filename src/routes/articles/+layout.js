export const load = async ({fetch}) => {
    const response = await fetch(`/api/articles`)
    const posts = await response.json()

    let menuByKey = {}
    posts.forEach((element) => {
        const breadcrumbs = element.meta.breadcrumbs
        if (breadcrumbs) {
            menuByKey[breadcrumbs[0]] ??= []
            menuByKey[breadcrumbs[0]].push(breadcrumbs[1])
        }
    });

    let menu = []
    for (const [key, value] of Object.entries(menuByKey)) {
        menu.push({
            id: key,
            entries: value
        })
    }

    return {
        posts: posts,
        menu: menu
    }
}
