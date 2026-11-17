import { Consumer, Kafka } from 'kafkajs';

const kafka = new Kafka({
  clientId: 'notifications-service',
  brokers: ['localhost:9092'],
});

const consumer: Consumer = kafka.consumer({
  groupId: "notification-service-group"
})

let isConnected = false;

export const setupConsumer = async (): Promise<void> => {
  if (isConnected) return;
  await consumer.connect()
  isConnected = true;

  await consumer.subscribe({
    topic: 'onboarding-account',
    fromBeginning: false,
  })

  await consumer.run({
    eachMessage: async ({ topic, message }: any) => {
      console.log('...topic', topic, message.toString());
    }
  })

  console.log("Kafka consumer is connected!");
}

export async function disconnectConsumer(): Promise<void> {
  if (!isConnected) return;

  await consumer.disconnect();
  isConnected = false;

  console.log("Kafka consumer is disconnected");
}