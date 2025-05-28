import swaggerAutogen from 'swagger-autogen';

const doc = {
  info: {
    title: 'mysql assignment',
    description: 'mysql assignment using sequelize orm',
  },
  host: 'localhost:3000',
  basePath: '/',
  schemes: ['http', 'https'],
  consumes: ['application/json'],
  produces: ['application/json'],
  components: {
    parameters: {
      sortByQueryParam: {
        name: 'sortBy',
        in: 'query',
        schema: {
          enum: ['asc', 'desc'],
        },
      },
      limitQueryParam: {
        name: 'limit',
        in: 'query',
        schema: {
          type: 'number',
        },
      },
    },
    '@schemas': {
      UserCreateDto: {
        type: 'object',
        properties: {
          // id: {
          //   type: 'integer',
          //   format: 'int32',
          //   description: 'The unique identifier for the user',
          // },
          name: {
            type: 'string',
            description: 'The name of the user',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'The email address of the user',
          },
          password: {
            type: 'string',
            description: 'The password for the user',
          },
          address: {
            type: 'string',
            description: 'The home address of the user',
          },
          phone_number: {
            type: 'string',
            description: 'The phone number of the user (10 digits)',
          },
          age: {
            type: 'string',
            description: 'The age of the user',
            maxLength: 3,
            pattern: '^[0-9]{3}$',
          },
          date_of_birth: {
            type: 'string',
            format: 'date',
            description: 'The birth date of the user (in YYYY-MM-DD format)',
          },
          // deleted_at: {
          //   type: 'string',
          //   format: 'date-time',
          //   description: 'The timestamp when the user was deleted (if applicable)',
          //   nullable: true,
          // },
        },
        required: ['name', 'email', 'password', 'address', 'phone_number', 'age', 'date_of_birth'],
      },
      ProductCreateDto: {
        type: 'object',
        properties: {
          // id: {
          //   type: 'integer',
          //   format: 'int32',
          //   description: 'The unique identifier for the product',
          // },
          name: {
            type: 'string',
            description: 'The name of the product',
          },
          description: {
            type: 'string',
            description: 'A brief description of the product',
          },
          price: {
            type: 'string',
            description: 'The price of the product',
          },
          // deleted_at: {
          //   type: 'string',
          //   format: 'date-time',
          //   description: 'The timestamp when the product was deleted (if applicable)',
          //   nullable: true,
          // },
        },
        required: ['name', 'description', 'price'],
      },
      OrderCreateDto: {
        type: 'object',
        properties: {
          // id: {
          //   type: 'integer',
          //   format: 'int32',
          //   description: 'The unique identifier for the order',
          // },
          status: {
            type: 'string',
            enum: ['delivered', 'pending', 'cancelled'],
            description: 'The current status of the order',
          },
          expected_delivery_date: {
            type: 'string',
            format: 'date-time',
            description: 'The expected delivery date of the order',
          },
          order_date: {
            type: 'string',
            format: 'date-time',
            description: 'The date the order was placed',
          },
          // deleted_at: {
          //   type: 'string',
          //   format: 'date-time',
          //   description: 'The timestamp when the order was deleted (if applicable)',
          //   nullable: true,
          // },
          user_id: {
            type: 'integer',
            format: 'int32',
            description: 'The ID of the user who placed the order',
          },
        },
        required: ['status', 'expected_delivery_date', 'order_date', 'user_id'],
      },
      OrderDetailsCreateDto: {
        type: 'object',
        properties: {
          // id: {
          //   type: 'integer',
          //   format: 'int32',
          //   description: 'The unique identifier for the order detail',
          // },
          order_id: {
            type: 'integer',
            format: 'int32',
            description: 'The ID of the associated order',
          },
          product_id: {
            type: 'integer',
            format: 'int32',
            description: 'The ID of the associated product',
          },
          quantity: {
            type: 'integer',
            description: 'The quantity of the product in this order detail',
          },
          price: {
            type: 'string',
            description: 'The price of the product in the order detail',
          },
          // deleted_at: {
          //   type: 'string',
          //   format: 'date-time',
          //   description: 'The timestamp when the order-detail was deleted (if applicable)',
          //   nullable: true,
          // },
        },
        required: ['order_id', 'product_id', 'quantity', 'price'],
      },
      UserUpdateDto: {
        type: 'object',
        properties: {
          // id: {
          //   type: 'integer',
          //   format: 'int32',
          //   description: 'The unique identifier for the user',
          // },
          name: {
            type: 'string',
            description: 'The name of the user',
          },
          email: {
            type: 'string',
            format: 'email',
            description: 'The email address of the user',
          },
          password: {
            type: 'string',
            description: 'The password for the user',
          },
          address: {
            type: 'string',
            description: 'The home address of the user',
          },
          phone_number: {
            type: 'string',
            description: 'The phone number of the user (10 digits)',
          },
          age: {
            type: 'string',
            description: 'The age of the user',
            maxLength: 3,
            pattern: '^[0-9]{3}$',
          },
          date_of_birth: {
            type: 'string',
            format: 'date',
            description: 'The birth date of the user (in YYYY-MM-DD format)',
          },
          // deleted_at: {
          //   type: 'string',
          //   format: 'date-time',
          //   description: 'The timestamp when the user was deleted (if applicable)',
          //   nullable: true,
          // },
        },
      },
      ProductUpdateDto: {
        type: 'object',
        properties: {
          // id: {
          //   type: 'integer',
          //   format: 'int32',
          //   description: 'The unique identifier for the product',
          // },
          name: {
            type: 'string',
            description: 'The name of the product',
          },
          description: {
            type: 'string',
            description: 'A brief description of the product',
          },
          price: {
            type: 'string',
            description: 'The price of the product',
          },
          // deleted_at: {
          //   type: 'string',
          //   format: 'date-time',
          //   description: 'The timestamp when the product was deleted (if applicable)',
          //   nullable: true,
          // },
        },
      },
      OrderUpdateDto: {
        type: 'object',
        properties: {
          // id: {
          //   type: 'integer',
          //   format: 'int32',
          //   description: 'The unique identifier for the order',
          // },
          status: {
            type: 'string',
            enum: ['delivered', 'pending', 'cancelled'],
            description: 'The current status of the order',
          },
          expected_delivery_date: {
            type: 'string',
            format: 'date-time',
            description: 'The expected delivery date of the order',
          },
          order_date: {
            type: 'string',
            format: 'date-time',
            description: 'The date the order was placed',
          },
          // deleted_at: {
          //   type: 'string',
          //   format: 'date-time',
          //   description: 'The timestamp when the order was deleted (if applicable)',
          //   nullable: true,
          // },
          user_id: {
            type: 'integer',
            format: 'int32',
            description: 'The ID of the user who placed the order',
          },
        },
      },
      OrderDetailsUpdateDto: {
        type: 'object',
        properties: {
          // id: {
          //   type: 'integer',
          //   format: 'int32',
          //   description: 'The unique identifier for the order detail',
          // },
          order_id: {
            type: 'integer',
            format: 'int32',
            description: 'The ID of the associated order',
          },
          product_id: {
            type: 'integer',
            format: 'int32',
            description: 'The ID of the associated product',
          },
          quantity: {
            type: 'integer',
            description: 'The quantity of the product in this order detail',
          },
          price: {
            type: 'string',
            description: 'The price of the product in the order detail',
          },
          // deleted_at: {
          //   type: 'string',
          //   format: 'date-time',
          //   description: 'The timestamp when the order-detail was deleted (if applicable)',
          //   nullable: true,
          // },
        },
      },
      UserWithOrdersResponse: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              format: 'email',
              example: 'john.doe@example.com',
            },
            name: {
              type: 'string',
              example: 'John Doe',
            },
            address: {
              type: 'string',
              example: '123 Main St, Anytown, USA',
            },
            Orders: {
              type: 'array',
              items: {
                type: 'object',
                properties: {
                  id: {
                    type: 'integer',
                    example: 1,
                  },
                  status: {
                    type: 'string',
                    enum: ['delivered', 'pending', 'cancelled'],
                    example: 'pending',
                  },
                  order_date: {
                    type: 'string',
                    format: 'date',
                    example: '2025-03-25',
                  },
                  expected_delivery_date: {
                    type: 'string',
                    format: 'date',
                    example: '2025-04-10',
                  },
                  days_left_before_delivery: {
                    type: 'integer',
                    example: -42,
                    description: 'Days remaining until delivery (negative if overdue)',
                  },
                  Products: {
                    type: 'array',
                    items: {
                      type: 'object',
                      properties: {
                        id: {
                          type: 'integer',
                          example: 1,
                        },
                        name: {
                          type: 'string',
                          example: 'Wireless Headphones',
                        },
                        description: {
                          type: 'string',
                          example: 'High-quality noise-cancelling Bluetooth headphones',
                        },
                        price: {
                          type: 'string',
                          example: '129.99',
                        },
                      },
                      required: ['id', 'name', 'description', 'price'],
                    },
                  },
                },
                required: ['id', 'status', 'order_date', 'expected_delivery_date', 'Products'],
              },
            },
          },
          required: ['email', 'name', 'address', 'Orders'],
        },
      },
      TopNActiveInactiveUsersResponse: {
        type: 'object',
        properties: {
          users: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'Jane Smith',
                },
                numberOfOrders: {
                  type: 'integer',
                  example: 3,
                },
              },
              required: ['name', 'numberOfOrders'],
            },
          },
        },
        required: ['users'],
      },
      TopNPurchasedProducts: {
        type: 'object',
        properties: {
          products: {
            type: 'array',
            items: {
              type: 'object',
              properties: {
                name: {
                  type: 'string',
                  example: 'Wireless Headphones',
                },
                numberOfProductsSold: {
                  type: 'integer',
                  example: 2,
                },
              },
              required: ['name', 'numberOfProductsSold'],
            },
          },
        },
        required: ['products'],
      },
    },
  },
};

const outputFile = './swagger-output.json';
const routes = ['./index.ts'];

swaggerAutogen({ openapi: '3.0.0' })(outputFile, routes, doc);
