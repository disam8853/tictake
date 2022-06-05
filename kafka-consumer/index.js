const axios = require('axios')
const { Kafka, logLevel } = require('kafkajs')

const KAFKA_BROKER_URL = process.env.KAFKA_BROKER_URL
const TICKET_API = process.env.TICKET_API
if ([TICKET_API, KAFKA_BROKER_URL].some((r) => !r)) {
  throw new Error('env not defined')
}
console.log({ KAFKA_BROKER_URL })

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  brokers: [KAFKA_BROKER_URL],
  clientId: 'tictake-consumer',
})

const topic = 'tictake'
const consumer = kafka.consumer({ groupId: 'tictake-consumer' })

const run = async () => {
  await consumer.connect()
  await consumer.subscribe({ topic, fromBeginning: true })
  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const prefix = `${topic}[${partition} | ${message.offset}] / ${message.timestamp}`
      console.log(`- ${prefix} ${message.key}#${message.value}`)

      sendCreateTicket(message.value.toString())
    },
  })
}

run().catch((e) => console.error(`[example/consumer] ${e.message}`, e))

const errorTypes = ['unhandledRejection', 'uncaughtException']
const signalTraps = ['SIGTERM', 'SIGINT', 'SIGUSR2']

errorTypes.forEach((type) => {
  process.on(type, async (e) => {
    try {
      console.log(`process.on ${type}`)
      console.error(e)
      await consumer.disconnect()
      process.exit(0)
    } catch (_) {
      process.exit(1)
    }
  })
})

signalTraps.forEach((type) => {
  process.once(type, async () => {
    try {
      await consumer.disconnect()
    } finally {
      process.kill(process.pid, type)
    }
  })
})

async function sendCreateTicket(ticketKey) {
  console.log(`start creating ticket ${ticketKey}`)
  try {
    await axios.post(`${TICKET_API}/ticket/`, { key: ticketKey })
  } catch (error) {
    if (error.response) {
      console.log(error.response)
    }
    console.log(`create ticket ${ticketKey} error`)
    return
  }
  console.log(`create ticket ${ticketKey} finish`)
}
