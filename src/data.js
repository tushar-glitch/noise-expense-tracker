export const categories = [
    { id: "food", name: "Food & Dining", color: "bg-orange-500" },
    { id: "transport", name: "Transportation", color: "bg-blue-500" },
    { id: "shopping", name: "Shopping", color: "bg-pink-500" },
    { id: "entertainment", name: "Entertainment", color: "bg-purple-500" },
    { id: "utilities", name: "Utilities", color: "bg-yellow-500" },
    { id: "health", name: "Health", color: "bg-green-500" },
    { id: "travel", name: "Travel", color: "bg-indigo-500" },
    { id: "other", name: "Other", color: "bg-gray-500" },
  ]
  
  export const generateDummyData = () => {
    const data = []
    const now = new Date()
    for (let i = 0; i < 20; i++) {
      const randomDaysAgo = Math.floor(Math.random() * 90)
      const date = new Date(now)
      date.setDate(date.getDate() - randomDaysAgo)
  
      const categoryIndex = Math.floor(Math.random() * categories.length)
  
      data.push({
        id: i,
        amount: Math.floor(Math.random() * 200) + 5,
        category: categories[categoryIndex].id,
        date: date.toISOString().split("T")[0],
        description: [
          "Grocery shopping at Whole Foods",
          "Uber ride to work",
          "Movie tickets",
          "Monthly Netflix subscription",
          "Dinner with friends",
          "Amazon purchase",
          "Coffee at Starbucks",
          "Gas station fill-up",
          "Phone bill payment",
          "Gym membership",
        ][Math.floor(Math.random() * 10)],
      })
    }
  
    return data
  }
  
  