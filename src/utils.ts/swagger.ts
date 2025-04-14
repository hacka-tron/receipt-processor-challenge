import path from 'path';
import swaggerJSDoc from 'swagger-jsdoc';
import swaggerUi from 'swagger-ui-express';

const options: swaggerJSDoc.Options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Receipt API',
            version: '1.0.0',
            description: 'A simple API to submit receipts and get points.',
        },
        components: {
            schemas: {
                Receipt: {
                    type: 'object',
                    required: ['retailer', 'purchaseDate', 'purchaseTime', 'items', 'total'],
                    properties: {
                        retailer: { type: 'string' },
                        purchaseDate: { type: 'string', format: 'date' },
                        purchaseTime: { type: 'string', format: 'time' },
                        total: { type: 'string', pattern: '^\\d+\\.\\d{2}$' },
                        items: {
                            type: 'array',
                            items: {
                                type: 'object',
                                required: ['shortDescription', 'price'],
                                properties: {
                                    shortDescription: { type: 'string' },
                                    price: { type: 'string', pattern: '^\\d+\\.\\d{2}$' },
                                },
                            },
                        },
                    },
                },
            },
        },
    },
    apis: [path.join(__dirname, '../routes/**/*.{ts,js}')]
};

export const swaggerSpec = swaggerJSDoc(options);
export const swaggerUiHandler = swaggerUi.serve;
export const swaggerDocs = swaggerUi.setup(swaggerSpec);
