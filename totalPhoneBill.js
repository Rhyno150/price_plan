export var totalPhoneBill = function (bill, db) {
    var phoneBill = bill.split(', ');
    var calls = [];
    var sms = [];

    for (var i = 0; i < phoneBill.length; i++) {
        if (phoneBill[i].startsWith('c')) {
            calls.push(phoneBill[i]);
        } else if (phoneBill[i].startsWith('s')) {
            sms.push(phoneBill[i]);
        }
    }

    // Assuming you want to calculate the total cost based on calls and SMS
    var total = 0;

    // Assuming db contains the price plan
    var plan = db.getPlan(); // Hypothetical function to get the plan

    total += calls.length * plan.call_cost;
    total += sms.length * plan.sms_cost;

    return total;
};
