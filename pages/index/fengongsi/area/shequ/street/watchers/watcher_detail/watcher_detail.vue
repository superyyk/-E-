<template>
	<view>
		<view>{{user_info.fTel}}</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				user_info:'',
				user_type:0
			}
		},
		onLoad(e) {
		uni.setNavigationBarTitle({
			title:'洗车工人详细信息'
		})	
		this.user_info=JSON.parse(e.item)
		console.log(this.user_info);
		this.load_user_info()
		},
		methods: {
			load_user_info(){
				_self=this
				console.log(this.user_uuid);
				this.user_info=''
				uni.request({
					url:this.tp_url+'c_load_user_info',
					data:{
						user_uuid:this.user_uuid
					},
					header:{
						
					'content-type': 'application/x-www-form-urlencoded' 
					},
				    method:'GET',
					success(res){
						if(res.data.res==200){
							var r=res.data.data
							console.log(r.order_num);
							_self.user_info=r.user_info
							_self.user_type=r.user_info.fType
							uni.setStorageSync('userInfo',_self.user_info)
							console.log(_self.address_info);
							
					
				
					}
					}
				})
			},
		}
	}
</script>

<style>

</style>
