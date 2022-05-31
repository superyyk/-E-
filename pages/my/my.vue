<template>
	<view>
		<u-navbar leftIcon="" title="我的" :safeAreaInsetTop="true" height="45px">
			<view class="u-nav-slot" slot="right">
				<!-- #ifdef APP-PLUS -->
				<view class="u-f-dr u-f-ac">
					<view class="u-f-dr" @click="msg">
						<u-icon name="chat" size="25"></u-icon>
						<u-badge :type="type" max="99" :value="value" style="height: 20upx; width: 20upx; padding:5upx; text-align: center;"></u-badge>
					</view>
					<view class=" m-l-10" @click="setting"><u-icon name="setting-fill" size="25"></u-icon></view>
				</view>
				<!-- #endif -->
			</view>
		</u-navbar>
		<view  class="u-f-dr u-f-ac u-f-jsb p-10" style=" margin-top: 100px;">
			<!-- 左边 -->
			<view class="u-f-dr u-f-ac">
				<view class="p-5"><image :src="`${user_info&&user_info.fHead.length>20?user_info.fHead:getImgsrc(user_info.fHead)}`" mode="aspectFit" class="img_45 bd-r-50" style="padding: 3px; background-color: #f7f6f5;"></image></view>

				<view class="m-l-5 u-f-dc" @click="tobangding()">
					<text class="f-b-wwb">{{car_info?hideTel(car_info.fNum) :'未绑定车型'}}</text>
					<view class="u-f-dr u-f-ac">
						<image :src="getImgsrc('huizhang.png')" mode="aspectFit" class="img_15"></image>
						<text class="m-l-5 f-s">青铜会员</text>
						<text class="m-l-5 f-s">还差200积分成长升级</text>
						<image class="img_15" :src="getImgsrc('gengduo.png')" mode="aspectFit"></image>
					</view>
				</view>
			</view>
			<!-- 右边 -->

			<view class="p-5 bd-r-20 b-s" style="background-color: #f7f6f5;color:#ED1C24; font-size: x-small; font-weight: 600;" @click="qiandao">签到领积分</view>
		</view>
		<!-- 会员卡 -->
		<view v-if="user_type==0" class="p-10" style="width: 90%;">
			<view class="bd-r-10 dd u-f-dr u-f-ac u-f-jsb p-10">
				<view class="u-f-dc">
					<text class="f-b-w6" style="color: #FFFFFF;">洗车会员</text>
					<text style="color: #d6ccc2; font-size: x-small;">会员卡可享受免费洗车一次/月</text>
				</view>
				<view class="bd-r-20" style="background-color: #ecc9ab; font-size: smaller; padding: 0px 7px;">立即开通</view>
			</view>
		</view>
		<!-- 足迹 -->
		<view v-if="user_type==0" class="p-10">
			<view class="bd-r-10 b-s-4 p-10">
				<u-row justify="space-between">
					<u-col span="2">
						<view class="u-f-dc u-f-ac">
							<text class="f-b-w6">0</text>
							<text class="tip">我的预约</text>
						</view>
					</u-col>
					<u-col span="2">
						<view class="u-f-dc u-f-ac">
							<text class="f-b-w6">3</text>
							<text class="tip">优惠卷</text>
						</view>
					</u-col>
					<u-col span="2">
						<view class="u-f-dc u-f-ac">
							<text class="f-b-w6">0</text>
							<text class="tip">购物车</text>
						</view>
					</u-col>
					<u-col span="2">
						<view class="u-f-dc u-f-ac">
							<text class="f-b-w6">0</text>
							<text class="tip">积分</text>
						</view>
					</u-col>
					<u-col span="2">
						<view class="u-f-dc u-f-ac">
							<text class="f-b-w6">0</text>
							<text class="tip">收藏</text>
						</view>
					</u-col>
					<u-col span="2">
						<view class="u-f-dc u-f-ac">
							<text class="f-b-w6">0</text>
							<text class="tip">足迹</text>
						</view>
					</u-col>
				</u-row>
			</view>
		</view>
		<!-- 我的订单 -->
		<view v-if="user_type==0" class="p-10">
			<view class="b-s-4 p-10 bd-r-10">
				<u-row justify="space-between" customStyle="margin-bottom: 10px">
					<u-col span="3"><view class="f-b-wb">我的订单</view></u-col>
					<u-col span="3">
						<view class="c-grey u-f-dr u-f-ac">
							<text>全部订单</text>
							<image :src="getImgsrc('gengduo2.png')" mode="aspectFill" class="img_20"></image>
						</view>
					</u-col>
				</u-row>
				<u-row justify="space-between">
					<block v-for="(item,index) in order_status" :key="index">
						<u-col span="2">
						<view class="u-f-dc u-f-ac">
							<u-badge :type="type" max="99" :value="item.bg_num" style="margin-right: -30px; margin-bottom: -10px;z-index: 9;"></u-badge>
							<image :src="getImgsrc(`order_status/${item.icon}`)" mode="aspectFill" class="img_30"></image>
							<text class="tip">{{item.name}}</text>
						</view>
					</u-col>
						
					</block>
				
				</u-row>
			</view>
		</view>
		<!-- 养车手册 -->
		<view  v-if="user_type==0" class="p-10">
			<view class="p-10 b-s-4 bd-r-10">
				<u-row justify="space-between" customStyle="margin-bottom: 10px">
					<u-col span="6"><view class="f-b-wb">养车手册</view></u-col>
					<u-col span="3"></u-col>
				</u-row>
				<u-swiper :list="list3" previousMargin="30" nextMargin="30" circular :autoplay="true" radius="5" bgColor="#ffffff"></u-swiper>
			</view>
		</view>
		<!-- 更多推荐 -->
		<view class="p-10">
			<view class="p-10 b-s-4 bd-r-10">
				<u-row justify="space-between" customStyle="margin-bottom: 10px">
					<u-col span="6"><view class="f-b-wb">更多推荐</view></u-col>
					<u-col span="3"></u-col>
				</u-row>
				<u-grid :border="false" col="4">
					<u-grid-item v-for="(listItem, listIndex) in list2" :key="listIndex" @click="setting_choose(listItem)">
						<!-- <u-icon
	                              :customStyle="{paddingTop:20+'rpx'}"
	                              :name="listItem.name"
	                              :size="22"
	                      ></u-icon> -->
						<image :src="getImgsrc(`grid_2/${listItem.icon}`)" mode="aspectFill" class="img_30"></image>
						<text class="grid-text" style="font-size: small;">{{ listItem.name }}</text>
					</u-grid-item>
				</u-grid>
			</view>
		</view>
		<!-- 推荐商品 -->
		<view  v-if="user_type==0" class="p-10">
			<view class="p-10 b-s-4 bd-r-10">
				<u-row justify="space-between" customStyle="margin-bottom: 10px">
					<u-col span="6"><view class="f-b-wb">推荐商品</view></u-col>
					<u-col span="3"></u-col>
				</u-row>
				<u-scroll-list @right="right" @left="left">
					<view class="scroll-list" style="flex-direction: row;">
						<view class="scroll-list__goods-item" v-for="(item, index) in goods" :key="index" :class="[index === 9 && 'scroll-list__goods-item--no-margin-right']">
							<image class="scroll-list__goods-item__image" :src="item.img"></image>
							<text class="scroll-list__goods-item__text">￥{{ item.amount }}</text>
						</view>
						<view class="scroll-list__show-more">
							<text class="scroll-list__show-more__text">查看更多</text>
							<u-icon name="arrow-leftward" color="#f56c6c" size="12"></u-icon>
						</view>
					</view>
				</u-scroll-list>
			</view>
			<!-- 分割线 -->
			<u-divider text="精品推荐" :hairline="true" :textColor="text_color" :textSize="text_size"></u-divider>
			<!-- 商品购物 -->
