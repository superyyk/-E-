<template>
	<view>
		<view class="u-f-dr u-f-jsb p-15 b-s-1 u-f-ac m-8" @tap="login_out" style="background-color: #FFFFFF;">
			<view class="u-f-ac">
				<image :src="getImgsrc('退出.png')" mode="aspectFill" style="width: 30px;height: 30px;"></image>
				<text class="m-l-10">退出登录</text>
			</view>
			<view>
				<image :src="getImgsrc('gengduo.png')" mode="widthFix" style="width: 20px;"></image>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			login_out(){
				uni.showModal({
					title: '提示',
					content: "确认退出登陆吗？",
					success(res) {
						if (res.confirm) {
				
							uni.removeStorage({
								key: 'user_uuid',
								success: function(res) {
									// uni.navigateBack({
									// 	delta:1,
									// 	animationType:'pop-out',
									// 	animationDuration:200
									// })
								 //_self.out()
									console.log("退出成功")
									uni.reLaunch({
										url:'../../index/index'
									})
								}
							})
						}
					}
				})
				
			}
		}
	}
</script>

<style>

</style>
