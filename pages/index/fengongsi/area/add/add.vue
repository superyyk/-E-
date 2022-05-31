<template>
	<view>
		<view v-if="info==''">
			暂无代理
		</view>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				type:'',
				item:'',
				info:''
			}
		},
		onLoad(e) {
			this.item=JSON.parse(e.item)
			this.type=e.type
			this.load_daili()
		},
		methods: {
			load_daili(){
				 _self=this
				uni.request({
					url:this.tp_url+"c_load_daili",
					data:{
						name:this.item.name,
						type:this.type,
						user_type:3
					},
					success(res){
						_self.info=res.data
						console.log(res.data);
					},
				})
			}
		}
	}
</script>

<style>

</style>
