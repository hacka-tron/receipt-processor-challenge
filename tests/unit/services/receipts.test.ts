import { describe, it, expect } from 'vitest';
import { calculatePoints } from '../../../src/services/receipts';

describe('calculatePoints return correct total when receipt has', () => {
  it('retailer with 6 alphanumeric characters only', () => {
    const receipt = {
      retailer: 'ABC123',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      total: '0.00',
      items: []
    };
    expect(calculatePoints(receipt)).toBe(87);
  });

  it('total with no cents', () => {
    const receipt = {
      retailer: 'A',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      total: '10.00',
      items: []
    };
    expect(calculatePoints(receipt)).toBe(82); 
  });

  it('total divisible by 0.25 and retailer = "Z"', () => {
    const receipt = {
      retailer: 'Z',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      total: '0.25',
      items: []
    };
    expect(calculatePoints(receipt)).toBe(32); 
  });

  it('item with description length % 3 === 0', () => {
    const receipt = {
      retailer: 'Z',
      purchaseDate: '2022-01-01',
      purchaseTime: '13:01',
      total: '1.00',
      items: [
        { shortDescription: 'AAA', price: '2.00' } 
      ]
    };
    expect(calculatePoints(receipt)).toBe(83); 
  });
});