const credentials = require('../credentials.json')
const algorithmiaClient = require('algorithmia')
const sbd = require('sbd')

async function robot(content) {
    await fetchContentFromWikipedia(content)
    cleanContent(content)
    breakContentIntoSentences(content)

    async function fetchContentFromWikipedia(content) {
        var algorithmia = algorithmiaClient(credentials.algorithmia.apiKey)
        var wikiClient = algorithmia.algo('web/WikipediaParser/0.1.2')
        var wikiResponse = await wikiClient.pipe(content.search.term)
        var wikiContent = wikiResponse.get()
        content.response.rawContent = wikiContent.content
    }


    function cleanContent(content) {
        content.response.cleanContent = removeMarkdownAndBlankLines(content.response.rawContent)
        content.response.cleanContent = removeDates(content.response.cleanContent)

        function removeMarkdownAndBlankLines(rawContent) {
            var lines = rawContent.split('\n')

            var cleanLines = lines.filter((line) => {
                if (line.trim().length === 0 || line.trim().startsWith('=')) {
                    return false
                }
                return true
            })

            return cleanLines.join(' ')
        }

        function removeDates(rawContent) {
            return rawContent.replace(/\((?:\([^()]*\)|[^()])*\)/gm, '').replace(/  /g, ' ')
        }
    }

    function breakContentIntoSentences(content) {
        content.response.sentences = []

        var sentences = sbd.sentences(content.response.cleanContent)
        sentences.forEach((sentence) => {
            content.response.sentences.push({
                text: sentence,
                keywords: [],
                images: []
            })
        })
    }
}

module.exports = robot