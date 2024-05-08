const kue = require('kue');
const queue = kue.createQueue();


function sendNotification(phoneNumber, message) {
    console.log(`Sending notification to ${phoneNumber}, with message: ${message}`);
}


queue.process('push_notification_code', function(job, done) { // Change type to 'push_notification_code'
    const { phoneNumber, message } = job.data;
    sendNotification(phoneNumber, message);
    done();
})

sendNotification('4153518780', 'This is the code to verify your account')