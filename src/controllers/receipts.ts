import { Request, Response } from 'express';
import { ReceiptSchema, Receipt, IdSchema } from './validators/validators';
import { v4 as uuidv4 } from 'uuid';
import { calculatePoints } from '../services/receipts';
import { getStore } from '../stores/receiptStoreContext';
import logger from '../utils.ts/logger';

export async function addReceipt(req: Request, res: Response) {
    const result = ReceiptSchema.safeParse(req.body);

    if (!result.success) {
        logger.info({ errors: result.error.format() }, 'Invalid receipt submitted');
        res.status(400).json({
            message: 'The receipt is invalid.',
            errors: result.error.format(),
        });
        return;
    }

    const receipt: Receipt = result.data;
    const store = getStore();
    const id = uuidv4();

    const points = calculatePoints(receipt);
    store.save(id, points);

    logger.info({ id, totalPoints: points }, 'Receipt accepted and stored');
    res.status(200).json({ id });
}

export async function getPoints(req: Request, res: Response) {
    const result = IdSchema.safeParse(req.params);

    if (!result.success) {
        logger.info({ params: req.params }, 'Invalid receipt ID format');
        res.status(400).json({
            message: 'The id is invalid.',
            errors: result.error.format(),
        });
        return;
    }

    const store = getStore();
    const id = result.data.id;

    if (!store.has(id)) {
        logger.info({ id }, 'Receipt ID not found');
        res.status(404).json({ message: 'No receipt found for that ID.' });
        return;
    }

    const points = store.get(id);

    logger.debug({ id, points }, 'Points retrieved for receipt');
    res.status(200).json({ points });
}
