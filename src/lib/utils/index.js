export const fetchMarkdownPosts = async () => {
    const allPostFiles = import.meta.glob('/src/routes/articles/[slug]/*.svx')
    const iterablePostFiles = Object.entries(allPostFiles)

    return await Promise.all(
        iterablePostFiles.map(async ([path, resolver]) => {
            const data = await resolver()
            // TODO: Fix me
            const postPath = path.replace('/src/routes/', '').replace('/[slug]', '').replace('.svx', '')
            return {
                meta: data["metadata"],
                path: postPath,
            }
        })
    )
}
