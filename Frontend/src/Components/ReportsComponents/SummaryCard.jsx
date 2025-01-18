import { toCurrency } from "../../Helpers/TextAndNumberFomats"
import "./ReportsComponents.css"

const SummaryCard = ({title,value,style}) => {
  return (
    <div className="summary-card">
        <h2>{title}</h2>       
        <h1 style={style ? style:{}}>{toCurrency(value)}</h1>       
    </div>
  )
}

export default SummaryCard