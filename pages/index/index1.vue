<template>
	<view>
		<!-- <u-button @click="open_notice">打开提示框</u-button>
		
		 <uni-sign-in ref="signIn"></uni-sign-in>
		<button type="default" @click="signIn">普通签到</button>
		<button type="default" @click="signInByAd">看广告签到</button> -->
		<!-- 弹出窗口 -->
		<!-- #ifdef MP-WEIXIN -->
		<u-notify ref="uNotify" message="Hi uView"></u-notify>
		<!-- #endif -->

		<u-swiper :list="list3" indicator indicatorMode="line" circular height="200"></u-swiper>
		<u-notice-bar :text="text1" mode="closable"></u-notice-bar>

		<view class="p-10 m-t-5" style="background-color: #FFFFFF;">
			<swiper :indicator-dots="true" class="swiper">
				<swiper-item>
					<u-grid :border="false" col="4">
						<u-grid-item v-for="(listItem, listIndex) in list4" :key="listIndex" @click="choose_grid(listItem)">
							<!-- <u-icon
		                :customStyle="{paddingTop:20+'rpx'}"
		                :name="listItem.name"
		                :size="22"
		        ></u-icon> -->
							<image :src="getImgsrc(`grid_1/${listItem.icon}`)" mode="aspectFill" class="img_35"></image>
							<text class="grid-text m-t-10">{{ listItem.name }}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
				<swiper-item>
					<u-grid :border="false" col="4">
						<u-grid-item v-for="(listItem, listIndex) in list2" :key="listIndex" @click="choose_grid(listItem)">
							<!-- <u-icon
			            :customStyle="{paddingTop:20+'rpx'}"
			            :name="listItem.name"
			            :size="22"
			    ></u-icon> -->
							<image :src="getImgsrc(`grid_1/${listItem.icon}`)" mode="aspectFill" class="img_35"></image>
							<text class="grid-text m-t-10">{{ listItem.name }}</text>
						</u-grid-item>
					</u-grid>
				</swiper-item>
			</swiper>
		</view>
		<!-- 洗车下单 -->
		<view style="background-color: #FFFFFF; margin-top: 10px; padding-top: 10px; padding-bottom: 10px;">
			<u-swiper
				:list="car_list"
				previousMargin="30"
				nextMargin="30"
				circular
				:autoplay="false"
				radius="5"
				bgColor="#ffffff"
				@change="car_change"
				@click="car_click"
				height="200px"
				:current="select_car_num"
			></u-swiper>
			<view class="u-f-dc u-f-ac u-f-ajc">
				<view class="u-f-dr u-f-ac">
					<text class="f-b-wwb" style="color: #ED1C24;">{{ car_info.price }}元</text>
					<text class="m-l-10 c-grey">{{ car_info.name }}</text>
				</view>

				<view class="p-5" style="width: 50%;">
					<u-button
						type="error"
						shape="circle"
						style="background-color: #ED1C24;"
						@click="create_order(car_info, car_info.youhui != null ? car_info.price - car_info.youhui.youhui : car_info.price)"
					>
						洗车下单
					</u-button>
				</view>
			</view>
		</view>

		<!-- <view>{{toTime(1654099200*1000)}} </view> -->
		<!-- 附近推荐 -->
		<view class="p-10 m-t-10">
			<u-collapse @change="change" @close="close" @open="open">
				<u-collapse-item title="附近推荐洗车工人" name="Docs guide">
					<text class="u-collapse-content">{{ address }}</text>
				</u-collapse-item>
			</u-collapse>
			<!-- <view><text class="f-b-wb">附近洗车工推荐</text></view> -->

			<view class="u-f-dc" style="position: relative;">
				<view class="eg-filter" style="position: absolute; z-index: 999; margin-left: -10px;">
					<i671-filter @result="filterResult" :headerTextList="headerTextList" :checkboxList="checkboxList" :radioList="radioList" :is_fix="is_fix_select"></i671-filter>

					<view class="eg-filter-list"></view>
				</view>
			</view>
			<view style="margin-top: 120upx;">
				<block v-for="(item, index) in 100" :key="index">
					<view>
						<view class="bd-r-5 p-5" style="background-color: #FFFFFF; margin-top: 5px;">
							<view class="u-f-dr u-f-ac" style="width: 100%;">
								<view style="width: 20%;"><image :src="getImgsrc('logo.png')" mode="aspectFit" class="img_35"></image></view>
								<view style="width: 80%;">
									<view class="f-b-wb">王师傅（萧山瓜沥镇）</view>
									<view class="u-f-dr u-f-ac u-f-jsb">
										<view class="u-f-dr u-f-ac" style="font-size: x-small;">
											<text style="color: #ED1C24;">★5.00</text>
											<text class="m-2 c-grey">|</text>
											<text>126单</text>
										</view>
										<text style="font-size: small;">1.21km</text>
									</view>
								</view>
							</view>
							<view class="u-f-dr u-f-ac u-f-jsb">
								<view class="u-f-dc">
									<text class="f-b">标准.环保洗车</text>
									<view class="c-green u-f-dr u-f-ac" style="">
										<view style="border: 1rpx solid #009900; border-radius: 5px;font-size: 8px; font-weight: 100; padding: 1px;">可预约</view>
										<view style="border: 1rpx solid #009900; border-radius: 5px; margin-left: 5px; font-size: 8px; font-weight: 100;  padding: 1px;">
											已售出23
										</view>
									</view>
								</view>
								<view class="u-f-dr u-f-ac">
									<view class="u-f-dc">
										<view class="u-f-dr u-f-ac" style="color: #ED1C24;">
											<view style="border-radius: 20px; border: 1rpx solid #ED1C24; font-size: xx-small; font-weight: 200; padding: 0px 3px;">劵后价</view>
											<text class="m-2" style="font-size: xx-small;">¥</text>
											<text style="font-size: large; font-weight: 800;">29</text>
										</view>
										<view class="u-f-dr u-f-ac">
											<text class="c-grey">原价：</text>
											<text class="c-grey" style="margin-top: -5px; font-size: small;text-decoration:line-through">¥67</text>
										</view>
									</view>
									<view class="bd-r-20 m-l-10" hover-class="bubble" style="background-color: #669934; color: #FFFFFF; font-weight: 700; padding: 2px 10px;">
										预约下单
									</view>
								</view>
							</view>
						</view>
					</view>
				</block>
			</view>
		</view>

		<myPopp :visible="visible" :comfirmValue="comfirmValue" :title="title" @confirm="popconfirm" :percent="percent" :is_percent="is_percent">
			<view class="p-10">
				<view>下载进度</view>
				<view class="p-8" style="width: 100%;"><progress :percent="percent" show-info stroke-width="5" style="width:200px;height: 20px;" /></view>
			</view>
		</myPopp>
		<u-modal
			:show="login_show"
			:title="`登陆提示`"
			:cancelText="`取消`"
			@confirm="login_confirm"
			confirmText="立即登陆"
			:showCancelButton="true"
			@cancel="login_cancel"
			confirmColor="#669934"
		>
			<view class="u-f-dc u-f-ac">
				<image :src="getImgsrc('weidenglu.png')" mode="aspectFit" class="img_50"></image>
				<text>您还没有登陆，请登录！</text>
			</view>
		</u-modal>
		<!-- 下单提示 -->
		<!--  <u-action-sheet :closeOnClickOverlay="true"  :title="`确认订单`" :show="order_show" @close="order_close()">
		  <view class="p-10" style="height: 300px; background-color: #669934;">
			  dd
		  </view>
	  </u-action-sheet> -->
		<popupBottom ref="popup" :visible.sync="order_show" title="订单确认" radius="1" maxHeight="900" @close="order_close()" @reachBottom="onPopupReachBottom()">
			<view class="p-10" style="height: 1000upx;">
				<!-- <view class="p-20" style="background-color: #ED1C24; color: #FFFFFF;" @click="dianji">点击</view> -->
				<view class="u-f-dc" style="width: 100%;">
					<view class="u-f-dr">
						<text class="c-grey">当前位置：</text>
						<text class="f-b-wb">{{ address_info.city + address_info.district }}</text>
					</view>
					<view class="u-f-dr">
						<text class="c-grey" style="white-space: nowrap;">完善地址：</text>
						<!-- 		<textarea v-model="address_detail" placeholder="请补充完整的地址信息" maxlength="100" style="height: 60px; border: 1rpx solid #dbdbdb; padding: 8px;"></textarea> -->

						<u--textarea v-model="address_detail" placeholder="请补全地址信息" count></u--textarea>
					</view>
					<!-- <view class="hr"></view> -->
					<view class="p-8 bd-r-5 m-t-10" style="border: 1rpx solid #dbdbdb;">
						<view class="u-f-dr u-f-ac">
							<image :src="car_list[select_car_num]" mode="aspectFit" class="img_75"></image>
							<view class="u-f-dc m-l-10" style="width: 100%;">
								<text class="f-b-wb">{{ car_info.name }}</text>
								<view class="u-f-dr u-f-ac">
									<view class="bd-box-grey f-s-10">未消费，随时可退款</view>
									<view class="m-l-8 bd-box-grey f-s-10">过期可退</view>
								</view>
								<view class="u-f-dr u-f-ac u-f-jsb" style="width: 100%;">
									<view></view>
									<view class="u-f-dr u-f-ac m-t-10">
										<text class="c-grey">门市价：¥{{ car_info.old_price }}</text>
										<text class="f-b-wwb m-l-8" style="color: #ED1C24;">¥{{ car_info.price }}</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<view v-if="car_info.youhui != null" class="m-t-10 p-8 u-f-dr u-f-ac u-f-jsb" style="width: 100%;">
						<text class="f-b-w6"></text>
						<view class="u-f-dr u-f-ac">
							<text class="f-s">地区政策优惠</text>
							<text style="color: #ED1C24;">-¥{{ car_info.youhui != null ? car_info.youhui.youhui : 0 }}</text>
						</view>
					</view>
					<view class="m-t-10 p-8 u-f-dr u-f-ac u-f-jsb" style="width: 100%;">
						<text class="f-b-w6">优惠</text>
						<view class="u-f-dr u-f-ac" @click="to_youhuiquan()">
							<text>标准洗车满减卷</text>
							<text style="color: #ED1C24;">-¥{{ coupon_num }}</text>
							<image :src="getImgsrc('gengduo.png')" mode="" class="img_15"></image>
						</view>
					</view>
					<view class="p-20 u-f-dr u-f-ac u-f-jsb" style="width: 100%;">
						<view class="u-f-dc u-f-ac">
							<text class="f-b-wb" style="color: #ED1C24;">
								¥{{ car_info.youhui != null ? car_info.price - car_info.youhui.youhui - coupon_num : car_info.price - coupon_num }}
							</text>
							<view class="u-f-dr u-f-ac">
								<text class="f-s">已优惠</text>
								<text class="f-s" style="color: #ED1C24;">
									¥{{
										car_info.youhui != null
											? car_info.youhui.youhui + coupon_num + car_info.old_price - car_info.price
											: coupon_num + car_info.old_price - car_info.price
									}}
								</text>
							</view>
						</view>
						<u-button
						v-show="!order_click"
							type="error"
							shape="circle"
							style="background-color: #ED1C24; width: 50%;"
							@click="create_order_2(car_info, car_info.youhui != null ? car_info.price - car_info.youhui.youhui - coupon_num : car_info.price - coupon_num)"
						>
							确认并下单
						</u-button>
						<u-button
						v-show="order_click"
							type="error"
							shape="circle"
							style="background-color: #ED1C24; width: 50%;"
							
						>
							确认并下单
						</u-button>
					</view>
				</view>
			</view>
		</popupBottom>
		<!-- 测试升级模块 -->
		<!-- 	<zy-update theme="green" :h5preview="true" oldversion="1.0.3" :appstoreflag="false" :updateurl="update_url" :autocheckupdate="true"></zy-update> -->
		<u-action-sheet
			:actions="coupon_list"
			cancelText="取消"
			@select="selectClick"
			:title="`优惠券选择`"
			:show="coupon_show"
			:closeOnClickOverlay="true"
			:closeOnClickAction="true"
			@close="coupon_close"
		></u-action-sheet>

		<u-toast ref="uToast"></u-toast>
	</view>
