import os
import json
import re
from bs4 import BeautifulSoup

# DEPENDENCIES OF THIS SCRIPT ARE: lxml, bs4

PATH = r"../src/Wiki/"

def parse_page(filename):
    '''
    takes a svelte file name and returns the title of the page and a dict with
    section names (keys) and their text contents (values), bundled as an array
    
    input: svelte file name (with .svelte extension)
    output: array
        index 0: title of the page
        index 1: dict with entries ' section name : section text '

    remark: h2, h3 etc. headers are ignored. 
    '''

    page_name = ''
    page_sections = {}
    
    with open(PATH+filename, 'r') as svelte:

        # reading the .svelte and setting the Wiki tag as source

        index = svelte.read()
        bs = BeautifulSoup(index, 'lxml')
        root = bs.wiki.find('svelte:fragment')

        for section in root.find_all('section'):
            section_text = ''

            for p in section.descendants: 
                if p.name == 'p':
                    section_text = section_text + p.text + ' '

            # remove tags

            tags_to_remove = []#'a', 'link', 'Link', 'b', 'i', 'img', 'u', 'br', 'hr', '<strong>', 'em', 'abbr', 'acronym', 'address', 'bdo', 'blockquote', 'cite', 'q', 'code', 'ins', 'del', 'dfn', 'kbd', 'pre', 'samp', 'var', 'area', 'map', 'param', 'object', 'ul', 'ol', 'li', 'dl', 'dt', 'dd', 'noscript', 'audio', 'base']

            # apparently removal of tags is already handeled by bs4
            
            for tag in tags_to_remove:
                re.sub(r'<'+tag+'[*]>', '', section_text)

            page_sections.update({section.attrs['id']:section_text})

    page_name = root.h1.text

    return [page_name, page_sections]

def save_to_JSON(dict_to_save):
    '''
    saves given dict as searchIndex.json

    returns: 0 if successful
    '''

    with open('searchIndex.json', 'w', encoding='utf-8') as f:
        json.dump(dict_to_save, f, ensure_ascii=True, indent=4)

    return 0

def main():
    # empty dict to be converted to JSON
    output = {}

    # for all files, create a page entry in dict output 
    for file in os.listdir(PATH):
        if not os.path.basename(file).endswith('.svelte'): continue

        pagearr = parse_page(file)

        page_name = pagearr[0]
        page_sections = pagearr[1]

        output.update({page_name : page_sections})

    save_to_JSON(output)

    return 0

if __name__=='__main__': main()