import os
import json

PATH = r"../src/Wiki/"

# helper function that extracts all sections and contents
# input: svelte file name
# output: array: [#sections, output array]

# output array format: index 0 - h0, index 1 - h1, index 2 - h1 contents, index 3 - h2, etc.

def getContents(filename):
    
    dir = PATH + filename

    file = open(dir)
    raw_content = file.read()

    # strip everything before and after wiki tag

    # end of <Wiki> tag
    start = raw_content.find("<h1>") # the tag itself is 6 chars
    end = raw_content.find("</svelte:fragment>")
    content = raw_content[start:end]

    # remove all unnecessary tags
    content = content.replace("</h1>", "")
    content = content.replace("<h1>", "")
    content = content.replace("</p>", "")
    content = content.replace("<p>", "")
    content = content.replace("<p />", "")
    content = content.replace("</section>", "")
    content = content.replace("\n", "")
    content = content.replace('"', "")

    sections_count = 0
    for i in content:
        if i == '>':
            sections_count = sections_count + 1

    content = content.replace(">","<section id=")
    
    sections = content.split("<section id=")

    # strip whitespaces 
    for element in sections:
        sections[sections.index(element)] = element.strip()

    file.close()

    return [sections_count, sections]

print(getContents("Panzertruppen.svelte"))

files = os.listdir(PATH) # array with svelte file names

to_JSON = {}
for file in files:
    parse = getContents(file)
    
    pagename = parse[1][0]
    current_sections = parse[0]
    
    to_page = {}
    for i in range(0,current_sections):
        this_entry = {parse[1][2*i+1]:parse[1][2*(i+1)]}
        to_page.update(this_entry)

    to_JSON[pagename] = to_page

print(to_JSON)

with open('searchIndex.json', 'w', encoding='utf-8') as f:
    json.dump(to_JSON, f, ensure_ascii=True, indent=4)