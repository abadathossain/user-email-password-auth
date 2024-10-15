import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import auth from '../../firebase/firebase.config';

export default function Login() {
  const [regError, setRegError]=useState('')
    const [success, setSuccess]=useState('')

 const handleLogin = e => {
        e.preventDefault();
        const email = e.target.email.value;
        const password = e.target.password.value;
        console.log(email, password);

        setRegError('')
        setSuccess('')

        signInWithEmailAndPassword(auth, email, password)
        .then(result=>{
          const loggedUser=result.user
          console.log(loggedUser)
          setRegError('successfully login')
        })
        .catch(error=>{
          console.log(error)
          setRegError(error.message)

        }
          )

  }

  return (
    <div className="hero min-h-screen bg-base-200">
      <div className="hero-content flex-col lg:flex-row-reverse">
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Login now!</h1>
          <p className="py-6">Provident cupiditate voluptatem et in. Quaerat fugiat ut assumenda excepturi exercitationem quasi. In deleniti eaque aut repudiandae et a id nisi.</p>
        </div>
        <div className="card flex-shrink-0 w-full max-w-sm shadow-2xl bg-base-100">
          <div className="card-body">
            <form onSubmit={handleLogin}>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Email</span>
                </label>
                <input
                  type="text"
                  name="email"

                  placeholder="email"
                  className="input input-bordered" />
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Password</span>
                </label>
                <input type="password" name="password" placeholder="password" className="input input-bordered" />
                <label className="label">
                  <a href="#" className="label-text-alt link link-hover">Forgot password?</a>
                </label>
              </div>
              <div className="form-control mt-6">
                <button className="btn btn-primary">Login</button>
              </div>
            </form>
            {
              success && <p>{success}</p>
            }
            {
              regError && <p>{regError}</p>
            }

            <p>New to this website? Please <Link to="/register">Register</Link></p>
          </div>
        </div>
      </div>
    </div>
  )
}
