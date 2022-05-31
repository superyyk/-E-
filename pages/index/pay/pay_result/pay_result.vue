<template>
	<view>
		<view class="p-20 u-f-dc u-f-ajc">
			<image :src="getImgsrc(`${get_order_status_img(status)}`)" mode="aspectFill" style="width: 100px; height: 100px;"></image>
			<text class="p-10">{{get_order_status(status)}}</text>
			<text class="f-s">{{get_order_status_tip(status)}}</text>
		
		<view class="p-10 u-f-dc u-f-ac" style="width: 70%; margin-top: 30px;">
			
			<u-button v-if="status==0" type="success" text="去支付" @click="to_pay"></u-button>
			<u-button v-if="status==1 && user_type==2" type="primary"  text="立即接单" @click="jiedan"></u-button>
			<u-button v-if="status==2 && user_type==0" type="primary"  text="催单" @click="cuidan"></u-button>
			<u-button v-if="status==2 && user_type==2" type="primary"  text="已到达目的地,开始洗车" @click="kaishi"></u-button>
			
				<u-button v-if="status==3 && user_type==2" type="primary"  text="洗车结束" @click="jieshu"></u-button>
			
			<u-button v-if="status==4 && user_type==0" type="warning" icon="star" text="去点评" @click="to_pinglun"></u-button>
			<view class="m-t-10"></view>
			<u-button v-if="status<2" type="primary" :plain="true" :text="user_type==2?'拒绝接单':'取消订单'" @click="cancel_order"></u-button>
			<view style="margin-top: 20px;"></view>
			<u-button type="primary" :plain="true" text="返回首页" @click="to_index"></u-button>
		</view>
		</view>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				status:0,
				order_uuid:0,
				user_uuid:0,
				order_info:'',
				user_type:''
			  
			}
		},
		onLoad(e) {
			this.order_info=JSON.parse(e.order_info) 
			console.log(this.order_info);
			this.status=this.order_info.status
			if(e.type=='send'){
				this.paidan()
			}
			let user_info=uni.getStorageSync('userInfo')
			this.user_type=user_info.fType
			console.log(this.user_type);
			this.user_uuid=this.checkLogin().user_uuid
			
		},
		methods: {
			paidan(){
				_self=this
				uni.request({
					url:this.tp_url+'c_paidan',
					data:{
					    lat:this.order_info.fLat,
						lng:this.order_info.fLgt,
						order_uid:this.order_info.fOrder_uid,
						district:this.order_info.district
					},
					success(res) {
						console.log(res);
						if(res.data.res==200){
							var data={
									order_info:_self.order_info,
								}
							_self.$send_notice(_self.Config.channel,res.data.data,"paidan",JSON.stringify(data))
						}
					}
				})
			},
			to_pay(){
				uni.navigateTo({
					url:'../pay?uid='+this.order_info.fOrder_uid+'&price='+this.order_info.fPrice
				})
			},
			to_pinglun(){
				uni.navigateTo({
					url:'/pages/order/pinglun/pinglun?order_info='+JSON.stringify(this.order_info) 
				})
			},
			cuidan(){
				var data={
						order_info:this.order_info,
					}
				this.$send_notice(this.Config.channel,this.order_info.fWatcher_uuid,"cuidan",JSON.stringify(data))
			},
			kaishi(){
				_self=this
				uni.showModal({
					title:'洗车提示',
					confirmText:'开始洗车',
					content:`注：洗车前务必注意以下几点，方可开始洗车：\n 1.仔细检查车辆外观，如有损伤或掉漆现象请拍照取证，以防止后期不必要麻烦。\n 2. 与客户现场确认车辆无误后并取得洗车服务确认后，方可开始洗车服务。\n 3.洗车过程中务必小心仔细，千万不要损伤客户车辆，否则引起不必要麻烦！`,
					confirmColor:'red',
					success(re) {
						if(re.confirm){
							uni.request({
					url:_self.tp_url+'c_kaishi',
					data:{
						order_uid:_self.order_info.fOrder_uid
					},
					success(res) {
						if(res.data.res==200){
							var data={
									order_info:_self.order_info,
								}
							_self.$send_notice(_self.Config.channel,res.data.data,"xiche",JSON.stringify(data))
							
							uni.showToast({
								title:res.data.msg,
								duration:2000,
								success() {
									uni.switchTab({
										url:'/pages/order/order'
									})
								}
							})
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'error',
								duration:2000
								
							})
						}
					}
				})
							}
							}
						})
				
				
			},
			jieshu(){
				_self=this
				uni.showModal({
					title:'洗车提示',
					confirmText:'完成洗车',
					content:`注：洗车完成后，与客户当场确认，双方无异议后方可离场！`,
					confirmColor:'red',
					success(re) {
						if(re.confirm){
							uni.request({
					url:_self.tp_url+'c_jieshu',
					data:{
						order_uid:_self.order_info.fOrder_uid
					},
					success(res) {
						if(res.data.res==200){
							var data={
									order_info:_self.order_info,
								}
							_self.$send_notice(_self.Config.channel,res.data.data,"jieshu",JSON.stringify(data))
							
							uni.showToast({
								title:res.data.msg,
								duration:2000,
								success() {
									uni.switchTab({
										url:'/pages/order/order'
									})
								}
							})
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'error',
								duration:2000
								
							})
						}
					}
				})
							}
							}
						})
				
				
			},
			
			
			jiedan(){
				_self=this
				uni.showModal({
					title:'订单提示',
					confirmText:'立即接单',
					content:'注：接单成功后，请第一时间电话或信息联系客户确认洗车地点无误后，再上门提供洗车服务！',
					confirmColor:'red',
					success(re) {
						if(re.confirm){
								uni.request({
					url:_self.tp_url+'c_jiedan',
					data:{
						uid:_self.order_info.fOrder_uid,
						user_uuid:_self.user_uuid,
					},
					success(res) {
						if(res.data.res==200){
					
							var data={
									order_info:_self.order_info,
								}
							_self.$send_notice(_self.Config.channel,res.data.data,"jiedan",JSON.stringify(data))
							
							uni.showToast({
								title:res.data.msg,
								duration:3000,
								success() {
									uni.switchTab({
										url:'/pages/order/order'
									})
								}
							})
							
							
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'error',
								duration:3000
							})
						}
					}
				})
							}
							}
							
							})
			
			},
			cancel_order(){
				_self=this
				console.log("取消订单");
				uni.showModal({
					title:'订单提示',
					confirmText:'立即取消',
					content:'是否取消该订单！',
					confirmColor:'red',
					success(re) {
						if(re.confirm){
					uni.request({
					url:_self.tp_url+'c_change_status',
					data:{
						uid:_self.order_info.fOrder_uid,
						status:11,
						
					},
					method:'GET',
					success(res) {
						if(res.data.res==200){
							uni.showToast({
								title:res.data.msg,
								duration:1500
							})
						uni.switchTab({
							url:'/pages/order/order'
						})
						}else{
							uni.showToast({
								title:res.data.msg,
								icon:'none',
								duration:1500
							})
							uni.navigateBack({
								delta:1
							})
						}
					}
				})
						}
					}
				})
	
			},
			to_index(){
			  uni.switchTab({
			  	url:'../../index'
			  })
			}
		}
	}
</script>

<style>

</style>
