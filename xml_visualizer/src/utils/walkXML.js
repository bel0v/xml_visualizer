import uuid from 'uuid/v4'
import { resolve } from 'q'
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
  node.level = 0
  node.id = uuid()

  while (node) {
    nodeCallback(node)
    if (node.level < maxLevel) {
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

export function walkXMl(doc, maxLevel = 10, nodeCallback) {
  bfs(doc, maxLevel, nodeCallback)
}
