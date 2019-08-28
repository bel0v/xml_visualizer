import uuid from 'uuid/v4'
/* eslint-disable no-loop-func */

// function readXml(xmlFile) {
//   xmlhttp = new XMLHttpRequest()
//   xmlhttp.open('GET', xmlFile, false)
//   if (xmlhttp.overrideMimeType) {
//     xmlhttp.overrideMimeType('text/xml')
//   }
//   xmlhttp.send(null)
//   const xmlDoc = xmlhttp.responseXML
//   return xmlDoc
// }

function bfs(node, maxLevel, nodeCallback) {
  const queue = []
  node.level = node.level || 1
  node.id = node.id || uuid()

  while (node) {
    nodeCallback(node)
    if (!maxLevel || node.level < maxLevel) {
      ;[...node.children].forEach(child => {
        child.level = node.level + 1
        child.id = uuid()
        queue.push(child)
      })
    }
    node = queue.shift()
  }
  return Promise.resolve()
}

export function walkXMl(doc, maxLevel, nodeCallback) {
  bfs(doc, maxLevel, nodeCallback)
}
