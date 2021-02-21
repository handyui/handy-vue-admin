import {useCreateModal} from "/@/hooks"
import EditModal from './edit-modal.vue'
import {deleteMenu} from "/@/api/system"
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
        title: '名称',
        dataIndex: 'title',
        slots: {
            customRender: 'moduleName'
        }
    },
    {
        title: 'url地址',
        dataIndex: 'menuPath',
    },
    {
        title: 'icon',
        dataIndex: 'icon',
    },
    {
        title: '排序',
        dataIndex: 'priority',
    },
    {
        title: '按钮类型',
        dataIndex: 'menuType',
        customRender: (val) =>  val.text == 'catalog'? '目录':'菜单'
    },
//     {
// //         "roleId": "1,2",
// // "roles": null,
//         title: '所属角色',
//         dataIndex: 'roleId',
//         slots: {
//             customRender: 'roleId'
//         },
//         slotsType: 'format',
//         slotsFunc: (roles) => roles?.map(it => it.title).join(', ')
//     },
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
        title: '更新时间',
        dataIndex: 'updateTime',
        slots: {
            customRender: 'updateTime'
        },
        slotsType: 'format',
        slotsFunc: (val) => val
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
                type: 'popconfirm', // 控制类型，默认为a,可选： select | button | text | link
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
                    await deleteMenu(record.menuId)
                    callback()
                },
            },
            {
                type: 'text', // 控制类型，默认为a,可选： select | button | text | link
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
