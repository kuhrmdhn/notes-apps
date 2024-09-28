import "@fontsource-variable/open-sans"
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import AuthMiddleware from './AuthMiddleware';
import GetStarted from "./components/pages/GetStarted";
import NotesPage from "./components/pages/NotesPage";
import { Toaster } from "./components/ui/toaster";
import Navigation from "./components/elements/Navigation";


function App() {
  return (
    <main style={{ fontFamily: 'Open Sans Variable' }} className="flex lg:pr-5">
      <Navigation/>
      <section className="min-h-[100svh] w-full lg:w-4/5">
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
