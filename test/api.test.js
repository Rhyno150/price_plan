import chai from 'chai';
import { totalPhoneBill } from '../path-to-your-function'; // Adjust the path accordingly

const { expect } = chai;

describe('totalPhoneBill Function', () => {
    it('should calculate the total phone bill based on call and sms actions', () => {
        const mockDB = {
            getPlan: () => ({
                call_cost: 2.75,
                sms_cost: 0.65
            })
        };

        const bill = 'call, sms, call, call, sms';
        const result = totalPhoneBill(bill, mockDB);

        expect(result).to.equal(2.75 * 3 + 0.65 * 2); // Total should be 9.55
    });

    it('should return 0 if there are no calls or sms in the bill', () => {
        const mockDB = {
            getPlan: () => ({
                call_cost: 2.75,
                sms_cost: 0.65
            })
        };

        const bill = '';
        const result = totalPhoneBill(bill, mockDB);

        expect(result).to.equal(0);
    });

    // Add more test cases as needed...
});

