<template>
	<view>
		<view v-if="list.length==0">
			<u-empty
			        mode="message"
			        icon="http://cdn.uviewui.com/uview/empty/message.png"
			>
			</u-empty>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				list:[]
			}
		},
		onLoad() {
		uni.setNavigationBarTitle({
			title:'系统消息'
		})	
		},
		methods: {
			
		}
	}
</script>

<style>

</style>
