import React from 'react';
import ExpenseDate from './ExpenseDate';
import Card from "../UI/Card";
import './ExpenseItem.css';

const ExpenseItem = (props) => {
//props를 이용해서 App에서 받은 데이터를 가져올 수 있다

  // const clickHandler = () => {
  //   //함수를 호출한 것일 뿐 등호를 사용하여 값을 업데이트 하지않았기 때문에 const사용 가능
  //   //상태가 업데이트되면 컴포넌트 함수도 재실행
  //   //초기값은 해당 컴포넌트 함수가 주어진 컴포넌트 인스턴스에 대해 처음으로 실행되는 때에만 고려된다.
  //   setTitle('Updated!');
  // }
  return (
    <li>
    <Card className='expense-item'>
      <ExpenseDate date={props.date} />
      <div className='expense-item__description'>
        <h2>{props.title}</h2>
        <div className='expense-item__price'>${props.amount}</div>
      </div>
    </Card>
    </li>
  );
}
//리액트 코드를 작성할 때는 자주

export default ExpenseItem;
