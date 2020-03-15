export function genAnswerGrid() {
	const result = [];
	for (let i = 0; i < 5; i++) {
		let arr = [];
		for (let j = 0; j < 5; j++) {
			if (Math.floor(Math.random() * 10) > 5) {
				arr.push(Math.floor(Math.random() * 9));
			} else {
				arr.push(0)
			}
		}
		result.push(arr);
	}
	return result;
}

export function genGrid(answer) {
	let gridGame = [];

	for (let i = 0; i < answer.length; i++) {
		let row = [...answer[i]];
		for (let j = 0; j < row.length; j++) {
			if (row[j] === 0) {
				row[j] = Math.floor(Math.random() * 9) + 1;
			}
		}
		gridGame.push(row);
	}
	return gridGame;
}
