<template>
	<view class="body">
		<view class="top-header">
			<text class="app-name">{{ appName }}</text>
			<view class="infos">
				<image class="info-img" :src="getImgsrc('daijia/infos.png')" @click="to_sys()"></image>
				<u-badge size="mini" :absolute="true" :offset="[-8, -12]" type="error" :count="count"></u-badge>
			</view>
		</view>
		<view class="address-box">
			<image class="address-icon" :src="getImgsrc('daijia/address.png')"></image>
			<text class="address">{{ address }}</text>
			<view class="text-btn" @click="loadNewLocation">重新获取</view>
		</view>
		<view class="ad-image-box">
			<image class="ad-image" :src="getImgsrc('daijia/adimage.png')"></image>
		</view>
		<view class="notice-line" v-if="drivingOrder.id" @click="goOrder">
			<u-notice-bar mode="vertical" bg-color="#F8F8F8" color="#333333" font-size="28rpx" :list="list"></u-notice-bar>
		</view>
		<view class="action-box">
			<view v-if="user_type==0" class="action-left" @click="goUrl('/pages/index/dingwei/dingwei')">
				<image :src="getImgsrc('daijia/action1.png')"></image>
				<view  class="text-box">
					<view class="title">立即下单</view>
					<view class="content">最快30分钟内 接单洗车</view>
				</view>
			</view>
			
			<view v-if="user_type==1" class="action-left" @click="goUrl('/pages/index/dalishang/dalishang')">
				<image :src="getImgsrc('daijia/action1.png')"></image>
				<view  class="text-box">
					<view class="title">代理商管理</view>
					<view class="content">区域代理 社区监视</view>
				</view>
			</view>
			
			<view v-if="user_type==2" class="action-left" @click="goUrl('/pages/index/dating/dating')">
				<image :src="getImgsrc('daijia/action1.png')"></image>
				<view  class="text-box">
					<view class="title">抢单大厅</view>
					<view class="content">自助抢单 无需等待派单</view>
				</view>
			</view>
			
			<view class="action-right">
				
				<view v-if="user_type==0" class="action-top" @click="goUrl('/pages/index/tuanti/tuanti')">
					<image :src="getImgsrc('daijia/action2.png')"></image>
					<view class="text-box">
						<view class="title">团体洗车</view>
						<view class="content">加入团体 更多优惠</view>
					</view>
				</view>
				
				<view v-if="user_type==1" class="action-top" @click="goUrl('/pages/index/fengongsi/fengongsi')">
					<image :src="getImgsrc('daijia/action2.png')"></image>
					<view class="text-box">
						<view class="title">分公司管理</view>
						<view class="content">省级分公司 管理</view>
					</view>
				</view>
				
				<view v-if="user_type==2" class="action-top" @click="goUrl('/pages/index/yeji/yeji')">
					<image :src="getImgsrc('daijia/action2.png')"></image>
					<view class="text-box">
						<view class="title">我的业绩</view>
						<view class="content">账单 提现</view>
					</view>
				</view>
				
				<view class="action-bottom" @click="goUrl('/pages/index/share/share')">
					<image :src="getImgsrc('daijia/action3.png')"></image>
					<view v-if="user_type==2" class="text-box">
						<view class="title">电子工牌</view>
						<view class="content">客人扫码下单</view>
					</view>
					<view v-if="user_type!=2" class="text-box">
						<view class="title">电子工牌</view>
						<view class="content">推荐好友 分享快乐</view> 
					</view>
				</view>
				
			</view>
		</view>
		<u-modal
			v-model="showModel"
			:content="content"
			:show-cancel-button="true"
			:mask-close-able="true"
			@confirm="goUrl"
		></u-modal>
		<u-modal
			v-model="showTip"
			:content="tipContent"
			:show-cancel-button="true"
			:mask-close-able="true"
			@confirm="goNext">
		</u-modal>
	<!-- 	<popupBottom ref="popup" :visible.sync="order_show" title="订单确认" radius="1" maxHeight="900" @close="order_close()" @reachBottom="onPopupReachBottom()">
			<view class="p-10" style="height: 1000upx;">
				ff
			</view>
		</popupBottom> -->
		<zy-update theme="green" :h5preview="true" oldversion="1.0.8" :appstoreflag="false" :updateurl="update_url" :autocheckupdate="true"></zy-update>
	</view>
</template>

