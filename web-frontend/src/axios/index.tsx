// export { login } from './login'

import { history } from '../index'
import axios from 'axios'
import { TicketType } from '../Types/ticket'
import { ActivityType } from '../Types/ticket'
// 401: non-auth
export const login = async (user: any) => {
    const instance = axios.create()
    const url =  '/api/login'
    await instance.post(url, user).then(({ data }) => {
        console.log(document.cookie)
        if(document.cookie){
            history.push({
                pathname:`/search-for-activities`, 
                state:{
                  'user-cookie':document.cookie,
                }
              })
        } 
    }).catch((err) => { 
        if (err.response.status === 401){
            alert("Non-Authentication");
        }
    })
}


export const signUp = async (user: any)=>{
    const instance = axios.create()
    const url =  '/api/signup'
    await instance.post(url, user).then(({ data }) => {  
        console.log(data)

    }).catch((err) => {
        alert("系統異常，請稍後再試")
        
    })
}

export const createActivity = async (activity: any)=>{
    const instance = axios.create()
    const url =  '/api/activities'
    await instance.post(url, activity).then(({ data }) => { 
        alert(`創立活動成功！活動編號： ${data.activity_id}`)
        history.push('/search-for-activities')
    }).catch((err) => { 
    })
}

export const createOrder = async (activity: any)=>{
    const instance = axios.create()
    const url =  '/api/orders'
    await instance.post(url, activity).then(({ data }) => {  
        
    }).catch((err) => { 
    })
}

// {activity_id: 'test', 
//  has_paid: '0', member: 'abc12345@ntu.edu.tw', order_timestamp: '2022-06-04 07:53:20'}
//




  

export const getAllActivities = async (setActivities?:any)=>{
    const instance = axios.create()
    const url =  '/api/activities'
    await instance.get<ActivityType[]>(url).then(({ data }) => {  
      
        if(setActivities){
            setActivities(data)
        }
        console.log('setActivities')
        return data
    }).catch((err) => { 
        console.log(err)
    })
}
export const getAllTicketsByUser = async (setTickets?:any)  => {
    const instance = axios.create()
    const url =  '/api/tickets'
    await instance.get<TicketType[]>(url).then(({ data }) => {  
       
        if(setTickets){
            setTickets(data)
        }
        console.log('setTickets')
        return data
    }).catch((err) => { 
        console.log(err)
    }) 
}