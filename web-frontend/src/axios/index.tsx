// export { login } from './login'

import { history } from '../index'
import axios from 'axios'
import { TicketType } from '../Types/ticket'
import { ActivityType } from '../Types/ticket'
import SelectInput from '@mui/material/Select/SelectInput'
// 401: non-auth
export const login = async (user: any) => {
    const instance = axios.create()
    const url =  '/api/login'
    await instance.post(url, user).then(({ data }) => {
  
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
        alert("註冊成功")
        // history.push('/login')
    }).catch((err) => {
        alert("註冊失敗：該信箱已註冊過，請重新嘗試")
        
    })
}


export const logOut = async () => {
    document.cookie.split(";").forEach(function(c) { 
        document.cookie = c.replace(/^ +/, "").replace(/=.*/, "=;expires=" + new Date().toUTCString() + ";path=/"); 
    });
    history.push('/login')
}


export const createActivity = async (activity: any)=>{
    const instance = axios.create()
    const url =  '/api/activities'
    await instance.post(url, activity).then(({ data }) => { 
        alert(`創立活動成功！活動名稱： ${data.activity_name}`)

        history.push('/search-for-activities')
    }).catch((err) => { 
    })
}

export const payOrder = async (order: any, setOpen?:any, SetActualOrder?: any)=>{
    const instance = axios.create()
    const url =  `/api/tickets/${order.ticket_id}`
    await instance.put(url, order).then(async ({ data }) => {  
        alert(`訂單編號：${order.ticket_id}: 付款完成`)
        if(setOpen){
            setOpen(false)
        }
        if(SetActualOrder){
            SetActualOrder(false)
        }
        // history.push('./my-tickets')
        return data
    }).catch((err) => { 
        alert('付款失敗')
    })
}

export const getOrder = async (order_id: string, SetTicketKey: any)=>{
    const instance = axios.create()
    const url =  `/api/orders/${order_id}`
    var break_while = false
    var order_done = false
    function sleep(ms:any) {
        return new Promise((resolve) => setTimeout(resolve, ms))
    }
    var get_cnt = 0
    while(!break_while){
        // eslint-disable-next-line no-loop-func
        await instance.get(url).then(async ({ data }) => {  
            get_cnt+=1
            if(data.msg){
                await sleep(2 * 1000)
            } else {
                break_while =true
                order_done = true
                await SetTicketKey(data.key)
                return data
            }
         }).catch((err) => { 
            return err
        })
        if(get_cnt > 30){
            break_while =true
        }
    }
}


export const createOrder = async (activity: any, SetActualOrder:any , SetTicketKey:any)=>{
    const instance = axios.create()
    const url =  '/api/orders'
    await instance.post(url, activity).then(async ({ data }) => {  
        const order_id = data.order_id
        await getOrder(order_id, SetTicketKey)
        SetActualOrder(true)
        return data
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
            data.reverse()
            setActivities(data)

        }
       
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
            data.reverse()
            setTickets(data)
        }
        return data
    }).catch((err) => { 
        console.log(err)
    }) 
}