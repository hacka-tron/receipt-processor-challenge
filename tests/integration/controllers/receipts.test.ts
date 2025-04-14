import request from 'supertest';
import { describe, it, expect } from 'vitest';
import app from '../../../src/index';

const validReceipt = {
  retailer: 'M&M Market',
  purchaseDate: '2022-01-01',
  purchaseTime: '13:01',
  total: '6.00',
  items: [
    { shortDescription: 'Soda', price: '2.00' },
    { shortDescription: 'Bread', price: '4.00' }
  ]
};

describe('ReceiptController Integration', () => {
  it('POST /receipts/process returns 201 and an ID', async () => {
    const res = await request(app).post('/receipts/process').send(validReceipt);
    expect(res.status).toBe(200);
    expect(res.body.id).toBeDefined();
  });

  it('GET /receipts/:id/points returns 200 and points', async () => {
    const postRes = await request(app).post('/receipts/process').send(validReceipt);
    const { id } = postRes.body;

    const getRes = await request(app).get(`/receipts/${id}/points`);
    expect(getRes.status).toBe(200);
    expect(getRes.body.points).toBeTypeOf('number');
  });

  it('GET /receipts/:id/points returns 404 for unknown id', async () => {
    const res = await request(app).get('/receipts/unknown-id/points');
    expect(res.status).toBe(404);
  });
});