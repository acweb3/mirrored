export const pullImage = async (index) =>
	(await import(`assets/images/reflections/reflection${index}.webp`)).default;

// Arbitrary number, basically.
const IMAGES_LENGTH = 74;
const ROWS = 5;
const COLUMNS = 4;

const getUniqueFromSet = (row, column) => {
	let imageIndexSet = [...Array(IMAGES_LENGTH)].map((_x, i) => i);

	return [...Array(row)].map(() => {
		return [...Array(column)].map(() => {
			const rando = Math.floor(Math.random() * imageIndexSet.length);
			const index = imageIndexSet[rando];

			imageIndexSet = [
				...imageIndexSet.slice(0, rando),
				...imageIndexSet.slice(rando + 1),
			];

			return index;
		});
	});
};

export const uniquesGrid = getUniqueFromSet(ROWS, COLUMNS);
