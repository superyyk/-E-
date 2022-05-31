<template>
	<view>
		
	</view>
</template>

<script>
	var _self

	export default {
		data() {
			return {
				list:'',
				item:''
			}
		},
		onLoad(e) {
		uni.setNavigationBarTitle({
			title:'开放管理'
		})
		this.item=JSON.parse(e.item)
			this.load_kaifang()
		},
		methods: {
			load_kaifang(){
				_self=this
				uni.request({
					url:this.tp_url+'c_shen_kaifang',
					data:{
						value:this.item.name,
						type:0
					},
					success(res) {
						console.log();
					}
					
				})
			}
		}
	}
</script>

<style>

</style>
