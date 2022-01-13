import { Alert, Col, Row } from "react-bootstrap"
import { useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"

export const Information = ({ onEditBudget }) => {
    const { expenses, budgets } = useBudgets()

    const totalBudgets = budgets.reduce((total, budget) => total + budget.max, 0)
    const totalExpenses = expenses.reduce((total, expense) => total + expense.amount, 0)
    const remainingBudgets = totalBudgets - totalExpenses;

    return (
        <Row className="mt-3">
            <Col sm={true}>
                <Alert variant="primary">
                    <Alert.Heading>Saldo Planejado </Alert.Heading>
                    <p className="fs-4 me-auto">{currencyFormatter(totalBudgets)}</p>
                </Alert>
            </Col>
            <Col sm={true}>
                <Alert variant="success">
                    <Alert.Heading>Saldo Restante</Alert.Heading>
                    <p className="fs-4">{currencyFormatter(remainingBudgets)}</p>

                </Alert>
            </Col>
            <Col sm={true}>
                <Alert variant="danger">
                    <Alert.Heading>Despesa Total</Alert.Heading>
                    <p className="fs-4">{currencyFormatter(totalExpenses)}</p>
                </Alert>
            </Col>

        </Row>
    )
}