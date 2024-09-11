import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';
import { decrement, increment } from './redux/counter/counterSlice';
import {
  useGetAllProductsQuery,
  useAddTodoMutation,
} from './redux/features/apiSlice';
import { Button } from "@/components/ui/button"

function App() {
  const count = useSelector((state) => state.counter.value);
  const { data, isLoading } = useGetAllProductsQuery();
  const [ addTodo, { data: newTodo} ] = useAddTodoMutation();
  console.log(data);
  console.log(newTodo);

  const dispatch = useDispatch();

  if (isLoading) return <h1>Loading ...</h1>;
  return (
    <>
      <button
      className='bg-red-500 text-white rounded-lg py-2 px-4'
        onClick={() => {
          addTodo({
            todo: 'RTK Query test',
            completed: false,
            userId: 5,
          });
        }}
      >
        Add todo
      </button>
      <Button>Click me</Button>
      <div>
        <a href='https://vitejs.dev' target='_blank'>
          <img src={viteLogo} className='logo' alt='Vite logo' />
        </a>
        <a href='https://react.dev' target='_blank'>
          <img src={reactLogo} className='logo react' alt='React logo' />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className='card'>
        <button onClick={() => dispatch(increment())}>count is {count}</button>
        <button onClick={() => dispatch(decrement())}>
          - count is {count}
        </button>
        <p>
          Edit <code>src/App.jsx</code> and save to test HMR
        </p>
      </div>
      <p className='read-the-docs'>
        Click on the Vite and React logos to learn more
      </p>
    </>
  );
}

export default App;
