<template>
	<view class="u-f-dc p-10">
		<view class="bd-r-10 p-10" style="background-color: #FFFFFF;">
				<view class="u-f-dc u-f-ajc" v-if="card_info.fStatus==0" style="padding: 20px; border: 1px solid red; margin: 10px;">
			<text>审核中</text>
			
		</view>
		<view class="u-f u-f-ajc" v-if="card_info.fStatus==1" style="padding: 20px; border: 1px solid green; margin: 10px;">审核通过</view>
		<view class="u-f u-f-ajc" v-if="card_info.fStatus==2" style="padding: 20px; border: 1px solid red; margin: 10px;">
		<text v-if="card_info.fStatus==2">不通过原因:{{card_info.fRes}}</text>
		</view>
		
		<view v-if="card_info.fStatus!=1">
			
		<view class="u-f-dr u-f-ac" ><text class="c-grey">姓名：</text><input class="uni-input bd-b-1" v-model="name" placeholder="姓名" type="text" /></view>
		<view class="u-f-dr u-f-ac" ><text class="c-grey">身份证号：</text><input class="uni-input bd-b-1" v-model="card_num" placeholder="身份证号" type="idcard"  /></view>
		<view>身份证正面：</view>
		<view class="p-20">
			<view class="u-f u-f-ajc p-20 bd-r-10" @click="zhengmian" style="background-color: #fbf3eb;">
			<image :src="src" mode="widthFix" style="width: 40%;"></image>
		</view>
		</view>
		
		
		
		<view>身份证反面：</view>
		<view class="p-20">
			<view class="u-f u-f-ajc p-20 bd-r-10" @click="fanmian" style="background-color: #fbf3eb;">
			<image :src="src2" mode="widthFix" style="width: 40%;"></image>
			</view>
		</view>
		
	  <view class="p-10 u-f-dc">
		  <text>请确保照片的内容完整并清晰可见，</text>
		  <text>仅支持JPG和PNG图片格式，图片大小小于2M。</text>
	  </view>		
		
		
		<view class="u-f u-f-ajc bd-r-10" style="margin-top: 30px;" v-show="is_submit">
			<button v-show="is_tijiao" type="primary" style="width: 100%; background-color: #f9b031;" @click="submit">上传认证</button>
			<button v-show="!is_tijiao" type="primary" style="width: 100%; background-color: #f9b031;">上传验证</button>
			
		</view>
		
		<view class="u-f u-f-ajc bd-r-10" style="margin-top: 30px;" v-show="re_submit">
			<button v-show="is_tijiao" type="primary" style="width: 100%; background-color: #f9b031;" @click="re_submited">重新上传</button>
			<button v-show="!is_tijiao" type="primary" style="width: 100%; background-color: #f9b031;">上传验证</button>
			
		</view>
		
		</view>
		</view>
	
	</view>
</template>

