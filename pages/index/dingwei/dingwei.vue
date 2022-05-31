<template>
	<view>
		<!-- #ifdef MP-WEIXIN -->
		<!-- 		<view class="map_box">
		  <map
			id="navi_map"
			:longitude="longitude"
			:latitude="latitude"
			scale="20"
			:markers="markers"
			
			:show-location="true"
			:include-points="includePoints"
			style="width: 750rpx; height: 55vh;"
			>
		  </map>
		</view>
		
		<view class="footer-view">
			<view class="current-address" @click="chooseAddress(1)">当前位置：<text class="address"> {{ address }} </text></view>

			<view class="p-10">
				<input type="text" value="" placeholder="备注准确地址" />
			</view>
			<view class="price-estimate" v-if="priceEstimate">{{ priceEstimate }}</view>
			<view class="p-8">
				<view class=""  hover-class="bubble" style="background: linear-gradient(90deg, #00C8C6 0%, #00D496 100%); font-size: '30rpx';height: '88rpx';border-radius: '12rpx';color: #fff; padding: 10px; text-align: center;" @click="openOrders">开启洗车订单</view>
			</view>
		</view> -->
		<!-- #endif -->

		<view class="map_box" style="z-index:2">
			<map
				id="navi_map"
				:longitude="longitude"
				:latitude="latitude"
				scale="12"
				:markers="markers"
				:show-location="true"
				:include-points="includePoints"
				style="width: 750rpx;"
				:scale="20"
				:joinCluster="true"
				:style="{ height: map_height > 400 ? '55vh' : map_height + 'px' }"
			></map>
		</view>

		<view id="target" class="footer-view">
			<view class="u-f-dr u-f-ac u-f-jsb bd-b-1 p-10" @click="open_cars">
				<view>车型</view>
				<view class="u-f-dr u-f-ac">
					<view class="u-f-dr u-f-ac">
						<text v-if="select_coupon > 0" style="color: red;">-¥{{ select_coupon > 0 ? select_coupon : 0 }}元</text>
						<text>{{ select_car }}</text>
					</view>

					<image :src="getImgsrc('gengduo.png')" mode="aspectFill" class="img_20"></image>
				</view>
			</view>
			<view class="u-f-dr u-f-ac u-f-jsb bd-b-1 p-10" @click="choose_coupon">
				<view>优惠券</view>
				<view class="u-f-dr u-f-ac">
					<view class="u-f-dc u-f-ac">
						<view class="u-f-dr u-f-ac">
							<text style="color: red;">{{ coupon!='' ? '¥-' + coupon.fNum + '元' : '选择优惠券' }}</text>
							<text class="f-s">({{ coupon ? get_car_type(coupon.fType) : '' }})</text>
						</view>
						<text class="f-s" style="color:red;" v-if="coupon.fType != select_type">优惠券不可用!</text>
					</view>

					<image :src="getImgsrc('gengduo.png')" mode="aspectFill" class="img_20"></image>
				</view>
			</view>

			<view class=" u-f-dr u-f-ac p-5 m-t-10" @click="chooseAddress(1)">
				<text>当前定位：</text>
				<text class="" style="color: #00D496;  font-weight: 600;">{{ address }}</text>
				<image :src="getImgsrc('/static/address.png')" mode="aspectFill" class="img_15 m-l-10" style="margin-top: -5px;"></image>
			</view>

			<view class="p-10"><u-input v-model="tip_address" type="text" value="" placeholder="备注准确地址" style="" /></view>
			<view class="price-estimate" v-if="priceEstimate">{{ priceEstimate }}</view>
			<view class="p-8" v-if="!order_click">
				<view
					class=""
					hover-class="bubble"
					style="background: linear-gradient(90deg, #00C8C6 0%, #00D496 100%); font-size: '30rpx';height: '88rpx';border-radius: '12rpx';color: #fff; padding: 10px; text-align: center;"
					@click="openOrders"
				>
					{{ total_money }}元-开启洗车订单
				</view>
				
			</view>
			<view class="p-8" v-if="order_click">
				<view
					class=""
					hover-class="bubble"
					style="background: linear-gradient(90deg, #00C8C6 0%, #00D496 100%); font-size: '30rpx';height: '88rpx';border-radius: '12rpx';color: #fff; padding: 10px; text-align: center;"
					
				>
					{{ total_money }}元-开启洗车订单
				</view>
				
			</view>
			
		</view>
		
		
		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
