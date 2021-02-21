import {markRaw} from 'vue'
import { FormSchema } from '/@/components/form/index'
import {getAllDictionaryList} from '/@/api/system'

const list2tree = (items, parent=null) => {
    return items.filter(item => item.parentCode == parent).map(item => ({
      title: item.dicValue,
      key: item.dicCode,
      children: list2tree(items, item.dicCode),
      value: item.dicCode
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
            label: "父字典项ID",
            field: "parentCode",
            value: "",
            props: {
                // disabled: false,
                placeholder: "请选择类型",
                treeDefaultExpandAll: false,
            }, 
            options: async (currentValue, formInstance) => {
                const {result} = await getAllDictionaryList({}) 
                return list2tree(result) 
            },
            asyncValue: async (currentValue, formInstance) => { 
                const {parentCode} = formInstance?.props.fields as any
                return parentCode
            }
        },
        {
            type: "input",
            label: "字典值",
            field: "dicValue",
            value: "",
            props: {
                placeholder: "请输入字典值"
            },
        },
        {
            type: "input",
            label: "字典键",
            field: "dicCode",
            value: "",
            props: {
                placeholder: "请输入字典键"
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
    ]
}
