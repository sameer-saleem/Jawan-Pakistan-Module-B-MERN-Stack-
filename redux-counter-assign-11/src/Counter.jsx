import { useSelector, useDispatch } from "react-redux"
import { increment, decrement } from "./features/counter/countSlice";

const Counter = () => {

  const count = useSelector((state) => state.counter.value);
  const dispatch = useDispatch();

  return (
    <div className="text-center mt-50">
      <h1>Redux Counter</h1>

      <button onClick={() => dispatch(increment())}>+</button>
      <span className="mx-10">{count}</span>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}

export default Counter;