<template>
	<view>
	<!-- 	<u-action-sheet
			:actions="coupon_list"
			cancelText="取消"
			@select="selectClick"
			:title="`优惠券选择`"
			:show="coupon_show"
			:closeOnClickOverlay="true"
			:closeOnClickAction="true"
			@close="coupon_close"
		></u-action-sheet> -->
		<view class="p-10">
			
			<view class="u-f-dc" style="width: 100%;">
				<block v-for="(item,index) in coupon_info" :key="index">
				
				<view class="p-15 bd-b-1 bd-r-10 u-f-dr u-f-ac u-f-jsb m-t-5" style="background-color: #fff;">
				
				<view class="u-f-dc " style="font-size: small;">
					<view class="u-f-dr u-f-ac">
					<text style="font-size: small;">({{get_car_type(item.fType)}}){{item.fTitle}}</text>
					<text style="color: red;">- {{item.fNum}}元</text>
				</view>
				<text class="f-s" :style="{color:item.guoqi=='已过期'?'red':'green'}">{{item.tian>0?item.tian+'天后过期':'已过期'}}</text>
				</view>
				
				
				<view> 
				<u-button text="使用" size="small" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" @click="use(item)"></u-button>
				</view>
				</view>	
			
				</block>	
					</view>
		
			
			
			
		</view>
		
		<view v-if="coupon_list.length==0">
			<u-empty
			        mode="coupon"
			        icon="http://cdn.uviewui.com/uview/empty/coupon.png"
			>
			</u-empty>
		</view>
		
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				user_uuid:'',
				coupon_list:'',
				coupon_show:false,
				coupon_info:'',
				coupon_num:0,
				value:'kkk',
				select_id:0,
				radiovalue1:0
			}
		},
		onLoad() {
		uni.setNavigationBarTitle({
			title:'选择优惠券'
		})
		this.user_uuid=this.checkLogin().user_uuid
			this.load_coupon(1)
		},
		
		methods: {
			     groupChange(n) {
			        console.log('groupChange', n);
			      },
			      use(n) {
			        console.log('radioChange', n);
					this.select_item=n
					uni.setStorageSync('coupon',JSON.stringify(this.select_item) )
					setTimeout(()=>{
						uni.navigateBack({
							delta:1
						})
					},500)
			      },
		
				coupon_close() {
				this.coupon_show = false
				},
				selectClick(e) {
					console.log(e);
					
				// if (e.type ) {
				// 		uni.showModal({
				// 		title: '优惠券使用提示',
				// 			content: '当前选择优惠券仅限用于' + this.get_car_type(e.type) + '的车辆使用',
				// 			success(re) {}
				// 		})
				// 		this.coupon_num = 0;
				// } else {
				// 		this.coupon_num = e.num;
				// }
			},
			load_coupon(car_type) {
				_self = this;
			uni.showLoading();
			this.coupon_info = '';
			uni.request({
					url: this.tp_url + 'c_load_coupon',
					data: {
						user_uuid: this.user_uuid
					},
					header: {
					'content-type': 'application/x-www-form-urlencoded'
				},
					method: 'GET',
					success(re) {
						uni.hideLoading();
						if (re.data.res == 200) {
							console.log(re);
							_self.coupon_show=true
							if (re.data.data.length > 0) {
								_self.coupon_info = re.data.data;
								console.log(_self.coupon_info);
								if (re.data.data.length > 0) {
									let r = re.data.data;
								_self.coupon_list = [];
								// for (let i = 0; i < r.length; i++) {
								// 		_self.coupon_list.push({
								// 		name: `(${r[i].fType == car_type ? '可用' : '不可用'})${_self.get_car_type(r[i].fType) + r[i].fTitle + r[i].fNum}元`,
								// 			type: r[i].fType,
								// 			num: r[i].fNum
								// 		});
								// }
								for (let i = 0; i < r.length; i++) {
										_self.coupon_list.push({
										name: `${_self.get_car_type(r[i].fType) + r[i].fTitle + r[i].fNum}+'元'`,
										type: r[i].fType,
										num: r[i].fNum
										});
								}
							}
			
							// _self.coupon_info = _self.coupon_info.filter(item => {
							// 		return item.fType == car_type;
							// 	});
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
					})
				
			},
		}
	}
</script>

<style>

</style>
