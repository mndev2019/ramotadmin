
import { createBrowserRouter, createRoutesFromElements, Navigate, Route, RouterProvider } from 'react-router-dom'
import './App.css'
import Layout from './Layout/Layout'
import GoogleForm from './Pages/GoogleForm'
import { ToastContainer } from 'react-toastify'
import ContactForm from './Pages/ContactForm'
import Blog from './Pages/Blog'









function App() {
  const ThemeRoutes = createBrowserRouter(
    createRoutesFromElements(
      <>
        {/* <Route path='/' element={<Navigate to="/login" replace />} />
        <Route path='/login' element={<Login />} /> */}
        <Route path='/' element={<Layout />}>
          <Route path='/' element={<GoogleForm />} />
          <Route path='/conatct-form' element={<ContactForm/>}/>
          <Route path='blog' element={<Blog/>}/>
         


        </Route>


      </>
    )
  )

  return (
    <>
    <ToastContainer position="top-right" autoClose={2000} />
      <RouterProvider router={ThemeRoutes} />
    </>
  )
}

export default App
