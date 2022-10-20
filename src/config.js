const { Pool } = require("pg");

const oldCred = {
  user: "old",
  host: "localhost",
  database: "old",
  password: "hehehe",
  port: 5432,
};

const newCred = {
  user: "new",
  host: "localhost",
  database: "new",
  password: "hahaha",
  port: 5433,
};

const oldPool = new Pool(oldCred);
const newPool = new Pool(newCred);

const closePools = async () => {
  await oldPool.end();
  await newPool.end();
}

module.exports = { oldPool, newPool, closePools }