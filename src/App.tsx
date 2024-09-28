import "@fontsource-variable/open-sans"
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import AuthMiddleware from './AuthMiddleware';
import GetStarted from "./components/pages/GetStarted";
import NotesPage from "./components/pages/NotesPage";
import { Toaster } from "./components/ui/toaster";


function App() {
  return (
    <main style={{ fontFamily: 'Open Sans Variable' }} className="flex pr-5">
      <aside className="h-[100svh] mr-5 w-1/3 bg-red-main">
        aside bar
      </aside>
      <section className="min-h-[100svh]">
        <Router>
          <AuthMiddleware>
            <Routes>
              <Route path='/get-started' element={<GetStarted />} />
            </Routes>
            <Routes>
              <Route path='/note/:noteStatus' element={<NotesPage />} />
            </Routes>
          </AuthMiddleware>
        </Router >
      </section>
      <Toaster />
    </main>
  )
}

export default App
