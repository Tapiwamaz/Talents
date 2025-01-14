const mockExpenses = [
    {
      "expense_id": 1,
      "budget_id": 1,
      "description": "Weekly groceries at Walmart",
      "amount": 120.50,
      "expense_date": "2025-01-03",
      "created_at": "2025-01-03T10:30:00"
    },
    {
      "expense_id": 2,
      "budget_id": 1,
      "description": "Vegetables and fruits at Farmer's Market",
      "amount": 45.75,
      "expense_date": "2025-01-10",
      "created_at": "2025-01-10T11:00:00"
    },
    {
      "expense_id": 3,
      "budget_id": 2,
      "description": "Monthly apartment rent",
      "amount": 1200.00,
      "expense_date": "2025-01-01",
      "created_at": "2025-01-01T09:00:00"
    },
    {
      "expense_id": 4,
      "budget_id": 3,
      "description": "Car oil change",
      "amount": 80.00,
      "expense_date": "2025-01-20",
      "created_at": "2025-01-20T15:00:00"
    },
    {
      "expense_id": 5,
      "budget_id": 3,
      "description": "Tire replacement",
      "amount": 220.00,
      "expense_date": "2025-01-25",
      "created_at": "2025-01-25T12:30:00"
    },
    {
      "expense_id": 6,
      "budget_id": 4,
      "description": "Movie night",
      "amount": 25.00,
      "expense_date": "2025-01-05",
      "created_at": "2025-01-05T19:00:00"
    },
    {
      "expense_id": 7,
      "budget_id": 4,
      "description": "Concert tickets",
      "amount": 100.00,
      "expense_date": "2025-01-15",
      "created_at": "2025-01-15T20:00:00"
    },
    {
      "expense_id": 8,
      "budget_id": 5,
      "description": "Dinner at Olive Garden",
      "amount": 60.00,
      "expense_date": "2025-01-12",
      "created_at": "2025-01-12T18:00:00"
    },
    {
      "expense_id": 9,
      "budget_id": 5,
      "description": "Coffee and snacks at Starbucks",
      "amount": 15.00,
      "expense_date": "2025-01-13",
      "created_at": "2025-01-13T09:30:00"
    },
    {
      "expense_id": 10,
      "budget_id": 6,
      "description": "Flight tickets",
      "amount": 1500.00,
      "expense_date": "2025-06-01",
      "created_at": "2025-06-01T08:00:00"
    },
    {
      "expense_id": 11,
      "budget_id": 6,
      "description": "Hotel booking",
      "amount": 800.00,
      "expense_date": "2025-06-05",
      "created_at": "2025-06-05T10:00:00"
    },
    {
      "expense_id": 12,
      "budget_id": 7,
      "description": "Monthly health insurance premium",
      "amount": 100.00,
      "expense_date": "2025-01-01",
      "created_at": "2025-01-01T08:30:00"
    },
    {
      "expense_id": 13,
      "budget_id": 8,
      "description": "Electricity bill",
      "amount": 120.00,
      "expense_date": "2025-01-05",
      "created_at": "2025-01-05T14:00:00"
    },
    {
      "expense_id": 14,
      "budget_id": 8,
      "description": "Internet subscription",
      "amount": 80.00,
      "expense_date": "2025-01-08",
      "created_at": "2025-01-08T10:00:00"
    },
    {
      "expense_id": 15,
      "budget_id": 9,
      "description": "Monthly gym membership fee",
      "amount": 50.00,
      "expense_date": "2025-01-01",
      "created_at": "2025-01-01T07:00:00"
    }
  ]
  
  const mockBudgets = [
    {
      "budget_id": 1,
      "user_id": 101,
      "name": "Groceries",
      "category": "Food",
      "start_date": "2025-01-01",
      "end_date": "2025-01-31",
      "total_amount": 400.00
    },
    {
      "budget_id": 2,
      "user_id": 101,
      "name": "Rent",
      "category": "Housing",
      "start_date": "2025-01-01",
      "end_date": "2025-01-31",
      "total_amount": 1200.00
    },
    {
      "budget_id": 3,
      "user_id": 102,
      "name": "Car Maintenance",
      "category": "Transportation",
      "start_date": "2025-01-15",
      "end_date": "2025-02-15",
      "total_amount": 300.00
    },
    {
      "budget_id": 4,
      "user_id": 103,
      "name": "Entertainment",
      "category": "Recreation",
      "start_date": "2025-01-01",
      "end_date": "2025-01-31",
      "total_amount": 150.00
    },
    {
      "budget_id": 5,
      "user_id": 101,
      "name": "Dining Out",
      "category": "Food",
      "start_date": "2025-01-10",
      "end_date": "2025-01-20",
      "total_amount": 200.00
    },
    {
      "budget_id": 6,
      "user_id": 104,
      "name": "Vacation",
      "category": "Travel",
      "start_date": "2025-06-01",
      "end_date": "2025-06-30",
      "total_amount": 2500.00
    },
    {
      "budget_id": 7,
      "user_id": 102,
      "name": "Health Insurance",
      "category": "Health",
      "start_date": "2025-01-01",
      "end_date": "2025-12-31",
      "total_amount": 1000.00
    },
    {
      "budget_id": 8,
      "user_id": 103,
      "name": "Utilities",
      "category": "Housing",
      "start_date": "2025-01-01",
      "end_date": "2025-01-31",
      "total_amount": 300.00
    },
    {
      "budget_id": 9,
      "user_id": 104,
      "name": "Gym Membership",
      "category": "Recreation",
      "start_date": "2025-01-01",
      "end_date": "2025-01-31",
      "total_amount": 50.00
    }
  ]
  export {mockBudgets,mockExpenses}