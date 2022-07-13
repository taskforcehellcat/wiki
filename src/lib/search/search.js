/*
// load the searchIndex.json as an js object
json = fs.readFileSync('searchIndex.json', 'utf8');
let index = JSON.parse(json);

*/

let index;

import searchIndex from '$lib/search/searchIndex.json';

index = searchIndex;

// this variable determines how long the environment should be.
// subject to change !

export function searchFor(query, envLength = 60) {
    /*
     * search function for the search bar object. 
     * searches all text content of wiki pages and returns the results,
     * see output format below
     * 
     * input: string - at least three letters
     *        number - length of the env string to suit smaller display sizes
     *
     * output: javascript array
     * output format: [ hit arrays ] (array of arrays)
     * hit array format: [hit page title, hit section, hit environment]
     */

    // searching for less than three chars is prob too memory intensive
    // searching for an empty string WILL crash the tab !
    if (query.length < 3) {return [];}

    query = query.toLowerCase();

    // array to be returned in the end
    let results = [];

    for (let page in index) {
        let anchor; // this will hold the anchor link for this page

        for (let sec in index[page]) {

            if (sec === 'link') {
                // the "link" section isn't actually a section
                // just get the anchor link from it's text contents and skip the rest
                anchor = index[page][sec];
                continue;
            }

            // get the text from every pages every section
            let text = index[page][sec];
            let lowertext = text.toLowerCase();
            
            // this is done for simpler update logic, see below.
            // last index holds the index of the last found substring matching
            // the query or -1 if the query wasn't found.
            let last_index = -1 * query.length; 

            while (last_index !== -1) {
                // .indexOf returns -1 if it didn't find any matches.
                // At this point the loop should terminate

                /* Begin searching for the next hit by beginning the search now
                at the index of the last hit plus the length of the query itself
                (to avoid multiple counts of the same appearance). last_index is
                initialised to -query.length to start initially at index 0. */
                last_index = lowertext.indexOf(query, last_index+query.length);
                
                if (last_index !== -1) {
                    let env = '';

                    // environment length arithmetic:
                    // rounding down to prevent overflow in the ui
                    var tail_length = Math.floor((envLength - query.length) / 2);
                    
                    // actual text will be three characters less because of '...'
                    var text_include = tail_length - 3;

                    if (!(text_include<0)) {
                        env = '...' + text.substring(last_index-text_include, query.length+last_index+text_include+1) + '...';
                    }

                    results.push([page, sec, env, anchor]);
                }
            }
        }
    }

    return results;
}

export function updateSearchResults(query) {
    /* 
     * function that organises results from searchFor() into arrays that svelte
     * can generate html from.
     * 
     * input: string - the query
     * 
     * returns: array
     */

    let fetchedResults = searchFor(query);

    let searchResults = [];

    if (fetchedResults.length !== 0) {
        if (query.length > 2) {
            // organize results
            searchResults = [{ title: fetchedResults[0][0], hits: 0 }]; // initialisation

            // add page hits
            let pageIndex = 0;
            fetchedResults.forEach((element) => {

                if (searchResults[pageIndex].title === element[0]) {
                    searchResults[pageIndex].hits += 1;
                } else {
                    searchResults.push({ title: element[0], hits: 1 });
                    pageIndex += 1;
                }
            });

            // add section hits
            searchResults.forEach((section) => {
                
                var secResultsArr = [];
                // format: [page title, page link, env string]


                // get all hits for this page from fetched results
                var hitsOnPage = fetchedResults.filter((r) => {
                    return r[0] === section.title;
                });

                hitsOnPage.forEach((hit) => {
                    secResultsArr.push({
                        title: hit[1],
                        link: hit[3],
                        env: hit[2],
                    });
                });

                section.secResults = secResultsArr;
            });
        }

    } else {
        searchResults = [];
    }
    
    return searchResults;
}

