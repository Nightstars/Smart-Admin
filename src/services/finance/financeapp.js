import {FINANCE_APP} from '@/services/api'
import {request,METHOD} from '@/utils/request'


export async function getAll(param) {
    return await request(`${FINANCE_APP}?${param}`, METHOD.GET)
}

export async function add(param) {
    return await request(`${FINANCE_APP}`, METHOD.POST,param)
}

export async function remove(seqNo) {
    return await request(`${FINANCE_APP}/${seqNo}`, METHOD.DELETE)
}

export async function get(seqNo) {
    return await request(`${FINANCE_APP}/${seqNo}`, METHOD.GET)
}

export async function edit(param) {
    return await request(`${FINANCE_APP}`, METHOD.PUT,param)
}

export default {
    getAll,
    add,
    remove,
    get,
    edit
}

