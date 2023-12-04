// Using Fisher-Yates algorithm to shuffle an array
export default function shuffle(array) {
	let copy = [], n = array.length, i;
	while(n) {
		i = Math.floor(Math.random() * n--);
		copy.push(array.splice(i, 1)[0]);
	}
	return copy;
}
