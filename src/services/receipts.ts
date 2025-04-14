import { Receipt } from "../controllers/validators/validators";
import logger from "../utils.ts/logger";

export function calculatePoints(receipt: Receipt): number {
    let points = 0;

    const alphaNumCount = (receipt.retailer.match(/[a-z0-9]/gi) || []).length;
    points += alphaNumCount;
    logger.debug({ totalPoints: points }, 'Rule Applied: Alphanumeric retailer name');

    const total = parseFloat(receipt.total);

    if (Number.isInteger(total)) {
        points += 50;
        logger.debug({ totalPoints: points }, 'Rule Applied: Round dollar total');
    }

    if (total % 0.25 === 0) {
        points += 25;
        logger.debug({ totalPoints: points }, 'Rule Applied: Total is multiple of 0.25');
    }

    const itemPairBonus = Math.floor(receipt.items.length / 2) * 5;
    points += itemPairBonus;
    logger.debug({ totalPoints: points }, 'Rule Applied: Item pair bonus');

    for (const item of receipt.items) {
        const trimmed = item.shortDescription.trim();
        if (trimmed.length % 3 === 0) {
            const price = parseFloat(item.price);
            const bonus = Math.ceil(price * 0.2);
            points += bonus;
            logger.debug({ totalPoints: points }, 'Rule Applied: Item description length is multiple of 3');
        }
    }

    const day = parseInt(receipt.purchaseDate.split('-')[2]);
    if (day % 2 === 1) {
        points += 6;
        logger.debug({ totalPoints: points }, 'Rule Applied: Purchase day is odd');
    }

    const [hour, minute] = receipt.purchaseTime.split(':').map(Number);
    if (hour === 14 || hour === 15) {
        points += 10;
        logger.debug({ totalPoints: points }, 'Rule Applied: Purchase time is between 2–4 PM');
    }

    logger.debug({ totalPoints: points }, 'Final points calculated');
    return points;
}
