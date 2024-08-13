import { useContext } from 'react'
import { CategoryBlock } from 'context/Context'

export default function useCategoryBlock() {
	return useContext(CategoryBlock)
}