<script>
	var _self
	const innerAudioContext = uni.createInnerAudioContext();
	
	innerAudioContext.autoplay = true;
	import amapFile from '@/js_sdk/amap-wx.js'
	import { amapKey } from '@/utils/baseConfig.js'
	import { appName } from '@/utils/baseConfig.js'
	import { getAuthorize } from '@/utils/utils.js'
	import { request1 } from '@/utils/request1.js'
   import zyUpdate from '@/components/zy-upgrade/zy-upgrade.vue';
	export default {
		data() {
			return {
				order_show:false,
				showTip: false,
				tipContent: '',
				ifIdorCard: 0,
				showModel: false,
				myAmapFun: null,
				content: '',
				count: '15',
				address: '',
				list: [
					'有在进行中的订单，是否现在进入？',
				],
				drivingOrder: {},
				user_uuid:'',
				user_type:0,
				badge_module:'',
				address_info:''
			}
		},
	components:{
		zyUpdate
	},
		onShow() {
		//判断登陆
		// #ifdef APP-PLUS
		console.log(this.Config.version);
			this.update_url = this.tp_url + 'c_test_update?v=' + this.Config.version;
			console.log(this.update_url);
		// #endif
	
		this.getLocation()
		this.user_uuid = this.checkLogin().user_uuid;
		if (this.user_uuid) {
			console.log(this.user_uuid);
		
			this.load_user_info()
		} else {
			uni.showModal({
				title: '登录提示',
				content: '你还没有登录，请登录！',
				success(res) {
					uni.navigateTo({
						url: '../login/login'
					});
				}
			});
			this.login_show = true;
			this.isHaveNetwork()
		}
			
		this.socket();
		
		this.badge_module = uni.requireNativePlugin('Laowu-BadgeModule');	
			
			
			
		},
		onLoad() {
			this.myAmapFun = new amapFile.AMapWX({key: amapKey});
			this.mapContext = uni.createMapContext('navi_map')
		
			// #ifdef MP-WEIXIN
			this.getAuthorize()
			// #endif		
			let user_info=uni.getStorageSync('userInfo')
			console.log(JSON.parse(user_info) );
		},
		computed: {
			appName() {
				return appName
			}
		},
		methods: {
		  to_sys(){
			  uni.navigateTo({
			  	url:'system_sms/system_sms'
			  })
		  },
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
							
							
							
						 if(r.order_num>0){
							 uni.setTabBarBadge({
							 	//显示未读消息条数
							 	index: 2,
							 	text: `${r.order_num}`
							 });
						 }else{
							 uni.removeTabBarBadge({
							 	index:2
							 })
						 }
							
						}else{
							let params = {
								type: 'error',
								message: res.data.msg,
								url: '../login/login'
							};
							_self.$refs.uToast.show({
								...params,
								complete() {
									params.url &&
										uni.navigateTo({
											url: params.url
										});
								}
							});
						}
					}
				})
			},
			goNext() {
				uni.navigateTo({
					url: `/pages/setting/index`
				})
			},
			getStatus(id) {
				if (id === 1) {
					this.billOrder()
				} else {
					this.dispatch()
				}
			},
			loadNewLocation() {
				// #ifdef APP-PLUS
				this.getLocation()
				// #endif
				// #ifdef MP-WEIXIN
				this.getAuthorize()
				// #endif
			},
			goOrder() {
				uni.navigateTo({
					url: `/pages/tabBar/billOrder/ordering?id=${this.drivingOrder.id}`
				})
			},
			checkOrderOnlive() {
				// this.$http('get', '/api/order/drivingOrder', {
				// 	success: (res) => {
				// 		const { data } = res
				// 		if (data && data.status === 'driving') {
				// 			this.drivingOrder = data
				// 			uni.showModal({
				// 				title: '提示',
				// 				content: '有在进行中的订单，是否现在进入？',
				// 				showCancel: true,
				// 				cancelText: '取消',
				// 				confirmText: '确定',
				// 				success: res => {
				// 					if (res.confirm) {
				// 						uni.navigateTo({
				// 							url: `/pages/tabBar/billOrder/ordering?id=${data.id}`
				// 						})
				// 					}
				// 				},
				// 				fail: () => {},
				// 				complete: () => {}
				// 			});
				// 		}
				// 	},
				// 	complete: () => {
				// 		uni.hideLoading()
				// 	}
				// })
			},
			getAuthorize() {
				getAuthorize('scope.userLocation').then(() => {
					this.getLocation()
				}).catch(() => {
					console.log('授权失败')
				})
			},
			goUrl(url) {
				uni.navigateTo({
					url: url
				})
			},
			getLocation() {
				uni.showLoading(
					{
						title: '正在定位...'
					}
				)
				this.myAmapFun.getRegeo({
					success: (data) => {
						const { name, longitude, latitude,desc } = data[0]
						this.address = name+desc
						console.log(data);
						uni.setStorageSync('address_info',data[0].regeocodeData.addressComponent)
						this.address_info=data[0]
						this.update_user_address(data[0])
						//this.$store.dispatch('setCurrentCity', data[0])
						uni.hideLoading()
					},
					fail: (e) => {
						uni.hideLoading()
						uni.showModal({
							title: '错误',
							content: JSON.stringify(e)
						})
					}
				});
			},
			update_user_address(info){
					uni.request({
						url:this.tp_url+'c_update_user_address',
						data:{
							city:info.regeocodeData.addressComponent.city,
							area:info.regeocodeData.addressComponent.district,
							street:info.regeocodeData.addressComponent.streetNumber.street,
							lat:info.latitude,
							lng:info.longitude,
							user_uuid:this.user_uuid
						},
						method:'GET',
						success(res) {
							if(res.data.res==200){
								console.log("更新地址成功！");
							}else{
								console.log("更新失败！");
							}
						}
					})
				},
				socket() {
					_self = this;
					this.task = uni.connectSocket({
						url: 'ws://47.97.122.25:4000/ws2?channel=' + this.Config.channel + '&user_uuid=' + this.user_uuid,
				
						complete: e => {
							console.log('链接' + JSON.stringify(e));
						},
						fail: err => {
							uni.showToast({
								title: err,
								icon: 'none'
							});
						}
					});
					this.task.onOpen(e => {
						console.log('等待接受消息.....' + JSON.stringify(e));
						var m = {
							Proto: 1,
							Proto2: 5,
							Code: {
								Ping: 1
							}
						};
						// this.task.send({
						// data: JSON.stringify(m),
						// success() {
						// 	console.log('发送成功！');
						// }
						//     });
						this.task.onMessage(function(e) {
							var v = eval('(' + e.data + ')');
							console.log(v);
							var options = { cover: false };
							var str = _self.toTime(new Date());
							_self.badge_module = uni.requireNativePlugin('Laowu-BadgeModule');
							if (v.ty == 'paidan' && _self.user_uuid == v.uuid) {
								str += '：系统派单通知';
								plus.push.createMessage(str, 'LocalMSG', options);
								uni.vibrateLong({
									success() {
										_self.badge_module.setBadge(2);
										_self.badge_module.setPush({
											title: '派单通知',
											content: `收到周边洗车订单！\n ${str}`
										});
									}
								});
								innerAudioContext.src = '../../static/audio/shoukuan.aac';
								innerAudioContext.play();
								innerAudioContext.onPlay(() => {
									console.log('开始播放');
									uni.showModal({
										title: '派单通知',
										content: '收到周边洗车订单！'
									});
								});
								uni.showModal({
									title: '派单通知',
									content: `收到周边洗车订单,请尽快接单...！`,
									confirmText: '立即接单',
									success(re) {
										if (re.confirm) {
											uni.navigateTo({
												url: '../order/order'
											});
										}
									}
								});
								
							}
							if (v.ty == 'jiedan' && _self.user_uuid == v.uuid) {
								//var data=JSON.parse(v.data)
								var data2 = eval('(' + v.data + ')');
								//console.log(data);
								console.log(data2);
				
								str = _self.toTime(new Date());
								str += '：接单提示';
								plus.push.createMessage(str, 'LocalMSG', options);
				
								uni.vibrateLong({
									success() {
										_self.badge_module.setBadge(1);
										_self.badge_module.setPush({
											title: '接单提示',
											content: '洗车工人已接单，正在赶来的路上，耐心等待！'
										});
									}
								});
								innerAudioContext.src = '../../static/audio/shoukuan.aac';
								innerAudioContext.play();
								uni.showModal({
									title: '接单提示',
									content: `洗车工人已接单，正在赶来的路上，耐心等待！`,
									confirmText: '确认',
									success(re) {
										if (re.confirm) {
											uni.navigateTo({
												url: '../order/order'
											});
										}
									}
								});
							}
							//实名
							if (v.ty == 'shiming' && _self.user_uuid == v.uuid) {
								str = _self.toTime(new Date());
								str += '：收到实名认证申请';
								plus.push.createMessage(str, 'LocalMSG', options);
								uni.vibrateLong({
									success() {
										_self.badge_module.setBadge(1);
										_self.badge_module.setPush({
											title: '实名审核提示',
											content: `收到用户实名认证请求，请及时处理！\n ${str}`
										});
									}
								});
								var data = JSON.parse(v.data);
								var data2 = eval('(' + v.data + ')');
								console.log(data);
								console.log(data2);
				
								uni.showModal({
									title: '审核提示',
									content: `收到用户实名认证申请，请审核\n ${str}`,
									confirmText: '立即审核',
									success(re) {
										if (re.confirm) {
											uni.navigateTo({
												url: '../my/watcher-shenhe/shenhe/shenhe'
											});
										}
									}
								});
							}
							//提现，提币审核
							if (v.ty == 'tixian' && _self.user_uuid == v.uuid) {
								//var data=JSON.parse(v.data)
								var data2 = eval('(' + v.data + ')');
								//console.log(data);
								console.log(data2);
								str = _self.toTime(new Date());
								str += '：收到提现申请';
								plus.push.createMessage(str, 'LocalMSG', options);
								uni.vibrateLong({
									success() {
										_self.badge_module.setBadge(1);
										_self.badge_module.setPush({
											title: '提现审核提示',
											content: `收到用户提现申请，请及时处理！\n ${str}`
										});
									}
								});
								uni.showModal({
									title: '用户提现提示',
									content: `收到用户提现申请，金额：${data2.gold}个\n ${str}`,
									confirmText: '立即审核',
									success(re) {
										if (re.confirm) {
											uni.navigateTo({
												url: '../my/tixian-tibi-shenhe/tixian-tibi-shenhe'
											});
										}
									}
								});
							}
							//提现，提币审核
							if (v.ty == 'cuidan' && _self.user_uuid == v.uuid) {
								//var data=JSON.parse(v.data)
								var data2 = eval('(' + v.data + ')');
								//console.log(data);
								console.log(data2);
								str = _self.toTime(new Date());
								str += '：客户催单';
								plus.push.createMessage(str, 'LocalMSG', options);
								uni.vibrateLong({
									success() {
										_self.badge_module.setBadge(1);
										_self.badge_module.setPush({
											title: '催单提示',
											content: '收到客户催单，请及时联系客户反应路况，并及时到达目的地开始洗车任务！'
										});
									}
								});
								uni.showModal({
									title: '催单提示',
									content: `收到客户催单，请及时联系客户反应路况，并及时到达目的地开始洗车任务！`,
									confirmText: '立即查看',
									success(re) {
										if (re.confirm) {
											uni.navigateTo({
												url: '../order/order'
											});
										}
									}
								});
							}
							//管理员审核，通过
							if (v.ty == 'xiche' && _self.user_uuid == v.uuid) {
								//var data=JSON.parse(v.data)
								var data2 = eval('(' + v.data + ')');
								//console.log(data);
								console.log(data2);
								str = _self.toTime(new Date());
								str += '：开始洗车';
								plus.push.createMessage(str, 'LocalMSG', options);
								uni.vibrateLong({
									success() {
										_self.badge_module.setBadge(1);
										_self.badge_module.setPush({
											title: '洗车提示',
											content: '洗车工人开始洗车，洗车中...请耐心等待！'
										});
									}
								});
								uni.showModal({
									title: '洗车提示',
									content: `洗车工人开始洗车，洗车中...请耐心等待！`,
									confirmText: '确认',
									success(re) {
										if (re.confirm) {
											uni.switchTab({
												url: '../order/order'
											});
										}
									}
								});
							}
							
							if (v.ty == 'jieshu' && _self.user_uuid == v.uuid) {
								//var data=JSON.parse(v.data)
								var data2 = eval('(' + v.data + ')');
								//console.log(data);
								console.log(data2);
								str = _self.toTime(new Date());
								str += '：洗车完成';
								plus.push.createMessage(str, 'LocalMSG', options);
								uni.vibrateLong({
									success() {
										_self.badge_module.setBadge(1);
										_self.badge_module.setPush({
											title: '洗车提示',
											content: '洗车工人已完成本车洗车服务，稍后请为本次服务做出评价！'
										});
									}
								});
								uni.showModal({
									title: '洗车完成',
									content: `洗车工人已完成本车洗车服务，稍后请为本次服务做出评价！`,
									confirmText: '立即评价',
									success(re) {
										if (re.confirm) {
											uni.switchTab({
												url: '../order/order'
											});
										}
									}
								});
							}
							
						});
					});
				},
				
				
				
		}
	}
