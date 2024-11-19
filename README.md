# Goal: Create a NodeJs application that connects to a Cassandra database running in Docker.

1. Setup Docker Cassandra:

   - Pull the official Cassandra image from Docker Hub.
   - Run a Cassandra container.

2. Create a NodeJs application that connects to a Cassandra database
   - Clone the repository.
   - Install the Cassandra package.
   - Run the Node.js application.

## Step 1: Set Up Docker Cassandra

Pull the official Cassandra image from Docker Hub.

`docker pull cassandra:latest`

Create a new Cassandra container named my-cassandra and expose port 9042, which is the default port of Cassandra.

`docker run --name my-cassandra -p 9042:9042 -d cassandra:latest`

## Step 2: Clone the respository

Clone the repository cassandra-columnar-db from Github:

```bash
git clone https://github.com/hawardjie/cassandra-columnar-db.git
cd cassandara-columnar-db
```

Initial the cassandra-driver package to connect to Cassandra from NodeJs application.

`npm install cassandra-driver`

Run the NodeJs application

`node index.js`
