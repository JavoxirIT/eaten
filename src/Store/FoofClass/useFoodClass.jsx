import { useContext } from 'react'
import { FoodClass } from 'context/Context'

export default function useFoodClass() {
	return useContext(FoodClass)
}
