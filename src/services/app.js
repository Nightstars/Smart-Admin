import {APPS} from '@/services/api'
import {request,METHOD} from '@/utils/request'


 export async function getAll(param) {
    return await request(`${APPS}?${param}`, METHOD.GET)
}

export async function add(param) {
    return await request(`${APPS}`, METHOD.POST,param)
}

export async function remove(seqNo) {
    return await request(`${APPS}/${seqNo}`, METHOD.DELETE)
}

export async function get(seqNo) {
    return await request(`${APPS}/${seqNo}`, METHOD.GET)
}

export async function edit(param) {
    return await request(`${APPS}`, METHOD.PUT,param)
}

export default {
    getAll,
    add,
    remove,
    get,
    edit
}

