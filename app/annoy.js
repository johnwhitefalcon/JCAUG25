

import { useState } from 'react';

// Helper function to calculate Euclidean distance between two points
function euclideanDistance(point1, point2) {
  return Math.sqrt(
    point1.reduce((sum, p, idx) => sum + Math.pow(p - point2[idx], 2), 0)
  );
}

// Class to build a graph and perform ANN search
class ANNGraph {
  constructor(points, neighborsCount = 5) {
    this.points = points; // Array of data points (each point is an array of coordinates)
    this.neighborsCount = neighborsCount; // Number of neighbors to connect for each node
    this.graph = this.buildGraph(); // Construct the graph on initialization
  }

  // Build the graph with neighbors for each point
  buildGraph() {
    const graph = {};

    // For each point, find the nearest neighbors
    this.points.forEach((point, idx) => {
      graph[idx] = this.findNeighbors(idx);
    });

    return graph;
  }

  // Find `neighborsCount` nearest neighbors for a given point index
  findNeighbors(index) {
    const distances = this.points.map((p, i) => ({
      index: i,
      distance: i !== index ? euclideanDistance(this.points[index], p) : Infinity
    }));

    distances.sort((a, b) => a.distance - b.distance);
    return distances.slice(0, this.neighborsCount).map(d => d.index);
  }

  // Perform approximate nearest neighbor search
  search(target, startIdx = 0, maxSteps = 100) {
    let currentIdx = startIdx;
    let closestIdx = startIdx;
    let closestDistance = euclideanDistance(target, this.points[startIdx]);
    const visited = new Set();

    for (let step = 0; step < maxSteps; step++) {
      visited.add(currentIdx);

      // Update closest node if the current node is closer
      const distance = euclideanDistance(target, this.points[currentIdx]);
      if (distance < closestDistance) {
        closestIdx = currentIdx;
        closestDistance = distance;
      }

      // Explore neighbors to find a closer node
      let moved = false;
      for (const neighborIdx of this.graph[currentIdx]) {
        if (visited.has(neighborIdx)) continue;

        const neighborDistance = euclideanDistance(target, this.points[neighborIdx]);
        if (neighborDistance < closestDistance) {
          currentIdx = neighborIdx;
          moved = true;
          break;
        }
      }

      // Stop if no closer neighbor was found in this step
      if (!moved) break;
    }

    return closestIdx;
  }
}

export default function Home() {
  const [target, setTarget] = useState([0, 0]);
  const [nearest, setNearest] = useState(null);

  // Initialize points and ANN graph
  const points = [
    [1, 2], [2, 3], [3, 4], [5, 5], [8, 8],
    // Add more points here if needed
  ];
  const graph = new ANNGraph(points);

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // Search for nearest neighbor and update state
    const nearestIdx = graph.search(target);
    const nearestPoint = points[nearestIdx];
    setNearest(nearestPoint);
  };

  return (
    <div>
      <h1>Approximate Nearest Neighbor Search</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Target Point:
          <input
            type="text"
            value={target.join(',')}
            onChange={(e) => setTarget(e.target.split(',').map(Number))}
          />
        </label>
        <button type="submit">Find Nearest</button>
      </form>
      {nearest && (
        <div>
          <h2>Nearest Neighbor:</h2>
          <p>{nearest.join(', ')}</p>
        </div>
      )}
    </div>
  );
}






