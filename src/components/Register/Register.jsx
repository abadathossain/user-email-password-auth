import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import auth from './../../firebase/firebase.config';
import { createUserWithEmailAndPassword, sendEmailVerification } from 'firebase/auth';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function Register() {
    const [regError, setRegError]=useState('')
    const [success, setSuccess]=useState('')
    const [showPass, setShowPass]=useState(false)

    const handleRegister=e=>{
        e.preventDefault()
        const name=e.target.name.value
        const email=e.target.email.value
        const password=e.target.password.value
        const accepted=e.target.terms.checked
        console.log(name, email, password)
        setRegError('')
        setSuccess('')
        if(password.length < 6){
            setRegError('Please 6 Character')
            return
        }else if(!accepted){
            setRegError('Not accepted terms and condition')
        }

        createUserWithEmailAndPassword(auth, email,password)
        .then(result =>{
            const loggedUser=result.user
            console.log(loggedUser)
            setSuccess('Successfull')

            // email verification
            sendEmailVerification(loggedUser)
            .then(()=>{
                alert('please verify your email')
            })
        })
        .catch(error=>{
            console.log(error.message)
            setRegError(error.message)
        })
    }
  return (
    <div>
        <h5 className='text-4xl font-bold text-center'>Please Register</h5>
        <div className="">
            <div className="mx-auto md:w-1/2">
                <h2 className="text-3xl mb-8">Please Register</h2>
                <form onSubmit={handleRegister}>
                    <input className="mb-4 w-full  py-2 px-4" type="text" name="name" placeholder="Your Name" id="" required />
                    <br />
                    <input className="mb-4 w-full  py-2 px-4" type="email" name="email" placeholder="Email Address" id="" required />
                    <br />
                    <div className="mb-4 relative border">
                        <input
                            className="w-full py-2 px-4"
                            type={showPass?'text':'password'}                          
                            name='password'
                            placeholder="Password"
                            id="" required />
                        <span onClick={()=>setShowPass(!showPass)} className="absolute top-3 right-2">
                        {
                            showPass? <FaEyeSlash />:<FaEye />
                        }

                        </span>
                    </div>
                    <br />
                    <div className="mb-2">
                        <input type="checkbox" name="terms" id="terms" />
                        <label className="ml-2" htmlFor="terms">Accept our <a href="">Terms and Conditions</a></label>
                    </div>
                    <br />
                    <input className="btn btn-secondary mb-4 w-full" type="submit" value="Register" />

                </form>
                {
                    success && <p className='text-red-600 text-4xl'>{success}</p>
                }
                {
                    regError && <p className='text-red-600 text-4xl'>{regError}</p>
                }
                
                <p>Already have an account? Please <Link to="/login">Login</Link></p>
            </div>
        </div>
    </div>
  )
}
