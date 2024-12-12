// Get DOM elements
const canvas = document.getElementById('graphCanvas');
const ctx = canvas.getContext('2d');
const generateNodesBtn = document.getElementById('generateNodesBtn');
const nodeCountInput = document.getElementById('nodeCount');
const nodeLabelTypeSelect = document.getElementById('nodeLabelType');
const addEdgeForm = document.getElementById('addEdgeForm');
const fromNodeSelect = document.getElementById('fromNode');
const toNodeSelect = document.getElementById('toNode');
const edgeWeightInput = document.getElementById('edgeWeight');
const startNodeSelect = document.getElementById('startNodeSelect');
const runDijkstraBtn = document.getElementById('runDijkstraBtn');
const resetBtn = document.getElementById('resetBtn');
const resultsTableBody = document.querySelector('#resultsTable tbody');

// Graph Data Structures
let nodes = [];
let edges = [];

// Event Listeners
generateNodesBtn.addEventListener('click', generateNodes);
addEdgeForm.addEventListener('submit', addEdge);
runDijkstraBtn.addEventListener('click', runDijkstra);
resetBtn.addEventListener('click', resetGraph);

// Generate Nodes
function generateNodes() {
    const nodeCount = parseInt(nodeCountInput.value);
    const labelType = nodeLabelTypeSelect.value;

    if (isNaN(nodeCount) || nodeCount <= 0) {
        alert('Please enter a valid number of nodes.');
        return;
    }

    resetGraph(); // Clear graph before generating new nodes

    const innerSpace = 50; // Keep nodes away from the edges
    for (let i = 0; i < nodeCount; i++) {
        const x = Math.random() * (canvas.width - 2 * innerSpace) + innerSpace;
        const y = Math.random() * (canvas.height - 2 * innerSpace) + innerSpace;
        const label = labelType === 'character' ? String.fromCharCode(65 + i) : `${i + 1}`;
        nodes.push({ id: label, x, y, distance: Infinity, previous: null, visited: false });
    }

    updateNodeSelections();
    drawGraph();
}

// Add Edge
function addEdge(event) {
    event.preventDefault();
    const from = fromNodeSelect.value;
    const to = toNodeSelect.value;
    const weight = parseInt(edgeWeightInput.value);

    if (from === to) {
        alert('Cannot connect a node to itself.');
        return;
    }

    if (edges.some(edge => (edge.from === from && edge.to === to) || (edge.from === to && edge.to === from))) {
        alert('Edge already exists between these nodes.');
        return;
    }

    edges.push({ from, to, weight });
    drawGraph();
    addEdgeForm.reset();
}

// Update Dropdowns
function updateNodeSelections() {
    // fromNodeSelect.innerHTML = '';
    // toNodeSelect.innerHTML = '';
    // startNodeSelect.innerHTML = '';

    nodes.forEach(node => {
        const option = document.createElement('option');
        option.value = node.id;
        option.textContent = `Node ${node.id}`;
        fromNodeSelect.appendChild(option);

        const option2 = document.createElement('option');
        option2.value = node.id;
        option2.textContent = `Node ${node.id}`;
        toNodeSelect.appendChild(option2);

        const option3 = document.createElement('option');
        option3.value = node.id;
        option3.textContent = `Node ${node.id}`;
        startNodeSelect.appendChild(option3);
    });
}

