import { Modal, Form, Button } from "react-bootstrap"
import { useRef } from "react"
import { useBudgets } from "../contexts/BudgetsContext"

export const AddBudgetModal = ({ show, handleClose }) => {

    const { addBudget } = useBudgets()

    const nameRef = useRef()
    const maxRef = useRef()

    const handleSubmit = (e) => {
        e.preventDefault()
        addBudget(
            {
                name: nameRef.current.value,
                max: parseFloat(maxRef.current.value)
            }
        )
        handleClose()
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>Adicionar Receita</Modal.Title>
            </Modal.Header>
            <Form onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group controlId="budgetName" className="mb-3">
                        <Form.Label >Receita</Form.Label>
                        <Form.Control ref={nameRef} type="text" placeholder="Nome da categoria" required />
                    </Form.Group>
                    <Form.Group controlId="budgetMax">
                        <Form.Label>Valor</Form.Label>
                        <Form.Control ref={maxRef} type="number" required min={0} step={.01} placeholder="Receita disponível" />
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button type="submit" variant="primary">Adicionar</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}
