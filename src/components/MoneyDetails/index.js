// Write your code here
import './index.css'

const MoneyDetails = props => {
  const {details} = props
  const {imgUrl, altUrl, heading, amount} = details

  return (
    <li className="li">
      <img src={imgUrl} alt={altUrl} className="img" />
      <div>
        <p className="para">{heading}</p>
        <p className="amount">Rs {amount}</p>
      </div>
    </li>
  )
}
export default MoneyDetails