<!-- 			<view class="p-10">
				<view class="bd-r-5  u-f-dr u-f-ac" style="width: 100%;">
					<block v-for="(item, index) in goods" :key="index">
						<view class="p-2" style="width: 50%;">
							<view class="b-s-4 u-f-dc bd-r-5">
								<image class="top_radius" :src="item.fHead" mode="aspectFill" style="width: 100%; height: 200px;"></image>
								<view class="f-b p-2 f-o-2">{{item.fTitle}}</view>
								<view class="u-f-dr u-f-ac p-8" style="color: #ED1C24">
									<text>¥</text>
									<text class="m-5">{{item.fPrice}}</text>
									<view style="border: 1rpx solid #ED1C24; border-radius: 5px; font-size: xx-small; padding: 0px 5px;">包邮</view>
								</view>
							</view>
						</view>
					</block>
				</view>
			</view> -->
			
			
		</view>
		<!-- 管理员 -->
		
		<view v-if="user_type==1">
			
			<view class="u-f-dr u-f-jsb p-15 b-s-1 u-f-ac m-8" @tap="to_watcher" style="background-color: #FFFFFF;">
				<view class="u-f-ac">
					<image :src="getImgsrc('申请.png')" mode="aspectFill" style="width: 30px;height: 30px;"></image>
					<text class="m-l-10">洗车工申请</text>
				</view>
				<view>
					<image :src="getImgsrc('gengduo.png')" mode="widthFix" style="width: 20px;"></image>
				</view>
			</view>
			
			
			
		</view>
		<view v-if="user_type==0">
			<mk-goods-list :goods="goods" @clickItem="goodsItem"></mk-goods-list>
		</view>
		
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
		<u-toast ref="uToast"></u-toast>
		<uni-sign-in ref="signIn"></uni-sign-in>
	</view>
</template>

<script>
	var _self
	import MkList from "@/components/mk-goods-list/mk-goods-list.vue"
	import Qiandao from '@/components/uni-sign-in/uni-sign-in.vue'
