import { useState } from "react";
import "./styles.css";
import githubImage from './images/github.png';
import instagramImage from './images/instagram.png';
import twitterImage from './images/twitter.png';

export default function App() {
  var [billAmount, setBillAmount] = useState(0);
  var [cashAmount, setCashAmount] = useState(0);
  var [returnChange, setReturnChange] = useState([0, 0, 0, 0, 0, 0, 0, 0]);
  var [isBillEmpty, setIsBillEmpty] = useState(true);

  var notes = [2000, 500, 100, 50, 20, 10, 5, 1];

  function onBillAmountChange(event) {
    setBillAmount(event.target.value);
    isBillEmpty = event.target.value === "";
    setIsBillEmpty(isBillEmpty);

    // If the bill amount is empty then reset the cash-given and return-change fields
    if (isBillEmpty) {
      var cashGivenField = document.querySelector("#cashGiven");
      cashGivenField.value = "";
      var returnNotes = [0, 0, 0, 0, 0, 0, 0, 0];
      setReturnChange(returnNotes);
    }
  }

  function onCashAmountChange(event) {
    setCashAmount(event.target.value);
  }

  function onCheck() {
    var returnNotes = [0, 0, 0, 0, 0, 0, 0, 0];
    if (billAmount < cashAmount) {
      var cashReturn = cashAmount - billAmount;
      var cashLeft = cashReturn;
      for (var i = 0; i < notes.length; i++) {
        returnNotes[i] = parseInt(cashLeft / notes[i], 10);
        cashLeft %= notes[i];
        console.log(returnChange[i]);
      }
      setReturnChange(returnNotes);
    }
  }

  return (
    <div class="App">
      <div class="body">
        <h1>Cash Resgister Manager</h1>
        <p>Enter the bill amount and cash given by customer and know minimum number of notes to return.</p>
        <hr />
        <div>
          <h2>Bill Amount:</h2>
          <input
            type="number"
            columns="20"
            rows="1"
            onChange={onBillAmountChange}
            class="input-field"
          ></input>

          <h2>Cash Given:</h2>

          <input
            id="cashGiven"
            type="number"
            columns="20"
            rows="1"
            placeholder="enter cash given"
            disabled={isBillEmpty}
            onChange={onCashAmountChange}
            class="input-field"
          ></input>

          <button onClick={onCheck}>Check</button>

          <h2>Return Change</h2>

          <ChangeTable returnAmounts={returnChange} />
        </div>

        <footer>
          <div>
            <p>
              soumya ripan
            </p>

            <ul>
              <li><a href="/"><img src={githubImage} alt="github" /></a></li>
              <li><a href="/"><img src={instagramImage} alt="instagram"></img></a></li>
              <li><a href="/"><img src={twitterImage} alt="twitter"></img></a></li>
            </ul>
          </div>
        </footer>

      </div>
    </div>
  );
}

function ChangeTable(props) {
  return (
    <div class="table-parent">
      <table>
        <tr>
          <td class="table-cell">No of Notes</td>
          <td class="table-cell">{props.returnAmounts[0]}</td>
          <td class="table-cell">{props.returnAmounts[1]}</td>
          <td class="table-cell">{props.returnAmounts[2]}</td>
          <td class="table-cell">{props.returnAmounts[3]}</td>
          <td class="table-cell">{props.returnAmounts[4]}</td>
          <td class="table-cell">{props.returnAmounts[5]}</td>
          <td class="table-cell">{props.returnAmounts[6]}</td>
          <td class="table-cell">{props.returnAmounts[7]}</td>
        </tr>
        <tr>
          <td class="table-cell">Note</td>
          <td class="table-cell">2000</td>
          <td class="table-cell">500</td>
          <td class="table-cell">100</td>
          <td class="table-cell">50</td>
          <td class="table-cell">20</td>
          <td class="table-cell">10</td>
          <td class="table-cell">5</td>
          <td class="table-cell">1</td>
        </tr>
      </table>
    </div>
  );
}

/* 
1. Enter bill amount
2. Enter Cash given
3. Calculate the cash to return in terms of notes of
4. [2000, 500, 100, 50, 20, 5, 1]
*/
