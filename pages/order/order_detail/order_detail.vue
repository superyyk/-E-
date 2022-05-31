<template>
	<view>
		<view class="p-20">
			<view class="u-f-dc u-f-ac u-f-ajc">
				<image :src="getImgsrc(`cars/${order_info.img}`)" mode="aspectFill" style="width: 100px; height: 100px;"></image>
				<text class="f-b-wb">{{order_info.name}}</text>
				<text class="f-s m-t-10">{{toTime(order_info.fTime*1000)}}</text>
			</view>
			<view class="u-f-dr u-f-ac u-f-jsb p-5 m-t-10">
				<text class="c-grey">订单编号：</text>
				<text>{{order_info.fOrder_uid}}</text>
			</view>
			<view class="u-f-dr u-f-ac u-f-jsb p-5 m-t-10">
				<text class="c-grey">下单时间：</text>
				<text>{{toTime(order_info.fTime*1000)}}</text>
			</view>
			
			<view class="u-f-dr u-f-ac u-f-jsb p-5 m-t-10">
				<text class="c-grey">下单地址：</text>
				<text>{{order_info.fAddress1+order_info.fAddress2}}</text>
			</view>
			
			<view class="u-f-dr u-f-ac u-f-jsb p-5 m-t-10">
				<text class="c-grey">车型：</text>
				<text>{{order_info.name}}</text>
			</view>
			
			<view class="u-f-dr u-f-ac u-f-jsb p-5 m-t-10">
				<text class="c-grey">市场价：</text>
				<text>¥{{order_info.old_price |money}}元</text>
			</view>
			
			<view class="u-f-dr u-f-ac u-f-jsb p-5 m-t-10">
				<text class="c-grey">平台价：</text>
				<text>¥{{order_info.price |money}}元</text>
			</view>
			
			<view class="u-f-dr u-f-ac u-f-jsb p-5 m-t-10">
				<text class="c-grey">优惠券：</text>
				<text>-¥{{order_info.coupon!=null?order_info.coupon.fNum:0 |money}}元</text>
			</view>
			
			<view class="u-f-dr u-f-ac u-f-jsb p-5 m-t-10">
				<text class="c-grey">区域优惠：</text>
				<text>-¥{{get_price(order_info.district,order_info) |money}}元</text>
			</view>
			<view class="u-f-dr u-f-ac u-f-jsb p-5 m-t-10">
				<text class="c-grey">最终支付金额：</text>
				<text class="f-b-wb" style="color: crimson;">¥{{order_info.fPrice |money}}元</text>
			</view>
			<view class="u-f-dr u-f-ac u-f-jsb p-5 m-t-10">
				<text class="c-grey">订单状态：</text>
				<text class="text-border-line-green" @click="to_pay_detail">{{get_order_status(order_info.status) }}</text>
			</view>
			<view v-if="order_info.status==0 && order_info.fUser_uuid==user_uuid" class="p-15 u-f-dc u-f-ac u-f-ajc m-t-10">
				<!-- <u-button type="success" text="去支付" @click="to_pay"></u-button> -->
				<view class="c-btn u-f-dc u-f-ac bd-r-10" hover-class="bubble" @click="to_pay()" style="width: 80%;">
					<text>去支付</text>
					<view v-if="out_show" class="u-f-dr u-f-ac" style="color: red;">
					<text>超时：</text>
					<u-count-down :time="out_time" format="HH:mm:ss:SSS" autoStart millisecond @finish="finish" @change="time_change()"></u-count-down>
				    </view>
				</view>
				
			</view>
			
		</view>
	</view>
</template>

<script>
	var _self
	var count=0
	export default {
		data() {
			return {
				order_info:'',
				user_uuid:'',
				out_time:0,
				out_show:true
			}
		},
		onShow() {
		uni.setNavigationBarTitle({
			title:'订单详情'
		})	
		this.user_uuid=this.checkLogin().user_uuid
		},
		watch:{
			out_time(newValue,oldValue){
				console.log(newValue);
				if(newValue==0){
					this.out_show=false
				}
			}
		},
		onLoad(e) {
			this.order_info=JSON.parse(e.item)
			if(this.order_info.status<1){ //只有待支付和待接单的订单
			console.log(this.order_info);
			let now= new Date().getTime()
			console.log(now);
			console.log(this.order_info.fTime*1000);
			this.out_time=Math.floor((now-this.order_info.fTime*1000)/1000) 
			
			this.out_time=29*60*1000-this.out_time*1000
		     console.log(this.out_time);
			if(this.out_time<0){
			  this.change_order(this.order_info.fOrder_uid)
			}
			}
	
		},
		methods: {
			get_price(district,order_info){
				let num=0
				if(order_info.youhui.length>0){
					order_info.youhui.filter((item)=>{
						if(item.area==district){
							num=item.youhui
						}
					})
				}
				return num
			},
			time_change(e){
				//console.log(e);
				if(this.out_time>=0){
					
					if(this.out_time<60*1000 && count<2){
						uni.showToast({
							title:'订单即将超时',
							icon:"error",
							duration:3000
						})
						count++
					}
					
					this.out_show=true
				}else{
					this.out_show=false
				}
			},
			finish(e){
				console.log("时间到");
				console.log(e);
				this.out_show=false
				uni.showToast({
					title:'订单已超时',
					icon:"error",
					duration:3000
				})
				this.change_order(this.order_info.fOrder_uid)
				
			},
			change_order(uid){
				uni.showLoading({
					title:'处理订单...'
				})
				uni.request({
					url:this.tp_url+'c_change_status',
					data:{
						uid:uid,
						status:11
					},
					success(res) {
						uni.hideLoading()
						uni.showToast({
							title:'订单已取消',
							duration:2000
						})
						setTimeout(()=>{
							uni.switchTab({
							url:'../../index/index'
						})
						},3000)
						
					}
				})
			},
			to_pay_detail(){
				uni.navigateTo({
					url:'../../index/pay/pay_result/pay_result?order_info='+JSON.stringify(this.order_info) 
				})
			},
			to_pay(){
				uni.navigateTo({
					url:'../../index/pay/pay?price='+this.order_info.fPrice+'&uid='+this.order_info.fOrder_uid
				})
			}
		}
	}
</script>

<style>

</style>
