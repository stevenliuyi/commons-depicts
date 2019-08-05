import md5 from 'blueimp-md5'

export const getThumbURL = (title, width) => {
  const filename = title.replace(/ /g, '_').substr(5)
  const hash = md5(filename)
  const hash1 = hash.substr(0, 1)
  const hash2 = hash.substr(0, 2)
  const thumb_src = `https://upload.wikimedia.org/wikipedia/commons/thumb/${hash1}/${hash2}/${filename}/${width}-${filename}`

  return thumb_src
}

export const getOriginalURL = title =>
  `https://commons.wikimedia.org/wiki/Special:FilePath/${encodeURIComponent(
    title.substr(5)
  )}`
