const readline = require('readline-sync')
const content = {}
const credentials = require('./credentials.json')
const robots = {
    text: require('./robots/text.js')
}


async function main() {
    content.searchTerm = getSearchTerm()
    content.searchPrefix = getSearchPrefix()

    await robots.text(content)

    function getSearchTerm() {
        return readline.question("Type what you want to search: ")
    }

    function getSearchPrefix() {
        var prefixes = ["What is", "Who is", "The history of", "When is", "Where to find"]
        var optionChosed = readline.keyInSelect(prefixes, "Chose one prefixe option: ")
        return prefixes[optionChosed]
    }

    console.log(content)
}

main()