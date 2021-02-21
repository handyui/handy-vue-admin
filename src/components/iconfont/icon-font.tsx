import {defineComponent, PropType, unref, computed} from 'vue'
import {createFromIconfontCN} from '@ant-design/icons-vue';
import {isString} from "/@/utils/is";

const MyIconFont = createFromIconfontCN({
    // scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
    // scriptUrl: '//at.alicdn.com/t/font_2184398_zflo1kjcemp.js',
    // iconfont字体图标本地化，详见：/public/iconfont.js
    scriptUrl: '',
});

export default defineComponent({
    name: 'icon-font',
    props: {
        type: {
            type: String as PropType<string>,
            default: ''
        },
        color: {
            type: String as PropType<string>,
            default: 'unset'
        },
        size: {
            type: [Number, String] as PropType<number | string>,
            default: 14
        }
    },
    setup(props, {attrs}) {

        const wrapStyleRef = computed(() => {
            const {color, size} = props

            // const fs = isString(size) ? parseFloat(size as string) : size

            return {
                color,
                fontSize: `${parseInt(size as string)}px`
            }
        })


        return () => (
            <MyIconFont type={props.type || ''} {...attrs} style={unref(wrapStyleRef)}/>
        )
    }
})
