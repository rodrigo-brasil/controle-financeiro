import { Modal, Button, Stack } from "react-bootstrap"
import { useBudgets, GERAL_BUDGET_ID } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"

export const ViewExpensesModal = ({ show, budgetId, handleClose }) => {

    const { budgets, removeExpense, getBudgetExpenses, removeBudget } = useBudgets()

    const budget = budgets.find(budget => budget.id === budgetId)


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Despesas - <span> {budget?.name} </span></Modal.Title>

            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical">
                    {getBudgetExpenses(budgetId).map(expense =>
                        <Stack key={expense.id} direction="horizontal" gap="2">
                            <span className="me-auto fs-4">{expense.description}</span>
                            <span className="fs-5">{currencyFormatter(expense.amount)}</span>
                            <Button size="sm" variant="outline-danger" onClick={() => removeExpense(expense.id)}>&times;</Button>
                        </Stack>
                    )
                    }
                </Stack>

            </Modal.Body>
            {budgetId !== GERAL_BUDGET_ID &&
                <Modal.Footer>
                    <Button variant="outline-danger" onClick={() => {
                        removeBudget(budgetId)
                        handleClose()
                    }}>Remover</Button>
                </Modal.Footer>
            }
        </ Modal >
    )
}
