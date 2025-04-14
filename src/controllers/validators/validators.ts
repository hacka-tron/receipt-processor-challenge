import z from 'zod';

const ItemSchema = z.object({
    shortDescription: z.string()
        .regex(/^[\w\s\-]+$/, { message: 'Invalid short description format' })
        .describe('The Short Product Description for the item.'),

    price: z.string()
        .regex(/^\d+\.\d{2}$/, { message: 'Price must be in decimal format like 6.49' })
        .describe('The total price paid for this item.')
});

export const ReceiptSchema = z.object({
    retailer: z.string()
        .regex(/^[\w\s\-&]+$/, { message: 'Invalid retailer format' })
        .describe('The name of the retailer or store the receipt is from.'),

    purchaseDate: z.string()
        .regex(/^\d{4}-\d{2}-\d{2}$/, { message: 'Invalid date format (YYYY-MM-DD expected)' })
        .describe('The date of the purchase printed on the receipt.'),

    purchaseTime: z.string()
        .regex(/^\d{2}:\d{2}$/, { message: 'Invalid time format (HH:mm expected)' })
        .describe('The time of the purchase printed on the receipt. 24-hour time expected.'),

    items: z.array(ItemSchema)
        .min(1, { message: 'At least one item is required' })
        .describe('The list of items purchased.'),

    total: z.string()
        .regex(/^\d+\.\d{2}$/, { message: 'Total must be in decimal format like 6.49' })
        .describe('The total amount paid on the receipt.')
});

export const IdSchema = z.object({
    id: z.string().regex(/^\S+$/, {
        message: 'ID must be a non-empty string with no whitespace',
    }),
});

export type Receipt = z.infer<typeof ReceiptSchema>;
