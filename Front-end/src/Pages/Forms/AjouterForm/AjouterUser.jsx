import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Usercontext } from '../../../context/AuthProvider';
import UserApi from '../../../service/api/UserApi';

function AjouterUser() {
    const navigate = useNavigate()

  const { user, logout, authenticated, loading } = Usercontext()
 
  useEffect(() => {
    if (!authenticated) {
      logout()
      navigate('/login')
    }
  }, [authenticated])
  if (loading || !authenticated) {
    return <div>Loading...</div>;
  }
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
      });
      const [errors, setErrors] = useState({});
      const [showPassword, setShowPassword] = useState(false);
    
      const validateForm = () => {
        let formIsValid = true;
        let errors = {};
    
        if (!formData.name.trim()) {
          errors.name = "Name is required";
          formIsValid = false;
        }
    
        if (formData.password.length <= 6) {
          errors.password = "Password must be more than 6 characters";
          formIsValid = false;
        }
    
        setErrors(errors);
        return formIsValid;
      };
    
      const handleChange = (e) => {
        setFormData({
          ...formData,
          [e.target.name]: e.target.value,
        });
      };
    
      const handleSubmit = (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const response=UserApi.Ajouter_User(formData);
                // console.log('////');
                // console.log(response);
                // console.log('////');
                // console.log(formData); // Use the response as needed
                alert("Form is valid and ready to be submitted!");
                navigate('/users')
            } catch(error) {
                console.log(error);
            }
        } else {
            alert("Form contains errors.");
        }
      };

  return (
    <form onSubmit={handleSubmit} className="container mt-5">
      <div className="mb-3">
        <label htmlFor="name" className="form-label">Name</label>
        <input
          type="text"
          className={`form-control ${errors.name ? 'is-invalid' : ''}`}
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        {errors.name && <div className="invalid-feedback">{errors.name}</div>}
      </div>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email address</label>
        <input
          type="email"
          className={`form-control ${errors.email ? 'is-invalid' : ''}`}

          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        {errors.email && <div className="invalid-feedback">{errors.email}</div>}

      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">Password</label>
        <div className="input-group">
          <input
            type={showPassword ? "text" : "password"}
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          <button 
            className="btn btn-outline-secondary" 
            type="button" 
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>
      </div>
      <button type="submit" className="btn btn-primary">Submit</button>
    </form>
  );
}

export default AjouterUser;
