import vis from 'visjs-network'

export const Graph = () => {
  let nodes = new vis.DataSet([])
  let edges = new vis.DataSet([])
  let network = null
  function addNode(node) {
    const parentEdge = node.parentNode && { from: node.parentNode.id, to: node.id }
    nodes.add([{ id: node.id, label: node.nodeName, level: node.level }])
    if (parentEdge) {
      edges.add([parentEdge])
    }
  }
  return {
    get network() {
      return network
    },
    set network(n) {
      network = n
    },
    addNode,
    getNodes: () => nodes,
    getEdges: () => edges,
  }
}
