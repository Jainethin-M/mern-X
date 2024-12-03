import React, { useState } from 'react'
import { Link } from "react-router-dom";

import { useMutation } from '@tanstack/react-query';
// import toast from "react-hot-toast";
import { MdOutlineMail } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { MdDriveFileRenameOutline } from "react-icons/md";
import XSvg from "../../components/svgs/X.jsx";
import {baseURL} from '../../constant/url.js';

const Signup = () => {
	

    const [formData , setFormData] = useState({
        email : "",
        username : "",
        fullName : "",
        password : ""
    })
   
	const {mutate : signup , isPending, isError , error} = useMutation({
		mutationFn : async({email, username,fullName,password}) => {
			try {
				const res = await fetch(`${baseURL}/api/auth/signup`,{
					method : "POST",
					credentials : "include",
					headers : {
						"content-Type" : "application/json",
						"Accept" : "application/json"
					},
					body : JSON.stringify({email,username,fullName,password})

				})
				const data = await res.json();

				if(!res.ok){
					throw new Error(data.error || "something went wrong");
				}
				console.log(data)

			} catch (err) {
				console.log(err)
				throw err;
			}
		},
		onSuccess : () => {
			console.log("user created")
		}
	})

    
    const handleSubmit = (e) => {
        e.preventDefault();
        signup(formData)
        
    }
    const handleInputChange = (e) => {
        setFormData({...formData,[e.target.name]: e.target.value});
    }

	
    
  return (
    <div> 
        <div>
		<Link to='/' className='flex justify-center md:justify-start'>
			<XSvg className='px-2 w-12 h-12 rounded-full fill-black hover:bg-red-400' />
                    
		</Link>
		</div>
        <div className='flex-1 flex flex-col justify-center items-center'>
			<form className='lg:w-2/3  mx-auto md:mx-20 flex gap-4 flex-col' 
			onSubmit={handleSubmit}
			>
				{/* <XSvg className='w-24 lg:hidden fill-white' /> */}
				<h1 className='text-4xl font-extrabold text-white'>Join today.</h1>
				<label className='input input-bordered rounded flex items-center gap-2'>
					<MdOutlineMail />
					<input
						type='email'
						className='grow'
						placeholder='Email'
						name='email'
						onChange={handleInputChange}
						value={formData.email}
					/>
				</label>
				<div className='flex gap-4 flex-wrap'>
					<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
						<FaUser />
						<input
							type='text'
							className='grow '
							placeholder='Username'
							name='username'
							onChange={handleInputChange}
							value={formData.username}
						/>
					</label>
					<label className='input input-bordered rounded flex items-center gap-2 flex-1'>
						<MdDriveFileRenameOutline />
						<input
							type='text'
							className='grow'
							placeholder='Full Name'
							name='fullName'
							onChange={handleInputChange}
							value={formData.fullName}
						/>
					</label>
				</div>
				<label className='input input-bordered rounded flex items-center gap-2'>
					<MdPassword />
					<input
						type='password'
						className='grow'
						placeholder='Password'
						name='password'
						onChange={handleInputChange}
						value={formData.password}
					/>
				</label>
				<button className='btn rounded-full btn-primary text-white' type='submit'>
					{isPending ? "Loading..." : "Sign up"}
					
				</button>
				{isError && <p className='text-red-500'>{error.message}</p>}
			</form>
			<div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
				<p className='text-black '>Already have an account?</p>
				<Link to='/login'>
					<button className='btn rounded-full btn-primary text-white btn-outline w-full'>
						Sign in
					</button>
				</Link>
			</div>
		</div>
    </div>
  )
}

export default Signup