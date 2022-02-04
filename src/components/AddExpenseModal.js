import { Modal, Form, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"

export const AddExpenseModal = ({ show, handleClose, defaultBudgetId }) => {

    const date = new Date()
    var currentDate = date.toISOString().substring(0,10);

    const { addExpense, getBudgetFilterByDate } = useBudgets()

    const descriptionRef = useRef()
    const amountRef = useRef()
    const budgetIdRef = useRef()
    const dateRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        addExpense(
            {
                description: descriptionRef.current.value,
                amount: parseFloat(amountRef.current.value),
                budgetId: budgetIdRef.current.value,
                date: dateRef.current.value,
            }
        )
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar Despesas</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="description" className="mb-3">
                        <Form.Label >Descrição:</Form.Label>
                        <Form.Control ref={descriptionRef} type="text" placeholder="Descrição da despesa" required />
                    </Form.Group>
                    <Form.Group controlId="amount" className="mb-3">
                        <Form.Label>Valor:</Form.Label>
                        <Form.Control ref={amountRef} type="number" required min={0} step={.01} placeholder="Valor gasto" />
                    </Form.Group>
                    <Form.Group controlId="budgetId" className="mb-3">
                        <Form.Label>Categoria:</Form.Label>
                        <Form.Select ref={budgetIdRef} defaultValue={defaultBudgetId}>
                            {getBudgetFilterByDate().map(budget => <option key={budget.id} value={budget.id}>{budget.name}</option>)}
                        </Form.Select>
                    </Form.Group>
                    <Form.Group controlId="date">
                        <Form.Label>Data:</Form.Label>
                            <Form.Control ref={dateRef} type="date"  defaultValue={currentDate}  required />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary">Adicionar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
