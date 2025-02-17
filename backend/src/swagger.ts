import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Nooro Todo API",
      version: "1.0.0",
      description: "API documentation for the Nooro Todo application",
    },
    servers: [
      {
        url: "http://localhost:4000/api",
      },
    ],
    components: {
      schemas: {
        Todo: {
          type: "object",
          required: ["title", "color"],
          properties: {
            id: {
              type: "integer",
              description: "The auto-generated id of the task",
            },
            title: {
              type: "string",
              description: "The title of the task",
            },
            color: {
              type: "string",
              description: "The color of the task",
            },
            completed: {
              type: "boolean",
              description: "The completion status of the task",
            },
          },
        },
      },
    },
  },
  apis: ["./src/routes/*.ts", "./src/controllers/*.ts"],
};

const swaggerSpec = swaggerJSDoc(options);

export { swaggerUi, swaggerSpec };
