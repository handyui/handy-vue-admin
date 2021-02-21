<template>
  <a-card :bordered="false">
    <SearchForm ref="searchForm" :search-validate-form="searchValidateForm" @callback="handleSearch"  />
    <BasicTable ref="tableRef" @expand="expand" :columns="columns" :get-list-func="queryCatalogList"  rowKey="menuId" :query-params="{'menuType': 'catalog'}" :row-selection="rowSelection">
       <template v-slot:title>
        <!-- <a-button v-permission="{ action: 'create', effect: 'disabled' }" @click="addItem" type="primary">
          添加
        </a-button>
        <a-button @click="deleteItems" v-permission="{ action: 'delete' }" :disabled="isDisabled" type="primary">
          删除
        </a-button> -->
        <a-button @click="addItem" type="primary">添加</a-button>
        <a-button @click="deleteItems" :disabled="isDisabled" type="primary">删除</a-button>
      </template> 
      <template v-slot:moduleName="{record}">
        <!-- <button @click="expand($event, record)" >ddd</button> -->
        <!-- <div @click="expand($event, record)" role="button" tabindex="0" class="ant-table-row-expand-icon ant-table-row-collapsed" aria-label="展开行"></div> -->
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
import {deleteUsers, queryCatalogList, queryMenuList} from '/@/api/system'
import {columns} from "./columns"
import AddModal from './add-modal.vue'
import {SearchForm, FormSchema} from '/@/components/form'
// import IconSelectorModal from './iconSelector-modal.vue'

export const searchFormSchema:FormSchema = {
  formItem: [
    {
      type: "select",
      label: "菜单类型",
      field: "menuType",
      value: undefined,
      props: {
          placeholder: "请选择类型"
      },
      options:[
        {label:'目录', value:'catalog'},
        {label:'菜单', value:'menu'}
      ]
    },
    {
        type: "input",
        label: "路由地址",
        field: "menuPath",
        value: "",
        props: {
            placeholder: "请输入路由地址"
        }
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
      expandedRowKeys: [] as string[],
      tableLoading: false,
      rowSelection: {
        onChange: (selectedRowKeys, selectedRows) => {
          state.rowSelection.selectedRowKeys = selectedRowKeys;
        },
        selectedRowKeys: []
      },
      searchValidateForm: searchFormSchema,
      treeData:[]
    })

    const addItem = ()=>{
      useCreateModal(AddModal, {
        type:'add',
        fields: {a:"222222"},
        callback: () => {
          // tableRef.value.refreshTableData()
        }
      })
    }
    const deleteItems = ()=>{
      // console.log(state.rowSelection.selectedRowKeys.toString())
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

    const isDisabled = computed(() => state.rowSelection.selectedRowKeys.length == 0)

    // 点击展开图标
    const expand = async (expanded, record) => {
      console.log('record', record.menuId)
      // 如果是第一次展开
      if (expanded && record.menuType == 'catalog') {
      //   const iconEle = state.itemRefs[record.menuId].parentElement.querySelector('.ant-table-row-expand-icon')
      //  console.log(iconEle)
      //  render(createVNode(LoadingOutlined), iconEle)
      //   await nextTick()
        // iconEle.classList.add('loading-icon')
        const {result} = await queryMenuList({menuId: record.menuId, menuType: 'menu'})
        console.log('result', result)
        record.children = result
        // render(null, iconEle)
        // await nextTick()
        // iconEle.classList.remove('loading-icon')
      }
    }

    // onMounted(()=>{
    //   expand()
    // })

    const handleSearch = (val) => {
      console.log('val', val)
      tableRef.value.refreshTableData(val)
    }

    // const iconselect = () => {
    //   // modal.value.show()
    //   useCreateModal(IconSelectorModal, {
    //     fields: {a:"222222"},
    //     callback: (icon) => {
    //       console.log('icon~~~~~~~~>')
    //       console.log(icon)

    //       // tableRef.value.refreshTableData()
    //     }
    //   })
    // }


  // onMounted(async () => {
  //     // 获取权限资源列表
  //     const {result} = await getAccess()
  //     state.treeData = list2tree(result)
  //     console.log(state.treeData)
  //   })

  //    // 列表转树
  //   const list2tree = (items, parent = -1) => {
  //     return items.filter(item => item.parentId == parent).map(item => ({
  //       // ...item,
  //       title: item.title,
  //       value: item.menuId,
  //       children: list2tree(items, item.menuId)
  //     }))
  //   }


    return {
      ...toRefs(state),
      tableRef,
      columns,
      queryCatalogList,
      isDisabled,
      addItem,
      deleteItems,
      expand,
      handleSearch,
      permissions:[
      ]
      // iconselect
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
