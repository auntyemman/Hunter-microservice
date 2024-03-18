export const RabbitMQConfig = {
    url: process.env.RABBITMQ_URL || 'amqp://localhost',
    exchange: process.env.RABBITMQ_EXCHANGE || 'hunter_exchange',
    queue: process.env.RABBITMQ_QUEUE || 'hunter_queue',
    routingKey: process.env.RABBITMQ_ROUTING_KEY || 'hunter_key'
};