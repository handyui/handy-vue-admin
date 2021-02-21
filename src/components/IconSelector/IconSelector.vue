<template>
  <div :class="prefixCls">
    <a-tabs v-model="currentTab" @change="handleTabChange">
      <a-tab-pane v-for="v in icons" :tab="v.title" :key="v.key">
        <ul>
          <li v-for="(iconItem, key) in v.icons" :key="iconItem.code" :class="{ 'active': selectedIcon==iconItem }" @click="handleSelectedIcon(iconItem)" >
            <icon-font :type="iconItem.code" size="26"></icon-font>
          </li>
        </ul>
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
import {defineComponent} from 'vue'
import {IconFont} from '/@/components/iconfont'
import icons from './icons'

export default defineComponent({
  name: 'IconSelect',
  components:{IconFont},
  props: {
    prefixCls: {
      type: String,
      default: 'ant-pro-icon-selector'
    },
    // eslint-disable-next-line
    value: {
      type: String
    }
  },
  data () {
    return {
      selectedIcon: this.value || '',
      currentTab: 'directional',
      icons
    }
  },
  watch: {
    value (val) {
      this.selectedIcon = val
      this.autoSwitchTab()
    }
  },
  created () {
    if (this.value) {
      this.autoSwitchTab()
    }
  },
  methods: {
    handleSelectedIcon (icon) {
      this.selectedIcon = icon
      this.$emit('change', icon)
    },
    handleTabChange (activeKey) {
      this.currentTab = activeKey
    },
    autoSwitchTab () {
      icons.some(item => item.icons.some(icon => icon === this.value) && (this.currentTab = item.key))
    }
  }
})
</script>

<style lang="scss" scoped>
ul {
  list-style: none;
  padding: 0;
  overflow-y: scroll;
  height: 450px;

  li{
    display: inline-block;
    padding: 0;
    margin: 3px 0;
    border-radius: 4px;
    width: 10%;
    text-align: center;
    &:hover, &.active{
      // box-shadow: 0px 0px 5px 2px @primary-color;
      cursor: pointer;
      color: #fff;
      background-color:gray;
    }
  }
}
</style>
