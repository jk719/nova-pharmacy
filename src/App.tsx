import { BrowserRouter } from 'react-router-dom';
import './App.css'
import Home from './pages/Home/Home'

// Enable future flags
const router = {
  future: {
    v7_startTransition: true,
    v7_relativeSplatPath: true
  }
};

function App() {
  return (
    <BrowserRouter {...router}>
      <div className="App">
        <Home />
      </div>
    </BrowserRouter>
  )
}

export default App
