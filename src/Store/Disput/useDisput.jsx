import { Disput } from 'context/Context'
import React, { useContext } from 'react'

export default function useDisput() {
	return useContext(Disput)
}
