import './App.css'

function Welcome() {
  const name = 'Hamza'
  const fruits = ['grapes', 'mango', 'apple']
  const x = 939393
  return <div>
    <h1 className="title-heading">First react website</h1>
    <h2>Rendering JSX</h2>
    <p>My name is : {name} </p>
    <p>{false ? 'True' : x + 4}</p>
    <p>{true ? <u>True</u> : <i>false</i>}</p>
    <hr />
    <ul>
      {fruits.map((fruit, index) => {
        return <li>{fruit}</li>
      })}
    </ul>

  </div>
}


export default Welcome