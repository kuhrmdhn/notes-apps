import "@fontsource-variable/open-sans"
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import AuthMiddleware from './AuthMiddleware';
import GetStarted from "./components/pages/GetStarted";
import NotesPage from "./components/pages/Notes";
function App() {
  return (
    <main style={{ fontFamily: 'Open Sans Variable' }}>
      <Router>
        <AuthMiddleware>
          <Routes>
            <Route path='/get-started' element={<GetStarted/>} />
          </Routes>
          <Routes>
            <Route path='/' element={<NotesPage/>} />
          </Routes>
        </AuthMiddleware>
      </Router >
    </main>
  )
}

export default App