var _this;
var _self;

import amapFile from '@/js_sdk/amap-wx.js';
import { amapKey } from '@/utils/baseConfig.js';
import { getLocation } from '@/utils/utils.js';
import popupBottom from '@/components/px-popup-bottom.vue';
import myPop from '@/components/my-pop/index.vue';
export default {
	data() {
		return {
			// customStyle: {
			// 	background: 'linear-gradient(90deg, #00C8C6 0%, #00D496 100%)',
			// 	fontSize: '30rpx',
			// 	height: '88rpx',
			// 	borderRadius: '12rpx'
			// },
			tip_address: '',
			coupon_show: false,
			order_show: false,
			subNVues: null,
			address: '',
			markers: [],
			distance: '',
			cost: '',
			polyline: [],
			latitude: 39.909,
			longitude: 116.39742,
			myAmapFun: null,
			mapContext: null,
			includePoints: [],
			priceEstimate: '',
			toAddress: '',
			fromLatitude: '',
			fromLongitude: '',
			toLatitude: '',
			toLongitude: '',
			formName: '',
			toName: '',
			city: '',
			formData: {
				start_name: '',
				start_place: '',
				start_lng: '',
				start_lat: '',
				end_name: '',
				end_place: '',
				end_lng: '',
				end_lat: '',
				distance: '',
				customer_mobile: ''
			},
			coupon: [],
			user_uuid: '',
			select_car_num: 0,
			map_height: 0,
			promptVisible: false,
			title: '选择车型',
			cars: [
				{
					id: 0,
					name: '两厢轿车'
				},
				{
					id: 2,
					name: '三厢轿车'
				},
				{
					id: 3,
					name: 'SUV/MPV越野'
				}
			],
			distret: '',
			select_coupon: 0,
			select_car: '',
			select_type: '',
			total_money: 0,
			select_car_price: 0,
			select_info:'',
			address_info:'',
			order_click:false
		};
	},
	comments: {
		popupBottom,
		myPop
	},
	computed: {},
	watch: {
		// promptVisible(newname,olename){
		// 	console.log(newname);
		// 	if(newname==true){
		// 		this.map_height=0
		// 	}else{
		// 		this.map_height=uni.getStorageSync('top_height')
		// 	}
		// }
	},
	onReady() {
		const query = uni.createSelectorQuery().in(this);
		query
			.select('#target')
			.boundingClientRect(data => {
				console.log('得到布局位置信息' + JSON.stringify(data));
				console.log('节点离页面顶部的距离为' + data.top);
				uni.setStorageSync('top_height', data.top < 500 ? 500 : data.top);
				//this.map_height=data.top+'px'
			})
			.exec();
		this.getLocation();
	},
	onShow() {
		// query.select('#target').boundingClientRect(data => {
		// 	console.log('11111111')
		// 	console.log(data)
		// }).exec();
        
		let _this = this;
		let coupon_num = 0;
		var c = 0;
		let coupon = uni.getStorageSync('coupon');
		uni.removeStorageSync('coupon')
		if (coupon) {
			console.log(JSON.parse(coupon));
			this.coupon = JSON.parse(coupon);
			c = this.coupon.fNum;
			
		}
		this.select_car = uni.getStorageSync('select_car');
		this.select_coupon = uni.getStorageSync('select_car_coupon');
		this.select_type = uni.getStorageSync('select_type');
		this.select_car_price = uni.getStorageSync('select_car_price');
        this.select_info=uni.getStorageSync('select_info')
		
		if(this.coupon!=''){
				if (this.select_type != this.coupon.fType) {
			c = 0;
			uni.showModal({
				title: '优惠券使用提示',
				content: '选择车型与优惠券不相符，请重新选择，否则无法享受优惠！',
				success(re) {}
			});
			this.coupon=''
			uni.removeStorageSync('coupon')
		}
		}
	    console.log(this.$on('cancel_coupon'));
	    
		this.total_money = this.select_car_price - this.select_coupon - c;
		
	},
	onLoad() {
		uni.$off('openMap');
		uni.$off('openbill');
		uni.setNavigationBarTitle({
			title: '下单'
		});
		let height = uni.getStorageSync('top_height');
		this.map_height = height;
		this.user_uuid = this.checkLogin().user_uuid;

		this.myAmapFun = new amapFile.AMapWX({ key: amapKey });
		this.mapContext = uni.createMapContext('navi_map');

		// #ifdef APP-PLUS
		//this.subNVues = uni.getSubNVueById('choselocation')
		// uni.$on('openMap', data => {
		// 	this.chooseAddress(1)
		// });
		uni.$on('openbill', () => {
			//this.openOrders()
		});
		// #endif
	},
	methods: {
		close() {
			this.promptVisible = false;
		},
		open() {
			this.promptVisible = true;
		},
		open_cars() {
			uni.navigateTo({
				url: 'choose-car/choose-car?distret=' + this.distret
			});
		},
		clickPromptConfirm(e) {
			console.log(e);
		},
		choose_coupon() {
			uni.navigateTo({
				url: 'choose-coupon/choose-coupon'
			});
		},
		onPopupReachBottom(e) {
			console.log(e);
			// this.$refs['popup'].setContViewHeight();//手动刷新内容区域高度
		},
		order_close(e) {
			console.log(e);
			this.order_show = false;
		},
		// 选择上车地点，下车地点
		chooseAddress(type) {
			uni.chooseLocation({
				longitude: this.fromLongitude,
				latitude: this.fromLatitude,
				success: res => {
					const { name, longitude, latitude } = res;
					console.log(res);
					if (type === 1) {
						this.fromLongitude = longitude;
						this.fromLatitude = latitude;
						this.address = name;
						// #ifdef APP-PLUS
						uni.$emit('location', {
							location: res
						});
						uni.$emit('locationMap', {
							location: res
						});
						// #endif
					} else {
						this.toLongitude = longitude;
						this.toLatitude = latitude;
						this.toAddress = name;
						// #ifdef APP-PLUS
						uni.$emit('tolocation', {
							tolocation: res
						});
						// #endif
					}
					//this.getDistance()
					this.getMark();
					this.goCenter();
				}
			});
		},
		getMark() {
			_this = this;
			this.markers = [
				{
					iconPath: '/static/start.png',
					id: 0,
					latitude: this.fromLatitude,
					longitude: this.fromLongitude,
					width: 36,
					height: 36
				}
			];
			// this.polyline = [{
			// 	points: points,
			// 	color: "#0091ff",
			// 	width: 6,
			// 	arrowLine: true,
			// 	borderColor: "#0091ff",
			// 	borderWidth: 2,
			// 	dottedLine: false
			// }]

			let includePoints = [
				{
					latitude: this.fromLatitude,
					longitude: this.fromLongitude
				}
			];

			// #ifdef APP-PLUS
			// this.polyline = [{
			// 	points: points,
			// 	color: "#0091ff",
			// 	width: 12,
			// 	arrowLine: true,
			// 	borderColor: "#0091ff",
			// 	borderWidth: 4,
			// 	dottedLine: false
			// }]
			uni.$emit('includePoints', {
				includePoints: includePoints,
				//polyline: this.polyline,
				markers: this.markers
			});
			// #endif
			_this.mapContext.includePoints({
				points: includePoints,
				padding: [80, 80, 80, 80]
			});
		},
		// 计算距离
		getDistance() {
			let _this = this;
			_this.myAmapFun.getDrivingRoute({
				origin: `${_this.fromLongitude},${_this.fromLatitude}`,
				destination: `${_this.toLongitude},${_this.toLatitude}`,
				success: data => {
					let points = [];
					if (data.paths && data.paths[0] && data.paths[0].steps) {
						var steps = data.paths[0].steps;
						for (var i = 0; i < steps.length; i++) {
							var poLen = steps[i].polyline.split(';');
							for (var j = 0; j < poLen.length; j++) {
								points.push({
									longitude: parseFloat(poLen[j].split(',')[0]),
									latitude: parseFloat(poLen[j].split(',')[1])
								});
							}
						}
					}
					_this.markers = [
						{
							iconPath: '/static/start.png',
							id: 0,
							latitude: _this.fromLatitude,
							longitude: _this.fromLongitude,
							width: 36,
							height: 36
						},
						{
							iconPath: '/static/end.png',
							id: 1,
							latitude: _this.toLatitude,
							longitude: _this.toLongitude,
							width: 36,
							height: 36
						}
					];
					_this.polyline = [
						{
							points: points,
							color: '#0091ff',
							width: 6,
							arrowLine: true,
							borderColor: '#0091ff',
							borderWidth: 2,
							dottedLine: false
						}
					];

					let includePoints = [
						{
							latitude: _this.fromLatitude,
							longitude: _this.fromLongitude
						},
						{
							latitude: _this.toLatitude,
							longitude: _this.toLongitude
						}
					];

					// #ifdef APP-PLUS
					_this.polyline = [
						{
							points: points,
							color: '#0091ff',
							width: 12,
							arrowLine: true,
							borderColor: '#0091ff',
							borderWidth: 4,
							dottedLine: false
						}
					];
					uni.$emit('includePoints', {
						includePoints: includePoints,
						polyline: _this.polyline,
						markers: _this.markers
					});
					// #endif
					_this.mapContext.includePoints({
						points: includePoints,
						padding: [80, 80, 80, 80]
					});

					if (data.paths[0] && data.paths[0].distance) {
						_this.distance = (data.paths[0].distance / 1000).toFixed(2) == '0.00' ? 0 : (data.paths[0].distance / 1000).toFixed(2);
					}
					if (data.taxi_cost) {
						this.getPrice(_this.distance);
					}
				},
				fail: function(info) {
					console.log(info);
				}
			});
		},

		getLocation() {
			this.address = '正在定位中，请稍后';
			this.myAmapFun.getRegeo({
				success: data => {
					console.log(data);
					const { name, longitude, latitude, regeocodeData } = data[0];
					this.city = regeocodeData.addressComponent.city;
					this.distret = regeocodeData.addressComponent.district;
					this.address_info=regeocodeData.addressComponent;
					this.address = name;
					this.longitude = longitude;
					this.latitude = latitude;
					this.fromLongitude = longitude;
					this.fromLatitude = latitude;
					// #ifdef APP-PLUS
					setTimeout(() => {
						uni.$emit('location', {
							location: data[0]
						});
						uni.$emit('locationMap', {
							location: data[0]
						});
					}, 500);
					// #endif
					this.chooseAddress(1);
					//this.getMark()
				},
				fail: e => {
					console.log(e);
				}
			});
			//this.goCenter();
		},
		async goCenter() {
			const _this = this;
			_self = this;
			_this.mapContext.moveToLocation({
				longitude: this.fromLongitude,
				latitude: this.fromLatitude,
				success() {
					_self.map_height = uni.getStorageSync('top_height');
					console.log(_self.map_height);
					console.log('回中心成功');
				}
			});
		},
		getPrice(distance) {
			this.$http('post', '/api/template/getMoneyByDistance', {
				data: {
					city: this.city,
					distance: distance
				},
				success: res => {
					this.priceEstimate = `${distance}千米 打车约${parseInt(res.data)}元`;
					// #ifdef APP-PLUS
					setTimeout(() => {
						uni.$emit('priceEstimate', {
							priceEstimate: this.priceEstimate
						});
					}, 500);
					// #endif
				}
			});
		},
		openOrders() {
			if (!this.tip_address) {
				uni.showToast({
					title: '请输入准确备注地址，方便洗车工人导航',
					icon: 'none',
					duration:4000
				});
				//return;
			}
		  uni.pageScrollTo({
				scrollTop: 100000
			});
		this.create_order_2(this.select_info,this.total_money)
		},
		create_order_2(car_info, price) {
			console.log(this.user_uuid);
			console.log(this.address_info_all);
			console.log(car_info);
			console.log(price);
			_self=this
			this.order_click=true
			// console.log('经度：' + res.longitude);
			// console.log('纬度：' + res.latitude);
			if (this.address_info.district) {
				uni.showLoading();
				uni.request({
					url: this.tp_url + 'c_create_order',
					data: {
						user_uuid: this.user_uuid,
						lat: this.fromLatitude,
						lgt: this.fromLongitude,
						car_uid: car_info.fCar_uuid,
						price: price,
						district:this.address_info.district,
						address1: this.address_info.city + this.address_info.district + this.address_info.streetNumber.street + this.address_info.streetNumber.number,
						address2: this.tip_address,
						coupon_uid:this.select_type==this.coupon.fType?this.coupon.fUid:''
					},
					success(re) {
						console.log(re.data);
						if (re.data.res == 200) {
							uni.hideLoading(); 
							
							// let params = {
							// 	type: 'success',
							// 	message: re.data.msg,
							// 	url: 'pay/pay?uid='+re.data.data.order_uid+"&price="+re.data.data.price
							// };
							// _self.$refs.uToast.show({
							// 	...params,
							// 	complete() {
							// 		params.url &&
							// 			uni.navigateTo({
							// 				url: params.url
							// 			});
							// 	}
							// });
							
							uni.showModal({
								title:'下单提示',
								content:re.data.msg,
								confirmText:'立即支付',
								success(r) {
									if(r.confirm){
										setTimeout(()=>{
									uni.navigateTo({
											url:'../pay/pay?uid='+re.data.data.order_uid+"&price="+re.data.data.price
										})
										},600)
										
									}else{
										setTimeout(()=>{
										uni.navigateTo({
												url:'../pay/pay?uid='+re.data.data.order_uid+"&price="+re.data.data.price
											})
											},600)
									}
								}
							})
							
							_self.order_click=false
							// uni.navigateTo({
							// 	url: 'pay/pay'
							// });
						} else {
							uni.showToast({
								title: re.data.msg,
								icon: 'none',
								duration:2000
							});
							_self.coupon=''
							_self.order_click=false
						}
					} 
				});
			} else {
				uni.showToast({
					title: '定位信息有误，不能下单',
					icon: 'error',
					duration:3000
				});
				this.order_click=false
			}
		},
		
		
		
	}
};
</script>

