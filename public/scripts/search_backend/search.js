/*
// load the searchIndex.json as an js object
json = fs.readFileSync('searchIndex.json', 'utf8');
let index = JSON.parse(json);

*/

let index;

fetch("./scripts/search_backend/searchIndex.json")
.then(response => {
   return response.json();
})
.then(jsondata => index = jsondata);

// this variable determines how long the environment should be.
// subject to change !
let env_length = 60;

export function searchFor(query) {
    /*
    search function for the search bar object. 
    searches all text content of wiki pages and returns the results,
    see output format below

    input: string - at least three letters

    output: javascript array
    output format: [ hit arrays ] (array of arrays)
    hit array format: [hit page title, hit section, hit environment]
    */

    query = query.toLowerCase();

    if (query.length < 3) {
        throw new Error("(error: search denied) please provide a longer query.");
    }

    // array to be returned in the end
    let results = [];

    for (let page in index) {
        for (let sec in index[page]) {

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
                    var tail_length = Math.floor((env_length - query.length) / 2);
                    
                    // actual text will be three characters less because of '...'
                    var text_include = tail_length - 3;

                    if (!(text_include<0)) {
                        env = '...' + text.substring(last_index-text_include, query.length+last_index+text_include+1) + '...';
                    }

                    results.push([page, sec, env]);
                }
            }
        }
    }

    return results;
}

