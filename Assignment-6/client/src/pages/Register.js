import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate        = useNavigate();

  const handleChange = e =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', form);
      alert('Registration complete! Please log in.');
      navigate('/login');
    } catch (err) {
      alert(err.response?.data?.msg || 'Server error');
    }
  };

  return (
    <div className="row justify-content-center">
      <div className="col-md-6 col-lg-5">
        <h3 className="mb-4 text-center">Create Account</h3>
        <form onSubmit={handleSubmit} className="card card-body shadow-sm">
          {['name', 'email', 'password'].map(field => (
            <div className="mb-3" key={field}>
              <label className="form-label text-capitalize">{field}</label>
              <input
                name={field}
                type={field === 'password' ? 'password' : field === 'email' ? 'email' : 'text'}
                className="form-control"
                onChange={handleChange}
              />
            </div>
          ))}
          <button className="btn btn-success w-100">Register</button>
        </form>
      </div>
    </div>
  );
}