</script>

<style lang="scss">
	.body {
		height: 100vh;
		width: 100vw;
		position: relative;
		.ordering {
			color: #303133;
			font-size: 30rpx;
			line-height: 60rpx;
			height: 60rpx;
			padding: 0 26rpx;
			background: #EEEEEEs;
		}
		.action-box {
			padding: 0 26rpx;
			overflow: hidden;
			margin-top: 26rpx;
			.text-box {
				position: absolute;
				top: 24rpx;
				left: 24rpx;
				color: #FFFFFF;
				.title {
					font-size: 36rpx;
					line-height: 1;
				}
				.content {
					font-size: 28rpx;
					line-height: 1;
					margin-top: 10rpx;
				}
			}
			.action-left {
				width: 336rpx;
				height: 326rpx;
				position: relative;
				float: left;
				image {
					display: block;
					width: 100%;
					height: 100%;
				}
			}
			.action-right {
				width: 346rpx;
				height: 326rpx;
				position: relative;
				float: right;
				.action-top, .action-bottom {
					width: 100%;
					height: 154rpx;
					position: relative;
					image {
						display: block;
						width: 100%;
						height: 100%;
					}
				}
				.action-bottom {
					margin-top: 18rpx;
				}
				// image {
				// 	display: block;
				// 	width: 100%;
				// 	height: 100%;
				// }
			}
		}
		.notice-line {
			padding: 0 26rpx;
			margin-top: 26rpx;
			/deep/ .uicon-volume-fill {
				color: #00C265 !important;
			}
		}
		.ad-image-box {
			// width: ;
			padding: 0 26rpx;
			margin-top: 26rpx;
			.ad-image {
				width: 100%;
				height: 290rpx;
			}
		}
		.address-box {
			overflow: hidden;
			margin-top: 40rpx;
			height: 80rpx;
			background: #F2FFF9;
			padding: 0 26rpx;
			.address-icon {
				width: 40rpx;
				height: 40rpx;
				margin-top: 20rpx;
				float: left;
			}
			.address {
				float: left;
				color: #333333;
				font-size: 28rpx;
				margin-left: 10rpx;
				line-height: 80rpx;
			}
			.text-btn {
				height: 80rpx;
				// width: 2rpx;
				float: right;
				color: #00C265;
				font-size: 26rpx;
				line-height: 80rpx;
			}
		}
		.map-box {
			height: 960rpx;
			#myMap {
				height: 960rpx;
				width: 750rpx;
			}
		}
		
		.map-label {
			position: absolute;
			top: 50%;
			left: 50%;
			// transition: (0, -50%);
			transform: translateX(-50%);
			background: #0066CC;
			color: #FFFFFF;
			padding: 20rpx;
			border-radius: 6rpx;
			margin-top: -160rpx;
		}
		.footer-view {
			box-sizing: border-box;
			background: #FFFFFF;
			padding:20rpx 40rpx;
			width: 100%;
			position: absolute;
			bottom: 0;
			z-index: 6666;
			left: 0;
			border-top-right-radius: 50rpx;
			border-top-left-radius: 50rpx;
			.current-address {
				color: #333333;
				font-size: 36rpx;
				line-height: 72rpx;
				// padding: 20rpx 0;
				margin-bottom: 20rpx;
				.address {
					color: #18B566;
				}
			}
			.button-confirm {
				width: 100%;
				overflow: hidden;
				background-color: #dddddd;
				border-radius: 30rpx;
				height: 90rpx;
				line-height: 90rpx;
				padding: 0 10rpx;
				color: #333333;
				margin-bottom: 30rpx;
				.dot-dot {
					width: 10rpx;
					height: 10rpx;
					border-radius: 50%;
					float: left;
					margin-left: 20rpx;
					margin-top: 40rpx;
					background: #FA3534;
				}
				.to-address {
					color: #666666;
					font-size: 36rpx;
					float: left;
					margin-left: 20rpx;
				}
			}
			.price-estimate {
				color: #F29100;
				font-size: 32rpx;
				line-height: 1;
				margin-bottom: 30rpx;
			}
		}
		.top-header {
			overflow: hidden;
			width: 93%;
			padding: 0 26rpx;
			padding-top: var(--status-bar-height);
			
			.app-name {
				float: left;
				
				font-size: 44rpx;
				font-weight: 700;
				color: lightseagreen;
			}
			.infos {
				width: 48rpx;
				height: 48rpx;
				float: right;
				position: relative;
				.info-img {
					height: 100%;
					width: 100%;
					display: block;
					
				}
			}
		}
	}
</style>
