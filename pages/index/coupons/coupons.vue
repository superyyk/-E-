<template>
	<view>
		<view class="u-f-dc p-10" style="background-color: #FFFFFF">
			 <radio-group @change="radioChange">
			<block v-for="(item,index) in coupon_info" :key="index">
			 <view class="u-f-dr u-f-ac u-f-jsb bd-b-1">
				<view class="p-5 u-f-ac u-f-dr">
					<image :src="getImgsrc('static/zhifubao.png')" mode="aspectFill" style="width: 40px; height: 40px;"></image>
				<view class="m-l-10 u-f-dc">
					<view class="u-f-dr">
						<text class="f-b-wb">支付宝</text>
						<image class="m-l-8" :src="getImgsrc('static/tuijian.png')" mode="aspectFill" style="width: 40px; height: 15px;"></image>
						</view>
					<view class="f-s">10亿用户都在用，真安全，更放心</view>
				</view>
				</view>
				
				<label class="radio">
					<radio value="0" :checked="current===0" /><text></text>
				</label>
			</view>
			</block>	 
	
	
	
			</radio-group>
		</view>
		
	</view>
</template>

<script>
var _self;
export default {
	data() {
		return {
			user_uuid: '',
			coupon_info: '',
			current:0
		};
	},
	onShow() {
		this.user_uuid = this.checkLogin().user_uuid;
		this.load_coupons();
	},
	methods: {
		radioChange(evt){
				console.log(evt.target.value);
				this.current=evt.target.value
			},
		load_coupons() {
			_self = this;
			uni.showLoading();
			uni.request({
				url: this.tp_url + 'c_load_coupon',
				data: {
					user_uuid: this.user_uuid
				},
				method: 'GET',
				success(re) {
					uni.hideLoading();
					if (re.data.res == 200) {
						console.log(re);
						if (re.data.data.length > 0) {
							_self.coupon_info = re.data.data;
						}
					}
				}
			});
		}
	}
};
</script>

<style></style>
