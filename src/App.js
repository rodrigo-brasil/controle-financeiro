import { Button, Container, Stack } from "react-bootstrap";
import { BudgetCard } from './components/BudgetCard'
import { BudgetArea } from './components/BudgetArea'
import { AddBudgetModal } from './components/AddBudgetModal'
import { AddExpenseModal } from './components/AddExpenseModal'
import { ViewExpensesModal } from "./components/ViewExpensesModal";
import { Information } from './components/Information';
import { EditBudgetModal } from "./components/EditBudgetModal";
import { useState } from 'react'
import { useBudgets, GERAL_BUDGET_ID } from './contexts/BudgetsContext'

function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
  const [showEditBudgetModal, setShowEditBudgetModal] = useState(false);
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

  const handleEditBudgetModal = (budgetId) => {
    setBudgetId(budgetId)
    setShowEditBudgetModal(true)
  }



  return (
    <>
      <Container>
        <Stack direction="horizontal" gap="2" className="my-4 ">
          <h1 className="me-auto">Controle de despesas</h1>
          <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Adicionar Categoria</Button>
          <Button variant="outline-danger" onClick={() => handleDefaultBudgetId(GERAL_BUDGET_ID)}>Adicionar Despesa</Button>
        </Stack>

        <Information onEditBudget={() => setShowEditBudgetModal(true)} />

        <BudgetArea>


          {budgets.map(budget => {
            const amount = getBudgetExpenses(budget.id).reduce((total, expense) => total + expense.amount, 0)
            return (<BudgetCard
              key={budget.id}
              amount={amount}
              onClickExpense={handleDefaultBudgetId}
              onClickDetails={handleViewExpensesModal}
              onEditBudget={handleEditBudgetModal}
              {...budget}
            />)
          }
          )}

        </BudgetArea>
      </Container>
      <AddBudgetModal show={showAddBudgetModal} handleClose={() => setShowAddBudgetModal(false)} />
      <AddExpenseModal show={showAddExpenseModal} handleClose={() => setShowAddExpenseModal(false)} defaultBudgetId={budgetId} />
      <ViewExpensesModal show={showViewExpenseModal} handleClose={() => setShowViewExpenseModal(false)} budgetId={budgetId} />
      <EditBudgetModal show={showEditBudgetModal} handleClose={() => setShowEditBudgetModal(false)} budgetId={budgetId} />
    </>
  );
}

export default App;
