# This script generates images that can be used as thumbnails for articles

CONTENTS_PATH = r'src/content'
LOGO_PATH = r'src/lib/linkpreview/logo.png'

class Article:
    dir: str
    id: str

    category: str
    title: str
    description: str

    def __init__(self, dir, id, cat, title, desc):
        self.dir = dir
        self.id = id
        self.category = cat
        self.title = title
        self.description = desc

# get all articles

from os import path
from os import listdir
from os import system

articleObj = []

category_dirs = listdir(CONTENTS_PATH)
for dir in category_dirs:
    if not path.isdir(f'{CONTENTS_PATH}/{dir}'): continue

    articles = listdir(f'{CONTENTS_PATH}/{dir}')
    with open(f'{CONTENTS_PATH}/{dir}/metadata.js') as js:
        for line in js:
            if line.strip().startswith('title'):
                category = line.replace('title:', '').replace("'", '').strip()

    for file in articles:
        if not file.endswith('.svx'): continue

        id = file.removesuffix('.svx')
        title = ''
        with open(f'{CONTENTS_PATH}/{dir}/{file}') as f:
            for line in f:
                if line.strip().startswith('title:'):
                    title = line.replace('title:', '').strip()
                if line.strip().startswith('title_short:'):
                    title = line.replace('title_short:', '').strip()

        articleObj.append(Article(dir, id, category, title, ''))

RES = 1200, 627
MODE = 'RGBA'

from PIL import Image, ImageFont, ImageDraw
for obj in articleObj:
    output = Image.new(MODE, RES, color = '#101b3b')
    logo = Image.open(LOGO_PATH).resize((300, 300), Image.Resampling.LANCZOS)
    output.alpha_composite(logo, (40, 164))

    bg = ImageDraw.Draw(output)

    x_0 = 380
    y_0 = 230

    opensansBold = ImageFont.truetype('static/fonts/OpenSans-VariableFont_wdth,wght.ttf', 20)
    opensansBold.set_variation_by_name('Bold')
    bg.text((x_0, y_0), 'TASK FORCE HELLCAT / WIKI', (148,162,207), font=opensansBold)
    
    opensansLight = ImageFont.truetype('static/fonts/OpenSans-VariableFont_wdth,wght.ttf', 70)
    opensansLight.set_variation_by_name('Light')
    bg.text((x_0, y_0+30), obj.title, font=opensansLight)

    opensansItalic = ImageFont.truetype('static/fonts/OpenSans-Italic-VariableFont_wdth,wght.ttf', 50)
    opensansItalic.set_variation_by_name('Light Italic')
    bg.text((x_0, y_0+120), obj.category, (148,162,207), font=opensansItalic)

    output.save(f'static/images/thumbnails/{obj.id}.png')