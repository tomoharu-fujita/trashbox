import xml.etree.cElementTree as ET
import pandas as pd
import fire

def main(csv_file, xml_file):
    df = pd.read_csv(csv_file)
    root = ET.Element("urlset", xmlns="http://www.sitemaps.org/schemas/sitemap/0.9")
    for url in df['URL']:
        second = ET.SubElement(root, "url")
        ET.SubElement(second, "loc").text = url
    tree = ET.ElementTree(root)
    ET.indent(tree)
    tree.write(xml_file)
    tree.write(xml_file, xml_declaration=True, encoding='utf-8', method="xml")

if __name__ == '__main__':
    fire.Fire(main)