import Pusher from "pusher-js";

const NEXT_PUBLIC_PUSHER_KEY = process.env.NEXT_PUBLIC_PUSHER_KEY;

if (!NEXT_PUBLIC_PUSHER_KEY) {
  throw new Error("Pusher API key not set");
}

const PusherClient = new Pusher(NEXT_PUBLIC_PUSHER_KEY, { cluster: "ap4" });

export default PusherClient;
