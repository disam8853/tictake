import http from 'k6/http'
import { sleep } from 'k6'

const MAX_TARGET = 2000

export const options = {
  stages: [
    { duration: '10s', target: 100 },
    { duration: '10s', target: 1000 },
    { duration: '10s', target: MAX_TARGET },
    { duration: '30s', target: MAX_TARGET },
  ],
}
export default function () {
  const BASE_URL = 'http://34.110.184.154' // make sure this is not production

  http.get(`${BASE_URL}/api/tickets`)

  sleep(1)
}
