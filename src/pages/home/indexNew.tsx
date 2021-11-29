import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement, selectCounter } from '../../store/utool'

export const HomePage = (props: any) => {
  const { value, loading, error } = useSelector(selectCounter)
  const dispatch = useDispatch()
  return (
    <div>
			{value}
      <button onClick={() => dispatch(increment())}>+</button>
      <button onClick={() => dispatch(decrement())}>-</button>
    </div>
  )
}
