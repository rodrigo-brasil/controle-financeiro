import { Card, ProgressBar, Stack, Button } from "react-bootstrap"
import { currencyFormatter } from "../utils"
import { FiEdit2, FiPlus } from 'react-icons/fi'
import { CgDetailsMore } from 'react-icons/cg'


export const BudgetCard = ({ id, name, amount, max, isDefault, onEditBudget, onClickExpense, onClickDetails, hideButtons }) => {

    const classNames = []
    if (amount > max && max !== 0) classNames.push("bg-danger", "bg-opacity-10")
    else if (isDefault) classNames.push("bg-light")

    return (
        <Card className={classNames.join(" ")}>
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="d-flex justify-content-between align-items-baseline flex-wrap gap-2 mb-3">
                    <Button size="sm" variant="outline-primary" onClick={() => onEditBudget(id)}><FiEdit2 /></Button>
                    <span className="flex-fill">{name}</span>

                    <div className="fw-normal d-flex align-items-baseline justify-content-center flex-fill ">
                        <span className="text-danger" >{currencyFormatter(amount)}</span>
                        {
                            max !== 0 &&
                            <>
                                <span>/</span>
                                <span className="text-success fs-6 ms-1">{currencyFormatter(max)}</span>
                            </>
                        }
                    </div>
                </Card.Title>
                {max !== 0 &&
                    <ProgressBar
                        className="rounded-pill"
                        variant={getProgressBarVariant(amount, max)}
                        min={0}
                        max={max}
                        now={amount}
                    />}

                {!hideButtons && (
                    <Stack direction="horizontal" gap="2" className="mt-4" >

                        <Button size="sm" variant="outline-danger" className="ms-auto" onClick={() => onClickExpense(id)}> <FiPlus />Adicionar despesa</Button>
                        <Button size="sm" variant="outline-info" onClick={() => onClickDetails(id)} > <CgDetailsMore /> Detalhes</Button>
                    </Stack>
                )}

            </Card.Body>
        </Card>
    )
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio < 0.25) return "sucess"
    if (ratio < 0.5) return "info"
    if (ratio < 0.75) return "warning"
    return "danger"
}
