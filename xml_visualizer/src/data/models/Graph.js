import vis from 'visjs-network'

export const Graph = () => {
  let nodes = new vis.DataSet([])
  let edges = new vis.DataSet([])
  let depth = 20
  let edgesFilter = (item) => true
  let nodesFilter = (item) => item.level <=depth
  let nodesView = new vis.DataView(nodes, {
    filter: nodesFilter
  })
  let edgesView = new vis.DataView(edges, {
    filter: edgesFilter
  })
  let network = null
  function addNode(node) {
    const parentEdge = node.parentNode && { from: node.parentNode.id, to: node.id }
    nodes.add([{ id: node.id, label: node.nodeName, level: node.level }])
    if (parentEdge) {
      edges.add([parentEdge])
    }
  }
  return {
    addNode,
    get network() {
      return network
    },
    set network(n) {
      network = n
    },
    get nodes() {
      return nodesView
    },
    get edges() {
      return edgesView
    },
    get depth() {
      return depth
    },
    set depth(value) {
      depth = value
      nodesView.refresh()
    }
  }
}