// Draw Graph
function drawGraph(currentNodeId = null, shortestPathEdges = []) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw edges
    edges.forEach(edge => {
        const fromNode = nodes.find(n => n.id === edge.from);
        const toNode = nodes.find(n => n.id === edge.to);

        ctx.beginPath();
        ctx.moveTo(fromNode.x, fromNode.y);
        ctx.lineTo(toNode.x, toNode.y);

        if (shortestPathEdges.includes(edge)) {
            ctx.strokeStyle = '#4CAF50'; // Green for shortest path
            ctx.lineWidth = 4;
        } 
        // else if (highlightedEdges.includes(edge)) {
        //     ctx.strokeStyle = 'yellow'; // Orange for highlighted edges
        //     ctx.lineWidth = 4;
        // } 
        else {
            ctx.strokeStyle = '#333'; // Default edge color
            ctx.lineWidth = 2;
        }

        ctx.stroke();

        const midX = (fromNode.x + toNode.x) / 2;
        const midY = (fromNode.y + toNode.y) / 2;
        ctx.font = '14px Arial';
        ctx.fillStyle = '#000';
        ctx.fillText(edge.weight, midX, midY + 14);
    });

    // Draw nodes
    nodes.forEach(node => {
        ctx.beginPath();
        ctx.arc(node.x, node.y, 18, 0, 2 * Math.PI);
        ctx.fillStyle = currentNodeId === node.id ? 'yellow' : node.visited ? 'grey' : 'purple';
        ctx.fill();
        ctx.fillStyle = '#fff'; //text color  
        ctx.font = '16px Arial';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(node.id, node.x, node.y);
    });
}

// Run Dijkstra's Algorithm
async function runDijkstra() {
    const startId = startNodeSelect.value;
    if (!startId) {
        alert('Please select a start node.');
        return;
    }

    initializeDijkstra(startId);
    await visualizeDijkstra();
    const shortestPathEdges = getShortestPathEdges();
    drawGraph(null, shortestPathEdges);
    displayResults();
}

// Initialize Dijkstra's Algorithm
function initializeDijkstra(startId) {
    nodes.forEach(node => {
        node.distance = node.id === startId ? 0 : Infinity;
        node.previous = null;
        node.visited = false;
    });
    drawGraph();
}

// Visualize Dijkstra's Algorithm
async function visualizeDijkstra() {
    while (true) {
        let currentNode = null;
        let minDistance = Infinity;

        // Find the unvisited node with the smallest distance.
        nodes.forEach(node => {
            if (!node.visited && node.distance < minDistance) {
                minDistance = node.distance;
                currentNode = node;
            }
        });

        // If no more nodes are left to visit, exit the loop.
        if (!currentNode) break;

        currentNode.visited = true;
        drawGraph(currentNode.id);
        await sleep(500);

        // Get all edges connected to the current node.
        const neighbors = edges.filter(edge => edge.from === currentNode.id || edge.to === currentNode.id);
        for (let edge of neighbors) {
            const neighborId = edge.from === currentNode.id ? edge.to : edge.from;
            const neighbor = nodes.find(n => n.id === neighborId);

            if (neighbor.visited) continue;

            const newDist = currentNode.distance + edge.weight;
            if (newDist < neighbor.distance) {
                neighbor.distance = newDist;
                neighbor.previous = currentNode.id;
            }
        }

        drawGraph();
    }
}

// Get Shortest Path Edges
function getShortestPathEdges() {
    const pathEdges = [];
    nodes.forEach(node => {
        if (node.previous) {
            // Check if the edge goes from the current node to its previous node
            const edge = edges.find(e =>(e.from === node.id && e.to === node.previous) || (e.to === node.id && e.from === node.previous)); 
            
            if (edge) pathEdges.push(edge);
        }
    });
    return pathEdges;
}

// Display Results
function displayResults() {
    resultsTableBody.innerHTML = '';
    nodes.forEach(node => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${node.id}</td>
            <td>${constructPath(node.id).join(' → ') || 'N/A'}</td>
            <td>${node.distance === Infinity ? '∞' : node.distance}</td>
        `;
        resultsTableBody.appendChild(row);
    });
    document.querySelector('.results-container').scrollIntoView({ behavior: 'smooth' }); //auotmatic scroll when execution is done
}

// Construct Path
function constructPath(nodeId) {
    const path = [];
    let current = nodeId;
    while (current) {
        path.unshift(current);
        current = nodes.find(n => n.id === current)?.previous; //The ?. operator checks if the value before it is not null or undefined.|| Prevent Errors:  optional chaining operator
    }
    return path;
}

// Utility: Sleep
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

// Reset Graph
function resetGraph() {
    nodes = [];
    edges = [];
    fromNodeSelect.innerHTML = '';
    toNodeSelect.innerHTML = '';
    startNodeSelect.innerHTML = '';
    resultsTableBody.innerHTML = '';
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

