import {FINANCE_GROUP} from '@/services/api'
import {request,METHOD} from '@/utils/request'


export async function getAll(param) {
    return await request(`${FINANCE_GROUP}?${param}`, METHOD.GET)
}

export async function add(param) {
    return await request(`${FINANCE_GROUP}`, METHOD.POST,param)
}

export async function remove(seqNo) {
    return await request(`${FINANCE_GROUP}/${seqNo}`, METHOD.DELETE)
}

export async function get(seqNo) {
    return await request(`${FINANCE_GROUP}/${seqNo}`, METHOD.GET)
}

export async function edit(param) {
    return await request(`${FINANCE_GROUP}`, METHOD.PUT,param)
}

export default {
    getAll,
    add,
    remove,
    get,
    edit
}

