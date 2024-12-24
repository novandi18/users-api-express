const swaggerJSDoc = require('swagger-jsdoc');

const swaggerOptions = {
  swaggerDefinition: {
    openapi: '3.1.0',
    info: {
      title: 'User API',
      version: '1.0.0',
      description: 'API untuk mengelola pengguna',
    },
    servers: [
      {
        url: 'http://localhost:3000/api',
      },
    ],
  },
  apis: ['./src/routes/*.ts'],
};

const swaggerSpecs = swaggerJSDoc(swaggerOptions);
export default swaggerSpecs;