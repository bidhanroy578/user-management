import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from "react-router";
import './index.css'
import App from './App.jsx'
import ErrorPage from './layouts/ErrorPage.jsx';
import AllUser from './layouts/AllUser.jsx';
import NewUser from './layouts/NewUser.jsx';
import EditUser from './layouts/EditUser.jsx';

createRoot(document.getElementById('root')).render(

  <BrowserRouter>
    <StrictMode>
      <Routes>
        <Route path='/' element={<App />} >
          <Route path='/' element={<AllUser />} />
          <Route path='/new-user' element={<NewUser />} />
          <Route path='/edit-user/:id' element = { <EditUser /> } />
        </Route>
        <Route path='*' element={<ErrorPage />} />
      </Routes>
    </StrictMode>
  </BrowserRouter>
)
