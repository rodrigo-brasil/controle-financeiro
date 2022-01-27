import { Alert, Col, Row } from "react-bootstrap"
import { useBudgets } from "../contexts/BudgetsContext"
import { currencyFormatter } from "../utils"

export const Information = ({ onEditBudget }) => {
    const { getBudgetFilterByDate, getBudgetExpenses } = useBudgets()

    const totalBudgets = getBudgetFilterByDate().reduce((total, budget) => total + budget.max, 0)
    const totalExpenses = getBudgetFilterByDate().map(budget =>
        getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
    ).reduce((total, amount) => total + amount,0)
    const remainingBudgets = totalBudgets - totalExpenses;
    const variant = remainingBudgets >= 0 ? "success" : "danger"

    return (
        <Row className="mt-3">
            <Col sm={true}>
                <Alert variant="primary">
                    <Alert.Heading>Saldo Planejado </Alert.Heading>
                    <p className="fs-4 me-auto">{currencyFormatter(totalBudgets)}</p>
                </Alert>
            </Col>
            <Col sm={true}>
                <Alert variant={variant}>
                    <Alert.Heading>Saldo Restante</Alert.Heading>
                    <p className="fs-4">{currencyFormatter(remainingBudgets)}</p>

                </Alert>
            </Col>
            <Col sm={true}>
                <Alert variant="warning">
                    <Alert.Heading>Despesa Total</Alert.Heading>
                    <p className="fs-4">{currencyFormatter(totalExpenses)}</p>
                </Alert>
            </Col>

        </Row>
    )
}
