import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteUser, getAllUser } from '../store/slice/userSlice';

export default function UserManager() {
    const result= useSelector((data:any)=>{
        return data.user.users;
    })
    const dispatch:any=useDispatch();
    useEffect(()=>{
        dispatch(getAllUser())
    },[])
    
  return (
    <div>
        <h1>Danh sách user</h1>
        <ul>{result.map((u:any, index:number)=>(
            <li key={index}>
                {u.name} <button onClick={()=>dispatch(deleteUser(u.id))}>Xóa</button>
            </li>
        ))}</ul>
    </div>
  )
}
