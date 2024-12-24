export const swaggerDocument = {
  openapi: '3.0.1',
  info: {
    title: 'User API',
    version: '1.0.0',
    description: 'API for managing users',
  },
  servers: [
    {
      url: 'http://localhost:3000/api',
    },
  ],
  paths: {
    '/users': {
      get: {
        summary: 'Retrieve a list of all users',
        tags: ['Users'],
        parameters: [
          {
            in: 'query',
            name: 'page',
            schema: {
              type: 'integer',
              default: 1,
            },
            description: 'Page number for pagination',
          },
          {
            in: 'query',
            name: 'limit',
            schema: {
              type: 'integer',
              default: 10,
            },
            description: 'Number of users per page',
          },
        ],
        responses: {
          200: {
            description: 'A list of users',
            content: {
              'application/json': {
                schema: {
                  type: 'object',
                  properties: {
                    message: {
                      type: 'string',
                    },
                    success: {
                      type: 'boolean',
                    },
                    data: {
                      type: 'array',
                      items: {
                        $ref: '#/components/schemas/User',
                      },
                    },
                    meta: {
                      type: 'object',
                      properties: {
                        page: {
                          type: 'integer',
                        },
                        limit: {
                          type: 'integer',
                        },
                        total_pages: {
                          type: 'integer',
                        },
                        total_users: {
                          type: 'integer',
                        },
                      },
                    },
                  },
                  example: {
                    message: 'Users retrieved successfully',
                    success: true,
                    data: [
                      {
                        id: '123e4567-e89b-12d3-a456-426614174000',
                        name: 'John Doe',
                        email: 'john.doe@example.com',
                        age: 30,
                      },
                    ],
                    meta: {
                      page: 1,
                      limit: 10,
                      total_pages: 10,
                      total_users: 100,
                    },
                  },
                },
              },
            },
          },
        },
      },
      post: {
        summary: 'Create a new user',
        tags: ['Users'],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                properties: {
                  name: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                  age: {
                    type: 'integer',
                  },
                },
                required: ['name', 'email', 'age'],
              },
              example: {
                name: 'Jane Doe',
                email: 'jane.doe@example.com',
                age: 28,
              },
            },
          },
        },
        responses: {
          201: {
            description: 'User created successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
                example: {
                  id: '098e4567-e89b-12d3-a456-426614174111',
                  name: 'Jane Doe',
                  email: 'jane.doe@example.com',
                  age: 28,
                },
              },
            },
          },
          400: {
            description: 'Invalid input',
          },
          409: {
            description: 'Email is already in use',
          }
        },
      },
    },
    '/users/{id}': {
      get: {
        summary: 'Retrieve a user by ID',
        tags: ['Users'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The ID of the user to retrieve',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
        ],
        responses: {
          200: {
            description: 'A single user object',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
                example: {
                  id: '123e4567-e89b-12d3-a456-426614174000',
                  name: 'John Doe',
                  email: 'john.doe@example.com',
                  age: 30,
                },
              },
            },
          },
          404: {
            description: 'User not found',
          },
        },
      },
      put: {
        summary: 'Update a user by ID',
        tags: ['Users'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The ID of the user to update',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
        ],
        requestBody: {
          required: true,
          content: {
            'application/json': {
              schema: {
                properties: {
                  name: {
                    type: 'string',
                  },
                  email: {
                    type: 'string',
                  },
                  age: {
                    type: 'integer',
                  },
                },
                required: ['name', 'email', 'age'],
              },
              example: {
                name: 'Jane Doe Updated',
                email: 'jane.updated@example.com',
                age: 29,
              },
            },
          },
        },
        responses: {
          200: {
            description: 'User updated successfully',
            content: {
              'application/json': {
                schema: {
                  $ref: '#/components/schemas/User',
                },
                example: {
                  id: '123e4567-e89b-12d3-a456-426614174000',
                  name: 'Jane Doe Updated',
                  email: 'jane.updated@example.com',
                  age: 29,
                },
              },
            },
          },
          400: {
            description: 'Invalid input',
          },
          404: {
            description: 'User not found',
          },
          409: {
            description: 'Email is already in use',
          },
        },
      },
      delete: {
        summary: 'Delete a user by ID',
        tags: ['Users'],
        parameters: [
          {
            in: 'path',
            name: 'id',
            required: true,
            schema: {
              type: 'string',
            },
            description: 'The ID of the user to delete',
            example: '123e4567-e89b-12d3-a456-426614174000',
          },
        ],
        responses: {
          204: {
            description: 'User deleted successfully',
          },
          404: {
            description: 'User not found',
          },
        },
      },
    },
  },
  components: {
    schemas: {
      User: {
        type: 'object',
        properties: {
          id: {
            type: 'string',
            description: "The user's ID",
          },
          name: {
            type: 'string',
            description: "The user's name",
          },
          email: {
            type: 'string',
            description: "The user's email address",
          },
          age: {
            type: 'integer',
            description: "The user's age",
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            description: "The time at which the user was created",
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            description: "The last time the user's record was updated",
          },
        },
      },
    },
  },
};