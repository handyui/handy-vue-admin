// import {get} from '@/utils/request'

// //左侧菜单
// export const getMenuList = () => {
//   return get('/static/menuList.json')
// }

// //菜单管理列表
// export const getList = () => {
//   return get('/static/list.json')
// }
import { request } from '/@/utils/api.request'

// 左侧菜单
// export const getMenuList = (data) => request.post('/sys/menus', data)


/* 新增菜单
{
  "component": "string",
  "hidden": "string",
  "icon": "string",
  "menuPath": "string",
  "menuType": "string",
  "name": "string",
  "noCache": "string",
  "parentId": 0,
  "priority": 0,
  "redirect": "string",
  "status": "string",
  "title": "string"
}
*/
export const addMenu = (data) => request.post('/menu/add', data)

// 修改菜单
export const updateMenu = (data) => request.post('/menu/update', data)

// 删除菜单
export const deleteMenu = (menuId) => request.get(`/menu/delete/${menuId}`)

// 查询菜单详情
export const getMenuDetail = (menuId) => request.get(`/menu/detail/${menuId}`)