<script>
var _self;
export default {
	data() {
		return {
			src: this.getImgsrc('wode/zhengmian.png') ,
			src2: this.getImgsrc('wode/fanmian.png') ,
			user_uuid: '',
			is_submit: true,
			re_submit:false,
			is_choose1: 0,
			is_choose2: 0,
			is_tijiao: true,
			uid1: '',
			uid2: '',
			choose:true,
			status:-1,
			res:'',
			name:'',
		    card_num:'',
			name_ok:false,
			ka_ok:false,
			is_card:false,
			card_info:''
		};
	},
	onShow() {
		
		
	},
	onLoad() {
		uni.setNavigationBarTitle({
			title: '洗车工申请认证'
		});
		this.user_uuid = this.checkLogin().user_uuid;
		this.check_pass_card();
		this.uid1 = this.get_Num();
		this.uid2 = this.get_Num();
	},
	methods: {
		submit() {
			_self = this;
			this.is_tijiao = false;
			if (this.is_choose1 == 0) {
				uni.showToast({
					title: '你还没有选择身份证正面图片',
					icon: 'none'
				});
			}
			 if (this.is_choose2 == 0) {
				uni.showToast({
					title: '你还没有选择身份证反面图片',
					icon: 'none'
				});
			}	
			if (this.name!="") {
				
				this.name_ok=true
			}else{
				uni.showToast({
					title: '姓名为必填项',
					icon: 'none'
				});
				this.name_ok=false
			}
			
			if (this.card_num!="" && this.card_num.length>14) {
				
				this.ka_ok=true
			}else{
				uni.showToast({
					title: '身份证号有误',
					icon: 'none'
				});
				this.ka_ok=false
			}
		
			
			if(this.name_ok && this.ka_ok && this.src.length>40 && this.src2.length>40){
				uni.request({
				url:  this.tp_url + 'g_up_card',
				data: {
					user_uuid: this.user_uuid,
					uid1: this.uid1,
					uid2: this.uid2,
					name:this.name,
					card_num:this.card_num,
					type:1
				},
				method: 'GET',
				success(res) {
					console.log(res.data);
					if (res.data.res == 200) {
						uni.showToast({
							title: res.data.msg
						});
						_self.up_img(_self.src, _self.uid1);
						_self.up_img(_self.src2, _self.uid2);
						var data={
								user_uuid:_self.user_uuid,
							}
						_self.$send_notice(_self.Config.channel,_self.Config.admin_address,"shiming",JSON.stringify(data))
					}
				}
			});
			}else{
				this.is_tijiao=true
			}
			
		},
		re_submited(){
			_self = this;
			this.is_tijiao = false;
			if (this.is_choose1 == 0) {
				uni.showToast({
					title: '你还没有选择身份证正面图片',
					icon: 'none'
				});
			}
			 if (this.is_choose2 == 0) {
				uni.showToast({
					title: '你还没有选择身份证反面图片',
					icon: 'none'
				});
			}	
			if (this.name!="") {
				
				this.name_ok=true
			}else{
				uni.showToast({
					title: '姓名为必填项',
					icon: 'none'
				});
				this.name_ok=false
			}
			
			if (this.card_num!="" && this.card_num.length>14) {
				
				this.ka_ok=true
			}else{
				uni.showToast({
					title: '身份证号有误',
					icon: 'none'
				});
				this.ka_ok=false
			}
					
			
			if(this.name_ok && this.ka_ok && this.src.length>40 && this.src2.length>40){
				uni.request({
				url:  this.tp_url + 'g_up_card',
				data: {
					user_uuid: this.user_uuid,
					uid1: this.uid1,
					uid2: this.uid2,
					name:this.name,
					card_num:this.card_num,
					type:2
				},
				method: 'GET',
				success(res) {
					console.log(res.data);
					if (res.data.res == 200) {
						uni.showToast({
							title: res.data.msg
						});
						_self.up_img(_self.src, _self.uid1);
						_self.up_img(_self.src2, _self.uid2);
						var data={
								user_uuid:_self.user_uuid,
							}
						_self.$send_notice(_self.Config.channel,_self.Config.admin_address,"shiming",JSON.stringify(data))
					}
				}
			});
			}else{
				this.is_tijiao=true
			}
		},
		
		up_img(url, uid) {
			_self = this;
			return new Promise((resolve, reject) => {
				uni.uploadFile({
					url: this.tp_url+'c_up_img?username=' + _self.user_uuid + '&uid=' + uid, //仅为示例，非真实的接口地址
					filePath: url,
					name: 'img',
					header: {
						token: uni.getStorageSync('token')
					},
					success: uploadFileRes => {
						resolve(uploadFileRes.data);
						console.log("图片上传成功！");
						_self.choose=false
						_self.is_submit=false
						setTimeout(function(){
							_self.check_pass_card()
						},1000)
					}
				});
			});
		},
		check_pass_card() {
			_self = this;
			console.log(this.user_uuid);
			uni.request({
				url:  this.tp_url + 'g_check_pass_card',
				data: {
					user_uuid: this.user_uuid
				},
				method: 'GET',
				success(res) {
					console.log(res.data);
					if (res.data.res == 500) {
						_self.is_submit = true;
					}					
					if(res.data.res==200){
						
						_self.card_info=res.data.pass_card
					    switch (res.data.msg.fStatus){
							case 1:
							_self.is_submit = false;
							_self.re_submit = false;
							_self.choose=false
								break;
							case 2:
							_self.is_submit=false
							_self.re_submit = true;	
							_self.choose=true
								break;
							case 0:
							_self.is_submit = false;
							_self.re_submit = false;	
							_self.choose=false
								break;
							default:
							
								break;
						}
						
						
						
					}
				}
			});
		},
		async clear_card_num(){
			const res=await this.$my_Request({
				url:"fmr_clear_card_num",
				data:{
					user_uuid:this.user_uuid
				}
				
			})
		},
	 get_card1(uid){
		 _self=this
			 uni.request({
				url:'c_get_card',
				data:{
					uid:uid
				},
				method:'GET',
				success(res) {
					_self.src=res.data.data[0].fImg
				}
			})
			
		},
	 get_card2(uid){
			 _self=this
			 			 uni.request({
			 				url:'c_get_card',
			 				data:{
			 					uid:uid
			 				},
			 				method:'GET',
			 				success(res) {
								console.log(res.data);
			 					_self.src2=res.data.data[0].fImg
			 				}
			 			})
		},
		zhengmian() {
			_self = this;
			if(this.choose){
			uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				success(response) {
					var fileUrl = response.tempFilePaths[0];
					_self.src = fileUrl;
					_self.is_choose1 += 1;
				}
			});
			}
		
		},
		fanmian() {
			_self = this;
			if(this.choose){
					uni.chooseImage({
				count: 1,
				sizeType: ['compressed'],
				success(response) {
					var fileUrl = response.tempFilePaths[0];
					_self.src2 = fileUrl;
					_self.is_choose2 += 1;
				}
			});
			}
		
		}
	}
};
</script>

<style></style>
