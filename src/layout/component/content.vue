<template>
	<!-- 框架 content 区域 , 路由内容页面 -->
	<div id="content">
		<router-view v-if="routerActive"></router-view>
	</div>
</template>

<script>
	import { computed } from 'vue';
	import { useStore } from "vuex";
	export default {
		setup() {
			const { getters } = useStore();
			const routerActive = computed(() => getters.routerActive)
			return {
				routerActive
			};
		}
	}
</script>


<style lang="scss" scoped>
#content{
	overflow-y: auto;
	height: 100%;
	padding: 0 0 20px 0;
}
</style>