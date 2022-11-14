export const fetchMarkdownPosts = async () => {
    const regex = new RegExp('(?<=\\/)[\\w+-]+(?=\\.svx)');
    const allPostFiles = import.meta.glob('/src/routes/articles/[slug]/*.svx')
    const iterablePostFiles = Object.entries(allPostFiles)

    return await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const data = await resolver()
            const articleName = path.match(regex)
            const postPath = `articles/${articleName}`
            return {
                meta: data["metadata"],
                path: postPath,
            }
        })
    )
}
