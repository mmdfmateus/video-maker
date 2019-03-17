const credentials = require('../credentials.json')
const algorithmiaClient = require('algorithmia')

async function robot(content){
    await fetchContentFromWikipedia(content)

    async function fetchContentFromWikipedia(content){
        var algorithmia = algorithmiaClient(credentials.algorithmia.apiKey)
        var wikiClient = algorithmia.algo('web/WikipediaParser/0.1.2')
        var wikiResponse = await wikiClient.pipe(content.searchTerm)
        var wikiContent = wikiResponse.get()
        content.rawContent = wikiContent.content
        console.log(content)
    }
}

module.exports = robot