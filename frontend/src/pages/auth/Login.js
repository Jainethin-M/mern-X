import React , {useState} from 'react'
import { Link } from 'react-router-dom';
import LoadingSpinner from '../../components/common/LoadingSpinner';

// icons
import { FaUser } from "react-icons/fa";
import { MdPassword } from "react-icons/md";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { baseURL } from '../../constant/url';
import XSvg from "../../components/svgs/X.jsx";

const Login = () => {
    const [formData , setFormData] = useState({
        username : "",       
        password : ""
    })
	// query client
	const queryClient = useQueryClient();
   
	const {mutate : login, isPending ,isError , error} = useMutation({
		mutationFn: async({username , password}) => {
			try {
				const res = await fetch(`${baseURL}/api/auth/login`,{
					method : "POST",
					credentials : "include",
					headers : {
						"Content-Type": "application/json"
					},
					body : JSON.stringify({username , password})
				})
				const data = await res.json();
				if(!res.ok){
					throw new Error(data.Error || "Something went wrong")
				}
			} catch (err) {
				throw err
			}
		},
		onSuccess : () => {
			console.log("success login")
			// refetch the page i.e. reloading the page
			queryClient.invalidateQueries({
				queryKey : ["authUser"]
			})
		}
	})
    
    const handleSubmit = (e) => {
        e.preventDefault();
        login(formData)
        
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
						{isPending ? <LoadingSpinner/> : "Sign in"}
                       
					</button>
					{isError && <p className='text-red-500'>{error.message}</p>}
				</form>
				<div className='flex flex-col lg:w-2/3 gap-2 mt-4'>
					<p className='text-black '>Don't have an account?</p>
					
					<Link to='/signup'>
						<button className='btn rounded-full btn-primary text-white btn-outline w-full'>Sign up</button>
					</Link>
				</div>

			</div>
    </div>
  )
}

export default Login