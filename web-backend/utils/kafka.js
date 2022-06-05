const { Kafka, logLevel } = require('kafkajs')

const KAFKA_BROKER_URL = process.env.KAFKA_BROKER_URL

if (!KAFKA_BROKER_URL) {
  throw new Error('KAFKA_BROKER_URL not found')
}

const kafka = new Kafka({
  logLevel: logLevel.INFO,
  clientId: 'web-backend',
  brokers: [KAFKA_BROKER_URL],
})
const producer = kafka.producer()

async function prepareProducer(p) {
  await p.connect()
}

;(async () => {
  try {
    await prepareProducer(producer)
    console.log('connected to kafka ' + KAFKA_BROKER_URL)
  } catch (error) {
    console.log(error)
    throw error
  }
})()

module.exports = producer
