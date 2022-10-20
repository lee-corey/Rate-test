const { getTableName, getColumns, getData } = require('../src/model');
const { oldPool, closePools } = require('../src/config');

describe('db', () => {
  afterAll(async () => {
    await closePools();
  })
  it('should return columns', async () => {
    const tables = await getTableName(oldPool);
    const oldColumns = await getColumns(oldPool, tables[0]);

    expect(oldColumns.length).not.toBe(0);
  })

  it('should return data', async () => {
    const tables = await getTableName(oldPool);
    const oldData = await getData(oldPool, tables[0]);

    expect(oldData.length).not.toBe(0);
  })
});