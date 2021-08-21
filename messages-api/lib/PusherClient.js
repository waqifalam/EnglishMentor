const Pusher = require('pusher');

const {
  PUSHER_APP_ID,
  PUSHER_KEY,
  PUSHER_SECRET,
} = process.env;

const pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: 'ap4',
  useTLS: true,
});

const PusherClient = {
  sendTranscript(uuid, transcript) {
    pusher.trigger(uuid, 'sendTranscript', transcript);
  },
};

module.exports = PusherClient;
