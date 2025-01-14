import { useParams } from "react-router"
import "./SpecificBudget.css"
import { useContext } from "react";
import { AppContext } from "../../context/AppContext";

const SpecificBudget = () => {
    const {budget_id} = useParams();
    // const {}
    

  return (
    <div>{budget_id}</div>
  )
}

export default SpecificBudget
