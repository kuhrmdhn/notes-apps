import { lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import "./App.css"
import AddNotesForm from "./component/AddNotesForm"
import SideBar from "./component/Sidebar"
import Banner from './component/Banner'
import LazyNote from './lazy/template/LazyNote'
import EditNotesForm from './component/EditNotesForm'
const NotesList = lazy(() => import( './component/NotesList'))
const ArchiveList = lazy(() => import('./component/ArchiveList'))

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <LazyNote children={<NotesList />} />
    },
    {
      path: "/archive",
      element: <LazyNote children={<ArchiveList/>}/>
    }
  ])
  return (
    <main className="h-[100dvh] w-full flex bg-beige font-raleway">
      <SideBar />
      <div className='h-full w-full'>
        <Banner />
        <RouterProvider router={route} />
      </div>
      <AddNotesForm />
      <EditNotesForm />
    </main>
  )
}

export default App