import { Button, ButtonGroup, Container, Stack } from "react-bootstrap";
import { BudgetCard } from './components/BudgetCard'
import { BudgetArea } from './components/BudgetArea'
import { AddBudgetModal } from './components/AddBudgetModal'
import { AddExpenseModal } from './components/AddExpenseModal'
import { ViewExpensesModal } from "./components/ViewExpensesModal";
import { Information } from './components/Information';
import { EditBudgetModal } from "./components/EditBudgetModal";
import { FilterDate } from './components/FilterDate'
import { useState } from 'react'
import { useBudgets } from './contexts/BudgetsContext'

function App() {

  const [showAddBudgetModal, setShowAddBudgetModal] = useState(false);
  const [showAddExpenseModal, setShowAddExpenseModal] = useState(false);
  const [showViewExpenseModal, setShowViewExpenseModal] = useState(false);
  const [showEditBudgetModal, setShowEditBudgetModal] = useState(false);
  const { getBudgetFilterByDate, getBudgetExpenses,findDefaultBudgetFilterDate } = useBudgets();
  const [budgetId, setBudgetId] = useState();

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
        <h1 className="text-center my-1">Controle de despesas</h1>
        <Stack direction="horizontal" gap="3" className="my-4 flex-wrap justify-content-center justify-content-lg-between ">
          <FilterDate />
          <ButtonGroup>
            <Button variant="primary" onClick={() => setShowAddBudgetModal(true)}>Adicionar Categoria</Button>
            <Button variant="outline-danger" onClick={() => handleDefaultBudgetId(findDefaultBudgetFilterDate().id)}>Adicionar Despesa</Button>
          </ButtonGroup>
        </Stack>

        <Information />

        <BudgetArea>


          {getBudgetFilterByDate().map(budget => {
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
