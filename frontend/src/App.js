import React from 'react'
import Signup from './pages/auth/signup.js'
import Login from './pages/auth/Login.js'
import HomePage from './pages/home/HomePage.js'
import Sidebar from './components/common/Sidebar.js'
import { Navigate, Route , Routes} from 'react-router-dom'
import RightPanel from './components/common/RightPanel.js'
import NotificationPage from './pages/notifications/NotificationPage.js'
import ProfilePage from './pages/profile/ProfilePage.js'
import { useQuery } from '@tanstack/react-query'
import { baseURL } from './constant/url.js'
import LoadingSpinner from './components/common/LoadingSpinner.js'
// import { Toaster } from 'react-hot-toast'


const App = () => {
	const {data : authUser, isLoading} = useQuery({
		queryKey : ["authUser"],
		queryFn : async() => {
			try {
				const res = await fetch(`${baseURL}/api/auth/me`,{
					method : "GET",
					credentials : 'include',
					headers : {
						"Content-Type" : "application/json",
					}
				})
				const data = await res.json();
				if(data.error){
					return null;					
				}
				if(!res.ok){
					throw new Error(data.error || "something went wrong")
				}
				// console.log(data)
				return data
			} catch (err) {
				throw err;
			}
		},
		// retry : false
	})
	// console.log(authUser)
	if(isLoading){
		return (
			<div className='flex justify-center items-center h-screen'>
				<LoadingSpinner size='lg' />
			</div>
		)
	}
  return (
	<div className="flex min-h-screen">
	{/* Sidebar on the left */}
	{	authUser &&	<Sidebar />}

	{/* HomePage on the right */}
	<Routes>
		<Route path = '/' element = {authUser ? <HomePage/> : <Navigate to="/login"/>} />
		<Route path = '/login' element = {!authUser ? <Login/>: <Navigate to="/"/>} />
		<Route path = '/signup' element = {!authUser ? <Signup/>: <Navigate to="/"/>} />
		<Route path = '/notifications' element = {authUser ? <NotificationPage/>: <Navigate to="/login"/>} />
		<Route path = '/profile/:username' element = {authUser ? <ProfilePage/>: <Navigate to="/login"/>} />
	</Routes>
	{authUser &&<RightPanel />}
    {/* <Toaster /> */}


	</div>
  )
}

export default App