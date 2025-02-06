export const swaggerOptions = {
   swaggerDefinition: {
      openapi: '3.0.0',
      info: {
         title: 'API credenciamento de carros',
         version: '1.0.0',
         description: 'Api de safado',
      },
      servers: [
         {
            url: 'http://localhost:3333',
         },
      ],
      components: {
         securitySchemes: {
            bearerAuth: {
               type: 'http',
               scheme: 'bearer',
               bearerFormat: 'JWT',
            },
         },
      },
   },
   apis: ['./src/routes/docs/*.ts'],
};