import {markRaw} from 'vue'
import AccessTree from './components/access-tree.vue'
import { FormSchema } from '/@/components/form/index'
import {getRoleAccess} from "/@/api/system"

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
            type: "input",
            label: "角色名称",
            field: "roleName",
            value: '',
            props: {
                placeholder: "请输入角色名称"
            },
            rules: [
                {
                    required: true,
                    message: "角色名称不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "角色编码",
            field: "roleCode",
            value: "",
            props: {
                placeholder: "角色编码"
            },
            rules: [
                {
                    required: true,
                    message: "角色编码不能为空"
                }
            ]
        },
        {
            type: "input-number",
            label: "排序",
            field: "sort",
            value: "",
            props: {
                placeholder: "0"
            },
            rules: [
                {
                    required: true,
                    message: "角色排序不能为空"
                }
            ]
        },
        // {
        //     type: markRaw(AccessTree),
        //     label: "资源",
        //     field: "accessIds",
        //     value: [],
        //     asyncValue: async (currentValue, formInstance) => {
        //         const {id} = formInstance?.props.fields as any
        //         // 获取角色列表
        //         const res = await getRoleAccess(id)
        //         console.log(res)
        //         // 设置角色复选框选项
        //         return res.result.map(item => item.accessId)
        //     }
        // }
    ]
}

