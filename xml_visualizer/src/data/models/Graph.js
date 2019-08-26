import vis from 'visjs-network'

export const Graph = (props = { depth: 20 }) => {
  let nodes = new vis.DataSet([])
  let edges = new vis.DataSet([])
  let depth = props.depth
  let edgesFilter = (item) => true
  let nodesFilter = (item) => item.level <= depth
  let nodesView = new vis.DataView(nodes, {
    filter: nodesFilter,
  })
  let edgesView = new vis.DataView(edges, {
    filter: edgesFilter,
  })
  let network = null
  function addNode(node) {
    const parentEdge = node.parentNode && {
      from: node.parentNode.id,
      to: node.id,
    }
    nodes.add([
      {
        id: node.id,
        label: node.nodeName,
        level: node.level,
        // y: node.level * 100,
        // x: randomFromMinusToPlus(200),
      },
    ])
    if (parentEdge) {
      edges.add([parentEdge])
    }
  }
  function groupNodes({ filter = () => true, groupName }) {
    const addGroup = (node) => {
      const name = typeof groupName === 'function' ? groupName(node) : groupName
      return { ...node, group: name }
    }
    const affectedNodes = nodes.get({ filter }).map(addGroup)
    nodes.update(affectedNodes)
  }
  function cleanUp() {
    nodes.clear()
    edges.clear()
  }
  return {
    addNode,
    cleanUp,
    groupNodes,
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
    },
  }
}
