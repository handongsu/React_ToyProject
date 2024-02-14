// 타입 추론
function add(a: number, b: number) {
  return a + b;
}

const result = add(2, 5);

console.log(result);

//Generics

function insertAtBeginning<T>(array: T[], value: T) {
  //array와 value가 같은 타입을 가진다는 것을 알려줌
  const newArray = [value, ...array];
  return newArray;
}

const demoArray = [1, 2, 3];

const updatedArray = insertAtBeginning(demoArray, -1); //[-1,1,2,3]
const stringArray = insertAtBeginning(["a", "b", "c"], "d");
