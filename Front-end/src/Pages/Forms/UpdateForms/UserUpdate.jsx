import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import UserApi from '../../../service/api/UserApi';
import { Usercontext } from '../../../context/AuthProvider';


function UserUpdate() {
    const navigate = useNavigate()
    const { userId } = useParams();
    const { logout, authenticated, loading } = Usercontext()
    const [userData, setUserData] = useState({ name: '', email: '', password: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [errors, setErrors] = useState({});
    const [errMsg, setErrMsg] = useState()

    useEffect(() => {
        if (!authenticated) {
            logout()
            navigate('/login')
        } else {
            const fetchUserData = async () => {
                try {
                    const response = await UserApi.getUserById(userId);
                    setUserData(response.data.data);
                } catch (error) {
                    console.error('Error fetching user data:', error);

                }
            };

            fetchUserData();
        }
    }, [authenticated], [userId])

    if (loading || !authenticated) {
        return <div>Loading...</div>;
    }




    const handleChange = (event) => {
        const { name, value } = event.target;
        setUserData((prevUserData) => ({
            ...prevUserData,
            [name]: value,
        }));
    };
    const validateForm = () => {
        let newErrors = {};
        // Example validation: Name field is required
        if (!userData.name.trim()) {
            newErrors.name = "Name is required";
        }
        // You can add more validation rules here
    
        setErrors(newErrors); // Update the errors state
        return Object.keys(newErrors).length === 0; // Form is valid if there are no errors
    };
    const handleModifier = async (event) => {
        event.preventDefault();
        const isFormValid = validateForm(); // Validate form before submitting
        if (isFormValid) {
            try {
                await UserApi.updateUser(userId, userData); 
                alert('User updated successfully!');
                navigate('/users'); 
                window.location.reload();
            } catch (error) {
                console.error('Error updating user:', error);
                setErrMsg(error.response.data.message)
                alert('Failed to update user.');
            }
        }
    };

    return (
        <div>
            <form onSubmit={handleModifier} className="container mt-5">
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="name"
                        name="name"
                        value={userData.name || ''}

                        onChange={handleChange}
                    />
                </div>
                {errors.name && <div className="invalid-feedback">{errors.name}</div>}

                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        name="email"
                        value={userData.email|| ''}
                        onChange={handleChange}
                        required
                    />

                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <div className="input-group">
                    <input
                            type={showPassword ? "text" : "password"}
                            className="form-control"
                            id="password"
                            name="password"
                            value={userData.password || ''}
                            onChange={handleChange}
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
                <button type="submit" className="btn btn-primary">Modifier</button>
            </form>
            {errMsg && <div>{errMsg}</div>}
        </div>
    );
}

export default UserUpdate;
