<template>
	<view>
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				order_info:''
			}
		},
		onLoad(e) {
		uni.setNavigationBarTitle({
			title:'服务点评'
		})	
		this.order_info=JSON.parse(e.order_info)
		console.log(this.order_info);
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
