import { Router } from 'express';
import { addReceipt, getPoints } from '../controllers/receipts';

const router = Router();

/**
 * @openapi
 * /receipts/process:
 *   post:
 *     summary: Submit a receipt and receive an ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Receipt'
 *     responses:
 *       201:
 *         description: Receipt accepted.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *       400:
 *         description: Invalid receipt data.
 */
router.post('/process', addReceipt);

/**
 * @openapi
 * /receipts/{id}/points:
 *   get:
 *     summary: Get the number of points for a receipt by ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: The ID of the receipt.
 *         schema:
 *           type: string
 *           pattern: "^\\S+$"
 *     responses:
 *       200:
 *         description: The number of points awarded.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 points:
 *                   type: integer
 *                   example: 100
 *       400:
 *         description: Invalid ID.
 *       404:
 *         description: No receipt found for that ID.
 */
router.get('/:id/points', getPoints);

export default router;
