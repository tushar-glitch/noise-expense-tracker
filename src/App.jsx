import { useState } from "react"
import ExpenseForm from "./components/ExpenseForm"
import ExpenseList from "./components/ExpenseList"
import ExpenseSummary from "./components/ExpenseSummary"
import { generateDummyData } from "./data"
import { Badge } from "@/components/ui/badge"

const initialExpenses = generateDummyData()

export default function App() {
  // State for expenses and filters
  const [expenses, setExpenses] = useState(initialExpenses)
  const [filterCategory, setFilterCategory] = useState("")
  const [filterDateRange, setFilterDateRange] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")

  // Add new expense
  const addExpense = (newExpense) => {
    setExpenses([newExpense, ...expenses])
  }

  // Delete an expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  // Filter expenses based on current filters
  const filteredExpenses = expenses.filter((expense) => {
    // Filter by category
    if (filterCategory && expense.category !== filterCategory && filterCategory !== "allCategories") return false

    // Filter by search query
    if (searchQuery && !expense.description.toLowerCase().includes(searchQuery.toLowerCase())) return false

    // Filter by date range
    if (filterDateRange !== "all") {
      const expenseDate = new Date(expense.date)
      const now = new Date()

      if (filterDateRange === "thisMonth") {
        return expenseDate.getMonth() === now.getMonth() && expenseDate.getFullYear() === now.getFullYear()
      } else if (filterDateRange === "lastMonth") {
        const lastMonth = new Date(now)
        lastMonth.setMonth(lastMonth.getMonth() - 1)
        return expenseDate.getMonth() === lastMonth.getMonth() && expenseDate.getFullYear() === lastMonth.getFullYear()
      } else if (filterDateRange === "last3Months") {
        const threeMonthsAgo = new Date(now)
        threeMonthsAgo.setMonth(threeMonthsAgo.getMonth() - 3)
        return expenseDate >= threeMonthsAgo && expenseDate <= now
      }
    }

    return true
  })

  // Calculate total for filtered expenses
  const totalExpenses = filteredExpenses.reduce((sum, expense) => sum + expense.amount, 0)

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Expense Tracker</h1>
            <p className="text-gray-500 mt-1">Keep track of your spending</p>
          </div>
          <div className="mt-4 md:mt-0">
            <Badge variant="outline" className="text-lg font-semibold">
              Total: ${totalExpenses.toFixed(2)}
            </Badge>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left column - Add expense & Summary */}
          <div className="space-y-6">
            <ExpenseForm onAddExpense={addExpense} />
            <ExpenseSummary expenses={filteredExpenses} />
          </div>

          {/* Right column - Expense List */}
          <div className="lg:col-span-2">
            <ExpenseList
              expenses={filteredExpenses}
              totalExpenses={totalExpenses}
              allExpenses={expenses}
              onDeleteExpense={deleteExpense}
              filterCategory={filterCategory}
              setFilterCategory={setFilterCategory}
              filterDateRange={filterDateRange}
              setFilterDateRange={setFilterDateRange}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery}
            />
          </div>
        </div>
      </div>
    </div>
  )
}

