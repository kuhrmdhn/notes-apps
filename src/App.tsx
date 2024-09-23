import "@fontsource-variable/open-sans"
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import AuthMiddleware from './AuthMiddleware';
import GetStarted from "./components/pages/GetStarted";
function App() {
  return (
    <main style={{ fontFamily: 'Open Sans Variable' }}>
      <Router>
        <AuthMiddleware>
          <Routes>
            <Route path='/get-started' element={<GetStarted/>} />
          </Routes>
          <Routes>
            <Route path='/' element={<Cek1/>} />
          </Routes>
        </AuthMiddleware>
      </Router >
    </main>
  )
}

const Cek1 = () => {
  return <h1>Hello World 1</h1>
}

export default App
