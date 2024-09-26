import "@fontsource-variable/open-sans"
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import AuthMiddleware from './AuthMiddleware';
import GetStarted from "./components/pages/GetStarted";
import NotesPage from "./components/pages/Notes";
import { Toaster } from "./components/ui/toaster";


function App() {
  return (
    <main style={{ fontFamily: 'Open Sans Variable' }}>
      <aside className="fixed left-0 top-0 h-[100svh] mr-5 w-[270px]">
        aside bar
      </aside>
      <section className="min-h-[100svh] pl-[270px] border ">
        <Router>
          <AuthMiddleware>
            <Routes>
              <Route path='/get-started' element={<GetStarted />} />
            </Routes>
            <Routes>
              <Route path='/' element={<NotesPage />} />
            </Routes>
          </AuthMiddleware>
        </Router >
      </section>
      <Toaster />
    </main>
  )
}

export default App
