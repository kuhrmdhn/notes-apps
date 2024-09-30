import "@fontsource-variable/open-sans"
import { BrowserRouter as Router, Route, Routes, useLocation, } from 'react-router-dom';
import AuthMiddleware from './AuthMiddleware';
import GetStarted from "./components/pages/GetStarted";
import NotesPage from "./components/pages/NotesPage";
import { Toaster } from "./components/ui/toaster";
import Navigation from "./components/elements/Navigation";
import Header from "./components/elements/Header";
import Search from "./components/pages/Search";
import Profile from "./components/pages/Profile";


function Main() {
  const location = useLocation();
  const isGetStartedPage = location.pathname === '/get-started';

  return (
    <>
      <Header />
      <main
        style={{ fontFamily: 'Open Sans Variable' }}
        className={`flex lg:pr-5 ${isGetStartedPage ? 'pb-0 pt-0' : 'pb-16 lg:pb-0 pt-16 lg:pt-[20svh]'} h-[calc(100svh)]`}
      >
        <Navigation />
        <section className="min-h-full w-full">
          <AuthMiddleware>
            <Routes>
              <Route path='/get-started' element={<GetStarted />} />
              <Route path='/profile' element={<Profile />} />
              <Route path='/note/:noteStatus' element={<NotesPage />} />
              <Route path='/search' element={<Search />} />
            </Routes>
          </AuthMiddleware>
        </section>
        <Toaster />
      </main>
    </>
  );
}

function App() {
  return (
    <Router>
      <Header />
      <Main />
    </Router>
  );
}

export default App
