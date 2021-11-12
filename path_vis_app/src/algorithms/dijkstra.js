/*
----------------------
 Dijkstra's Algorithm
----------------------
INPUTS:
    grid -> the board/2D array of nodes
    startNode -> the node that the search is starting at
    finishNode -> the node that the search is looking for

OUTPUT:
    "All" the nodes in the order that they were visited

SIDE EFFECTS:
    Makes nodes point back to their predecessor (the previous node),
        which allows us to compute the shortest path by backtracking
        from the finishNode.
*/
export function dijkstra(grid, startNode, finishNode) {
  const visitedNodesInOrder = [];
  startNode.distance = 0;

  // All get unvisited nodes (all nodes)
  const unvisitedNodes = getAllNodes(grid);

  while (!!unvisitedNodes.length) {
    // Sort the unvisited nodes by distance
    sortNodesByDistance(unvisitedNodes);
    // Get the closest node
    const closestNode = unvisitedNodes.shift();

    /* Encoutering a wall (we skip it): */
    if (closestNode.isWall) continue;

    /* If the closest node has distance of infinity
              we must be trapped, so we should stop: */
    if (closestNode.distance === Infinity) return visitedNodesInOrder;

    // We have now visited the closest node
    closestNode.isVisited = true;
    visitedNodesInOrder.push(closestNode);

    // Check if we have reached the finishNode
    if (closestNode === finishNode) return visitedNodesInOrder;

    // Update the unvisited neighbors of the closest node
    updateUnvisitedNeighbors(closestNode, grid);
  }
}

/*
Function for sorting the unvisitedNodes by distance (ascending).
*/
function sortNodesByDistance(unvisitedNodes) {
  unvisitedNodes.sort((nodeA, nodeB) => nodeA.distance - nodeB.distance);
}

/*
Function for updating the distance and previousNode values of each of the
    unvisited neighbor nodes to a given node on a given grid.
*/
function updateUnvisitedNeighbors(node, grid) {
  const unvisitedNeighbors = getUnvisitedNeighbors(node, grid);
  for (const neighbor of unvisitedNeighbors) {
    neighbor.distance = node.distance + 1;
    neighbor.previousNode = node;
  }
}

/*
Function for getting the neighbor nodes of a given node on a given grid
    that have not been visited.
*/
function getUnvisitedNeighbors(node, grid) {
  const neighbors = [];
  const { col, row } = node;

  // Get nodes one above, right, left, and below the given node
  if (row > 0) neighbors.push(grid[row - 1][col]);
  if (row < grid.length - 1) neighbors.push(grid[row + 1][col]);
  if (col > 0) neighbors.push(grid[row][col - 1]);
  if (col < grid[0].length) neighbors.push(grid[row][col + 1]);

  // Filter out the neighbor nodes that are already visited
  return neighbors.filter((neighbor) => !neighbor.isVisited);
}

/*
Function that returns all the nodes in a given grid
    (in a 1D array/list)
*/
function getAllNodes(grid) {
  const nodes = [];

  for (const row of grid) {
    for (const node of row) {
      nodes.push(node);
    }
  }

  return nodes;
}

/*
Function that backtracks from the finish node to the start node
    in order to find the shortest path
    (*Only works after dijkstra's algorithm is called*)
*/
export function getNodesInShortestPathOrder(finishNode) {
  const nodesInShortestPathOrder = [];
  let currentNode = finishNode;

  while (currentNode != null) {
    nodesInShortestPathOrder.unshift(currentNode);
    currentNode = currentNode.previousNode;
  }

  return nodesInShortestPathOrder;
}
