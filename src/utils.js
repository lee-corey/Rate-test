const sortFunc = (a,b, primaryKey) => {
  if (a[primaryKey] > b[primaryKey]) {
    return 1;
  } else if (a[primaryKey] < b[primaryKey]) {
    return -1;
  }
  return 0;
}

const findDifferencesBetweenArray = (firstArr, secondArr) => {
  return firstArr.filter(each => !secondArr.includes(each));
}

const compareData = (oldData, newData, primaryKey) => {
  oldData.sort((a, b) => sortFunc(a,b, primaryKey))
  newData.sort((a, b) => sortFunc(a,b, primaryKey))

  const sameKeyArr = [], existInOldArr = [], existInNewArr = [];
  let i=0, j=0;
  // finding has same key but different data
  while (i < oldData.length || j < newData.length) {
    if (i === oldData.length) {
      existInNewArr.push(j);
      j++;
    } else if (j === newData.length) {
      existInOldArr,push(i);
      i++;
    } else if (oldData[i][primaryKey] === newData[j][primaryKey]) {
      Object.keys(oldData[i]).forEach(key => {
        let flag = false;
        if (key !== primaryKey && oldData[i][key] !== newData[j][key]) {
          flag = true;
        }
        if (flag) {
          sameKeyArr.push(oldData[i][primaryKey]);
        }
      })
      i++;
      j++;
    } else if(oldData[i][primaryKey] < newData[j][primaryKey]) {
      existInOldArr.push(oldData[i][primaryKey]);
      i++;
    } else if(oldData[i][primaryKey] > newData[j][primaryKey]) {
      existInNewArr.push(newData[j][primaryKey]);
      j++;
    }
  }

  return {
    sameKeyArr, existInOldArr, existInNewArr
  }
}

const generateReport = (oldData, newData, type, primaryKey, report) => {
  if (type === 'column') {
    let diffArr = findDifferencesBetweenArray(newData, oldData)

    if (diffArr.length) {
      report += `New table has ${diffArr.join(' ')} ${type} that old table doesn't has.\n\n`
    }

    diffArr = findDifferencesBetweenArray(oldData, newData)

    if (diffArr.length) {
      report += `Old table has ${diffArr.join(' ')} ${type} that new table doesn't has.\n\n`
    }
  } else if(type === 'row') {
    const {sameKeyArr, existInOldArr, existInNewArr} = compareData(oldData, newData, primaryKey)

    report += 'Here are primary keys corrupted during migration.\n'
    report += sameKeyArr.join('\n');
    report += '\n\nHere are missing keys.\n'
    report += existInOldArr.join('\n');
    report += '\n\nHere are newly added keys.\n'
    report += existInNewArr.join('\n');
  }

  return report;
}

module.exports = { sortFunc, findDifferencesBetweenArray, compareData, generateReport }