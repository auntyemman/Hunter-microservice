import * as amqp from 'amqplib';
import { RabbitMQConfig } from '../config/rabbitmqConfig';

export class RabbitMQCommon {
    private connection: amqp.Connection;
    private channel: amqp.Channel;

    constructor() {
        this.initialize();
    }

    private async initialize() {
        try {
            this.connection = await amqp.connect(RabbitMQConfig.url);
            this.channel = await this.connection.createChannel();
            await this.channel.assertExchange(RabbitMQConfig.exchange, 'direct', { durable: true });
            await this.channel.assertQueue(RabbitMQConfig.queue, { durable: true });
            await this.channel.bindQueue(RabbitMQConfig.queue, RabbitMQConfig.exchange, RabbitMQConfig.routingKey);
            console.log('RabbitMQ setup successful');
        } catch (error) {
            console.error('Error setting up RabbitMQ:', error);
        }
    }

    // Method to publish a message
    async publishMessage(message: string) {
        try {
            await this.channel.publish(RabbitMQConfig.exchange, RabbitMQConfig.routingKey, Buffer.from(message));
            console.log('Message published:', message);
        } catch (error) {
            console.error('Error publishing message:', error);
        }
    }

    // Method to consume messages
    async consumeMessages(callback: (message: amqp.ConsumeMessage | null) => void) {
        try {
            await this.channel.consume(RabbitMQConfig.queue, callback, { noAck: true });
            console.log('Consuming messages...');
        } catch (error) {
            console.error('Error consuming messages:', error);
        }
    }
}