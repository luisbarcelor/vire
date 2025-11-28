
const getUserMockData = () => {
  return {
    name: 'John',
    surname: 'Doe',
    age: 30,
    netIncome: 2500,
    financialGoal: 'Invest',
    expenses: [
      { amount: 800, category: 'Needs', description: 'Rent' },
      { amount: 300, category: 'Wants', description: 'Dining Out' },
      { amount: 200, category: 'Wants', description: 'Entertainment' },
      { amount: 400, category: 'Needs', description: 'Groceries' },
      { amount: 100, category: 'Savings', description: 'Emergency Fund' },
    ],
  };
}