import { Modal, Button, Stack } from "react-bootstrap"
import { useBudgets, GERAL_BUDGET_ID } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"
import {FaRegTrashAlt} from 'react-icons/fa'

export const ViewExpensesModal = ({ show, budgetId, handleClose }) => {

    const { budgets, removeExpense, getBudgetExpenses, removeBudget } = useBudgets()

    const budget = budgets.find(budget => budget.id === budgetId)


    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Stack direction="horizontal" gap="3">
                <Modal.Title >Despesas - <span> {budget?.name} </span></Modal.Title>
                {budgetId !== GERAL_BUDGET_ID &&
                    <Button size="sm" variant="outline-danger" onClick={() => {
                        removeBudget(budgetId)
                        handleClose()
                    }}>Apagar</Button>
                }
                </Stack>

            </Modal.Header>
            <Modal.Body>
                <Stack direction="vertical">
                    {getBudgetExpenses(budgetId).map(expense =>
                        <Stack key={expense.id} direction="horizontal" gap="2">
                            <span className="me-auto fs-4">{expense.description}</span>
                            <span className="fs-5">{currencyFormatter(expense.amount)}</span>
                            <Button size="sm" variant="outline-danger" onClick={() => removeExpense(expense.id)}> <FaRegTrashAlt/></Button>
                        </Stack>
                    )
                    }
                </Stack>

            </Modal.Body>
        </ Modal >
    )
}
