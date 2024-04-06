import React, { useEffect } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import '../assets/styles/layout.css';
import Sidebar from './Sidebar';
import { Usercontext } from '../context/AuthProvider';
import { CSpinner } from '@coreui/react-pro';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import 'bootstrap/dist/js/bootstrap.bundle.min.js';

const Layout = () => {
    const navigate = useNavigate()

    const { logout, authenticated, loading } = Usercontext()
    useEffect(() => {
        if (!authenticated) {
            logout()
            navigate('/login')
        }
    }, [authenticated])

    if (loading || !authenticated) {
        return <div className="text-center text-primary" ><CSpinner size="sm" style={{ width: '3rem', height: '3rem' }} /></div>;
    }
    return (


        <div className='app-container'>
            <div className='sidebar'>
                <Sidebar />
            </div>
            <div className='content-container'>
                <main className='main-content'>
                    <Outlet />
                </main>
                <footer>
                    <div className="ocean">
                        <div className="wave"></div>
                        <div className="wave"></div>
                    </div>
                </footer>
            </div>
        </div>

    );
}

export default Layout;
