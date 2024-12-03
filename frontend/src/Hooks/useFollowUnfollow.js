import {baseURL} from '../constant/url.js'
import {useMutation, useQueryClient} from '@tanstack/react-query'



const useFollow = () => {
    const queryClient = useQueryClient();
    const {mutate : follow ,isPending} = useMutation({
        mutationFn : async (userId) => {
            try {
                const res = await fetch(`${baseURL}/api/users/follow/${userId}`,{
                    method : 'POST',
                    credentials : 'include',
                    headers : {
                        "Content-Type" : "application/json"
                    }
                })
                const data = await res.json();
                if(!res.ok){
                    throw new Error(data.error || "Something went wrong")
                }
                return data;
            } catch (err) {
                throw err
            }
        },
        onSuccess : () => {
            Promise.all([
                queryClient.invalidateQueries({queryKey : ['suggestedUsers']}),
                queryClient.invalidateQueries({queryKey : ['authUsers']})
            ])

        },
        onError : (error) =>{
            console.log(error)
        }
    });
    return {follow , isPending}
}

export default useFollow;