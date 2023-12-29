const getJSONDiffValue = (oldJson, updatedJson) => {
	// Function for comparision start here
	const diffParams = {};

	const compareValue = (val1, val2) => {
		let isSame = true;
		for (const p in val1) {
			if (typeof val1[p] === 'object') {
				const objectValue1 = val1[p];
				const objectValue2 = val2[p];
				for (const value in objectValue1) {
					isSame = compareValue(objectValue1[value], objectValue2[value]);
					if (isSame === false) {
						return false;
					}
				}
			} else if (val1 !== val2) {
				isSame = false;
			}
		}
		return isSame;
	};

	for (const p in oldJson) {
		if (!compareValue(oldJson[p] && oldJson[p], updatedJson[p] && updatedJson[p])) {
			diffParams[p] = {
				previous: oldJson[p],
				current: updatedJson[p],
			};
		}
	}
	return diffParams;
};

export default getJSONDiffValue;
