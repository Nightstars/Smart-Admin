import {APPS} from '@/services/api'
import {request,METHOD} from '@/utils/request'


 export async function getAll(param) {
     console.log(`${APPS}?${param}`)
    return await request(`${APPS}?${param}`, METHOD.GET)
}

export async function add(param) {
    return await request(`${APPS}`, METHOD.POST,param)
}

export default {
    getAll,
    add
}

