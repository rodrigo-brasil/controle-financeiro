import { Button, Container, Stack } from "react-bootstrap";
import { BudgetCard } from './components/BudgetCard'
import { TotalBudgetCard } from './components/TotalBudgetCard'
import { BudgetArea } from './components/BudgetArea'
import { AddBudgetModal } from './components/AddBudgetModal'
import { AddExpenseModal } from './components/AddExpenseModal'
import { ViewExpensesModal } from "./components/ViewExpensesModal";
import { useState } from 'react'
import { useBudgets, GERAL_BUDGET_ID } from './contexts/BudgetsContext'

function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
  const { budgets, getBudgetExpenses } = useBudgets();
  const [budgetId, setBudgetId] = useState(GERAL_BUDGET_ID);

  const handleDefaultBudgetId = (id) => {
    setBudgetId(id)
    setShowAddExpenseModal(true)
  }


  const handleViewExpensesModal = (budgetId) => {
    setBudgetId(budgetId)
    setShowViewExpenseModal(true)
  }



  return (
    <>
      <Container>
        <Stack direction="horizontal" gap="2" className="my-4 ">
          <h1 className="me-auto">Finanças</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>add Receita</Button>
          <Button variant="outline-primary" onClick={() => handleDefaultBudgetId(GERAL_BUDGET_ID)}>add Despesa</Button>
        </Stack>
        <BudgetArea>

          <TotalBudgetCard  />

          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return (<BudgetCard key={budget.id} {...budget} amount={amount} onClickExpense={handleDefaultBudgetId} onClickDetails={handleViewExpensesModal} />)
          }
          )}

        </BudgetArea>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal show={showAddExpenseModal} handleClose={() => setShowAddExpenseModal(false)} defaultBudgetId={budgetId} />
      <ViewExpensesModal show={showViewExpenseModal} handleClose={()=> setShowViewExpenseModal(false)} budgetId={budgetId}/>
    </>
  );
}

export default App;
