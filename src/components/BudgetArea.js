import styled from "styled-components";

export const BudgetArea = ({ children }) => {
    return (
        <BudgetAreaStyled>
            {children}
        </BudgetAreaStyled>
    )
}


const BudgetAreaStyled = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px,1fr));
    grid-gap: 2rem;
    margin-top: 2rem;
`;