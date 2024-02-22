import {Component} from 'react'
import {v4 as uuidv4} from 'uuid'
import TransactionItem from '../TransactionItem'

// import MoneyDetails from '../MoneyDetails'

import './index.css'

const transactionTypeOptions = [
  {
    optionId: 'INCOME',
    displayText: 'Income',
  },
  {
    optionId: 'EXPENSES',
    displayText: 'Expenses',
  },
]

class MoneyManager extends Component {
  state = {
    id: uuidv4(),
    historyList: [],
    title: '',
    amount: '',
    optionId: transactionTypeOptions[0].optionId,
  }

  ondeleting = id => {
    const {historyList} = this.state
    const updatedHistoryList = historyList.filter(
      eachHistory => id !== eachHistory.id,
    )
    this.setState({
      historyList: updatedHistoryList,
    })
  }

  onchangingtitle = event => {
    this.setState({title: event.target.value})
  }

  onchangingamount = event => {
    this.setState({amount: event.target.value})
  }

  onselecting = event => {
    this.setState({optionId: event.target.value})
  }

  onSubmit = event => {
    event.preventDefault()
    const {title, amount, optionId} = this.state
    const typeOption = transactionTypeOptions.find(
      eachTransaction => eachTransaction.optionId === optionId,
    )
    const {displayText} = typeOption
    const newHistory = {
      id: uuidv4(),
      title,
      amount: parseInt(amount),
      type: displayText,
    }
    this.setState(prevState => ({
      historyList: [...prevState.historyList, newHistory],
      title: '',
      amount: '',
      optionId: transactionTypeOptions[0].optionId,
    }))
  }

  getExpenses = () => {
    const {historyList} = this.state
    let expensesAmount = 0
    historyList.forEach(eachHistory => {
      if (eachHistory.type === transactionTypeOptions[1].displayText) {
        expensesAmount += eachHistory.amount
      }
    })
    return expensesAmount
  }

  getIncome = () => {
    const {historyList} = this.state
    let incomeAmount = 0
    historyList.forEach(eachHistory => {
      if (eachHistory.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachHistory.amount
      }
    })
    return incomeAmount
  }

  getBalance = () => {
    const {historyList} = this.state
    let balanceAmount = 0
    let incomeAmount = 0
    let expensesAmount = 0

    historyList.forEach(eachHistory => {
      if (eachHistory.type === transactionTypeOptions[0].displayText) {
        incomeAmount += eachHistory.amount
      } else {
        expensesAmount += eachHistory.amount
      }
    })
    balanceAmount = incomeAmount - expensesAmount
    return balanceAmount
  }

  render() {
    const {historyList, title, amount, optionId} = this.state
    const balanceAmount = this.getBalance()
    const incomeAmount = this.getIncome()
    const expensesAmount = this.getExpenses()
    return (
      <div className="div">
        <div className="header">
          <p className="headerheading">Hi Richard</p>
          <p className="headerpara">Welcom back to your</p>
        </div>

        <ul className="moneydetailss">
          <li className="li">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/balance-image.png"
              alt="balance"
              className="img"
            />
            <div>
              <p className="para">Your Balance</p>
              <p className="amount" data-testid="balanceAmount">
                Rs {balanceAmount}
              </p>
            </div>
          </li>

          <li className="li">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/income-image.png"
              alt="income"
              className="img"
            />
            <div>
              <p className="para">Your Income</p>
              <p className="amount" data-testid="incomeAmount">
                Rs {incomeAmount}
              </p>
            </div>
          </li>

          <li className="li">
            <img
              src="https://assets.ccbp.in/frontend/react-js/money-manager/expenses-image.png"
              alt="expenses"
              className="img"
            />
            <div>
              <p className="para">your Expenses</p>
              <p className="amount" data-testid="expensesAmount">
                Rs {expensesAmount}
              </p>
            </div>
          </li>
        </ul>

        <div className="formandhistory">
          <form className="form" onSubmit={this.onsubmiting}>
            <h1 className="formheading">Add Transaction</h1>
            <label htmlFor="title">TITLE</label>
            <input
              id="title"
              type="text"
              className="inputtitle"
              onChange={this.onchangingtitle}
            />

            <label htmlFor="amount">AMOUNT</label>
            <input
              id="amount"
              type="text"
              className="inputamount"
              onChange={this.onchangingamount}
            />

            <label htmlFor="list">TYPE</label>
            <select
              className="select"
              onChange={this.onselecting}
              value="select"
            >
              <option
                key={transactionTypeOptions[0].optionId}
                value={transactionTypeOptions[0].optionId}
              >
                {transactionTypeOptions[0].displayText}
              </option>
              <option
                key={transactionTypeOptions[1].optionId}
                value={transactionTypeOptions[1].optionId}
              >
                {transactionTypeOptions[1].displayText}
              </option>
            </select>

            <button type="submit" className="button">
              Add
            </button>
          </form>
          <div className="history">
            <h1 className="historyheading">History</h1>
            <ul>
              <li className="lii">
                <p>Title Amount Type</p>
              </li>
              {historyList.map(eachHistory => (
                <TransactionItem
                  transactionDetails={eachHistory}
                  key={eachHistory.id}
                  ondeleting={this.ondeleting}
                />
              ))}
            </ul>
          </div>
        </div>
      </div>
    )
  }
}

export default MoneyManager
