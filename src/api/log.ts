import { request } from '/@/utils/api.request'

/**-------------------------------日志相关------------------------------- */
/* 业务日志相关日志
{
    "additionalProp1": "string",
    "additionalProp2": "string",
    "additionalProp3": "string"
}
*/
export const getOperationLogPage = (data) => request.post('/sysOperationLog/getOperationLogPage', data)

/* 
查询登录日志列表
 {
  "additionalProp1": "string",
  "additionalProp2": "string",
  "additionalProp3": "string"
}
 */
export const getLogPage = (data) => request.post('/sysLoginLog/getLogPage', data)


