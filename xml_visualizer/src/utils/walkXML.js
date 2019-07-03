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
  while (node) {
    nodeCallback(node)
    if (node.level < maxLevel) {
      ;[...node.children].forEach(child => {
        child.level = node.level + 1
        queue.push(child)
      })
    }
    node = queue.shift()
  }
}

export function walkXml(doc, nodeCallback) {
  const maxLevel = 2
  bfs(doc, maxLevel, nodeCallback)
}