</template>

<script>
var _self;
const innerAudioContext = uni.createInnerAudioContext();

innerAudioContext.autoplay = true;
// #ifdef APP-PLUS
const dcRichAlert = uni.requireNativePlugin('DCloud-RichAlert');
// #endif
import myPopp from '../../components/my-pop/index.vue';
//import md5 from '../../components/md5/md5.js'
import i671Filter from '../../components/i671-filter/i671-filter.vue';
import tabbbar from '@/components/tabbar.vue';
import popupBottom from '@/components/px-popup-bottom.vue';
//import ZyUpdate from '@/components/zy-upgrade/zy-upgrade.vue' //升级
export default {
	data() {
		return {
			order_click:false,
			order_show: false,
			description: 'uView是uni-app生态专用的UI框架',
			closable: true,
			user_uuid: '',
			index_title: '《平台申明》',
			update_url: 'http://121.43.40.52/fmr/public/index.php/car_api/index/c_test_update',
			ty: '',
			channel: 'car',
			task: false,
			badge_module: '',
			user_info: [],
			order: 0,
			yeji: 0,
			pre_yeji: 0,
			text_list: [],
			count: 0,
			shouyi: 0,
			leval: 0,
			zhitui: 0,
			is_click: 0,
			version: this.Config.version,
			is_update: 0,
			inter: null,
			visible: false,
			comfirmValue: '后台下载',
			title: '上门洗车',
			percent: 0,
			is_percent: true,
			down_load: '',
			user_type: 0,
			l: [],
			bt_list: [],
			coins: [],
			fil_price: 0,
			tasker2: false,
			info: '',
			promptVisible: false,
			is_agree: true,
			is_down: false,
			is_login: false,
			tel: '',
			head: '',
			jifen: 0,
			level: 1,
			max_level: 11,
			shou_task: '',
			zhuan_task: '',
			is_shiming: false,
			is_alive: false,
			manager_notic: 0,
			list2: [],
			list4: [],
			list3: ['https://cdn.uviewui.com/uview/swiper/swiper3.png', 'https://cdn.uviewui.com/uview/swiper/swiper2.png', 'https://cdn.uviewui.com/uview/swiper/swiper1.png'],
			text1: '【 洗车e族 】，有车族的福利，【 一键上门 】精美环保洗车，赶紧推荐好友一起体验吧！',
			filterData: [],
			filterDropdownValue: 0,
			headerTextList: [
				{
					name: '综合排序',
					key: 'house_type'
				},
				{
					name: '价格',
					key: 'price_sort'
				},
				{
					name: '筛选',
					key: 'filtrate'
				}
			],

			// 户型
			radioList: [
				{
					name: '全部',
					key: 0
				},
				{
					name: '综合排序',
					key: 1
				},
				{
					name: '评分最高',
					key: 2
				},
				{
					name: '接单最多',
					key: 3
				},
				{
					name: '好评最多',
					key: 4
				},
				{
					name: '星级最高',
					key: 5
				}
			],

			// 多选
			checkboxList: [
				'认证',
				'最快到场',
				'装备齐全',
				'服务态度',
				'着装整洁',
				'洗车最快',
				'洗车最慢',
				'最精细',
				'无投诉',
				'100%成交',
				'回头客',
				'距离最近',
				'1-2公里',
				'2-3公里',
				'3-5公里',
				'10-30元',
				'30-50元',
				'50元以上'
			],
			is_fix_select: false,
			login_show: false,
			fujin: '',
			address: '',
			choose_count: 0,
			car_list: ['https://cdn.uviewui.com/uview/swiper/swiper3.png'],
			cars_info: '',
			car_info: '',
			select_car_num: 0,
			address_info: '',
			address_info_all: '', //系统调用定位返回信息
			coupon_info: '', //优惠券信息
			coupon_num: 0,
			address_detail: '',
			coupon_show: false,
			coupon_list: []
		};
	},
	components: {
		//md5,
		myPopp,
		i671Filter,
		tabbbar,
		popupBottom
		//ZyUpdate
	},

	onPageScroll(e) {
		//console.log(e.scrollTop);
		if (e.scrollTop > 800) {
			this.is_fix_select = true;
		} else {
			this.is_fix_select = false;
		}
	},
	onLoad() {
		this.visible = false;
		console.log(this.version);
		// uni.showTabBarRedDot({
		// 	index: 3
		// });
		// uni.setTabBarBadge({
		// 	//显示未读消息条数
		// 	index: 2,
		// 	text: `${this.car_list.length}`
		// });
		// uni.removeTabBarBadge({index:3})
	},
	onShow() {
		this.getUpdate();

		// var md=md5.hex_md5("yyk2012")
		// console.log(md);
		// var url = 'http://h2.76ierdf.cn';
		// this.get_movie(url);
		
	    //#ifdef APP-PLUS
		this.socket();
	    this.badge_module = uni.requireNativePlugin('Laowu-BadgeModule');
	    // #endif
		if(this.address_info!=''){
		console.log(this.address_info);
		}else{
				setTimeout(() => {
			this.get_location();
		}, 500);
		}
		
	
		this.load_grid();
		this.get_cars();
		//uni.removeStorageSync('user_uuid')
		// #ifdef MP-WEIXIN
		//uni.setStorageSync('user_uuid', 'admin001');
		// #endif
		// #ifdef APP
		//uni.setStorageSync('user_uuid', 'admin001');
		// #endif
      //判断登陆
      this.user_uuid = this.checkLogin().user_uuid;
      if (this.user_uuid) {
      	console.log(this.user_uuid);
      
      	this.load_user_info()
      } else {
      	// uni.showModal({
      	// 	title: '登录提示',
      	// 	content: '你还没有登录，请登录！',
      	// 	success(res) {
      	// 		uni.navigateTo({
      	// 			url: '../login/login'
      	// 		});
      	// 	}
      	// });
      	this.login_show = true;
		this.isHaveNetwork()
      }
	
		//定位信息
		_self = this;
		// setInterval(function() {
		// 	_self.get_location();
		// }, 10000);
		
		uni.setNavigationBarColor({
			frontColor: '#ffffff',
			backgroundColor: '#ff0000',
			animation: {
				duration: 400,
				timingFunc: 'easeIn'
			}
		});
		setInterval(function(re){
			_self.update_lat_lng()
		},30000)
		
	},
	onNavigationBarButtonTap(e) {
		console.log(e);
		if (e.index == 0) {
			console.log('to_choose_address');
			uni.navigateTo({
				url: './choose_city/choose_city'
			});
		}
	},
	watch: {
		select_car_num: {
			handler(n, old) {
				console.log(n);
				_self = this;
				for (let i = 0; i < this.cars_info.length; i++) {
					if (this.cars_info[i].fID == n + 1) {
						_self.car_info = this.cars_info[i];
					}
				}
				//_self.car_change({current:0})
				console.log(this.cars_info);
			},
			immediate: true,
			deep: true
		}
	},

	methods: {
		isHaveNetwork(){
		
		uni.getNetworkType({
		
		    success: (res) => {
		
		if(res.networkType=='none'){
		
		uni.showModal({
		
		    title: '没有网络',
		
		    content: '是否重新连接',
		
		    success: (res) => {
		
		        if (res.confirm) {
		
		     this.isHaveNetwork()   //再次判断
		
		        } else if (res.cancel) {
		
		            
		
		        }
		
		    }
		
		});
		
		}else{
		
		this.getData('')  //有网
		
		}
		
		    }
		
		});
		
		},
		update_lat_lng(){
			_self=this
			console.log("更新经纬度");
			uni.getLocation({
				type: 'gcj02',
				isHighAccuracy: true,
				geocode: true,
				success: function(res) {
					//console.log(res);
					console.log('经度：' + res.longitude);
					console.log('纬度：' + res.latitude);
					_self.save_lat_lng(res.latitude,res.longitude)
					if(_self.user_info.fType!=1){
						_self.load_watchers(res.address.city,res.address.district,res.latitude,res.longitude)
					}
					},
				})
			
		},
		async save_lat_lng(lat,lng){
			let op = {
				url: 'c_update_lat_lng',
				data: {
					lat:lat,
					lng: lng,
					user_uuid:this.user_uuid
				}
			};
			let res = await this.$my_Request(op);
			
			if(res.data.res==200){
				console.log(res.data.msg);
				
			}
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
						
					 if(r.order_num>0){
						 uni.setTabBarBadge({
						 	//显示未读消息条数
						 	index: 2,
						 	text: `${r.order_num}`
						 });
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
		async load_watchers(city,area,lat,lng){
			console.log("获取周边洗车工人:"+city+","+area);
			let op = {
				url: 'c_load_watchers',
				data: {
					city:city,
					area: area,
					lat:lat,
					lng:lng,
					user_uuid:this.user_uuid
				}
			};
			let res = await this.$my_Request(op);
			console.log(res);
			
			
		},
		coupon_close() {
			this.coupon_show = false;
		},
		selectClick(e) {
			console.log(e);
			console.log(this.select_car_num);
			if (e.type != this.select_car_num) {
				uni.showModal({
					title: '优惠券使用提示',
					content: '当前选择优惠券仅限用于' + this.get_car_type(e.type) + '的车辆使用',
					success(re) {}
				});
				this.coupon_num = 0;
			} else {
				this.coupon_num = e.num;
			}
		},
		to_youhuiquan() {
			// uni.navigateTo({
			// 	url:'./coupons/coupons'
			// })
			this.coupon_show = true;
		},
		dianji() {
			console.log('dianji');
		},
		onPopupReachBottom(e) {
			console.log(e);
			// this.$refs['popup'].setContViewHeight();//手动刷新内容区域高度
		},
		order_close(e) {
			console.log(e);
			this.order_show = false;
		},
		create_order(car_info, price) {
			console.log('下单车辆：' + JSON.stringify(car_info));
			console.log('下单金额：' + price);
			this.get_location()
			this.load_coupon(car_info.type); //加载用户优惠券
			//this.order_show = true;
			
		},
		load_coupon(car_type) {
			_self = this;
			uni.showLoading();
			this.coupon_info=''
			uni.request({
				url: this.tp_url + 'c_load_coupon',
				data: {
					user_uuid: this.user_uuid
				},
				header:{
					
				'content-type': 'application/x-www-form-urlencoded' 
				},
				method: 'GET',
				success(re) {
					uni.hideLoading();
					if (re.data.res == 200) {
						console.log(re);
						if (re.data.data.length > 0) {
							_self.coupon_info = re.data.data;
							if (re.data.data.length > 0) {
								let r = re.data.data;
								_self.coupon_list = [];
								for (let i = 0; i < r.length; i++) {
									_self.coupon_list.push({
										name: `(${r[i].fType == car_type ? '可用' : '不可用'})${_self.get_car_type(r[i].fType) + r[i].fTitle + r[i].fNum}元`,
										type: r[i].fType,
										num: r[i].fNum
									});
								}
							}

							_self.coupon_info = _self.coupon_info.filter(item => {
								return item.fType == car_type;
							});
							console.log(_self.coupon_info);
							_self.coupon_num = _self.coupon_info.length > 0 ? _self.coupon_info[0].fNum : 0;
						}

						_self.order_show = true;
					} else {
						uni.showToast({
							title: res.data.msg,
							icon: 'none'
						});
					}
				}
			});
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
			if (this.address_detail != '') {
				uni.showLoading();
				uni.request({
					url: this.tp_url + 'c_create_order',
					data: {
						user_uuid: this.user_uuid,
						lat: this.address_info_all.latitude,
						lgt: this.address_info_all.longitude,
						car_uid: car_info.uid,
						price: price,
						address1: this.address_info.city + this.address_info.district + this.address_info.street + this.address_info.streetNum,
						address2: this.address_detail,
						coupon_uid:this.coupon_num > 0 ? this.coupon_info[0].fUid :''
					},
					success(re) {
						if (re.data.res == 200) {
							uni.hideLoading(); 
							
							let params = {
								type: 'success',
								message: re.data.msg,
								url: 'pay/pay?uid='+re.data.data.order_uid+"&price="+re.data.data.price
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
							_self.order_click=false
							// uni.navigateTo({
							// 	url: 'pay/pay'
							// });
						} else {
							uni.showToast({
								title: re.data.msg,
								icon: 'none'
							});
							_self.order_click=false
						}
					} 
				});
			} else {
				uni.showToast({
					title: '地址信息不完整，请补充完整后再试',
					icon: 'error'
				});
				this.order_click=false
			}
		},
		async get_cars() {
			_self = this;
			this.order_show = false;
			let area = uni.getStorageSync('area');
			let op = {
				url: 'c_get_cars',
				data: {
					area: area
				},
				header:{
					
				'content-type': 'application/x-www-form-urlencoded' 
				},
			};
			let res = await this.$my_Request(op);
			console.log(res.data);
			this.car_list = [];
			this.cars_info = res.data;
			this.car_info = this.cars_info[0];
			for (let i = 0; i < res.data.length; i++) {
				this.car_list.push(res.data[i]['img']);
			}
			console.log(this.car_list);
			this.select_car_num = 0;
		},
		car_change(e) {
			console.log(e);
			let area = uni.getStorageSync('area');
			// this.cars_info=this.cars_info.filter((item)=>{
			// 	return item.fID==e.current
			// })
			// console.log(this.cars_info);
			// this.car_info=this.cars_info[0]
			this.select_car_num = e.current;
		},
		car_click(e) {
			console.log(e);
			let area = uni.getStorageSync('area');
		},
		change() {},
		close() {},
		open() {},
		choose_grid(item) {
			console.log(item);
		},
		login_confirm() {
			this.login_show = false;
			uni.navigateTo({
				url: '../login/login?city='+this.address_info.city+'&area='+this.address_info.district+'&street='+this.address_info.street
			});
		},
		login_cancel() {
			this.login_show = false;
			uni.navigateTo({
				url: '../login/login?city='+this.address_info.city+'&area='+this.address_info.district+'&street='+this.address_info.street
			});
		},
		get_location() {
			_self = this;
			uni.showLoading({
				title:'获取定位...'
			})
			uni.getSystemInfo({
				success(res) {
			   console.log(res);
				}
			})
			uni.getLocation({
				type: 'gcj02',
				isHighAccuracy: true,
				geocode: true,
				success: function(res) {
					console.log(res);
					console.log('经度：' + res.longitude);
					console.log('纬度：' + res.latitude);
					console.log('地址：' + JSON.stringify(res.address));
					_self.address =res.address==undefined?'': res.address.city;
					_self.address_info_all = res;
					_self.address_info = res.address;
					_self.Address_info=res.address
					_self.address_detail=_self.address_info.street + _self.address_info.streetNum
					let city = uni.getStorageSync('city');
					let area = uni.getStorageSync('area');
					uni.setNavigationBarTitle({
						title: '当前城市：' + area ? city + area : res.address.city + res.address.district
					});
					console.log(city);
					console.log(area);
					if(_self.user_info.fType!=1){
						_self.load_watchers(city,area,res.latitude,res.longitude)
					}
			        if (area != res.address.district && _self.choose_count < 2) {
						_self.choose_count++;
						uni.showModal({
							title: '地址差异',
							content: `当前定位地址为:${res.address.district},与选择地址${area}不同，是否切换当前定位地址`,
							confirmText: '立即切换',
							success(re) {
								if (re.confirm) {
									console.log('切换');
								// 	uni.navigateTo({
								// 		url: './choose_city/choose_city'
								// 	});
								// }
								uni.setNavigationBarTitle({
									title: '当前城市：' + res.address.city + res.address.district,
									})
							
								}
							}
						});
					}

					
					uni.hideLoading()
					// #ifdef MP-WEIXIN
					_self.$refs.uNotify.show({
						top: 10,
						type: 'error',
						color: '#000',
						bgColor: '#e8e8e8',
						message: '当前城市：' + res.address.city + res.address.district,
						duration: 200,
						fontSize: 20,
						safeAreaInsetTop: true
					});
					// #endif
					//更新用户的地址信息
					if(_self.user_info.fCity!=res.address.city){
						_self.update_user_address(res.address)
					}
					
				}
			});
		},
		update_user_address(info){
			uni.request({
				url:this.tp_url+'c_update_user_address',
				data:{
					city:info.city,
					area:info.district,
					street:info.street,
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
		load_grid() {
			_self = this;
			uni.request({
				url: this.tp_url + 'c_load_grid',
				success(res) {
					console.log(res.data);
					_self.list4 = res.data.filter(item => item.page == 1);
					_self.list2 = res.data.filter(item => item.page == 2);
				}
			});
		},

		// 获取结果
		filterResult(data) {
			console.log(data);
		},
		signIn() {
			//普通签到
			this.$refs.signIn.open();
		},
		signInByAd() {
			//看激励视频广告签到
			this.$refs.signIn.showRewardedVideoAd();
		},
		get_movie(url) {
			uni.request({
				url: this.tp_url + 'ping',
				method: 'GET',
				success(res) {
					console.log(res.data);
				}
			});
		},
		open_notice() {
			this.visible = true;
			// dcRichAlert.show(
			// 	{
			// 		position: 'bottom',
			// 		title: '提示信息',
			// 		titleColor: '#FF0000',
			// 		content:
			// 			"<a href='https://uniapp.dcloud.io/' value='Hello uni-app'>uni-app</a> 是一个使用 Vue.js 开发跨平台应用的前端框架!\n免费的\n免费的\n免费的\n重要的事情说三遍",
			// 		contentAlign: 'left',
			// 		checkBox: {
			// 			title: '不再提示',
			// 			isSelected: true
			// 		},
			// 		buttons: [
			// 			{
			// 				title: '取消'
			// 			},
			// 			{
			// 				title: '否'
			// 			},
			// 			{
			// 				title: '确认',
			// 				titleColor: '#3F51B5'
			// 			}
			// 		]
			// 	},
			// 	result => {
			// 		switch (result.type) {
			// 			case 'button':
			// 				console.log('callback---button--' + result.index);
			// 				break;
			// 			case 'checkBox':
			// 				console.log('callback---checkBox--' + result.isSelected);
			// 				break;
			// 			case 'a':
			// 				console.log('callback---a--' + JSON.stringify(result));
			// 				break;
			// 			case 'backCancel':
			// 				console.log('callback---backCancel--');
			// 				break;
			// 		}
			// 	}
			// );
		},
		popconfirm(e) {
			_self = this;
			this.visible = false;
			this.is_click += 1;
			if (this.percent != 100) {
				this.inter = setInterval(function() {
					_self.badge_module.setBadge(2);
					_self.badge_module.setPush({
						title: '点亮生活,升级中...',
						content: '已下载' + _self.percent + '%'
					});
					if (_self.percent >= 99) {
						_self.inter = null;
					}
				}, 1000);
			}

			if (e == '') {
				this.visible = false;
			}

			plus.runtime.install(plus.io.convertLocalFileSystemURL(_self.down_load.filename), {}, {}, function(error) {
				uni.showToast({
					title: '安装失败',
					mask: false,
					duration: 1500
				});
			});
		},
		socket() {
			_self = this;
			this.task = uni.connectSocket({
				url: 'ws://47.97.122.25:4000/ws2?channel=' + this.channel + '&user_uuid=' + this.user_uuid,

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
				console.log('websocket打开' + JSON.stringify(e));
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
					if (v.ty == 'huzhuan' && _self.user_uuid == v.uuid) {
						str += '：转账通知';
						plus.push.createMessage(str, 'LocalMSG', options);
						uni.vibrateLong({
							success() {
								_self.badge_module.setBadge(2);
								_self.badge_module.setPush({
									title: '转账通知',
									content: `收到用户转账，请及时查收！\n ${str}`
								});
							}
						});
						innerAudioContext.src = '../../static/audio/shoukuan.aac';
						innerAudioContext.play();
						innerAudioContext.onPlay(() => {
							console.log('开始播放');
							uni.showModal({
								title: '收款提示',
								content: '收到用户转账，请查收！'
							});
						});
					}
					if (v.ty == 'chongzhi' && _self.user_uuid == v.uuid) {
						//var data=JSON.parse(v.data)
						var data2 = eval('(' + v.data + ')');
						//console.log(data);
						console.log(data2);

						str = _self.toTime(new Date());
						str += '：收到充值申请';
						plus.push.createMessage(str, 'LocalMSG', options);

						uni.vibrateLong({
							success() {
								_self.badge_module.setBadge(1);
								_self.badge_module.setPush({
									title: '充值提示',
									content: '收到用户充值，请及时处理！'
								});
							}
						});
						innerAudioContext.src = '../../static/audio/shoukuan.aac';
						innerAudioContext.play();
						uni.showModal({
							title: '用户充值提示',
							content: `收到用户充值，金额：${data2.gold}个\n ${str}`,
							confirmText: '立即审核',
							success(re) {
								if (re.confirm) {
									uni.navigateTo({
										url: '../my/chongzhi-shenhe/chongzhi-shenhe'
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
										url: '../my/shenfen-shenhe/shenfen-shenhe'
									});
								}
							}
						});
					}
					//基金会打款
					if (v.ty == 'jijin' && _self.user_uuid == v.uuid) {
						str = _self.toTime(new Date());
						var data2 = eval('(' + v.data + ')');
						str += '：收到帮扶基金打款：' + data2.gold + 'USDT';
						plus.push.createMessage(str, 'LocalMSG', options);
						uni.vibrateLong({
							success() {
								_self.badge_module.setBadge(1);
								_self.badge_module.setPush({
									title: '帮扶基金打款提示',
									content: `${str}`
								});
							}
						});
						var data = JSON.parse(v.data);
						var data2 = eval('(' + v.data + ')');
						console.log(data);
						console.log(data2);

						uni.showModal({
							title: '打款提示',
							content: `收到帮扶基金打款，请审核\n ${str}`,
							confirmText: '立即审核',
							success(re) {
								if (re.confirm) {
									uni.navigateTo({
										url: 'login-out/manager/jijin-dakuan-shenhe/jijin-dakuan-shenhe'
									});
								}
							}
						});
					}
					//收到催款
					if (v.ty == 'cuikuan' && _self.user_uuid == v.uuid) {
						str = _self.toTime(new Date());
						var data2 = eval('(' + v.data + ')');
						str += '：请立即打款,金额为：' + data2.gold + 'Usdt';
						plus.push.createMessage(str, 'LocalMSG', options);
						uni.vibrateLong({
							success() {
								_self.badge_module.setBadge(1);
								_self.badge_module.setPush({
									title: '催款提示',
									content: `收到上级推广用户催款通知！\n ${str}`
								});
							}
						});
						var data = JSON.parse(v.data);
						var data2 = eval('(' + v.data + ')');
						console.log(data);
						console.log(data2);

						uni.showModal({
							title: '催款提示',
							content: `收到上级推广用户催款通知！\n ${str}`,
							confirmText: '立即打款',
							success(re) {
								if (re.confirm) {
									uni.switchTab({
										url: '../task/task'
									});
								}
							}
						});
					}
					//收到打款
					if (v.ty == 'dakuan' && _self.user_uuid == v.uuid) {
						str = _self.toTime(new Date());
						var data2 = eval('(' + v.data + ')');
						str += '：本次打款金额为：' + data2.gold + 'Usdt';
						plus.push.createMessage(str, 'LocalMSG', options);
						uni.vibrateLong({
							success() {
								_self.badge_module.setBadge(1);
								_self.badge_module.setPush({
									title: '收款提示',
									content: `收到下级用户的打款！\n ${str}`
								});
							}
						});
						var data = JSON.parse(v.data);
						var data2 = eval('(' + v.data + ')');
						console.log(data);
						console.log(data2);

						uni.showModal({
							title: '收款提示',
							content: `收到下级用户的打款！\n ${str}`,
							confirmText: '立即确认',
							success(re) {
								if (re.confirm) {
									uni.switchTab({
										url: '../task/task'
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
					if (v.ty == 'tibi' && _self.user_uuid == v.uuid) {
						//var data=JSON.parse(v.data)
						var data2 = eval('(' + v.data + ')');
						//console.log(data);
						console.log(data2);
						str = _self.toTime(new Date());
						str += '：收到提币申请';
						plus.push.createMessage(str, 'LocalMSG', options);
						uni.vibrateLong({
							success() {
								_self.badge_module.setBadge(1);
								_self.badge_module.setPush({
									title: 'FIL提币',
									content: '收到用户FIL提币申请，请及时处理！'
								});
							}
						});
						uni.showModal({
							title: '用户提FIL币提示',
							content: `收到用户提FIL币申请，金额：${data2.gold}FIL\n ${str}`,
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
					//管理员审核，通过
					if (v.ty == 'chongzhi_shenghe' && _self.user_uuid == v.uuid) {
						//var data=JSON.parse(v.data)
						var data2 = eval('(' + v.data + ')');
						//console.log(data);
						console.log(data2);
						str = _self.toTime(new Date());
						str += '：FIL充币到账';
						plus.push.createMessage(str, 'LocalMSG', options);
						uni.vibrateLong({
							success() {
								_self.badge_module.setBadge(1);
								_self.badge_module.setPush({
									title: 'FIL充币到账提示',
									content: 'FIL 充币到账，请查看！'
								});
							}
						});
						uni.showModal({
							title: '用户提FIL币提示',
							content: `FIL币申请通过，金额：${data2.gold}FIL\n ${str}`,
							confirmText: '立即查看',
							success(re) {
								if (re.confirm) {
									uni.switchTab({
										url: '../wode/wode'
									});
								}
							}
						});
					}
				});
			});
		},
		//升级
		getUpdate() {
			// #ifdef APP-PLUS
			_self = this;
			var server = this.tp_url + 'd_update';
			var platform;
			try {
				const res = uni.getSystemInfoSync();
				platform = res.platform;
			} catch (e) {}
			var req = {
				appid: plus.runtime.appid,
				version: _self.version,
				platform: platform
			};
			if (this.is_update < 1) {
				uni.request({
					url: server,
					method: 'GET',
					data: req,
					success: res => {
						//console.log(res.data);
						//this.$hideLoading();

						if (res.data.status == 1) {
							var currenttime = res.data.time;
							var server_version = res.data.version;
							var downloadApkUrl = res.data.url;
							_self.checkVersionToLoadUpdate(server_version, _self.version, downloadApkUrl);
						}
					}
				});
			}

			// #endif
		},
		//下载安装包并安装
		checkVersionToLoadUpdate(server_version, version, downloadApkUrl) {
			// #ifdef APP-PLUS
			_self = this;
			if (server_version > version) {
				// if(plus.networkinfo.getCurrentType()!=3){
				//                              uni.showToast({
				//                                  title: '有新的版本发布，检测到您目前非Wifi连接，为节约您的流量，程序已停止自动更新，将在您连接WIFI之后重新检测更新。',
				//                                  mask: false,
				//                                  duration: 5000,
				//                                  icon:"none"
				//                              });
				//                              return;
				//             }
				uni.showModal({
					title: '版本更新',
					content: '有新的版本发布，检测到您当前为Wifi连接，是否立即进行新版本下载？建议WIFI环境下下载！',
					confirmText: '立即更新',
					showCancel: false,
					success: res => {
						if (res.confirm) {
							// console.log('点击下载'+downloadApkUrl);
							// plus.runtime.openURL(downloadApkUrl)

							_self.is_update += 1;

							var wgtWaiting = null;
							//wgtWaiting = plus.nativeUI.showWaiting('开始下载');
							var fileName = 'http://47.97.122.25:39005/dianliang/app/点亮生活' + server_version + '.apk';
							console.log(fileName);
							var down = plus.downloader.createDownload(fileName, {}, function(download, status) {
								console.log('下载成功回调');
								uni.hideLoading();
								// console.log(JSON.stringify(download));
								if (status == 200) {
									console.log(fileName);
									//installApk(fileName); // 更新应用资源
									plus.runtime.install(plus.io.convertLocalFileSystemURL(download.filename), {}, {}, function(error) {
										uni.showToast({
											title: '安装失败',
											mask: false,
											duration: 1500
										});
									});
									//苹果跳转APPStore安装
									// let appleId=123456 //app的appleId
									// plus.runtime.launchApplication({
									// 	action: `itms-apps://itunes.apple.com/cn/app/id${appleId}?mt=8`
									// }, function(e) {
									// 	console.log('Open system default browser failed: ' + e.message);
									// });
								} else {
									uni.showToast({
										title: '更新失败',
										mask: false,
										duration: 1500
									});
								}
							});
							down.start();
							down.addEventListener('statechanged', function(download, status) {
								switch (download.state) {
									case 2:
										//wgtWaiting.setTitle('已连接到服务器');
										break;
									case 3:
										var percent = (download.downloadedSize / download.totalSize) * 100;
										//wgtWaiting.setTitle('升级下载中... ' + parseInt(percent) + '%');
										if (_self.is_click < 1) {
											_self.visible = true;
										}
										_self.is_down = true;
										_self.percent = parseInt(percent);
										if (_self.percent == 100) {
											_self.comfirmValue = '立即安装';
											_self.down_load = download;
											_self.visible = false;
										}
										break;
									case 4:
										//wgtWaiting.setTitle('下载完成');
										_self.is_down = false;
										_self.inter = null;
										break;
								}
							});
						}
					}
				});
			}
			// #endif
		}
	}
};
</script>

<style lang="scss" scoped>
.content {
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
}

.logo {
	height: 200rpx;
	width: 200rpx;
	margin-top: 200rpx;
	margin-left: auto;
	margin-right: auto;
	margin-bottom: 50rpx;
}

.text-area {
	display: flex;
	justify-content: center;
}

.title {
	font-size: 36rpx;
	color: #8f8f94;
}
.eg-filter {
	.eg-filter-list {
		padding-top: 100rpx;
	}
}
.swiper {
	height: 400rpx;
}

.grid-text {
	font-size: 14px;
	color: #909399;
	padding: 10rpx 0 20rpx 0rpx;
	/* #ifndef APP-PLUS */
	box-sizing: border-box;
	/* #endif */
}
.fix {
	position: fixed;
	top: 0px;
	width: 100%;
	left: 0px;
}
</style>
