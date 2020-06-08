export function _uuid() {
  var d = Date.now()
  if (
    typeof performance !== 'undefined' &&
    typeof performance.now === 'function'
  ) {
    d += performance.now() //use high-precision timer if available
  }
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    var r = ((d + Math.random() * 16) % 16) | 0
    d = Math.floor(d / 16)
    return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
  })
}

export function exportCsv(data, columns, title) {
  let csv = JSONtoCSV(data, columns)

  let createAndDownloadFile = (fileName, content) => {
    let aTag = document.createElement('a')
    let blob = new Blob(['\uFEFF', content])
    aTag.download = fileName
    aTag.href = URL.createObjectURL(blob)
    aTag.click()
    URL.revokeObjectURL(blob)
  }
  createAndDownloadFile(title, csv)
}

export function JSONtoCSV(arr, columns, delimiter = ',') {
  return [
    ...arr.map(obj =>
      columns.reduce(
        (acc, key) =>
          `${acc}${!acc.length ? '' : delimiter}"${!obj[key] ? '' : obj[key]}"`,
        ''
      )
    )
  ].join('\n')
}

export function deepCopy(inObject) {
  let outObject, value, key

  if (typeof inObject !== "object" || inObject === null) {
    return inObject 
  }

  outObject = Array.isArray(inObject) ? [] : {}

  for (key in inObject) {
    value = inObject[key]
    outObject[key] = deepCopy(value)
  }

  return outObject
}

export function debounce(fun, t = 0) {
  let st
  if (typeof fun !== 'function') {
    throw new TypeError('Not a function')
  }
  return function() {
    if (st) {
      clearTimeout(st)
    }
    st = setTimeout(_ => {
      fun.apply(this, arguments)
    }, t)
  }
}
