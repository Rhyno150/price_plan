document.addEventListener('alpine:init', () => {
    // Alpine.js specific initializations can go here
});

async function calculatePhoneBill(event) {
    event.preventDefault();
    const pricePlan = document.getElementById('price_plan').value;
    const actions = document.getElementById('actions').value;
    const response = await fetch('/api/phonebill', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ price_plan: pricePlan, actions: actions })
    });
    const result = await response.json();
    document.getElementById('bill_result').innerText = 'Total: ' + result.total;
}

async function getAllPricePlans() {
    const response = await fetch('/api/price_plans');
    const plans = await response.json();
    const plansList = document.getElementById('price_plans_list');
    plansList.innerHTML = '';
    plans.forEach(plan => {
        const li = document.createElement('li');
        li.textContent = `Name: ${plan.plan_name}, Call Cost: ${plan.call_price}, SMS Cost: ${plan.sms_price}`;
        plansList.appendChild(li);
    });
}

async function createPricePlan(event) {
    event.preventDefault();
    const name = document.getElementById('new_plan_name').value;
    const callCost = document.getElementById('new_call_cost').value;
    const smsCost = document.getElementById('new_sms_cost').value;
    await fetch('/api/price_plan/create', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, call_cost: callCost, sms_cost: smsCost })
    });
    alert('Price plan created!');
}

async function updatePricePlan(event) {
    event.preventDefault();
    const name = document.getElementById('update_plan_name').value;
    const callCost = document.getElementById('update_call_cost').value;
    const smsCost = document.getElementById('update_sms_cost').value;
    await fetch('/api/price_plan/update', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: name, call_cost: callCost, sms_cost: smsCost })
    });
    alert('Price plan updated!');
}

async function deletePricePlan(event) {
event.preventDefault();

const pricePlan = document.getElementById('delete_plan_id').value;

if (!pricePlan) {
alert('Please enter a Price Plan ID');
return;
}

try {
const response = await fetch('/api/price_plan/delete', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ price_plan: pricePlan }) // Adjusted key to match server expectation
});

const data = await response.json();

if (response.ok) {
    alert('Price plan deleted successfully!');
} else {
    // Handle different error statuses
    alert(`Error: ${data.error}`);
}
} catch (error) {
console.error('Error deleting price plan:', error);
alert('An unexpected error occurred. Please try again later.');
}
}
