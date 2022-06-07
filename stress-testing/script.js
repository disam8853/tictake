import http from 'k6/http'
import { sleep, check } from 'k6'

const MAX_TARGET = 500
const ACTIVITY_ID = 1

export const options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '10s', target: 200 },
    { duration: '10s', target: MAX_TARGET },
    { duration: '1m', target: MAX_TARGET },
    { duration: '10s', target: 0 },
  ],
}
export default function () {
  const BASE_URL = 'http://34.110.184.154' // make sure this is not production
  let body = { email: '123@gmail.com', password: '123' }
  const param = {
    headers: {
      'Content-Type': 'application/json',
    },
  }

  const res = http.post(`${BASE_URL}/api/login`, JSON.stringify(body), param)
  check(res, {
    "has cookie 'access_token'": (r) => r.cookies.access_token && r.cookies.access_token.length > 0,
  })

  http.get(`${BASE_URL}/api/tickets`)

  http.post(`${BASE_URL}/api/orders`, JSON.stringify({ activity_id: ACTIVITY_ID }), param)

  sleep(1)
}
