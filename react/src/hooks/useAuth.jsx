import{ useSelector}from "react-redux"
import { selectToken } from "../features/auth/authSlice"
import { jwtDecode } from "jwt-decode"
const useAuth=()=>{
   //const token=localStorage.getItem("token")
   const token=useSelector(selectToken)
   let isAdmin=false
   let isUser=false
   if(token){
     const userDecoded=jwtDecode(token)
     const { _id, firstName, lastName,roles,phone, user_id, email,basket,defaultAddress}=userDecoded
     isAdmin = roles === "admin"
     isUser = roles === "user"
     return  { _id, firstName, lastName,isAdmin,roles,isUser,phone, user_id, email,basket,defaultAddress}
   }
   return{ _id: '', firstName: '', lastName:'',isAdmin,isUser,phone:'', user_id:'', email: '',basket:null,defaultAddress:null,roles:""}

}
export default useAuth