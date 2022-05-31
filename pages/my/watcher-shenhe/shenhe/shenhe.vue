<template>
	<view>
		<view class="u-f-dc u-f-ajc">
			<view> 
			<image :src="user_info.fUser_head" mode="aspectFill" style="width: 55px; height: 55px; border-radius: 50px;"></image>
			</view>
			<view>上传用户:{{user_info.fUser_name}}</view>
			<view class="u-f-dr u-f-jsb" style="width: 80%;">
				<text>手机号:{{user_info.fTel}}</text>
				<view class="u-f-ac" @click="phone">
					<image :src="getImgsrc('bohao.png') " mode="aspectFill" style="width: 25px; height: 25px; border-radius: 50px;"></image>
					沟通确认
				</view>
				</view>
		<view class="m-t-10 p-15 u-f-dc" style="width: 90%;">
			<view class="p-10 f-b-wb">姓名：{{card_info.fName}}</view>
			<view class="p-10 f-b-wb">身份证号：{{card_info.fCard_num}}</view>
			<text>正面:</text>
			<view>
				<image :src="card1_info==null ? '' :card1_info.fImg" mode="widthFix" style="width: 100%;"></image>
			</view>
			<text>反面:</text>
			<view>
				<image :src=" card2_info==null ? '' :card2_info.fImg" mode="widthFix" style="width: 100%;"></image>
			</view>			
		</view>
		<view v-if=" card1_info.fStatus==0" style="width: 100%;">
		<button type="primary" style="width: 80%;" @click="pass">通过</button>
		<button type="default" style="width: 80%; margin-top: 20px; margin-bottom: 50px;" @click="repass">不通过</button>
		</view>
		<view v-if="card1_info.fStatus==1" style="width: 95%; border: 1px solid #009900; padding: 20px; text-align: center; margin-bottom: 50px;">			
				已通过			
		</view>
		</view>
		<!-- 提示pop -->
		<uni-popup ref="popu1" type="center">
			<view class="pop-content p-8">
					<view class="u-f u-f-ajc">
						<text style="font-size: large; margin-top: 20px;">不通过原因</text>
					</view>
				
				<scroll-view scroll-y="true" >
					 
					<view v-for="(num,index) in lists2" :key="index" class="u-f u-f-ajc bd-b-1">
							
						<text class="more2" @click="caozuo2(num)">{{num}}</text>
						
					</view>
				</scroll-view>	 	
			</view>
		</uni-popup>
		
	</view>
</template>

<script>
	var _self
	import Popup from '../../../../components/uni-popup/uni-popup.vue'
	export default {
		data() {
			return {
				user_uuid:'',
				card1_info:'',
				card2_info:'',
				user_info:'',
				card_info:'',
				lists2: ['身份正面不合规','身份反面不合规','人证信息不吻合']
				
			}
		},
		components:{
			Popup
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title:'身份审核'
			})
			this.user_uuid=e.user_uuid
			this.load_card()
		},
		methods: {
			caozuo2(e){
				console.log(e);
				this.$refs.popu1.close()
				uni.request({
					url: this.tp_url+'c_pass_pass_card_repass',
					data:{
						res:e,
						user_uuid:this.user_uuid
					},
					method:'GET',
					success(res) {
						if(res.data.res==200){
							uni.showToast({
								title:res.data.msg,
								icon:'none',
								success() {
									setTimeout(function(){
										uni.navigateBack({
											delta:1
										})
									},2000)
								}
							})
						}
					}
				})
			},
			phone(){
				uni.makePhoneCall({
					phoneNumber:this.user_info.fTel
				})
			},
			pass(){
			_self=this
			var op={title:'审核提示',concent:'确认通过此用户身份信息！',confirmVal:'通过'}
			this.$showModal(op).then((res)=>{
				  uni.request({
			  	url:_self.tp_url+'c_pass_pass_card',
				data:{
					user_uuid:_self.user_uuid,
					name:_self.card_info.fName
				},
				method:'GET',
				success(res2) {
					if(res2.data.res==200){
						uni.showToast({
							title:res2.data.msg,
							success() {
								_self.load_card()
							}
						})
					}else{
						uni.showToast({
							title:res2.data.msg
						})
					}
				}
			  })
			}).catch((res)=>{})
			
			},
			repass(){
				this.$refs.popu1.open()
			},
			load_card(){
				_self=this
				uni.request({
					url: this.tp_url+'c_load_card',
					data:{
						user_uuid:this.user_uuid
					},
					method:'GET',
					success(res) {
						console.log(res.data);
					   	_self.card1_info=res.data.card1
						_self.card2_info=res.data.card2
						_self.user_info=res.data.user[0]
						_self.card_info=res.data.card_info[0]
					}
				})
			}
					
	    }
	}
</script>

<style scoped>
.pop-content{
	
	width: 500upx;
	background-color: #FFFFFF;
	border-radius: 10px;
}
.more2{
	margin: 15px;
}
</style>
