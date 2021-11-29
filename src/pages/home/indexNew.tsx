import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, selectCounter, incrementByAmountAsync } from '../../store/utool'

export const HomePage = (props: any) => {
  const { value, loading, error } = useSelector(selectCounter)
  const dispatch = useDispatch()
  return (
    <div>
      <div>{value}</div>
      <div>{loading}</div>
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
      <button onClick={() => dispatch(incrementByAmountAsync(3))}>thunk</button>
    </div>
  )
}
