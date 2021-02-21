import {markRaw} from 'vue'
import { FormSchema } from '/@/components/form/index'
import IconSelector from './components/iconSelector.vue'
import {getMenulist} from '/@/api/system'

const list2tree = (items, parent = 0) => {
    return items.filter(item => item.parentId == parent).map(item => ({
      title: item.title,
      key: item.menuId,
      children: list2tree(items, item.menuId),
      value: item.menuId
    }))
}

export const addSchema: FormSchema = {
    style: {
        width: "auto"
    },
    formItemLayout: {
        labelCol: {
            span: 4
        },
        wrapperCol: {
            span: 20
        }
    },
    formItem: [
        {
            type: "tree-select",
            label: "上级权限",
            field: "parentId",
            value: "",
            props: {
                placeholder: "请选择上级权限",
                treeDefaultExpandAll: true,
            },
            options: async (currentValue, formInstance) => {
                const menuList = await getMenulist() 
                return list2tree(menuList.result)  // { key: 0, value: '0', title: '无111' }
            },
            asyncValue: async (currentValue, formInstance) => { 
                const {parentId} = formInstance?.props.fields as any
                console.log(parentId)
                return parentId
                // const params = {
                //   "exceptMenuType": null,
                //   "roleIds": [roleId]
                // }
                // // 获取角色列表
                // const res = await getRoleAccess(params)
                // // 设置角色复选框选项
                // return res.result.map(item => item.menuId)
            }
            
        },
        {
            type: "select",
            label: "菜单类型",
            field: "menuType",
            value: undefined,
            props: {
                // disabled: false,
                placeholder: "请选择类型"
            }, /** 菜单类型（catalog:目录，menu:菜单，button:按钮） */
            options:[
                {label:'目录', value:'catalog'},
                {label:'菜单', value:'menu'}
            ],
            rules: [
                {
                    required: true,
                    message: "请选择菜单类型"
                }
            ]
        },
        {
            type: "input",
            label: "名称",
            field: "title",
            value: "",
            props: {
                placeholder: "请输入名称"
            },
            rules: [
                {
                    required: true,
                    message: "名称不能为空"
                }
            ]
        },
         {
            type: "input",
            label: "路由地址",
            field: "menuPath",
            value: "",
            props: {
                placeholder: "请输入路由地址"
            },
            rules: [
                {
                    required: true,
                    message: "请输入路由地址"
                }
            ]
        },
        {
            type: "input",
            label: "菜单编码",
            field: "menuCode",
            value: "",
            props: {
                placeholder: "请输入菜单编码"
            },
            rules: [
                {
                    required: true,
                    message: "请输入菜单编码"
                }
            ]
        },
        {
            type: "input",
            label: "重定向地址",
            field: "redirect",
            value: "",
            props: {
                placeholder: "请输入重定向地址"
            },
        }, 
         {
            type: "input-number",
            label: "排序",
            field: "priority",
            value: "",
            props: {
                placeholder: "0"
            },
        },
        {
            type: markRaw(IconSelector),
            label: "图标",
            field: "icon",
            value: "",
            asyncValue: async (currentValue, formInstance) => {
                const {icon} = formInstance?.props.fields
                return icon
            }
        },
    ]
}
