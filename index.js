const cassandra = require('cassandra-driver');

// Initialize the client
const client = new cassandra.Client({
  contactPoints: ['127.0.0.1:9042'],
  localDataCenter: 'datacenter1',
  keyspace: 'system',
});

// Create keyspace and tables
async function InitializeDatabase() {
  // Create keyspace
  await client.execute(`
    CREATE KEYSPACE IF NOT EXISTS investmentDB
    WITH replication = {
      'class': 'SimpleStrategy',
      'replication_factor': 1
    }
    AND durable_writes = true;
  `);

  // Create table investors
  await client.execute(`
    CREATE TABLE IF NOT EXISTS investmentDB.investors (
      investorId uuid PRIMARY KEY,
      firstName text,
      lastName text,
      email text,
      status text,
      createdAt timestamp
    )
  `);

  // Create table stocks
  await client.execute(`
    CREATE TABLE IF NOT EXISTS investmentDB.stocks (
      stockId uuid PRIMARY KEY,
      tickerSymbol text,  // AAPL, ORCL
      companyName text,
      market text    // NYSE, NASDAQ
    )
  `);

  // Create table transactions
  await client.execute(`
    CREATE TABLE IF NOT EXISTS investmentDB.transactions (
      transactionId uuid PRIMARY KEY,
      investorId uuid,
      stockId uuid,
      transactionType text,
      quantity decimal,
      pricePerShare decimal,
      transactionDate timestamp
    )
  `);

  // Create table portfolios
  await client.execute(`
    CREATE TABLE IF NOT EXISTS investmentDB.portfolios (
      investorId uuid PRIMARY KEY,
      stockId uuid,
      quantityOwned decimal
    )
  `);

  // Create table marketData
  await client.execute(`
    CREATE TABLE IF NOT EXISTS investmentDB.marketData (
      stockId uuid PRIMARY KEY,
      date timestamp,
      openPrice decimal,
      closePrice decimal,
      highPrice decimal,
      lowPrice decimal,
      volume decimal
    )
  `);

  // Create table watchList
  await client.execute(`
    CREATE TABLE IF NOT EXISTS investmentDB.watchList (
      watchListId uuid PRIMARY KEY,
      investorId uuid,
      stockId uuid,
      addedDate timestamp
    )
  `);
}

async function insertInvestor(investorData) {
  const query = `
    INSERT INTO investmentDB.investors (investorId, firstName, lastName, email, status, createdAt)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  await client.execute(query, investorData, { prepare: true });
}

async function main() {
  try {
    await InitializeDatabase();
    console.log('Database initialized');

    await insertInvestor([
      cassandra.types.Uuid.random(),
      'Haward',
      'Jie',
      'haward.jie@columnardb.com',
      'Active',
      new Date(),
    ]);
    console.log('Haward Jie record created');

    await insertInvestor([
      cassandra.types.Uuid.random(),
      'Mary',
      'Smith',
      'mary.smith@columnardb.com',
      'Active',
      new Date(),
    ]);
    console.log('Mary Smith record created');
  } catch (err) {
    console.error('Error: ', err);
  } finally {
    await client.shutdown();
  }
}

main();
