const { sortFunc, findDifferencesBetweenArray, compareData } = require('../src/utils');
const { mockedOldData, mockedNewData } = require('./mock');

const primaryKey = Object.keys(mockedOldData[0])[0];

it('should return sorted results', () => {
  
  mockedOldData.sort((a,b) => sortFunc(a, b, primaryKey))

  let flag = true;
  for (let i=0; i<mockedOldData - 1; i++) {
    if (mockedOldData[i][primaryKey] >= mockedOldData[i + 1][primaryKey]) {
      flag = false;
    }
  }
  expect(flag).toBe(true);
});

it('should return differences between arrays', () => {
  let diffArr = findDifferencesBetweenArray(Object.keys(mockedOldData[0]), Object.keys(mockedNewData[0]));

  expect(diffArr.length).toBe(0);

  diffArr = findDifferencesBetweenArray(Object.keys(mockedNewData[0]), Object.keys(mockedOldData[0]));
  expect(diffArr.length).not.toBe(0);
});

it('should return differences between data', () => {
  const { sameKeyArr, existInOldArr, existInNewArr } = compareData(mockedOldData, mockedNewData, primaryKey);

  expect(sameKeyArr.length).toBe(1);
  expect(existInOldArr.length).toBe(5);
  expect(existInNewArr.length).toBe(5);
})