<style lang="scss">
.map-label {
	position: absolute;
	top: 50%;
	left: 50%;
	// transition: (0, -50%);
	transform: translateX(-50%);
	background: #0066cc;
	color: #ffffff;
	border-radius: 10rpx;
	margin-top: -160rpx;
	height: 60rpx;
	padding: 0 20rpx;
	line-height: 56rpx;
	font-size: 24rpx;
	text-align: center;
}
.flex-item.active {
	color: #0091ff;
}
.map_box {
	position: relative;
	top: 0px;
	left: 0px;
	z-index: 3333;
	height: 80%;
}
#navi_map {
	width: 750rpx;
	height: 800rpx;
}
.text_box {
	position: absolute;
	height: 90px;
	bottom: 0px;
	left: 0px;
	right: 0px;
}
.text_box .text {
	margin: 15px;
}
.detail_button {
	position: absolute;
	bottom: 30px;
	right: 10px;
	padding: 3px 5px;
	color: #fff;
	background: #0091ff;
	width: 50px;
	text-align: center;
	border-radius: 5px;
}
.footer-view {
	box-sizing: border-box;
	background: #ffffff;
	padding: 20rpx 26rpx;
	width: 100%;
	position: absolute;
	bottom: 0;
	z-index: 6666;
	left: 0;
	border-radius: 32rpx 32rpx 0px 0px;
	// border-top-right-radius: 50rpx;
	// border-top-left-radius: 50rpx;
	.current-address {
		color: #333333;
		font-size: 32rpx;
		line-height: 72rpx;
		// padding: 20rpx 0;
		height: 50rpx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
		margin-bottom: 20rpx;
		.address {
			color: #18b566;
		}
	}
	.button-confirm {
		width: 100%;
		overflow: hidden;
		background: #f8f8f8;
		border-radius: 12rpx;
		height: 90rpx;
		line-height: 90rpx;
		padding: 0 10rpx;
		color: #333333;
		margin-bottom: 60rpx;
		.dot-dot {
			width: 10rpx;
			height: 10rpx;
			border-radius: 50%;
			float: left;
			margin-left: 20rpx;
			margin-top: 40rpx;
			background: #fa3534;
		}
		.to-address {
			color: #666666;
			font-size: 32rpx;
			float: left;
			margin-left: 20rpx;
		}
	}
	.price-estimate {
		color: #f29100;
		font-size: 32rpx;
		line-height: 1;
		margin-bottom: 30rpx;
	}
}
</style>
