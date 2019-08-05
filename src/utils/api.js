import { getThumbURL, getOriginalURL } from './commons'

export const fetchSPARQLResult = sparql =>
  fetch(
    `https://query.wikidata.org/sparql?query=${encodeURIComponent(
      sparql
    )}&format=json`
  )
    .then(res => {
      return res.status >= 400 ? null : res.json()
    })
    .catch(err => {
      console.log(err)
      return null
    })

export const validateQID = qid =>
  fetch(`https://www.wikidata.org/wiki/Special:EntityData/${qid}`).then(
    res => res.ok
  )

export const fetchDepictions = qid =>
  fetch(
    `https://commons.wikimedia.org/w/api.php?action=query&list=search&srsearch=haswbstatement:P180=${qid}&srnamespace=6&srlimit=100&format=json&origin=*`
  )
    .then(res => res.json())
    .then(res => ({
      images: res.query.search.map(p => ({
        thumb_src: getThumbURL(p.title, '300px'),
        src: getOriginalURL(p.title),
        tiny_src: getThumbURL(p.title, '10px'),
        url: `https://commons.wikimedia.org/wiki/${p.title.replace(/ /g, '_')}`,
        caption: p.title
      })),
      totalhits: res.query.searchinfo.totalhits
    }))
    .catch(err => {
      console.log(err)
      return null
    })
