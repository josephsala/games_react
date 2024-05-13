import { useState } from 'react'

function App() {

  return (
    <div>
      <button onClick={() => window.location.href = '/juego2'}>Juego 2</button>
      <button onClick={() => window.location.href = '/juego3'}>Juego 3</button>
    </div>

  )
}

export default App
