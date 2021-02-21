<template>
 <a-card :bordered="false">
    <SearchForm ref="searchForm" :search-validate-form="searchValidateForm" @callback="handleSearch"  />
    <BasicTable ref="tableRef" :columns="columns" :get-list-func="getUserPage" rowKey="userId" :row-selection="rowSelection">
       <template v-slot:title>
        <!-- <a-button v-permission="{ action: 'create', effect: 'disabled' }" @click="addItem" type="primary">
          添加
        </a-button>
        <a-button @click="deleteItems" v-permission="{ action: 'delete' }" :disabled="isDisabled" type="primary">
          删除
        </a-button> -->
        <a-button @click="addItem" type="primary">添加</a-button>
        <a-button @click="deleteItems" :disabled="isDisabled" type="primary">删除</a-button>
        <!-- <a-button @click="deleteItems"  type="primary">导出</a-button> -->
      </template> 
    </BasicTable>
  </a-card>
</template>


<script lang='ts'>
import {defineComponent, onMounted, reactive, toRefs, createVNode, computed, ref} from 'vue'
import {Modal} from 'ant-design-vue'
import {QuestionCircleOutlined} from '@ant-design/icons-vue'
import {BasicTable} from '/@/components/table/index'
import {useCreateModal} from "/@/hooks"
import {deleteUsers, getUserPage} from '/@/api/system'
import {columns} from "./columns"
import AddModal from './add-modal.vue'
import {SearchForm, FormSchema} from '/@/components/form'

export const searchFormSchema = {
    formItem: [
       {
            type: "input",
            label: "用户名",
            field: "account",
            value: '',
            props: {
                placeholder: "请输入用户名"
            },
        },
        {
            type: "input",
            label: "手机号",
            field: "name",
            value: '',
            props: {
                placeholder: "请输入手机号"
            },
        },
        // {
        //   type: "timeRange",
        //   label: "时间",
        //   field: "timeRange",
        //   value: '',
        // }
  ]
}

export default defineComponent({
  components: {
    BasicTable, SearchForm
  },
  setup() {
    const tableRef = ref<any>(null)

    const state = reactive({
      data: [],
      uploading: false,
      tableLoading: false,
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          state.rowSelection.selectedRowKeys = selectedRowKeys;
        },
        selectedRowKeys: []
      },
      queryParam:{
        ipaddr:'aaa',
        loginName:'sss'
      },
      searchValidateForm: searchFormSchema
    })

    const addItem = ()=>{
      useCreateModal(AddModal, {
        type:'add',
        fields: {a:"222222"},
        callback: () => {
          tableRef.value.refreshTableData()
        }
      })
    }
    const deleteItems = ()=>{
      Modal.confirm({
        title: '提示',
        icon: createVNode(QuestionCircleOutlined),
        content: '您确定要删除所有选中吗？',
        onOk: async () => {
          await deleteUsers({userIds: state.rowSelection.selectedRowKeys.toString()})
          tableRef.value.refreshTableData()
          state.rowSelection.selectedRowKeys = []
        }
      })
    }

    const handleSearch = (val) => {
      tableRef.value.refreshTableData(val)
    }

    const isDisabled = computed(() => state.rowSelection.selectedRowKeys.length == 0)

    return {
      ...toRefs(state),
      tableRef,
      columns,
      getUserPage,
      isDisabled,
      addItem,
      deleteItems,
      handleSearch
    }
  }
})
</script>