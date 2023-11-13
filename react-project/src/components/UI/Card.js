import './Card.css';

const Card = (props) => {
  const classes = 'card ' + props.className;  //card뒤에 공백하나 붙여야 한다.
  console.log(classes);
  return <div className={classes}>{props.children}</div>;
}
//children은 예약어 children prop의 값은 항상 여러분의 사용자 지정 컴포넌트의 시작태그와 종료 태그 사이에 있는 컨텐츠

export default Card;

//wrapper 컴포넌트 - 중복되는 css 사용을 줄이기 위해 사용
//props children - 태그와 태그 사이의 모든 내용을 표시하기 위해 사용되는 특수한 props
//{props.children}은 <Card>~</Card> 내부에 작성된 내용들을 화면에 표시합니다.
//<Card>내부에 작성된 내용들이 Card컴포넌트에게 props.children으로 전달됩니다.
//props.children은 수정이 불가능한 읽기 전용이므로 React.cloneElement 메서드를 사용하여 props.children을 복제 후 수정할 수 있습니다.