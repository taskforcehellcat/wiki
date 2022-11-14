<script>
    import Nav from "$lib/nav/Nav.svelte";
    import {linkify} from "$lib/helpers.js";

    export let data
</script>

<h1>Articles</h1>

<ul>
    {#each data.posts as post}
        <li>
            <h2>
                <a href={post.path}>
                    {post.meta.title}
                </a>
            </h2>
            Published {post.meta.date}
        </li>
    {/each}
</ul>
