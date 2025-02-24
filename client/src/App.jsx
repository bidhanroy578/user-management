import { Outlet } from 'react-router'

function App() {

    return (
        <div className=' border-2 border-green-400 min-h-screen'>
            <h3 className='bg-green-300 text-3xl text-center leading-16'>User Management System</h3>
            <Outlet />
        </div>
    )
}

export default App
