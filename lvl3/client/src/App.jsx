import { useState } from 'react'

import Contacts from './comp/Contacts'
function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <Contacts />
    </>
  )
}

export default App
