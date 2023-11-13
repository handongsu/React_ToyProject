import React, {useState} from "react";
import './NewExpense.css';
import ExpenseForm from "./ExpenseForm";

const NewExpense = (props) => {
  const [isEditing, setIsEditing] = useState(false);

  const onSaveExpenseDataHandler = (enteredExpenseData) => {
    const expenseData = {
      ...enteredExpenseData,
      id: Math.random().toString()
    };
    props.onAddExpense(expenseData);  //onAddExpense라는 속성으로 받은 함수를 호출 ,expenseData함수의 데이터를 전달 onAddExpense 속성에 지정된 함수에
    setIsEditing(false);
  };

  const startEditingHandler = () => {
    setIsEditing(true);
  };

  const stopEditingHandler = () => {
    setIsEditing(false);
  }

  return (
  <div className="new-expense">
    {!isEditing && <button onClick={startEditingHandler}>ADD New Expense</button>}  {/*자바스크립트 값을 JSX에 넣을 때는 중괄호 */}
    {isEditing && <ExpenseForm onSaveExpenseData={onSaveExpenseDataHandler} onCancel={stopEditingHandler} />}
  </div> 
  );
}
export default NewExpense;