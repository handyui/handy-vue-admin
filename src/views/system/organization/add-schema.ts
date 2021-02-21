import { markRaw } from 'vue'
import { FormSchema } from '/@/components/form/index'
import { getOrganizationTtree } from '/@/api/system'
import { mapTree } from '/@/utils/index'

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
            label: "上级单位",
            field: "parentId",
            value: "",
            props: {
                placeholder: "请选择类型",
                treeDefaultExpandAll: false,
            }, 
            options: async (currentValue, formInstance) => {
                const {result} = await getOrganizationTtree() 
                return mapTree(result[0])['children']
            },
            asyncValue: async (currentValue, formInstance) => { 
                const {parentId} = formInstance?.props.fields as any
                return parentId
            }
        },
        {
            type: "input",
            label: "单位名称",
            field: "orgName",
            value: "",
            props: {
                placeholder: "请输入单位名称"
            },
        },
        {
            type: "input",
            label: "单位编码",
            field: "orgCode",
            value: "",
            props: {
                placeholder: "请输入单位编码"
            },
        },
        {
            type: "input-number",
            label: "排序",
            field: "priority",
            value: 0,
            props: {
                placeholder: 0
            },
        },
    ]
}
