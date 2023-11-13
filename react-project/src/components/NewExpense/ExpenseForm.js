import React, {useState} from "react";
import './ExpenseForm.css';

const ExpenseForm = (props) => {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [enteredAmount, setEnteredAmount] = useState('');
  const [enteredDate, setEnteredDate] = useState('');
  // const [userInput, setUserInput] = useState({
  //   enteredTitle: '',
  //   enteredAmount:'',
  //   enteredDate:'',
  // });

  const titleChangeHandler = (event) => {
    setEnteredTitle(event.target.value);  //event라는 객체 안에 value값을 target한다.
    // setUserInput({
    //   ...userInput,
    //   enteredTitle: event.target.value,
    // });
    // setUserInput((prevState) => { //이전 상태 스냅샷을 받는다 return으로 이 함수 대신 새 상태를 리턴받는다.
    //   return {...prevState, enteredTitle : event.target.value}; //이 방식을 사용해야 상태 스냅샷이 항상 최신 상태 스냅샷이 되도록 보장해줌.
    // });
  };
  const amountChangeHandler = (event) => {
    setEnteredAmount(event.target.value); //숫자여도 문자열로 읽는다 따라서 초기값도 문자열로 해줘야 한다.
    // setUserInput({
    //   ...userInput,
    //   enteredAmount: event.target.value,
    // });
  }
  const dateChangeHandler = (event) => {
    setEnteredDate(event.target.value);
    // setUserInput({
    //   ...userInput, //키-값 쌍을 가져와 새 객체에 추가
    //   enteredDate: event.target.value,  //enteredDate 키-값 쌍을 오버라이드
    // });
  }

  const submitHandler = (event) => {
    event.preventDefault();
    
    const expenseData = {
      title: enteredTitle,
      amount: +enteredAmount,
      date: new Date(enteredDate)
    };
    props.onSaveExpenseData(expenseData); //위에 인자를 넘긴다
    setEnteredTitle('');
    setEnteredAmount('');
    setEnteredDate('');
  };

  return (
  <form onSubmit={submitHandler}>
    <div className="new-expense__controls">
      <div className="new-expense__control">
        <label>Title</label>
        <input type="text" value={enteredTitle} onChange={titleChangeHandler}/>  
      </div>
      <div className="new-expense__control">
        <label>Amount</label>
        <input type="number" min="0.01" step="0.01" value={enteredAmount} onChange={amountChangeHandler}/>
      </div>
      <div className="new-expense__control">
        <label>Date</label>
        <input type="Date" min="2019-01-01" max="2023-12-31" value={enteredDate} onChange={dateChangeHandler}/>
      </div>
    </div>
    <div className="new-expense__actions">
      <button type="button" onClick={props.onCancel}>Cancel</button>
      <button type="submit">Add Expense</button>
    </div>
  </form>
  );
}
export default ExpenseForm;

//inline으로 함수를 정의하는 것 보다는 위에서 먼저 정의해 주는게 더 좋다