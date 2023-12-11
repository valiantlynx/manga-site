from a_star import *

graph = Graph()
nodes = {
    'A': (0, 0), 'B': (1, 2), 'C': (2, 1), 'D': (3, 3), 'E': (4, 2),
    'F': (5, 3), 'G': (6, 1), 'H': (7, 2), 'I': (8, 0), 'J': (9, 1)
}
for name, pos in nodes.items():
    graph.add_node(Node(name, pos))

edges = [
    ('A', 'B'), ('A', 'C'), ('B', 'D'), ('B', 'E'), ('C', 'F'),
    ('C', 'G'), ('D', 'H'), ('D', 'I'), ('E', 'J')
]
for node1, node2 in edges:
    graph.add_edge(graph.nodes[node1], graph.nodes[node2])

path = graph.a_star_search('A', 'J')
print("Path to goal:", path if path else "No path found")
