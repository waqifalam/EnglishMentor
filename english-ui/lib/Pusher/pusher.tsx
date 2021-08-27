import Pusher from'pusher-js';

import { Result } from '../../utils/store';

const { NEXT_PUBLIC_PUSHER_KEY } = process.env;

const pusher = NEXT_PUBLIC_PUSHER_KEY ? new Pusher(NEXT_PUBLIC_PUSHER_KEY, { cluster: 'ap4' }) : null;
const subscribe = (channel: string, results: Result[], setResults: (value: React.SetStateAction<Result[]>) => void): void => {
  if (pusher) {
    const subscribedChannel = pusher.subscribe(channel);
    subscribedChannel.bind('sendTranscript', (data: Result) => { setResults(() => results.map((result) => { return result.id === data.id ? data : result })); });
  }
};
const unsubscribe = (channel: string): void => { if (pusher) pusher.unsubscribe(channel) };

export default {
  subscribe,
  unsubscribe,
};
