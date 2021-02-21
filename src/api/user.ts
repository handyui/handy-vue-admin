import { request } from '/@/utils/api.request'

export const login = ({loginName, passWord}) => request.post(`/sys/login?loginName=${loginName}&passWord=${passWord}`)

export const logout = (data) => request.get('/sys/logout', data)
