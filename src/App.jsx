import { MeetingProvider } from './context/MeetingProvider'

import Home from './pages/Home'


function App() {
  

  return (
    <MeetingProvider>
      <Home/>
    </MeetingProvider>
  )
}

export default App
