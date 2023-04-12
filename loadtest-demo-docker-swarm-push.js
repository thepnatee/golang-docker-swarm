import http from "k6/http";



export let options = {
  vus: 10, // 10 virtual users
  duration: '30s', // Run the test for 30 seconds
  rps: 100, // Send 100 requests per second
};

export default function () {
  const url = "http://localhost:3001/push-queue";
  const payload = JSON.stringify({
    to: "U61198bb44f6c28c97c5818617464ba1d",
    messages: [
      {
        type: "text",
        text: "Hello, world 1",
        sender: {
          name: "Bot",
          iconUrl: "https://stickershop.line-scdn.net/stickershop/v1/sticker/51626526/ANDROID/sticker.png",
        },
      },
    ],
  });

  const headers = { "Content-Type": "application/json" };

  const res = http.post(url, payload, { headers });

  check(res, {
    'status is 200': r => r.status === 200,
    'content length is correct': r => r.body.length === 13
  });
  sleep(1);
}
