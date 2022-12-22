<!-- Homepage -->
<script lang="ts">
    import '../app.scss';
    import Theme from '$lib/theme/Theme.svelte';
    import Nav from '$lib/nav/Nav.svelte';
    import {themeId} from '$lib/theme/stores';

    import {directSearch, textSearch} from '$lib/search/search';

    let query = ''; // holds the query
    let showResults = false; // whether the search bar is currently in use
    let textResults = []; // used to generate sections in search results
    let directResults = [];

    const handleQuery = (e) => {
        query = e.target.value;

        let searchInUse = query.length !== 0;

        // do the styling
        // hide results box if search bar empty
        document.getElementById('search').dataset.empty = (!searchInUse).toString();

        // show dropdown link menues if search bar empty
        document.getElementById('nav__list').style.display = searchInUse ? 'none' : 'flex';

        showResults = query.length > 2;

        textResults = textSearch(query);
        directResults = directSearch(query);
    };

    export let data;
</script>

<svelte:head>
    <title>Home | TFHC Wiki</title>
</svelte:head>

<Theme/>
{#if $themeId}
    <div id="main" data-theme={$themeId}>

        <div id="home">
            <div id="home__top">
                <a id="home__link" href="https://taskforcehellcat.de/"
                ><span class="material-icons"> chevron_left </span>
                    Zurück zur Hauptseite</a>
                <img id="home__nav__logo" class="noselect" src="/images/tfhcwiki_full.svg"
                     alt="Task Force Hellcat Logo"/>
            </div>

            <!-- search bar -->
            <div id="search" data-empty="true">
                <div id="search__searchbar">
                    <span class="material-icons noselect">search</span>
                    <input type="text" name="search" placeholder="Wiki durchsuchen..." on:input={handleQuery}/>
                </div>
                <div id="search__results">
                    {#if showResults}
                        {#if directResults.length !== 0}
                            {#each directResults as entry}
                                <p>
                                    <span><a class="search_pagetitle" href={entry.route}>{entry.name}</a></span>
                                </p>
                            {/each}
                        {/if}
                        {#if textResults.length !== 0}
                            <p>Texttreffer:</p>
                            {#each textResults as page}
                                <p>
                                    <span class="search__hits">{page.hits}</span> Treffer auf <a
                                        class="search_pagetitle"
                                        href={page.route}>{page.title}</a>
                                    gefunden:
                                </p>
                                <ol>
                                    {#each page.bysection as sec_hit}
                                        <li>
                                    <span class="search__env"><i>{sec_hit.surrounding.left}
                                        <mark>{sec_hit.surrounding.match}</mark>{sec_hit.surrounding.right}</i></span>
                                            <span class="noselect"> &#x21aa; </span> <a
                                                href={sec_hit.anchor}>{sec_hit.title}</a>
                                        </li>
                                    {/each}
                                </ol>
                            {/each}
                        {/if}
                        {#if directResults.length === 0 && textResults.length === 0}
                            <p><span class="search__errortext">Es wurden keine Übereinstimmungen gefunden!</span></p>
                        {/if}
                    {:else}
                        <p><span class="search__errortext">Bitte mindestens drei Zeichen eingeben!</span></p>
                    {/if}
                </div>
            </div>
            <div id="home__nav">
                <Nav menu={data.menu}/>
            </div>
        </div>
    </div>
{/if}
<style>
    #home {
        padding: 15rem 5rem 20%;
        width: 100%;
        min-height: 100vh;
        height: fit-content;
        background-color: var(--brandPrimaryBG);
        display: flex;
        flex-direction: column;
        align-items: center;
        color: var(--brandSecondaryTXT);
        gap: 4rem;
    }

    #home__nav__logo {
        font-size: 35pt;
        font-weight: 300;
        color: var(--brandNeutral);
        text-align: center;
        white-space: nowrap;
    }

    #home__top {
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    #search__searchbar {
        background-color: var(--brandSecondaryBG);
        width: 80rem;
        height: 3rem;
        border-radius: 0.7rem;
        -webkit-border-radius: 0.7rem;
        -moz-border-radius: 0.7rem;
        -ms-border-radius: 0.7rem;
        -o-border-radius: 0.7rem;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 10px;
        padding: 3.5rem;
    }

    #search__searchbar input {
        width: 100%;
        height: 24px;
        color: var(--brandSecondaryTXT);
        font-size: 14pt;
        font-weight: 300;
    }

    #search__searchbar .material-icons {
        font-size: 20pt;
        color: var(--brandSecondaryTXT);
    }
</style>
