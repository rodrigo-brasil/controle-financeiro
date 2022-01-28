import { Modal, Form, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"

export const EditBudgetModal = ({ show, handleClose, budgetId }) => {

    const { editBudget, budgets } = useBudgets()

    const budget = budgets.find(budget => budget.id === budgetId);

    const maxRef = useRef({value: budget?.max})
    const nameRef = useRef({value :budget?.name})

    const handleSubmit = (e) => {
        e.preventDefault()
        editBudget(
            {
                id: budgetId,
                name: nameRef.current.value,
                max: parseFloat(maxRef.current.value)
            }
        )
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Editar {budget?.name} </Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>

                    <Form.Group controlId="budgetName" className="mb-3">
                        <Form.Label >Alterar nome</Form.Label>
                        <Form.Control ref={nameRef} defaultValue={budget?.name} type="text" placeholder="Nome da categoria" required />
                    </Form.Group>
                
                    <Form.Group controlId="budgetMax">
                        <Form.Label>Alterar valor</Form.Label>
                        <Form.Control ref={maxRef} defaultValue={budget?.max} type="number" required min={0} step={.01} placeholder="Receita disponível" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary">Salvar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
