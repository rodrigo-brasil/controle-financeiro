import { Modal, Button, Stack, Table } from "react-bootstrap"
import { useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"
import { FaRegTrashAlt } from 'react-icons/fa'

export const ViewExpensesModal = ({ show, budgetId, handleClose }) => {

    const { budgets, removeExpense,getBudgetExpenses, removeBudget } = useBudgets()

    const budget = budgets.find(budget => budget.id === budgetId)


    return (
        <Modal show={show} onHide={handleClose} centered >
            <Modal.Header closeButton>
                <Stack direction="horizontal" gap="3">
                    <Modal.Title >Despesas - <span> {budget?.name} </span></Modal.Title>
                    {!budget?.isDefault &&
                        <Button size="sm" variant="outline-danger" onClick={() => {
                            removeBudget(budgetId)
                            handleClose()
                        }}>Apagar</Button>
                    }
                </Stack>

            </Modal.Header>
            <Modal.Body className="px-0">

                <Table striped bordered hover responsive="sm">
                    <thead className="text-center">
                        <tr>
                            <th>Descrição</th>
                            <th>Data</th>
                            <th>Despesa</th>
                            <th>Apagar</th>
                        </tr>
                    </thead>
                    <tbody >
                        {getBudgetExpenses(budgetId).map(expense =>
                            <tr key={expense.id}>
                                <td>{expense.description}</td>
                                <td className="text-center">{new Date(expense?.date).toLocaleDateString()}</td>
                                <td>{currencyFormatter(expense.amount)}</td>
                                <td className="text-center">
                                    <Button size="sm" variant="outline-danger" onClick={() => removeExpense(expense.id)}> <FaRegTrashAlt /></Button>
                                </td>
                            </tr>
                        )
                        }
                    </tbody>
                </Table>


            </Modal.Body>
        </ Modal >
    )
}
