var assert = require('assert');
const PretixRestApi = require('./index');
var expect = require('chai').expect;

describe('Pretix Testing 1', function () {
  const pretix = new PretixRestApi({
    url: 'https://xxx.xxxxxxxx.xxx',
    token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
  });

  let organizers;

  describe('Pretix get organizers', function () {
    before(async function () {
      const request = { endpoint: '' };
      organizers = await pretix.get(request);
    });

    it('Organizers return status 200', function () {
      expect(organizers.status).to.equal(200);
    });

    it('Organizers response count is a number', function () {
      expect(organizers.data.count).to.be.a('number');
    });
  });

  after('', async function () {
    console.log();
    console.log('--------------------');
    console.log(`Organizers totalcount : ${organizers?.data?.count}`);
    console.log('--------------------');
  });
});
describe('Pretix Testing 2 (for default organizer)', function () {
  const pretix = new PretixRestApi({
    url: 'https://xxx.xxxxxxxx.xxx',
    token: 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx',
    organizer: 'mkt',
  });

  let events;

  describe('Pretix get events', function () {
    before(async function () {
      const request = { endpoint: 'events/', params: { live: false } };
      events = await pretix.get(request);
    });

    it('Events return status 200', function () {
      expect(events.status).to.equal(200);
    });

    it('Events response count is a number', function () {
      expect(events.data.count).to.be.a('number');
    });
  });

  after('', async function () {
    console.log();
    console.log('--------------------');
    console.log(`Events totalcount : ${events?.data?.count}`);
    console.log('--------------------');
  });
});
