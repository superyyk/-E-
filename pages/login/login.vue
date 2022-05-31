<template>
	<view>
		<!-- #ifdef APP-PLUS -->
		<!-- <u-button @click="login()">手机号一键登陆</u-button> -->
		<!-- #endif -->
	
	<!--    <u-button @click="weixin()" class="m-t-10">微信登陆</u-button>
		<text>{{tel}}</text>
		<view class="p-10 u-f-dc">
			<image :src="weixin_info.headimgurl" mode="aspectFit" class="img_45"></image>
			<text class="f-b-w6 m-8">{{weixin_info.nickname}}</text>
			<text class="f-s">openid:{{weixin_info.openid}}</text>
		</view> -->
		<view class="u-f u-f-ajc u-f-chuizhi p-20">
			<view class="p-20 u-f-dc u-f-ac">
				<view class="f-b-wwb">{{tel}}</view>
				<text class="p-10 f-s">手机号由中国三大电信运营商提供</text>
				<view class="p-10">
					<u-button text="本机号码一键登陆" color="#669934" size="large" @click="login2"></u-button>
				</view>
				<view class="p-10 u-f u-f-ajc">
					<text class="text-border-line" @click="login_sms">切换短信登陆</text>
				</view>
				
				</view>
			
			
		</view>
		
		<view class="p-20 u-f u-f-ajc" style="position: fixed; bottom: 20px; left: 0px; width: 100%;">
			<image :src="getImgsrc('static/weixin.png')" mode="aspectFill" class="img_50" @click="weixin()"></image>
		</view>
		
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				weixin_info:'',
				tel:'',
				city:'',
				area:'',
				street:'',
				user_uuid:'',
				token:'',
				openid:''
			}
		},
		onLoad(e) {
			this.city=e.city
			this.area=e.area
			this.street=e.street
			this.user_uuid=this.checkLogin().user_uuid
			if(this.user_uuid){
				// uni.navigateBack({
				// 	delta:1
				// })
			}else{
				this.login()
			}
		},
		onShow(){
		
			
		},
		methods: {
			login_sms(){
				uni.navigateTo({
					url:'login_sms/login_sms'
				})
			},
			login2(){
				this.login()
			},
			login(){
				_self=this
				// const shanYan = uni.requireNativePlugin('CLSDK-ShanYanSDKModule')
				// shanYan.init({
				//         appid: "poklbqjx",
				//     }, result => {
				//         //初始化回调
				//         this.shanyan_code = JSON.stringify(result.code);
				//         this.shanyan_result = JSON.stringify(result.result);
				// 		console.log(this.shanyan_code);
				// 		console.log(this.shanyan_result);
				//     });
				
				const univerifyManager = uni.getUniverifyManager()
				
				// 预登录
				//univerifyManager.preLogin()
				
				// 调用一键登录弹框
				// univerifyManager.login({
				//   univerifyStyle: {
				//     "fullScreen": false,
				// 	"icon":{
				// 		"path":"/static/logo.png"
				// 	},
				//     "buttons": {
				//         "iconWidth": "30px",
				//         "list": [
				//             {
				//                 "provider": "apple",
				//                 "iconPath": "/static/icon/car.png"
				//             }, 
				//             {
				//                 "provider": "weixin",
				//                 "iconPath": "/static/icon/my.png"
				//             }
				//         ]
				//     }
				//   },
				//   success (res) {
				//     console.log('login success', res)
				//   }
				// })
				
				const callback = (res) => {
				  // 获取一键登录弹框协议勾选状态
				  univerifyManager.getCheckBoxState({
				    success(res) {
				      console.log("getCheckBoxState res: ", res);
				      if (res.state) {
				        // 关闭一键登录弹框
				        univerifyManager.close()
				      }
				    }
				  })
				}
				// 订阅自定义按钮点击事件
				univerifyManager.onButtonsClick(callback)
				// 取消订阅自定义按钮点击事件
				univerifyManager.offButtonsClick(callback)
				
				 uni.closeAuthView()
				uni.login({
					provider: 'univerify',
					success(res) { // 登录成功
						console.log(res.authResult); // {openid:'登录授权唯一标识',access_token:'接口返回的 token'}
						res.authResult.accessToken = res.authResult.access_token
						_self.token=res.authResult.access_token
						_self.openid=res.authResult.openid
						// return that.$request({
						// 	method: 'POST',
						// 	url: '后台做具体逻辑的接口',
						// 	data: res.authResult
						// }).then(res => {
						// 	uni.closeAuthView() //成功关闭授权页面
						// 	console.log('登录成功', res)
						// 	if (res.code) return
						// 	that.$store.commit('setToken', res.data)
						// 	that.$util.msg('登录成功')
						// 	setTimeout(() => {
						// 		uni.redirectTo({
						// 			url: '登陆成功跳转的目标页面'
						// 		})
						// 	}, 500)
						// })
						
						// 在得到access_token后，通过callfunction调用云函数
						uniCloud.callFunction({
						  name: 'onkey', // 你的云函数名称
						  data: {
						    'access_token': res.authResult.access_token, // 客户端一键登录接口返回的access_token
						    'openid': res.authResult.openid // 客户端一键登录接口返回的openid
						  }
						}).then(re => {
						  // res.result = {
						  //   code: '',
						  //   message: ''
						  // }
						  console.log(re.result.data);
						  _self.tel=re.result.data.phoneNumber
						  uni.closeAuthView()
						  // 登录成功，可以关闭一键登录授权界面了
					      _self.save_user(res.authResult.access_token,res.authResult.openid,re.result.data.phoneNumber,0)
						  
						  
						}).catch(err=>{
						  // 处理错误
						  console.log("登陆错误"+err);
						  uni.closeAuthView()
						})
						
					},
					fail(res) { // 登录失败
						console.log(res.errCode)
						console.log(res.errMsg)
						uni.closeAuthView()
					}
				})
				
				
			},
			async save_user(token,openid,tel,type){
				
				console.log(this.city);
				console.log(this.area);
				console.log(this.street);
				
				let op={
					url:"c_save_user",
					data:{
						token:token,
						openid:openid,
						tel:tel,
						city:this.city,
						area:this.area,
						street:this.street
					},
					method:'GET'
				}
				
			
				const res=await this.$my_Request(op)
				console.log("提交后台"+token+'--'+openid+'--'+tel);
				if(res.data.res==200){
				uni.showToast({
					title:res.data.msg
				})
					uni.setStorageSync('user_uuid',res.data.data.user_uuid)
					setTimeout(function(){
						uni.closeAuthView()
						uni.switchTab({
							url:'../index/index'
						})
					},500)
				}else{
				uni.showToast({
					title:res.data.msg,
					icon:'error'
				})
				}
			},
			async save_user_weixin(openid,name,head,uni_id){
				
				console.log(this.city);
				console.log(this.area);
				console.log(this.street);
				
				let op={
					url:"c_save_user_weixin",
					data:{
						name:name,
						openid:openid,
						head:head,
						uni_id:uni_id,
						city:this.city,
						area:this.area,
						street:this.street
					},
					method:'GET'
				}
				
			
				const res=await this.$my_Request(op)
				//console.log("提交后台"+token+'--'+openid+'--'+tel);
				console.log(res);
				if(res.data.res==200){
				uni.showToast({
					title:res.data.msg
				})
					uni.setStorageSync('user_uuid',res.data.data.user_uuid)
					setTimeout(function(){
						uni.closeAuthView()
						uni.switchTab({
							url:'../index/index'
						})
					},500)
				}else{
				uni.showToast({
					title:res.data.msg,
					icon:'error'
				})
				}
			},
			
			weixin(){
				_self=this
				uni.getProvider({
					service:'oauth',
					success(re) {
						console.log(re);
						if(re.provider.indexOf('weixin')){
								uni.login({
					provider: 'weixin',
					//onlyAuthorize:true,
					success: function(loginRes) {
						// uni.request({
						// 	url: "http://127.0.0.1/login/wechat/" + loginRes.code，
						// 	success： (res) => {
						// 		// 处理登录成功
						// 	}
						// })
						console.log(loginRes);
						_self.getApploginData(loginRes)
					},
					fail(er) {
						uni.showModal({
							content:'微信登陆失败：'+er,
							title:'微信登陆'
						})
					}
				});
						}
					}
				})
				
				
			
			},
				//请求登录接口方法
			
					getApploginData(data) {
						var that = this;
						//这边是前端自己去调微信用户信息的接口，根据接口需要请求，如果不需要前端去获取的话就交给后端，可省去次操作
						uni.request({
							url: 'https://api.weixin.qq.com/sns/userinfo?access_token=' + data.authResult.access_token + '&openid=' + data.authResult.openid,
							method: 'GET',
							dataType: 'json',
							header: {
								'content-type': 'application/x-www-form-urlencoded' // 默认值
							},
			
							success(res) {
								console.log('【登录回调啾啾啾】', res);
								//前端调用微信接口，获取到微信用户的基本信息，传递给后台
								// that.$api.wxloginThred({ unionid:data.authResult.unionid,image:res.data.headimgurl, nickname:res.data.nickname,}).then(res=>{
								// 	console.log(res)
								// 	if (res.statusCode == 200) {
								// 		uni.setStorageSync('userInfo', JSON.stringify(res.data));
								// 		uni.setStorageSync('logined', 1);
								// 		that.$store.commit('SET_STATE', ['logined', true]);
								// 		that.$store.commit('SET_STATE', ['userInfo', res.data]);
								// 		uni.showToast({
								// 			title: '登陆成功',
								// 			duration: 2000
								// 		});
								// 		//登录成功 跳转到首页
								// 		that.checkFirst()
								// 	}
								// });
								_self.weixin_info=res.data
								
								
								_self.save_user_weixin(res.data.openid,res.data.nickname,res.data.headimgurl,res.data.unionid)
							},
							fail() {
								that.$refs.uToast.show({
									title: '微信登录失败',
									type: 'warning'
								});
							}
						});
					}
		}
	}
</script>

<style>

</style>
