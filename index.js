import express from 'express';
import * as sqlite from 'sqlite';
import sqlite3 from 'sqlite3';

const app = express();
const PORT = process.env.PORT || 4034;

// Middleware
app.use(express.static('public'));
app.use(express.json());


// Setup SQLite database
let db = await sqlite.open({
    filename: './data_plan.db',
    driver: sqlite3.Database


    
});

// Run migrations
await db.migrate();

// API Endpoints

// Get all price plans
app.get('/api/price_plans', async (req, res) => {
    try {
        const pricePlans = await db.all('SELECT * FROM price_plan');
        res.status(200).json(pricePlans); // 200 OK
    } catch (error) {
        res.status(500).json({ error: 'Failed to retrieve price plans' }); // 500 Internal Server Error
    }
});


//


// Add a new price plan
app.post('/api/price_plan/create', async (req, res) => {
    const { name, call_cost, sms_cost } = req.body;

    try {
        await db.run(
            'INSERT INTO price_plan (plan_name, call_price, sms_price) VALUES (?, ?, ?)',
            [name, call_cost, sms_cost]
        );
        res.status(201).json({ message: 'Price plan created successfully' }); // 201 Created
    } catch (error) {
        res.status(500).json({ error: 'Failed to create price plan' }); // 500 Internal Server Error
    }
});


  
  // Get all price plans
app.get('/price_plans', async (req, res) => {
    const db = await dbPromise;
    try {
      const pricePlans = await db.all('SELECT * FROM price_plans');
      res.json(pricePlans);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });

  // Calculate total phone bill
  app.post('/api/phonebill', async (req, res) => {
    const { price_plan, actions } = req.body;

    try {
        // Fetch the price plan from the database
        const plan = await db.get('SELECT * FROM price_plan WHERE plan_name = ?', [price_plan]);

        if (!plan) {
            return res.status(200).json({ error: 'total' }); // 404 Not Found
        }

        // Calculate the total cost based on actions
        const actionArray = actions.split(',').map(action => action.trim());
        let total = 0;

        actionArray.forEach(action => {
            if (action === 'sms') {
                total += plan.sms_price;
            } else if (action === 'call') {
                total += plan.call_price;
            }
        });

        res.status(200).json({ total }); // 200 OK
    } catch (error) {
        res.status(500).json({ error: 'Failed to calculate phone bill' }); // 500 Internal Server Error
    }
});







//update

app.post('/api/price_plan/update', async (req, res) => {
    const { name, call_cost, sms_cost } = req.body;

    try {
        const result = await db.run(
            'UPDATE price_plan SET call_price = ?, sms_price = ? WHERE plan_name = ?',
            [call_cost, sms_cost, name]
        );

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Price plan not found' }); // 404 Not Found
        }

        res.status(200).json({ message: 'Price plan updated successfully' }); // 200 OK
    } catch (error) {
        res.status(500).json({ error: 'Failed to update price plan' }); // 500 Internal Server Error
    }
});





// delete

// POST endpoint to delete a price plan by ID
// app.post('/api/price_plan/delete', (req, res) => {
//     const { id } = req.body;

//     if (!id) {
//         return res.status(400).json({ error: 'Price plan ID is required' }); // 400 Bad Request
//     }

//     db.run('DELETE FROM price_plan WHERE id = ?', [id], function (err) {
//         if (err) {
//             return res.status(500).json({ error: 'Failed to delete price plan' }); // 500 Internal Server Error
//         }

//         if (this.changes === 0) {
//             return res.status(404).json({ error: 'Price plan not found' }); // 404 Not Found
//         }

//         res.status(200).json({ message: 'Price plan deleted successfully' }); // 200 OK
//     });
// });


app.post('/api/price_plan/delete', async (req, res) => {
    console.log(req.body);  // Log the request body
    const { price_plan } = req.body;

    // Validate the input
    if (price_plan === undefined) {
        return res.status(400).json({ error: 'Price plan ID is required' }); // 400 Bad Request
    }

    const id = Number(price_plan);

    if (isNaN(id)) {
        return res.status(400).json({ error: 'Price plan ID must be a valid number' }); // 400 Bad Request
    }

    try {
        const result = await db.run('DELETE FROM price_plan WHERE id = ?', [id]);

        if (result.changes === 0) {
            return res.status(404).json({ error: 'Price plan not found' }); // 404 Not Found
        }

        res.status(200).json({ message: 'Price plan deleted successfully' }); // 200 OK
    } catch (error) {
        console.error('Database error:', error);
        res.status(500).json({ error: 'Failed to delete price plan' }); // 500 Internal Server Error
    }
});





app.post('/api/phonebill', (req, res) => {
    const { price_plan, actions } = req.body;
    // Calculate the bill here
    const total = calculateBill(price_plan, actions);
    res.json({ total });
  });

   const port = process.env.PORT || 4044;
  
  
  app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });
  
  function calculateBill(pricePlan, actions) {
    // Your bill calculation logic goes here
    return 78.00; // Replace with actual calculation
  }


 //const PORT = process.env.PORT || 4011;
 app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


