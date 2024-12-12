# Dijkstra's Algorithm

Dijkstra's Algorithm is a popular graph search algorithm used to find the shortest path from a source node to all other nodes in a weighted graph. It guarantees the shortest path in graphs with non-negative edge weights.

## Features
- Implementation of Dijkstra's Algorithm.
- Calculates the shortest path from a single source node to all other nodes.
- Suitable for weighted graphs with non-negative weights.

## Prerequisites
Before running the project, ensure you have the following installed:
- [Git](https://git-scm.com/)
- [C++ Compiler] or any other programming environment you used.

## Getting Started
Follow these steps to set up and run the project:

### Clone the Repository
```bash
git clone https://github.com/mayurahire06/Dijkstra-s-Algorithm.git
cd Dijkstra-s-Algorithm
```

### Compile and Run
1. Compile the program:
   ```bash
   g++ dijkstra.cpp -o dijkstra
   ```
2. Run the executable:
   ```bash
   ./dijkstra
   ```

## Input Format
The program accepts the following inputs:
1. Number of nodes in the graph.
2. Number of edges.
3. Edge list (source node, destination node, and weight).
4. Source node from which shortest paths are calculated.

## Example
### Input:
```
5 7
1 2 2
1 3 4
2 3 1
2 4 7
3 5 3
4 5 1
1 4 2
1
```
### Output:
```
Shortest distances from node 1:
Node 1: 0
Node 2: 2
Node 3: 3
Node 4: 2
Node 5: 6
```

## Files
- `dijkstra.cpp`: Main source code for the algorithm.
- `README.md`: Documentation for the project.

## Algorithm Explanation
1. Initialize distances to all nodes as infinity, except the source node, which is set to 0.
2. Use a priority queue to iteratively select the node with the smallest distance.
3. Update the distances to its neighboring nodes if a shorter path is found.
4. Repeat until all nodes have been processed.

## Complexity
- **Time Complexity**: O((V + E) log V), where V is the number of vertices and E is the number of edges.
- **Space Complexity**: O(V + E) for storing the graph.

## Applications
- Network routing protocols.
- Geographic information systems (GIS) for finding the shortest path between locations.
- Real-time navigation systems.

## Contributing
Contributions are welcome! If you have suggestions for improvements or new features, feel free to open an issue or submit a pull request.

## License
This project is licensed under the [MIT License](LICENSE).

## Author
[Mayur Ahire](https://github.com/mayurahire06)
