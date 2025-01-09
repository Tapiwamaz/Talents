// react
import React, { useContext, useState } from 'react'
// css
import "./Budgets.css"
// components
import CreateBudget from '../../Components/BudgetCards/CreateBudget'
// context
import { AppContext } from "../../context/AppContext";


const Budgets = () => {
  const [newBudget,setNewBudget] = useState({})

  const {user} = useContext(AppContext);
  
  return (
    <main className='budgets-main'>
      <CreateBudget user={user}  newBudget={newBudget} setNewBudget={setNewBudget}/>
    </main>
  )
}

export default Budgets