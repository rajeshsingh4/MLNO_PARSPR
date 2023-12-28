export const getJSONDiffValue = (oldJson, updatedJson) => {
    //Function for comparision start here
    let diffParams = {};

    const compareValue = (val1, val2) => {
        let isSame = true;
        for (let p in val1) {
            if (typeof (val1[p]) === "object") {
                let objectValue1 = val1[p],
                    objectValue2 = val2[p];
                for (let value in objectValue1) {
                    isSame = compareValue(objectValue1[value], objectValue2[value]);
                    if (isSame === false) {
                        return false;
                    }
                }
            } else {
                if (val1 !== val2) {
                    isSame = false;
                }
            }
        }
        return isSame;
    }

    for (let p in oldJson) {
        if (!compareValue(oldJson[p] && oldJson[p], updatedJson[p] && updatedJson[p])) {
            diffParams[p] = updatedJson[p];
        }
    }
    return diffParams;
}