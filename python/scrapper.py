from bs4 import BeautifulSoup
import requests
import json
import helpers

readPage = requests.get('http://www.zigzag.bg/#stores/burgas/1')
loopSoup = BeautifulSoup(readPage.text, 'html5lib')

loopSoup.findAll('div', {"id": "stores-more"})

data = helpers.generatePriceList(loopSoup)

jsonFile = open('prices.json', 'w')
jsonFile.write(json.dumps(data, default=lambda o: o.__dict__, indent=4))
print "File written Successfuly"