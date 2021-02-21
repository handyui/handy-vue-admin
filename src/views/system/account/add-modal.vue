<template>
  <a-modal
      title="新增账号"
      v-model:visible="visible"
      :confirm-loading="confirmLoading"
      :afterClose="remove"
      @ok="handleOk"
  >
  <SchemaForm ref="dynamicForm" :dynamic-validate-form="dynamicValidateForm" />
  </a-modal>
</template>

<script lang="ts">
import {defineComponent, reactive, toRefs, onMounted, ref} from 'vue'
import {Modal} from 'ant-design-vue'
import {useAsync} from "/@/hooks"
import {SchemaForm} from '/@/components/JSON-schema-form/index'
import { BasicForm, FormSchema } from '/@/components/form/index'
import { getRolePage, saveUser, getOrganizationTtree } from "/@/api/system"
import {mapTree} from '/@/utils/index'

export const addSchema:FormSchema = {
    formItem: [
        {
            type: "input",
            label: "用户名",
            field: "account",
            value: '',
            props: {
                placeholder: "请输入用户名"
            },
            rules: [
                {
                    required: true,
                    message: "用户名不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "密码",
            field: "password",
            value: "",
            props: {
                type: 'password',
                placeholder: "请输入密码"
            },
            rules: [
                {
                    "required": true,
                    "message": "密码不能为空"
                }
            ]
        },
        {
            type: "input",
            label: "姓名",
            field: "name",
            value: '',
            props: {
                placeholder: "请输入姓名"
            }
        },
        {
            type: "radio",
            label: "性别",
            field: "sex",
            value: '',
            options:[
                {value:'M', label:'男'},
                {value:'F', label:'女'}
            ]
        },
        {
            type: "input",
            label: "手机号",
            field: "phone",
            value: '',
            props: {
                placeholder: "请输入手机号"
            }
        },
        {
            type: "input",
            label: "邮箱",
            field: "email",
            value: '',
            props: {
                placeholder: "请输入邮箱"
            }
        },
        {
            type: "tree-select",
            label: "单位",
            field: "organizationId",
            value: undefined,
            props: {
                placeholder: "请选择单位",
                treeDefaultExpandAll: false,
            },
            options: async (currentValue, formInstance) => {
                const {result} = await getOrganizationTtree() 
                return mapTree(result[0])['children']
            },
            // asyncValue: async (currentValue, formInstance) => { 
            //     const {parentId} = formInstance?.props.fields as any
            //     console.log(parentId)
            //     return parentId
            //     // const params = {
            //     //   "exceptMenuType": null,
            //     //   "roleIds": [roleId]
            //     // }
            //     // // 获取角色列表
            //     // const res = await getRoleAccess(params)
            //     // // 设置角色复选框选项
            //     // return res.result.map(item => item.menuId)
            // }
        },
        {
            type: "checkbox",
            label: "角色",
            field: "roleId",
            value: [],
            loading: true,
            asyncOptions: async () => {
               // 获取角色列表
                const {result} = await getRolePage({"current": 1, "size": 50})
                return result.records.map(item => ({
                    label: item.roleName,
                    value: item.roleId
                }))
            }
        },
        {
            type: "switch",
            label: "状态",
            field: "status",
            value: '',
            props: {
                placeholder: "请输入手机号"
            }
        },
    ]
}

export default defineComponent({
  name: "add-modal",
  components: { [Modal.name]: Modal, SchemaForm},
  props: {
    remove: { // 移除模态框
      type: Function
    },
    callback: {
      type: Function
    }
  },
  setup(props) {
    const dynamicForm = ref<any>(null)

    const state = reactive({
      visible: true,
      confirmLoading: false,
      dynamicValidateForm: addSchema
    })

    const handleOk = () => {
      state.confirmLoading = true;
      dynamicForm.value.validate()
          .then( async res => {
            const {status, roleId} = dynamicForm.value.modelRef
            console.log('status', status)
            const param = {
                ...dynamicForm.value.modelRef,
                roleId: roleId.toString(),
                status: status?'y':'n'
            }
            await useAsync(saveUser(param), {ref: state, loadingName: 'confirmLoading'})
            state.visible = false;
            props.callback && props.callback()
          })
          .catch(err => {
            console.log('error', err);
            state.confirmLoading = false
          });
    }

    return {
      ...toRefs(state),
      handleOk,
      dynamicForm,
    }
  }
})
</script>

<style scoped>
</style>
