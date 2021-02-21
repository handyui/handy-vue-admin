import {useCreateModal} from "/@/hooks"
import EditModal from './edit-modal.vue'
import {deleteUser} from "/@/api/system"
import {TableColumn} from "/@/types/tableColumn"

export const columns: TableColumn[] = [ 
    // {
    //     title: '序号',
    //     dataIndex: 'updatedAt',
    //     slots: {
    //         customRender: 'updatedAt'
    //     },
    //     slotsType: 'format',
    //     slotsFunc: (val) => val
    // },
    {
        title: '用户名',
        dataIndex: 'account',
    },
    {
        title: '姓名',
        dataIndex: 'name',
    },
    {
        title: '手机号',
        dataIndex: 'phone',
    },
    {
        title: '邮箱',
        dataIndex: 'email',
    },
    {
        title: '状态',
        dataIndex: 'status',
        customRender: (val) =>  val.text == 1 ? '正常':'不可用'
    },
    {
        title: '创建时间',
        dataIndex: 'createTime',
        slots: {
            customRender: 'createTime'
        },
        slotsType: 'format',
        slotsFunc: (val) => val
    },
   
    {
        title: '操作',
        dataIndex: 'action',
        width: 150,
        // fixed: 'right',
        slots: {
            customRender: 'action'
        },
        actions: [
            {
                type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text
                key: 'fileid', // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
                text: '删除',
                permission: { // 权限
                    action: 'delete',
                    effect: 'disabled'
                },
                props: {
                    type: 'danger'
                },
                func: async ({record}, callback) => {
                    await deleteUser({userId:record.userId})
                    callback()
                },
            },
            {
                type: 'text', // 控制类型，默认为a,可选： select | button | text
                key: 'fileid', // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
                text: '编辑',
                // permission: { // 权限
                //     action: 'update',
                //     effect: 'disabled'
                // },
                props: {
                    type: 'warning'
                },
                func: ({record}, callback) => useCreateModal(EditModal, {
                    type:'edit',
                    fields: record,
                    callback
                })
            }
        ]
        // scopedSlots: { customRender: 'action' }
    }
]