export default {
	data() {
		return {
			login_show:false,
			text_color: '#f56c6c',
			text_size: '20',
			type: 'error',
			value: 2,
			list: [],
			list3: ['https://cdn.uviewui.com/uview/swiper/swiper3.png', 'https://cdn.uviewui.com/uview/swiper/swiper2.png', 'https://cdn.uviewui.com/uview/swiper/swiper1.png'],
			list2: [],
			order_status:[],
			goods:[],
			user_uuid:'',
			user_info:'',
			user_type:0,
			car_info:''
		};
	},
	components:{
		MkList,
		Qiandao
	},
	onShow() {
		this.load_grid()
		this.load_order_status()
		this.load_goods()
		//判断登陆
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
		}
		this.car_info=uni.getStorageSync('select_info')
		console.log(this.car_info);
		
		
	},
	methods: {
		qiandao(){
				this.$refs.signIn.open()
		},
		tobangding(){
			uni.navigateTo({
				url:'../index/dingwei/choose-car/choose-car'
			})
		},
		to_watcher(){
			uni.navigateTo({
				url:'watcher-shenhe/watcher-shenhe'
			})
		},
		login_confirm() {
			this.login_show = false;
			uni.navigateTo({
				url: '../login/login?city='+this.Address_info.city+'&area='+this.Address_info.district+'&street='+this.Address_info.street
			});
		},
		login_cancel() {
			this.login_show = false;
			uni.navigateTo({
				url: '../login/login?city='+this.Address_info.city+'&area='+this.Address_info.district+'&street='+this.Address_info.street
			});
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
			    method:'GET',
				success(res){
					if(res.data.res==200){
						var r=res.data.data
						console.log(r.order_num);
						_self.user_info=r.user_info
						_self.user_type=r.user_info.fType
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
						
						uni.navigateTo({
							url:'../login/login'
						})
					}
				}
			})
		},
		
		goodsItem(item){
			console.log(item);
		},
		setting_choose(item){
			console.log(item);
			switch (item.uid){
				case "1006":
				if(this.user_type==0){
					uni.navigateTo({
					url:'watcher/watcher'
				})
				}else{
					uni.showToast({
						title:'当前身份不满足！',
						icon:'error'
					})
				}
				
					break;
				case "1007":
					uni.navigateTo({
						url:''
					})
						break;
				case "1008":
						uni.navigateTo({
							url:'setting/setting'
						})
							break;
				case "1009":
				uni.navigateTo({
					url:'setting/setting'
				})
					break;
				default:
					break;
			}
		},
		right(){
			
		},
		left(){
			
		},
		load_goods(){
			_self=this
			this.goods=[]
			uni.request({
				url:this.tp_url+'c_load_goods',
				success(res) {
					if(res.data.length>0){
						let l=res.data
						for(let i=0;i<l.length;i++){
							_self.goods.push({
								img:l[i].fHead,
								title:l[i].fTitle,
								littleTitle:l[i].fLittleTitle,
								amount:l[i].fPrice,
								amountRemark:l[i].fNum+"人已付款",
								label:`<span style="border:1px solid red;border-radius:5px; padding:3px;font-size:8px;color:red">包邮</span>`
							})
						}
					}
				}
			})
		},
		load_grid(){
			_self=this
			uni.request({
				url:this.tp_url+'c_load_grid_2',
				success(res) {
					_self.list2=res.data
				}
			})
		},
		load_order_status(){
			_self=this
			uni.request({
				url:this.tp_url+'c_load_order_status',
				success(res) {
					_self.order_status=res.data
				}
			})
		},
		msg() {
			console.log('msg');
		},
		setting() {
			console.log('setting');
		},
		click(name) {
			console.log(name);
		}
	}
};
</script>

<style lang="scss">
page {
	background-color: #ffffff;
}
.dd {
	width: 100%;

	background: linear-gradient(90deg, #000 0%, #ecc9ab 49%, #ecc9ab 51%, #000 100%);
}

.tip {
	font-weight: 200;
	font-size: small;
}
.scroll-list {
	@include flex(column);

	&__goods-item {
		margin-right: 20px;

		&__image {
			width: 60px;
			height: 60px;
			border-radius: 4px;
		}

		&__text {
			color: #f56c6c;
			text-align: center;
			font-size: 12px;
			margin-top: 5px;
		}
	}

	&__show-more {
		background-color: #fff0f0;
		border-radius: 3px;
		padding: 3px 6px;
		@include flex(column);
		align-items: center;

		&__text {
			font-size: 12px;
			width: 12px;
			color: #f56c6c;
			line-height: 16px;
		}
	}
}

.grid-text {
	font-size: 14px;
	color: #909399;
	padding: 10rpx 0 20rpx 0rpx;
	/* #ifndef APP-PLUS */
	box-sizing: border-box;
	/* #endif */
}
.top_radius{
   border-top-right-radius:5px;
   border-top-left-radius: 5px;
}
</style>
