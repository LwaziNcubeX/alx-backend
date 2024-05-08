import redis from 'redis';

const { promisify } = require('util');
const client = redis.createClient();
const getAsync = promisify(client.get).bind(client);

client.on('connect', function() {
    console.log('Redis client connected to the server');
});

client.on('error', function(error) {
    console.log(`Redis client not connected to the server: ${error}`);
});

client.hset('HolbertonSchools', 'Portland', 50, redis.print);
client.hset('HolbertonSchools', 'Seattle', 80, redis.print);
client.hset('HolbertonSchools', 'New York City', 20, redis.print);
client.hset('HolbertonSchools', 'Bogota', 20, redis.print);
client.hset('HolbertonSchools', 'Cali', 40, redis.print);
client.hset('HolbertonSchools', 'Paris', 2, redis.print);

client.hgetall('HolbertonSchools', function(err, reply) {
    console.log(reply);
})
