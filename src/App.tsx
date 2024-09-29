import "@fontsource-variable/open-sans"
import { BrowserRouter as Router, Route, Routes, } from 'react-router-dom';
import AuthMiddleware from './AuthMiddleware';
import GetStarted from "./components/pages/GetStarted";
import NotesPage from "./components/pages/NotesPage";
import { Toaster } from "./components/ui/toaster";
import Navigation from "./components/elements/Navigation";
import Header from "./components/elements/Header";
import Search from "./components/pages/Search";


function App() {
  return (
    <Router>
      <Header/>
      <main style={{ fontFamily: 'Open Sans Variable' }} className="flex lg:pr-5 pt-[20svh] h-[calc(100svh)]">
        <Navigation />
        <section className="min-h-full w-full lg:w-4/5">
          <AuthMiddleware>
            <Routes>
              <Route path='/get-started' element={<GetStarted />} />
            </Routes>
            <Routes>
              <Route path='/note/:noteStatus' element={<NotesPage />} />
            </Routes>
            <Routes>
              <Route path='/search' element={<Search />} />
            </Routes>
          </AuthMiddleware>
        </section>
        <Toaster />
      </main>
    </Router >
  )
}

export default App
