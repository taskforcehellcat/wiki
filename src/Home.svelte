<style>

</style>


<script>
    import { Router, Link, Route } from "svelte-routing";
    import { onMount } from 'svelte';
	export let url = "";

    
    
	onMount(async () => {
        const expandable = document.getElementsByClassName("expandable");
        var expandableArr = Array.from(expandable);

        expandableArr.forEach(element => {
            var open = false;
            element.querySelector("span").insertAdjacentHTML("beforeend", '<span class="material-icons-round">expand_more</span>');
            element.onclick = function(event) {
                event.preventDefault();
                open = !open;
                if (open == true) {
                element.querySelector(".material-icons-round").style.transform = "rotate(90deg)";
                element.querySelectorAll("a").forEach(element => {element.style.display = "flex"})
                } else {
                    element.querySelector(".material-icons-round").style.transform = "rotate(0deg)";
                    element.querySelectorAll("a").forEach(element => {element.style.display = "none"})
                }
            };
        });
    })

</script>

<div id="home-overlay">
    <div id="home-nav-logo">Task Force Hellcat <br><span>Wiki</span></div>
    <div id="home-nav-search">
        <span class="material-icons">search</span>
        <input type="text" name="search" placeholder="Wiki durchsuchen...">
    </div>

    <!-- wär cool wenn das expand ding automatisch geht mit einer "expandable" klasse oder so :) -->

    <div id="home-nav-list">
        <Router url="{url}">
            <Link to="grundlagen">GRUNDLAGEN</Link>
            <a href="/" class="expandable"><span>FÜHRUNGSKRÄFTE</span>
                <Link to="/">TRUPPFÜHRER</Link>
                <Link to="/">TRUPPFUNKER</Link>
            </a>
            <a href="/" class="expandable"><span>STREITKRÄFTE</span>
                <Link to="/">FUẞTRUPPEN</Link>
                <Link to="panzertruppen">PANZERTRUPPEN</Link>
            </a>
            <a href="/" class="expandable"><span>LOGISTIKER</span>
                <Link to="/">KAMPFPIONIERE</Link>
                <Link to="/">HUBSCHRAUBERPILOTEN</Link>
                <Link to="/">BASIS-LOGISTIKER</Link>
            </a>
            
            <Link to="sanitaeter">SANITÄTER</Link>
            <Link to="aufklaerer">AUFKLÄRER</Link>
            <a href="/" class="expandable"><span>FUHRPARK</span>
                <Link to="/">FAHRZEUGE</Link>
                <Link to="/">HELIKOPTER</Link>
                <Link to="/">UAVs</Link>
            </a>

        </Router>
    </div>
    
</div>