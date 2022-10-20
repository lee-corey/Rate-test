const fs = require('fs');
const { getTableName, getColumns, getData } = require('./src/model');
const { oldPool, newPool, closePools } = require('./src/config');
const { generateReport } = require('./src/utils');

(async () => {
  const tables = await getTableName(oldPool);
  let report = '';
  
  const promises = tables.map(async (table) => {
    return new Promise(async (resolve) => {
      report += `This is the ${table} table report\n\n`;
      const oldColumns = await getColumns(oldPool, table)
      const newColumns = await getColumns(newPool, table)
      report = generateReport(oldColumns, newColumns, 'column', '', report)

      const primaryKey = oldColumns[0];

      let oldData = await getData(oldPool, table);
      const newData = await getData(newPool, table);
      report = generateReport(oldData, newData, 'row', primaryKey, report);
      resolve();
    })
  })
  Promise.all(promises).then(async () => {
    fs.writeFile('./report.txt', report, function(err) {
      if (err) {
        console.log(err);
      }
      console.log('Report generated');
    })
    await closePools();
  })
})();