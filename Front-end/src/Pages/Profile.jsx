import React, { useEffect, useState } from 'react';
import '../assets/styles/Profile.css'
import { Usercontext } from '../context/AuthProvider';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
    const navigate = useNavigate()
    const { loggednUser ,loading, logout, authenticated } = Usercontext()
    const [showPassword, setShowPassword] = useState(false);



    useEffect(() => {
        if (!authenticated) {
            logout()
            navigate('/login')
        }
    }, [authenticated])
    if (!loggednUser || Object.keys(loggednUser).length === 0) {
        return <div>data is not available.</div>;
    }
    if (loading || !authenticated) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <section className="vh-100" style={{ backgroundColor: '#f4f5f7' }}>
                <div className="container  h-100">
                    <div className="row d-flex justify-content-center align-items-center w-100 h-100">
                        <div className="col col-lg-6 mb-4 mb-lg-0">
                            <div className="card mb-3" style={{ borderRadius: '.5rem' }}>
                                <div className="row g-0">
                                    <div className="col-md-4 gradient-custom text-center text-white"
                                        style={{ borderTopLeftRadius: '.5rem', borderBottomLeftRadius: '.5rem' }}>
                                        <img src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-chat/ava6-bg.webp"
                                            alt="Avatar" className="img-fluid my-5" style={{ width: '80px' }} />
                                        <h5>{loggednUser.data.name}</h5>
                                        <p>Web Designer</p>
                                        <i className="far fa-edit mb-5"></i>
                                    </div>
                                    <div className="col-md-8">
                                        <div className="card-body p-4">
                                            <h6>Information</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>Email</h6>
                                                    <p className="text-muted">{loggednUser.data.email}</p>
                                                </div>
                                            </div>
                                            <h6>logged in info</h6>
                                            <hr className="mt-0 mb-4" />
                                            <div className="row pt-1">
                                                <div className="col-6 mb-3">
                                                    <h6>since</h6>
                                                    <p className="text-muted">{loggednUser.data.created_at}</p>
                                                </div>
                                                <div className="col-6 mb-3">
                                                    <h6>Password</h6>
                                                    <input
                                                        type={showPassword ? "text" : "password"}
                                                        className="form-control"
                                                        id="password"
                                                        name="password"
                                                        value={loggednUser.data.password || ''}
                                                        
                                                    />
                                                    <button
                                                        className="btn btn-outline-secondary"
                                                        type="button"
                                                        onClick={() => setShowPassword(!showPassword)}
                                                    >
                                                        {showPassword ? "Hide" : "Show"}
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="d-flex justify-content-start">
                                                <a href="#!"><i className="fab fa-facebook-f fa-lg me-3"></i></a>
                                                <a href="#!"><i className="fab fa-twitter fa-lg me-3"></i></a>
                                                <a href="#!"><i className="fab fa-instagram fa-lg"></i></a>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}

export default Profile;
