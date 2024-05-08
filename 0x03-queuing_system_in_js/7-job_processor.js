const kue = require('kue');
const queue = kue.createQueue();

const blacklistNumbers = ['4153518780', '4153518781'];

function sendNotification(phoneNumber, message, job, done) {
    job.progress(0, 100); // Track the progress of the job
    
    if (blacklistNumbers.includes(phoneNumber)) {
        const errorMessage = `Phone number ${phoneNumber} is blacklisted`;
        done(new Error(errorMessage));
    } else {
        job.progress(50, 100); // Track the progress to 50%
        console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
        done(); // Mark the job as done
    }
}

queue.process('push_notification_code_2', 2, (job, done) => {
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message, job, done);
});
