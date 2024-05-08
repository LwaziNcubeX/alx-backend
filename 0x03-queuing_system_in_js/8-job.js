const kue = require('kue');
const queue = kue.createQueue();

function createPushNotificationsJobs(jobs, queue) {
  if (!Array.isArray(jobs)) throw new Error('Jobs is not an array');
  jobs.forEach((job) => {
    const jobCreated = queue.create('push_notification_code_3', job).save((err) => {
      if (!err) console.log(`Notification job created: ${jobCreated.id}`);
    });
    jobCreated.on('complete', () => console.log(`Notification job ${jobCreated.id} completed`));
    jobCreated.on('failed', () => console.log(`Notification job ${jobCreated.id} failed`));
    jobCreated.on('progress', (progress) => console.log(`Notification job ${jobCreated.id} ${progress}% complete`));
  });
}

module.exports = createPushNotificationsJobs;