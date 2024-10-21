import amqp from 'amqplib';

// Función para enviar un mensaje a la cola de mensajería
export const sendToQueue = async (queueName: string, message: object) => {
  try {
    // Conexión a RabbitMQ
    const connection = await amqp.connect('amqp://localhost');
    const channel = await connection.createChannel();

    // Asegurarse de que la cola exista antes de enviar un mensaje
    await channel.assertQueue(queueName, { durable: true });

    // Enviar el mensaje a la cola en formato JSON
    const messageString = JSON.stringify(message);
    channel.sendToQueue(queueName, Buffer.from(messageString), {
      persistent: true, // Asegura que el mensaje persista si RabbitMQ se cae
    });

    console.log(`Mensaje enviado a la cola ${queueName}: ${messageString}`);

    // Cerrar la conexión y el canal
    setTimeout(() => {
      channel.close();
      connection.close();
    }, 500);
  } catch (error) {
    console.error('Error enviando mensaje a la cola:', error);
  }
};
