
<style>
    #home-overlay {
        width: 100%;
        height: 100vh;
        background-color: #101B3B;
        overflow: hidden;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        color: #fff;
        gap: 3rem;
    }

    #nav-logo {
        font-size: 35pt;
        font-weight: 300;
        color: #fff;
        font-family: 'purista-web', 'Segoe UI', sans-serif;
    }

    #nav-logo>span {
        font-weight: 700;
    }

    #nav-search {
    background-color: #273252;
    width: 80rem;
    height: 3rem;
    border-radius: .7rem;
    -webkit-border-radius: .7rem;
    -moz-border-radius: .7rem;
    -ms-border-radius: .7rem;
    -o-border-radius: .7rem;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 10px;
}

#nav-search {
    padding: 2%;
}

#nav-search input {
    width: 100%;
    height: 24px;
    color: #fff;
    font-size: 14pt;
    font-weight: 300;
}
#nav-search .material-icons {
    font-size: 20pt;
    color: #94A2CF;
}

input {
    background-color: none;
    background: none;
    border: none;
}
input::placeholder {
    color: #94A2CF;
    font-weight: 300;
}
input:focus,
input:focus {
    outline: none;
}

#home-nav-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-align: left;
    text-transform: uppercase;
    font-weight: 600;
    font-size: 15pt;
    letter-spacing: .12rem;
    gap: 2px;
    color: #94A2CF;

}


</style>


<script>
    import { Router, Link, Route } from "svelte-routing";
	export let url = "";
</script>

<div id="home-overlay">
    <div id="nav-logo">Task Force Hellcat <span>Wiki</span></div>
    <div id="nav-search">
        <span class="material-icons">search</span>
        <input type="text" name="search" placeholder="Wiki durchsuchen...">
    </div>




    <!-- wär cool wenn das expand ding automatisch geht mit einer "expandable" klasse oder so :) -->

    <div id="home-nav-list">
        <Router url="{url}">
        <Link to="grundlagen">grundlagen</Link>
        <a href="/">führungskräfte<span class="material-icons-round">expand_more</span></a>
        <a href="/">streitkräfte<span class="material-icons-round">expand_more</span></a>
        <a href="/">logistiker<span class="material-icons-round">expand_more</span></a>
        <Link to="panzertruppen">panzertruppen</Link>

        <Link to="sanitaeter">sanitäter</Link>

        <Link to="aufklaerer">aufklärer</Link>
        <a href="/">fuhrpark<span class="material-icons-round">expand_more</span></a>
    </Router>
    </div>
    
</div>