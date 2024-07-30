import { lazy } from 'react'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import "./App.css"
import LazyNote from './ui/component/Loading/template/LazyNote'
import Layout from './layout'
import NotFoundPage from './ui/component/404/NotFoundPage'
const NotesList = lazy(() => import('./ui/component/NoteList/NotesList'))
const ArchiveList = lazy(() => import('./ui/component/NoteList/ArchiveList'))

function App() {
  const route = createBrowserRouter([
    {
      path: "/",
      element: <Layout>
        <LazyNote children={<NotesList />} />
      </Layout>
    },
    {
      path: "/archive",
      element: <Layout>
        <LazyNote children={<ArchiveList />} />
      </Layout>
    },
    {
      path: "*",
      element: <NotFoundPage />
    }
  ])
  return (
    <main className="h-[100dvh] w-full flex bg-beige font-raleway">
      <RouterProvider router={route} />
    </main>
  )
}

export default App