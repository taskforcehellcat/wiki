import searchIndex from '$lib/search/searchIndex.json';
//import searchIndex from "./searchIndex.json" assert { type: "json" };

export function textSearch(query) {
    /**
     * returns an array of objects, one per hit, that contains all necessary data
     * to generate the html for the search bar.
     * said objects contain the page name, section name, anchor link and surrounding
     * text of the object.
     * 
     * param query: string to look for
     * 
     * returns: array of objects {page_name, section, anchor, surrounding_text}
     */

    // how many characters of surrounding text are to be extracted
    // ! actual returned text might not be exactly this many characters due to rounding !
    const surrounding_text_chars = 60;

    // to be returned:
    let results = [];

    // if query.length == 1 this script will always return [] due to search logic
	if (query.length < 3) {
		return [];
	}

	query = query.toLowerCase();

    // go through all subsections and check wheather they contain the query
    // in their text contents. All appearances are stored in hits:
    let hits = [];

    for (let page in searchIndex) {
        let anchor = searchIndex[page]["route"];

        for (let section in searchIndex[page]) {
             
            if (section === 'route') {
                // this section only contains the link of the page and doesn't 
                // contain actual text from the page
                continue;
            }

            let textContents = searchIndex[page][section];

            // the following is a bit convoluted but allowes for a simpler
            // search logic later on, see below

            let cursor = - query.length;

            if (query.length == 1) {
                console.debug(
                    `This script cannot handle query lengths of one character.
                    query was: {query}`
                    );

                return [];
            }

            while (cursor !== -1) {

                cursor = textContents.toLowerCase().indexOf(query, cursor + query.length);
                
                /**
                 * due to how cursor is initialised, this will start at index 0.
                 * if no hits are found (anymore), cursor gets set to -1 and the
                 * while loop terminates.
                 * 
                 * the cursor is always advanced by the query length to find the
                 * next appearance of the query in the following iteration of the
                 * loop.
                 */

                if (cursor == -1) { continue; }

                let surrounding_text = '';

                let whisker_len = Math.floor((surrounding_text_chars-query.length) / 2) - 3;
                // subtract 3 because '...' gets always included

                if (whisker_len > 0) {
                    surrounding_text = '...' 
                        + textContents.substring(cursor-whisker_len, cursor+query.length+whisker_len+1)
                        + '...';

                }

                hits.push([page, section, anchor, surrounding_text]);
   
            }
        }
    }

    if (hits.length == 0) { return []; }

    // now that all hits are collected, assemble arrays that svelte can easily
    // work with.

    // initialise results
    results = [
        {
            title: hits[0][0], // name on the page
            hits : 0,          // how many times the query appeared
                               // initially 0, later set to at least 1
            route: searchIndex[hits[0][0]]['route']

        }
    ];

    // add remaining results
    let page_index = 0;
    hits.forEach(hit => {
        if (results[page_index].title === hit[0]) {
            results[page_index].hits += 1;

        } else {

            results.push(
                {
                    title: hit[0],
                    hits : 1,
                    route: searchIndex[hit[0]]["route"] // TODO this doesnt work?
                }
            );
            page_index += 1;
        }
    });
    // this code works because hits was just pushed to page after page
    // and thus hits is ordered

    results.forEach(result => {
        
        // get all hits regarding this page
        let on_page = hits.filter(r => {
            return r[0] === result.title;
        });

        // from this svelte later constructs the hits list for this page
        let sections = [];

        on_page.forEach(hit => {
            // if this is a subsection, this will hold its anchor part
            let subsec = '#'+hit[1]; 
            if (hit[1].indexOf(" \u00bb ") != -1) {
                subsec = '#'+subsec.substring(subsec.indexOf(" \u00bb ") + 3)
            }
            sections.push(
                {
                    title: hit[1],                                     // section title
                    anchor: searchIndex[hit[0]]["route"] + subsec, 
                    surrounding: hit[3]
                }
            );
        });

        result.bysection = sections;
    });

    return results;
}


export function directSearch(query) {

    if (query.length < 3) {
        return [];
    }

    let results = [];
    let page_names = Object.keys(searchIndex);

    page_names.forEach(pagename => {
        let page_sections = Object.keys(searchIndex[pagename]);

        if (pagename.toLowerCase().indexOf(query.toLowerCase()) != -1) {
            results.push(
                {
                    name: pagename,
                    route: searchIndex[pagename]["route"]
                }
            );
        }

        page_sections.forEach(section => {
            if (section.toLowerCase().indexOf(query.toLowerCase()) == -1 || section === 'route') {
                return;
            }
            let route = searchIndex[pagename]['route']+'#'+section;

            // if its a subsection, this route is not correct
            let seperator_index = section.indexOf(" \u00bb ");
            if (seperator_index != -1) {
                route = searchIndex[pagename]['route']+'#'+section.substring(section.indexOf(" \u00bb ")+3);

                // also, if its a subsection its only an actual hit if the match occurs in the subsection part
                // of the section name.
                if (section.substring(seperator_index + 3).toLowerCase().indexOf(query.toLowerCase()) == -1) {
                    return;
                }
            }

            results.push({
                name: pagename+" \u00bb "+section,
                route: route
            });
        });
    });

    return results;

}