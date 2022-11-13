# basic filesystem access
from os import listdir, path, getcwd

# for creating the index.json
from json import dump

# for parsing the source files
# note: this requires lxml to be installed
from bs4 import BeautifulSoup

# directory that contains the directories with page content
ROOT_PAGES = r'./src/routes/'

# symbol that's used to indicate that a section contains a subsection,
# see also: http://xahlee.info/comp/unicode_arrows.html
ARROW_SYMBOL = '»'  # DO NOT CHANGE! Other code depends on this specific character.

# tags with text to be indexed (used by sections and subsections)
TEXT_ELEMENTS = ['p', 'ol', 'ul', 'li', 'h2', 'h3', 'h4', 'section']


def remove_escape_chars(str):
    return ''.join([e for e in str if e.isalnum() or e in [' ', '.', '-', '(', ')']]).strip()


def main():
    return
    # collect all pages to be read from into the iterator 'pages'
    # page_names = next(walk(ROOT_PAGES))[1] # works in Python 3.10, does not in 3.8
    page_names = [ item for item in listdir(ROOT_PAGES) if path.isdir(path.join(ROOT_PAGES, item)) ]
    page_dirs = [(ROOT_PAGES+page_name) for page_name in page_names]

    pages = zip(page_names, page_dirs)
    del page_names, page_dirs

    # main dict that gets written to disc eventually
    index_dict = {}

    # for every page, open its index.svelte
    for page_name, page_dir in pages:
        sv_path = path.join(page_dir, '+page.svelte')
        if not path.exists(sv_path):
            print(f'{sv_path} not existing, skipping')
            continue

        with open(sv_path, 'r', encoding='utf-8') as file:
            print(sv_path)
            index = file.read()
            parser = BeautifulSoup(index, 'lxml')

            # the actual content is inside a <svelte:fragment slot='content'> tag
            page_root = None
            fragments = parser.find_all('svelte:fragment')
            for fragment in fragments:
                try:
                    if fragment['slot'] == 'content':
                        page_root = fragment
                except KeyError:
                    continue

            del fragments

            # make sure page_root is well-defined
            assert page_root is not None

            page_sections = page_root.find_all('section', recursive=False)

            page_title = page_root.find('h1').text

            page_dict = {}
            # this will contain:
            #   route: its name for anchor links
            #   sections and subsections with their text contents

            # for every section/subsection etc. get its text

            for section in page_sections:
                try:
                    section_name = section['id']
                except KeyError:
                    # sections without ids shouldn't be indexed
                    continue

                section_text = ''
                for child in section.children:
                    if child.name in TEXT_ELEMENTS:
                        #print(child.text)
                        section_text = section_text + (child.text) + ' '
                        section_text = section_text.replace('\n', '').replace('\t', '').replace('  ', ' ')

                page_dict.update({section_name: section_text})

                # index subsections

                subsections = section.find_all('section', recursive=False)
                for subsection in subsections:
                    try:
                        subsection_name = section_name + ' ' + ARROW_SYMBOL + ' ' + subsection['id']
                    except KeyError:
                        # subsections without ids shouldn't be indexed
                        continue

                    # get subsection texts

                    subsection_text = ''
                    for child in subsection.descendants:
                        if child.name in TEXT_ELEMENTS:
                            subsection_text += remove_escape_chars(child.text) + ' '

                    page_dict.update({subsection_name: subsection_text})

        index_dict.update({page_title: page_dict})

    # bundle everything into one json object

    with open('./src/lib/search/searchIndex.json', 'w', encoding='utf-8') as f:
        dump(index_dict, f, ensure_ascii=True, indent=4)


if __name__ == "__main__":
    main()
