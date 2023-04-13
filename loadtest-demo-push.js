import http from 'k6/http';
import { check } from 'k6';


export let options = {
  vus: 10, // Number of virtual users
  rps: 10000, // Target requests per second
  stages: [
    { duration: '10s', target: 100 }, // Ramp-up to 100 virtual users over 10 seconds
    { duration: '20s', target: 100 }, // Stay at 100 virtual users for 20 seconds
    { duration: '10s', target: 0 }, // Ramp-down to 0 virtual users over 10 seconds
  ],

};

export default function () {
  let headers = { 'Content-Type': 'application/json' };
  let payload = {
    "to": "U61198bb44f6c28c97c5818617464ba1d",
    "messages": [
        {
            "type": "text",
            "text": "Hello, world 2",
            "sender": {
                "name": "Bot",
                "iconUrl": "https://stickershop.line-scdn.net/stickershop/v1/sticker/51626526/ANDROID/sticker.png"
            }
        }
    ]
  };
  let res = http.post('http://localhost:3000/push', JSON.stringify(payload), { headers: headers });
  check(res, { 'status was 200': (r) => r.status == 200 });
}
