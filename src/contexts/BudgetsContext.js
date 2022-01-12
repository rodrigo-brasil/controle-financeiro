import { createContext, useContext } from "react"
import { v4 as uuid } from "uuid"
import { useLocalStorage } from "../hooks/useLocalStorage"

const BudgetsContext = createContext()

export const GERAL_BUDGET_ID = "GERAL"

export const useBudgets = () => {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const [budgets, setBudgets] = useLocalStorage("budgets",[{ id: GERAL_BUDGET_ID, name: "Geral", max:0}])
    const [expenses, setExpenses] = useLocalStorage("expenses",[])

    const addBudget = ({name, max}) => {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name))
                return prevBudgets
            return [...prevBudgets, { id: uuid(), name, max }]
        })
    }

    const addExpense = ({description, amount, budgetId}) => {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuid(), description, amount, budgetId }]
        })
    }

    const getBudgetExpenses = (budgetId) => {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    const removeBudget = (id) => {
        setBudgets(prevBudgets => prevBudgets.filter(budget => budget.id !== id))
    }

    const removeExpense = (id) => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id))
    }

    return (
        <BudgetsContext.Provider value={{ budgets, addBudget, removeBudget, expenses, addExpense, removeExpense, getBudgetExpenses }}>
            {children}
        </BudgetsContext.Provider>
    )
}