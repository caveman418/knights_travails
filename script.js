function knightMoves(start, end) {
	if (start === end) return 'no moves required!';
	for (let val of [...start,...end]) {
		if (val > 8 || val < 1) return 'invalid input';
	}
	
	let board = createBoard();
	let startNode = board[findIndex(start[0],start[1])];
	
	let path = [];
	let queue = [startNode]; //queue used for BFS search of graph
	let visited = new Set(); //keep track of visited nodes to avoid cycling
	visited.add(startNode);
	
	while (queue.length > 0) {
		let currentNode = queue.shift();
		
		if (currentNode.x == end[0] && currentNode.y == end[1]) {
			let temp = currentNode;
			while (temp.prev) {
				path.unshift([temp.x,temp.y]);
				temp = temp.prev;
			}
			path.unshift([startNode.x,startNode.y]);
			return path;
		}
		
		for (let move of currentNode.next) {
			if (!visited.has(move)) {
				move.prev = currentNode;
				visited.add(move);
				queue.push(move);
			}
		}
	}
}


function findIndex (x,y) { //acts as a hash function
	if (x > 8 || x < 1 || y > 8 || y < 1) return null;
	return ((x - 1) * 8) + (y - 1);
}

function createBoard() {
	
	const Node = (x,y) => {
		return {x, y, next: null, prev: null};
	}
	
	let spaces = [];
	
	for (let i = 1; i <= 8; i++) {
		for (let j = 1; j <= 8; j++) {
			spaces.push(Node(i,j));
		}
	}
	
	for (let space of spaces) {
		let x = Number(space.x);
		let y = Number(space.y);
		
		let validMoves = [];
		
		let xdir = [1,1,-1,-1,2,2,-2,-2];
		let ydir = [2,-2,2,-2,1,-1,1,-1];
		
		for (let i in xdir) {
			validMoves.push(spaces[findIndex(x + xdir[i], y + ydir[i])]);
		}
		
		space.next = validMoves.filter(val => val);
	}
	
	return spaces;
}