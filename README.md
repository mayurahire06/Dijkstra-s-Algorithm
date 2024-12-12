# Dijkstra's Algorithm

Dijkstra's Algorithm is a popular graph search algorithm used to find the shortest path from a source node to all other nodes in a weighted graph. It guarantees the shortest path in graphs with non-negative edge weights.

## Features
- Implementation of Dijkstra's Algorithm.
- Calculates the shortest path from a single source node to all other nodes.
- Suitable for weighted graphs with non-negative weights.

## Getting Started
Follow these steps to set up and run the project:

### Clone the Repository
```bash
git clone https://github.com/mayurahire06/Dijkstra-s-Algorithm.git
cd Dijkstras-Algorithm
```

## Input Format
The program accepts the following inputs:
1. Number of nodes in the graph.
2. Number of edges.
3. Edge list (source node, destination node, and weight).
4. Source node from which shortest paths are calculated.

## Files
- `visualize.js`: Main source code for the algorithm.
- `README.md`: Documentation for the project.

## Algorithm Explanation
1. Initialize distances to all nodes as infinity, except the source node, which is set to 0.
2. Use a priority queue to iteratively select the node with the smallest distance.
3. Update the distances to its neighboring nodes if a shorter path is found.
4. Repeat until all nodes have been processed.

## Complexity
- **Time Complexity**: O(V^2)
- **Space Complexity**: O(V + E), where V is the number of vertices and E is the number of edge for storing the graph.

## Applications
- Network routing protocols.
- Geographic information systems (GIS) for finding the shortest path between locations.
- Real-time navigation systems.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## Author
[Mayur Ahire](https://github.com/mayurahire06)
