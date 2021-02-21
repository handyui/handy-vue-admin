import { request } from '/@/utils/api.request'

/**-------------------------------用户------------------------------- */
// 查询用户列表
export const getUserPage = (data:any) => request.post('/sysUser/getUserPage', data)

// 新增用户
export const saveUser = (data:any) => request.post('/sysUser/saveUser', data)

// 修改用户信息
// {
//     "account": "string",
//     "avatar": "string",
//     "birthday": "2020-12-04T08:50:39.189Z",
//     "createTime": "2020-12-04T08:50:39.189Z",
//     "createUser": "string",
//     "email": "string",
//     "isDisable": "string",
//     "menuList": [
//       {
//         "component": "string",
//         "createTime": "2020-12-04T08:50:39.189Z",
//         "createUser": "string",
//         "hidden": "string",
//         "icon": "string",
//         "isDisable": "string",
//         "menuId": 0,
//         "menuLevel": 0,
//         "menuPath": "string",
//         "menuType": "string",
//         "name": "string",
//         "noCache": "string",
//         "parentId": 0,
//         "priority": 0,
//         "redirect": "string",
//         "status": "string",
//         "title": "string",
//         "updateTime": "2020-12-04T08:50:39.189Z",
//         "updateUser": "string",
//         "version": 0
//       }
//     ],
//     "name": "string",
//     "organizationId": "string",
//     "organizationName": "string",
//     "password": "string",
//     "phone": "string",
//     "roleId": "string",
//     "roles": [
//       {
//         "createTime": "2020-12-04T08:50:39.190Z",
//         "createUser": "string",
//         "isDisable": "string",
//         "roleCode": "string",
//         "roleId": "string",
//         "roleName": "string",
//         "sort": 0,
//         "updateTime": "2020-12-04T08:50:39.190Z",
//         "updateUser": "string",
//         "version": 0
//       }
//     ],
//     "salt": "string",
//     "sex": "string",
//     "status": "string",
//     "updateTime": "2020-12-04T08:50:39.190Z",
//     "updateUser": "string",
//     "userId": "string",
//     "version": 0
//   }
export const updateUser = (data:any) => request.post('/sysUser/updateUser', data)

// 根据id查询用户信息
export const getUser = (data:any) => request.get('/sysUser/getUser', data)

// 删除用户信息
export const deleteUser = (data:any) => request.get('/sysUser/deleteUser', data)

// 批量删除用户信息
export const deleteUsers = (data:any) => request.get('/sysUser/deleteUsers', data)

// 根据token查询用户和权限信息
export const getUserAndRole = (data:any) => request.get('/sysUser/getUserAndRole', data) 

/**-------------------------------角色------------------------------- */
// 删除角色信息
export const deleteRole = (data:any) => request.get('/sysRole/deleteRole', data)

// 批量删除角色信息
export const deleteRoles = (data:any) => request.post(`/sysRole/deleteRoles?RoleIds=${data}`)

// 根据id查询角色信息
export const getRole = (data:any) => request.get('/sysRole/getRole', data)

// 查询角色列表
// {
//     "createTime": "2020-12-04T08:54:33.626Z",
//     "createUser": "string",
//     "isDisable": "string",
//     "roleCode": "string",
//     "roleId": "string",
//     "roleName": "string",
//     "sort": 0,
//     "updateTime": "2020-12-04T08:54:33.626Z",
//     "updateUser": "string",
//     "version": 0
//   }
export const getRolePage = (data:any) => request.post('/sysRole/getRolePage', data)

// 新增角色
export const saveRole = (data:any) => request.post('/sysRole/saveRole', data)

// 修改角色信息
export const updateRole = (data:any) => request.post('/sysRole/updateRole', data)

/** 重置角色关联的菜单列表
 * {
  "menuIds": [
    "string"
  ],
  "roleId": "string"
}
 */
export const resetRoleMenu = (data:any) => request.post('/roleMenu/reset', data)


/**-------------------------------菜单------------------------------- */
// 新增菜单
export const addMenu = (data:any) => request.post('/menu/add', data)

// 修改菜单
export const updateMenu = (data:any) => request.post('/menu/update', data)

// 删除菜单
export const deleteMenu = (menuId) => request.get(`/menu/delete/${menuId}`)

// 查询菜单详情
export const getMenu = (menuId) => request.get(`/menu/detail/${menuId}`)


/* 分页查询菜单
{
  "component": "",
  "current": 1,
  "isDisable": "",
  "menuPath": "",
  "menuType": "menu", 
  "name": "",
  "redirect": "",
  "size": 5,
  "title": ""
}
菜单类型（catalog:目录，menu:菜单，button:按钮）
*/
export const queryCatalogList = (data:any) => request.post('/menu/queryPage', data)

// 查询子菜单
export const queryMenuList = (data:any) => request.get('/menu/queryMenu', data)

// 查询全部菜单权限
export const getMenulist = (data:any) => request.post('/menu/getMenulist', data)

// 根据角色ID列表查询菜单
export const getRoleAccess = (data:any) => request.post('/menu/queryByRoleIds', data)

/**-------------------------------字典------------------------------- */
/* 查询字典项详情
{
    "dicCode": "string",
    "dicValue": "string",
    "isDisable": "string",
    "parentCode": "string",
    "priority": 0
}
*/
export const getDictionaryDetail = (id) => request.get(`/dictionary/detail/${id}`)

// 按条件查询字典项
export const getAllDictionaryList = (data:any) => request.post('/dictionary/list', data)

/* 新增字典项
{
    "dicCode": "string",
    "dicValue": "string",
    "parentCode": "string",
    "priority": 0
  }
*/
export const addDictionary = (data:any) => request.post('/dictionary/add', data)

// 修改字典项
export const updateDictionary = (data:any) => request.post('/dictionary/update', data)

// 删除字典项
export const deleteDictionary = (id) => request.get(`/dictionary/delete/${id}`)

// 字典分页
export const getDictionaryList = (data:any) => request.post('/dictionary/queryPage', data)

// 查询字典根列表
export const getDictionaryRoots = (data:any) => request.get('/dictionary/roots', data)


/**-------------------------------日志------------------------------- */
/* 查询操作日志列表
{
  "account": "string",
  "current": 0,
  "endDate": "string",
  "size": 0,
  "startDate": "string",
  "userName": "string"
}
*/
export const getOperationLogPage = (data:any) => request.post('/sysOperationLog/getOperationLogPage', data)


/* 查询登录日志列表
{
  "account": "string",
  "current": 0,
  "endDate": "string",
  "size": 0,
  "startDate": "string",
  "userName": "string"
}*/
export const getLogPage = (data:any) => request.post('/sysLoginLog/getLogPage', data)


/**-------------------------------单位------------------------------- */

// 获取单位树
export const getOrganizationTtree = (data:any) => request.get('/sysOrganization/treeAll', data)

// 按条件分页查询单位
export const getOrganizationList = (data:any) => request.post('/sysOrganization/query', data)

// 新增单位
export const addOrganization = (data:any) => request.post('/sysOrganization/add', data)

// 修改单位
export const updateOrganization = (data:any) => request.post('/sysOrganization/update', data)

// 删除单位
export const deleteOrganization = (id:number) => request.get(`/sysOrganization/delete/${id}`)

// 批量删除单位
export const deleteOrgList = (data:any) => request.get('/sysOrganization/deleteOrgList', data)