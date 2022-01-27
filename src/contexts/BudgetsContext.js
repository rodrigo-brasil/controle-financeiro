import { createContext, useCallback, useContext, useEffect } from "react"
import { v4 as uuid } from "uuid"
import { useLocalStorage } from "../hooks/useLocalStorage"

const BudgetsContext = createContext()

export const useBudgets = () => {
    return useContext(BudgetsContext)
}

export const BudgetsProvider = ({ children }) => {
    const [filterDate, setFilterDate] = useLocalStorage("FilterDate", { month: new Date().getMonth(), year: new Date().getFullYear() })

    const getDefaultBudget = useCallback(() => {
        return ({
            id: uuid(),
            name: "Geral",
            isDefault: true,
            max: 0,
            filterDate: {
                month: filterDate.month,
                year: filterDate.year,
            },
        })
    },[filterDate])

    const [budgets, setBudgets] = useLocalStorage("budgets", [getDefaultBudget()])
    const [expenses, setExpenses] = useLocalStorage("expenses", [])


    const findDefaultBudgetFilterDate = useCallback(() => {
        const defaultBudgetFilterDate = budgets.find(budget => budget.isDefault && budget.filterDate.month === filterDate.month && budget.filterDate.year === filterDate.year)
        return defaultBudgetFilterDate
    },[budgets, filterDate])
    

    const getBudgetFilterByDate = () => {
        const results = budgets.filter(budget => {
            const { month, year } = budget.filterDate
            return month === filterDate.month && year === filterDate.year
        })
        // if (results.length === 0)
        //     setBudgets(prevBudgets => ([...prevBudgets, getDefaultBudget()]))
        return results
    }

    const addBudget = ({ name, max, filterDate }) => {
        setBudgets(prevBudgets => {
            if (prevBudgets.find(budget => budget.name === name))
                return prevBudgets
            return [...prevBudgets, { id: uuid(), name, max, filterDate }]
        })
    }

    const editBudget = ({ id, name, max }) => {
        setBudgets(prevBudgets => {
            const budgetIndex = prevBudgets.findIndex(budget => budget.id === id)
            if (budgetIndex === -1)
                return prevBudgets
            const budget = { ...prevBudgets[budgetIndex], name, max }
            return [...prevBudgets.slice(0, budgetIndex), budget, ...prevBudgets.slice(budgetIndex + 1)]
        })
    }

    const addExpense = ({ description, amount, budgetId, date }) => {
        setExpenses(prevExpenses => {
            return [...prevExpenses, { id: uuid(), description, amount, budgetId, date }]
        })
    }

    const getBudgetExpenses = (budgetId) => {
        return expenses.filter(expense => expense.budgetId === budgetId)
    }

    const removeBudget = (id) => {
        setExpenses(prevExpenses => {
            const defaultbudget = findDefaultBudgetFilterDate()
            return prevExpenses.map(expense => {
                if (expense.budgetId !== id) return expense
                return { ...expense, budgetId: defaultbudget.id }
            })
        })

        setBudgets(prevBudgets => {
            return prevBudgets.filter(budget => budget.id !== id)
        })
    }

    const removeExpense = (id) => {
        setExpenses(prevExpenses => prevExpenses.filter(expense => expense.id !== id))
    }

    useEffect(() => {
        if(findDefaultBudgetFilterDate() === undefined)
            setBudgets(prevBudgets => ([...prevBudgets, getDefaultBudget()]))
      }, [filterDate, findDefaultBudgetFilterDate, getDefaultBudget, setBudgets]);

    return (
        <BudgetsContext.Provider value={{ budgets, addBudget, editBudget, removeBudget, expenses, addExpense, removeExpense, getBudgetExpenses, getBudgetFilterByDate, filterDate, setFilterDate, findDefaultBudgetFilterDate }}>
            {children}
        </BudgetsContext.Provider>
    )
}