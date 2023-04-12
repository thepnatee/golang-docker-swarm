import { check, sleep } from 'k6';
import http from 'k6/http';



export let options = {
    stages: [
      { duration: '10s', target: 10000 },     // Ramp-up to 100 VUs in 10 seconds
      { duration: '20s', target: 5000 },     // Stay at 100 VUs for 20 seconds
      { duration: '10s', target: 0 },       // Ramp-down to 0 VUs in 10 seconds
    ],
    thresholds: {
    http_req_failed: ['rate<0.01'], // http errors should be less than 1%
    http_req_duration: ['p(95)<200'], // 95% of requests should be below 200ms
  },
  };

export default function() {
  let res = http.get('http://localhost:3000/');
  check(res, {
    'status is 200': r => r.status === 200,
    'content length is correct': r => r.body.length === 13
  });
  sleep(1);
}