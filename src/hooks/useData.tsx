import { useContext } from 'react'
import { DataContext } from '../context/DataContext'

export default function useData() {
  const dataContext = useContext(DataContext)

  if (dataContext === null || dataContext === undefined) {
    throw new Error('Error at getting cart');
  }

  return dataContext;
}
