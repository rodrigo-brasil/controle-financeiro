import { Card, ProgressBar, Stack, Button } from "react-bootstrap"
import { currencyFormatter } from "../utils"
import styled, { css } from "styled-components"

export const BudgetCard = ({ id, name, amount, max, overview, onClickExpense, onClickDetails, hideButtons }) => {

    const classNames = []
    if (amount > max && max !== 0) classNames.push("bg-danger", "bg-opacity-10")
    else if (amount === max && max !== 0) classNames.push("bg-success", "bg-opacity-50")
    else if (overview) classNames.push("bg-light", "bg-opacity-50")

    return (
        <StyledCard className={classNames.join(" ")} overview={overview ? true : false}>
            <Card.Body className="d-flex flex-column justify-content-between">
                <Card.Title className="d-flex justify-content-between align-items-baseline mb-3">
                    <div className="me-2">{name}</div>
                    <div className="fw-normal d-flex align-items-baseline ">{currencyFormatter(amount)}
                        {max && <span className="text-success fs-6 ms-1"> / {currencyFormatter(max)}</span>}
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
                        <Button variant="outline-primary" className="ms-auto" onClick={() => onClickExpense(id)}>add despesa</Button>
                        <Button variant="outline-secondary" onClick ={()=> onClickDetails(id)} >detalhes</Button>
                    </Stack>
                )}

            </Card.Body>
        </StyledCard>
    )
}

function getProgressBarVariant(amount, max) {
    const ratio = amount / max
    if (ratio < 0.25) return "sucess"
    if (ratio < 0.5) return "info"
    if (ratio < 0.75) return "warning"
    return "danger"
}

const StyledCard = styled(Card)`
    border: 2px solid #ccc;

    ${props => props.overview && css`
        grid-column: 1 / -1;
    `}
`;