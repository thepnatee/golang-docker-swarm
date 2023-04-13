import { check, sleep } from 'k6';
import http from 'k6/http';



export let options = {
  vus: 10, // Number of virtual users
  rps: 10000, // Target requests per second
  stages: [
    { duration: '10s', target: 100 }, // Ramp-up to 100 virtual users over 10 seconds
    { duration: '20s', target: 100 }, // Stay at 100 virtual users for 20 seconds
    { duration: '10s', target: 0 }, // Ramp-down to 0 virtual users over 10 seconds
  ],

};
export default function() {
  let res = http.get('http://localhost:3000/count');
  check(res, {
    'status is 200': r => r.status === 200,
    'content length is correct': r => r.body.length === 13
  });
  sleep(1);
}