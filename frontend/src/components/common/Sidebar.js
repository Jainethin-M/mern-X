import XSvg from "../svgs/X.jsx";

import { MdHomeFilled } from "react-icons/md";
import { IoNotifications } from "react-icons/io5";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import { BiLogOut } from "react-icons/bi";
// import img from "../../../public/avatar/boy1.png"

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { baseURL } from "../../constant/url.js";
// import toast from "react-hot-toast";

const Sidebar = () => {
	

	const queryClient = useQueryClient();

	const {mutate : logout} = useMutation({
		mutationFn : async ()=> {
			try {
				const res = await fetch(`${baseURL}/api/auth/logout`,{
					method : "POST",
					credentials : "include",
					headers : {
						"Content-Type" : "application/json"
					}
				})
				const data = await res.json();
				if(!res.ok){
					throw new Error(data.error || "something went wrong")
				}
			} catch (err) {
				throw err;
			}
		},
		onSuccess : () => {
			console.log("logout success");
			queryClient.invalidateQueries({
				queryKey : ['authUser']
			})
		}
	})

	const {data : authUser} = useQuery({queryKey : ['authUser']})
	// console.log(`user : ${authUser.email}`)

	return (
		<div className='md:flex-[2_2_0] w-18 max-w-52'>
			<div className='sticky top-0 left-0 h-screen flex flex-col border-r border-gray-700 w-20 md:w-full'>
				<Link to='/' className='flex justify-center md:justify-start'>
					<XSvg className='px-2 w-12 h-12 rounded-full fill-black hover:bg-red-400' />
                    
				</Link>

				<ul className='flex flex-col gap-3 mt-4'>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/'
							className='flex gap-3 items-center hover:bg-red-400 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<MdHomeFilled className='w-8 h-8' />
							<span className='text-lg hidden md:block'>Home</span>
						</Link>
					</li>
					<li className='flex justify-center md:justify-start'>
						<Link
							to='/notifications'
							className='flex gap-3 items-center hover:bg-red-400 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<IoNotifications className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Notifications</span>
						</Link>
					</li>

					<li className='flex justify-center md:justify-start'>
						<Link
							// to={`/profile/${authUser?.username}`}
                            to = '/'
							className='flex gap-3 items-center hover:bg-red-400 transition-all rounded-full duration-300 py-2 pl-2 pr-4 max-w-fit cursor-pointer'
						>
							<FaUser className='w-6 h-6' />
							<span className='text-lg hidden md:block'>Profile</span>
						</Link>
					</li>
				</ul>
				{authUser && (
					<Link
						// to={`/profile/${authUser.username}`}
                        to = '/'
						className='mt-auto mb-10 flex gap-2 items-start transition-all duration-300 hover:bg-red-400 py-2 px-4 rounded-full'
					>
						<div className='avatar hidden md:inline-flex'>
							<div className='w-8 rounded-full'>
								<img src={authUser?.profileImg || 'posts/avatar-placeholder.png'} alt = 'profileimage'/>
							</div>
						</div>
						<div className='flex justify-between flex-1'>
							<div className='hidden md:block'>
								<p className='text-sate-500 font-bold text-sm w-20 truncate'>{authUser.fullName}</p>
								<p className='text-red-500 text-sm'>@{authUser.username}</p>
							</div>
							<BiLogOut
								className='w-5 h-5 cursor-pointer'
								onClick={(e) => {
									e.preventDefault();
									logout();
								}}
							/>
							
						</div>
					</Link>
				)}
			</div>
		</div>
	);
};
export default Sidebar;