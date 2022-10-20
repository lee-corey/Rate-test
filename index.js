const { getTableName, getColumns, getData } = require('./src/model');
const { oldPool, newPool, closePools } = require('./src/config');
const { generateReport } = require('./src/utils');

(async () => {
  const tables = await getTableName(oldPool);
  
  tables.forEach(async (table) => {
    const oldColumns = await getColumns(oldPool, table)
    const newColumns = await getColumns(newPool, table)
    generateReport(oldColumns, newColumns, 'column')

    const primaryKey = oldColumns[0];

    let oldData = await getData(oldPool, table);
    const newData = await getData(newPool, table);
    generateReport(oldData, newData, 'row', primaryKey);
  })
  await closePools();
})();