import {useCreateModal} from "/@/hooks"
import EditModal from './edit-modal.vue'
import AccessModal from './access-modal.vue'
import {TableColumn} from "/@/types/tableColumn"
import {deleteRole} from '/@/api/system'

export const columns: TableColumn[] = [ 
    {
        title: '角色名',
        dataIndex: 'roleName',
    },
    {
        title: '角色编码',
        dataIndex: 'roleCode',
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
        title: '创建者',
        dataIndex: 'createUser',
    },
    {
        title: '操作',
        dataIndex: 'action',
        width: 200,
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
                    await deleteRole(record.roleId)
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
                    fields: record,
                    callback
                })
            },
            {
                type: 'text', // 控制类型，默认为a,可选： select | button | text
                key: 'fileid', // 删除的依据，如果需要根据多个字段删除，则字段之间以英文逗号分隔开，例如： id, name
                text: '关联权限',
                // permission: { // 权限
                //     action: 'update',
                //     effect: 'disabled'
                // },
                props: {
                    type: 'warning'
                },
                func: ({record}, callback) => useCreateModal(AccessModal, {
                    fields: record,
                    callback
                })
            }
        ]
        // scopedSlots: { customRender: 'action' }
    }
]
