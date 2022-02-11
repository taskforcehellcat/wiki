var fs = require('fs');
const { env } = require('process');
const { text } = require('svelte/internal');
json = fs.readFileSync('searchIndex.json', 'utf8');

let index = JSON.parse(json);
let env_length = 6;

function main(query) {
    /*
    search function for the search bar object. 
    searches all text content of wiki pages and returns the results.

    input: string - at least four letters

    output: javascript array
    output format: [ hit arrays ]
    hit array format: [hit page title, hit section, hit environment]
    */

    query = query.toLowerCase();

    if (query.length < 3) {
        return "(error: search denied) please provide a longer query."
    }

    results = [];

    for (let page in index) {
        for (let sec in index[page]) {

            let text = index[page][sec];
            let lowertext = text.toLowerCase();
            
            last_index = -1 * query.length;
            while (last_index !== -1) {
                last_index = lowertext.indexOf(query, last_index+query.length);

                if (last_index !== -1) {
                    let env = '';

                    try {
                        env = '...'+text.substring(last_index-env_length, last_index)+env;
                    } finally {}

                    try {
                        env = env+text.substring(last_index, last_index+env_length+1)+'...';
                    } finally {}

                    results.push([page, sec, env]);
                }
            }
        }
    }

    return results;
}

console.log(main("sani"));