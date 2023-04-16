import { check, sleep } from 'k6';
import http from 'k6/http';



export let options = {
  vus: 50, // Number of virtual users
  duration: '30s',

};
export default function() {
  let res = http.get('http://localhost:3000/count');
  check(res, {
    'status is 200': r => r.status === 200,
    'content length is correct': r => r.body.length === 13
  });
  sleep(1);
}