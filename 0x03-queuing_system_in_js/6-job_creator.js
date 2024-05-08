const kue = require('kue');
const queue = kue.createQueue();

const jobData = {
  phoneNumber: "",
  message: "",
}

const job = queue
    .create('push_notification_code', jobData)
    .save((err) => {
        if (!err) {
            console.log(`Notification job created: ${job.id}`);
        }
        else {
            console.log('Notification job failed', err);
        }
    })
    .on('complete', () => {
        console.log('Notification job completed');
    });

