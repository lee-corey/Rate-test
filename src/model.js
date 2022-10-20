async function getTableName(pool) {
  const tables = await pool.query("SELECT * FROM pg_catalog.pg_tables");

  return tables.rows.filter(table => table.schemaname === 'public').map(table => table['tablename'])
}

async function getColumns(pool, table) {
  const columns = await pool.query(`
    SELECT *
      FROM information_schema.columns
      WHERE table_name   = '${table}';
  `)

  return columns.rows.map(column => column["column_name"]);
}

async function getData(pool, table) {
  const data = await pool.query(`
    SELECT *
      FROM ${table}
  `);

  return data.rows;
}

module.exports = { getTableName, getColumns, getData }