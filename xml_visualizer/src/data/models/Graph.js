export const Graph = () => {
  let nodes = []
  let edges = []
  function addNode(node) {
    const parentEdge = node.parentNode ? [{ from: node.parentNode.id, to: node.id }] : []
    nodes = [...nodes, { id: node.id, label: node.nodeName, level: node.level }]
    edges = [...edges, ...parentEdge]
  }
  return {
    addNode,
    getNodes: () => nodes,
    getEdges: () => edges
  }
}
