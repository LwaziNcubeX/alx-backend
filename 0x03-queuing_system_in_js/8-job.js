const kue = require('kue');
const queue = kue.createQueue();

function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) throw new Error('Jobs is not an array');
  jobs.forEach((jobData) => {
    const job = queue.create('push_notification_code_3', jobData);
    job.on('complete', () => console.log(`Notification job ${job.id} completed`));
    job.on('failed', () => console.log(`Notification job ${job.id} failed`));
    job.on('progress', (progress) => console.log(`Notification job ${job.id} ${progress}% complete`));
    job.save((err) => {
      if (err) {
        console.error(`Error creating job: ${err}`);
      } else {
        console.log(`Notification job created: ${job.id}`);
      }
    });
  });
}


module.exports = createPushNotificationsJobs;