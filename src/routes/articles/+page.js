export const load = async ({fetch}) => {
    const response = await fetch(`/api/articles`)
    const posts = await response.json()

    return {
        posts: posts,
    }
}
