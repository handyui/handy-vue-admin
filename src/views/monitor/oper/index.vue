<template>
  <a-card :bordered="false">
    <SearchForm ref="searchForm" :search-validate-form="searchValidateForm" @callback="handleSearch"  />
    <BasicTable ref="tableRef"  :columns="columns" :get-list-func="getOperationLogPage" rowKey="operationLogId" >
      <template v-slot:moduleName="{record}">
       <span :ref="el => itemRefs[record.menuId] = el">
          {{ record.title || record.name }}
        </span> 
      </template>
    </BasicTable>
  </a-card>
</template>

<script lang='ts'>
import {defineComponent, onMounted, reactive, toRefs,  createVNode, render, nextTick, computed, ref} from 'vue'
import {Modal} from 'ant-design-vue'
import {QuestionCircleOutlined, LoadingOutlined} from '@ant-design/icons-vue'
import {BasicTable} from '/@/components/table/index'
import {useCreateModal} from "/@/hooks"
import {getOperationLogPage} from '/@/api/system'
import {columns} from "./columns"
import {SearchForm, FormSchema} from '/@/components/form'

export const searchFormSchema:FormSchema = {
  formItem: [
    {
      type: "input",
      label: "登录名称",
      field: "userName",
      value: '',
      props: {
          placeholder: "请输入登录名称"
      },
    },
    {
      type: "input",
      label: "登录账号",
      field: "account",
      value: '',
      props: {
          placeholder: "请输入登录账号"
      },
    },
    {
      type: "timeRange",
      label: "时间",
      field: "timeRange",
      value: '',
    }
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
      itemRefs: {},
      uploading: false,
      tableLoading: false,
      searchValidateForm: searchFormSchema
    })

    const handleSearch = (val) => {
      tableRef.value.refreshTableData(val)
    }

    return {
      ...toRefs(state),
      tableRef,
      columns,
      getOperationLogPage,
      handleSearch
    }
  }
})
</script>

<style lang="scss">
.loading-icon {
  border: none;
  &.ant-table-row-expanded::after {
    content: none;
  }
}
</style>
