// Write your code here
import './index.css'

const TransactionItem = props => {
  const {transactionDetails, ondeleting} = props
  const {id, title, amount, type} = transactionDetails

  const onclikingbutton = () => {
    ondeleting(id, type, amount)
  }

  return (
    <li className="lii" value={id}>
      <p>
        {title} Rs {amount} {type}
      </p>
      <button type="button" onClick={onclikingbutton} data-testid="delete">
        <img
          src="https://assets.ccbp.in/frontend/react-js/money-manager/delete.png "
          alt="delete"
          className="buttonimg"
        />
      </button>
    </li>
  )
}

export default TransactionItem
