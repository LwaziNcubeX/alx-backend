import redis from 'redis';

const client = redis.createClient();
const { promisify } = require('util');


const setAsync = promisify(client.set).bind(client);
const getAsync = promisify(client.get).bind(client);

async function reserveSeat(number) {
  await setAsync('available_seats', number);
}

async function getCurrentAvailableSeats() {
  const numberOfAvailableSeats = await getAsync('available_seats');
  return parseInt(numberOfAvailableSeats, 10);
}

(async () => {
  await reserveSeat(50);
})();

let reservationEnabled = true;

const kue = require('kue');
const queue = kue.createQueue();

const express = require('express');
const app = express();

app.get('/available_seats', async (req, res) => {
  const numberOfAvailableSeats = await getCurrentAvailableSeats();
  res.json({ numberOfAvailableSeats });
});

app.get('/reserve_seat', (req, res) => {
  if (!reservationEnabled) {
    return res.json({ status: 'Reservation are blocked' });
  }

  const job = queue.create('reserve_seat', {}).save((err) => {
    if (err) {
      return res.json({ status: 'Reservation failed' });
    }

    console.log(`Seat reservation job ${job.id} created`);
    return res.json({ status: 'Reservation in process' });
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (errorMessage) => {
    console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
  });
});


app.get('/process', async (req, res) => {
  res.json({ status: 'Queue processing' });

  await queue.process('reserve_seat', async (job, done) => {
    const numberOfAvailableSeats = await getCurrentAvailableSeats();
    const newNumberOfAvailableSeats = numberOfAvailableSeats - 1;

    await reserveSeat(newNumberOfAvailableSeats);

    if (newNumberOfAvailableSeats === 0) {
      reservationEnabled = false;
      return done();
    }

    if (newNumberOfAvailableSeats >= 0) {
      return done();
    }

    return done(new Error('Not enough seats available'));
  });

  job.on('complete', () => {
    console.log(`Seat reservation job ${job.id} completed`);
  });

  job.on('failed', (errorMessage) => {
    console.log(`Seat reservation job ${job.id} failed: ${errorMessage}`);
  });
});

app.listen(1245, () => {
  console.log('Listening on port 1245');
});
