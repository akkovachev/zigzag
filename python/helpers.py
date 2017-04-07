priceObject = {}
cityRelMap = {
    'Plovdiv': 2,
    'Burgas': 3,
    'Sofia': 4,
    'Stara_Zagora': 5
}

relationMap = {
    'Plovdiv': {
        "Plovidv": 1
    },
    'Burgas' : {
        "bratya_miladinovi" : 1,
        "krasnodar" : 2,
        "meden_runik": 3,
        "slaveikov": 4
    },
    "Sofia" : {
        "mladost": 1,
        "pirotksa": 2
    },
    "Stara_Zagora" : {
        "Stara_zagora": 1
    }
}

def generatePriceList(loopSoup):
    for city, shops in relationMap.items():
        tmpObject = {}
        for shop in shops:
            try:
                price = loopSoup.select( 'section[rell="' + str(cityRelMap[city]) + '"] li[rell="' + str(relationMap[city][shop]) + '"] .price')[ 0].get_text()
                tmpObject[shop] = price
            except IndexError:
                tmpObject[shop] = "Zarejdane"

        priceObject[city] = tmpObject

    return priceObject