const getColorsArray = () => {
    const arrayFaceColor = (r: number, g: number, b: number) => {
        return [
            r, g, b,
            r, g, b,
            r, g, b,
            r, g, b
        ]
    };

    // Build colors array
    let colorArray: any = [];

    colorArray = colorArray
        .concat(arrayFaceColor(0, 1, 0)) // right green
        .concat(arrayFaceColor(0, 1, 0)) // left green
        .concat(arrayFaceColor(1, 0, 0)) // top red
        .concat(arrayFaceColor(1, 0, 0)) // bottom red
        .concat(arrayFaceColor(0, 0, 1)) // front blue
        .concat(arrayFaceColor(0, 0, 1)); // back blue

    return colorArray;
};

const getOpacityArray = () => {
    let opacityArray: any = [];

    const arrayFaceOpacity = (odd: number, even: number) => {
        return [
            odd, even,
            odd, even,
            odd, even,
            odd, even,
        ]
    };

    opacityArray = opacityArray
        .concat(arrayFaceOpacity(0.2, 0.8)) // right
        .concat(arrayFaceOpacity(0.2, 0.8)) // left
        .concat(arrayFaceOpacity(0.2, 0.8)) // top
        .concat(arrayFaceOpacity(0.2, 0.8)) // bottom
        .concat(arrayFaceOpacity(0.2, 0.8)) // front
        .concat(arrayFaceOpacity(0.2, 0.8)); // back

    return opacityArray;
};

export const defaultColors = getColorsArray();
export const defaultOpacity = getOpacityArray();

// Triangles faces indices, starting from left
const indicesMapper: any = {
  '0:1': [0, 7],
  '2:3': [8, 15],
  '4:5': [16, 23],
  '6:7': [24, 31],
  '8:9': [32, 39],
  '10:11': [40, 47],
};

const mapFaceIndex = (faceIndex: number) => {
    let firstIndex = faceIndex - 1;
    let secondIndex = faceIndex;

    if (faceIndex % 2 === 0) {
        firstIndex = faceIndex;
        secondIndex = faceIndex + 1;
    }

    return indicesMapper[firstIndex + ':' + secondIndex];
};

export const getUpdatedOpacity = (faceIndex: number) => {
    const rangeToUpdate = mapFaceIndex(faceIndex);
    const updatedOpacity = defaultOpacity.map((item: number, index: number) => {
        if (index >= rangeToUpdate[0] && index <= rangeToUpdate[1]) {
            if (item === 0.2) {
                item = 0.4;
            } else if (item === 0.8) {
                item = 1.0;
            }
        } else {
            if (item === 0.4) {
                item = 0.2;
            } else if (item === 1.0) {
                item = 0.8;
            }
        }

        return item;
    });

    return updatedOpacity;
};
