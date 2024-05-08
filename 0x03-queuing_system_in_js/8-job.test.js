import kue from 'kue';
import { expect } from 'chai';
import createPushNotificationsJobs from './8-job';

describe('createPushNotificationsJobs', () => {
  let queue;

  beforeEach(() => {
    queue = kue.createQueue({ redis: { port: 6379, host: '127.0.0.1', auth: 'password' }, prefix: 'test' });
    queue.testMode.enter();
  });

  afterEach(() => {
    queue.testMode.clear();
    queue.testMode.exit();
  });

  it('throws an error if jobs is not an array', () => {
    expect(() => createPushNotificationsJobs({}, queue)).to.throw('Jobs is not an array');
  });

  it('creates jobs with the correct data', () => {
    const jobs = [
      { phoneNumber: '4153518780', message: 'This is the code 1234 to verify your account' },
      { phoneNumber: '4153518781', message: 'This is another code to verify your account' },
    ];

    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs.length).to.equal(2);
    expect(queue.testMode.jobs[0].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[0].data).to.deep.equal(jobs[0]);
    expect(queue.testMode.jobs[1].type).to.equal('push_notification_code_3');
    expect(queue.testMode.jobs[1].data).to.deep.equal(jobs[1]);
  });

  it('attaches event listeners to each job', () => {
    const jobs = [{ phoneNumber: '4153518780', message: 'Test' }];
    createPushNotificationsJobs(jobs, queue);

    expect(queue.testMode.jobs[0].listeners('complete')).to.have.lengthOf(1);
    expect(queue.testMode.jobs[0].listeners('failed')).to.have.lengthOf(1);
    expect(queue.testMode.jobs[0].listeners('progress')).to.have.lengthOf(1);
  });
});


