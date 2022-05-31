<template>
	<view>
		<view class="p-5">
			<view v-if="user_type==0">
				 <u-subsection bgColor="#ffffff" mode="subsection"  fontSize="16" :bold="true" activeColor="#24c06a" :list="list" :current="curNow" @change="sectionChange" style="height: 74rpx;"></u-subsection>
			</view>
		<view v-if="user_type==2">
			 <u-subsection bgColor="#ffffff" mode="subsection"  fontSize="16" :bold="true" activeColor="#24c06a" :list="list2" :current="curNow" @change="sectionChange2" style="height: 74rpx;"></u-subsection>
		</view>	
			
			 <view class="p-10" v-if="curNow==0">
				 <u-empty
				         v-if="order_list.length==0"
				         mode="order"
				         icon="http://cdn.uviewui.com/uview/empty/order.png"
				 >
				 </u-empty>
				 <block v-for="(item,index) in order_list" :key="index">
					<view class="u-f-dr u-f-ac u-f-jsb m-t-5 p-5 bd-r-5" style="background-color: #F2FFF9;" @click="choose(item)">
						<view class="u-f-dr u-f-ac">
							<view class="p-10">
								<image :src="getImgsrc(`cars/${item.img}`)" mode="aspectFill" class="img_40"></image>
							</view>
							<view class="u-f-dc">
							<text class="f-b">{{item.name}}</text>
							<text class="f-s">{{toTime(item.fTime*1000)}}</text>
						   </view>
						</view>
						
						<view class="u-f-dc">
							<text class="f-b-wb" style="color: crimson;">¥{{item.fPrice |money}}</text>
							<text style="color: #24c06a;">{{user_type==2?'接单了...' :get_order_status(item.status)}}</text>
						</view>
					</view> 
				 </block>
				 
			 </view>
			 <view class="p-5" v-if="curNow==1">
			 				 <u-empty
							  v-if="order_list.length==0"
			 				         mode="order"
			 				         icon="http://cdn.uviewui.com/uview/empty/order.png"
			 				 >
			 				 </u-empty>
					<block v-for="(item,index) in order_list" :key="index">
										<view class="u-f-dr u-f-ac u-f-jsb m-t-5 p-5 bd-r-5" style="background-color: #F2FFF9;" @click="choose(item)">
											<view class="u-f-dr u-f-ac">
												<view class="p-10">
													<image :src="getImgsrc(`cars/${item.img}`)" mode="aspectFill" class="img_40"></image>
												</view>
												<view class="u-f-dc">
												<text class="f-b">{{item.name}}</text>
												<text class="f-s">{{toTime(item.fTime*1000)}}</text>
											   </view>
											</view>
											
											<view class="u-f-dc">
												<text class="f-b-wb" style="color: crimson;">¥{{item.fPrice |money}}</text>
												<text>{{user_type==2?'已接单，赶去洗车...': get_order_status(item.status)}}</text>
											</view>
										</view> 
					</block>		 
			 </view>
			 <view class="p-5" v-if="curNow==2">
			 				 <u-empty
							  v-if="order_list.length==0"
			 				         mode="order"
			 				         icon="http://cdn.uviewui.com/uview/empty/order.png"
			 				 >
			 				 </u-empty>
					<block v-for="(item,index) in order_list" :key="index">
										<view class="u-f-dr u-f-ac u-f-jsb m-t-5 p-5 bd-r-5" style="background-color: #F2FFF9;" @click="choose(item)">
											<view class="u-f-dr u-f-ac">
												<view class="p-10">
													<image :src="getImgsrc(`cars/${item.img}`)" mode="aspectFill" class="img_40"></image>
												</view>
												<view class="u-f-dc">
												<text class="f-b">{{item.name}}</text>
												<text class="f-s">{{toTime(item.fTime*1000)}}</text>
											   </view>
											</view>
											
											<view class="u-f-dc">
												<text class="f-b-wb" style="color: crimson;">¥{{item.fPrice |money}}</text>
												<text>{{user_type==2?'洗车中...':get_order_status(item.status)}}</text>
											</view>
										</view> 
					</block>		 
			 </view>
			 <view class="p-5" v-if="curNow==3">
				 <view >
					 				 <u-empty
							  v-if="order_list.length==0"
			 				         mode="order"
			 				         icon="http://cdn.uviewui.com/uview/empty/order.png"
			 				 >
			 				 </u-empty>
				<block v-for="(item,index) in order_list" :key="index">
									<view class="u-f-dr u-f-ac u-f-jsb m-t-5 p-5 bd-r-5" style="background-color: #F2FFF9;" @click="choose(item)">
										<view class="u-f-dr u-f-ac">
											<view class="p-10">
												<image :src="getImgsrc(`cars/${item.img}`)" mode="aspectFill" class="img_40"></image>
											</view>
											<view class="u-f-dc">
											<text class="f-b">{{item.name}}</text>
											<text class="f-s">{{toTime(item.fTime*1000)}}</text>
										   </view>
										</view>
										
										<view class="u-f-dc">
											<text class="f-b-wb" style="color: crimson;">¥{{item.fPrice |money}}</text>
											<text>{{ get_order_status(item.status)}}</text>
										</view>
									</view> 
				</block>	
				 </view>
				 <!-- 洗车工结束订单 -->
		<!-- 		<view v-if="user_type==2">
					 				 <u-empty
							  v-if="finish_list.length==0"
							         mode="order"
							         icon="http://cdn.uviewui.com/uview/empty/order.png"
							 >
							 </u-empty>
				<block v-for="(item,index) in finish_list" :key="index">
									<view class="u-f-dr u-f-ac u-f-jsb m-t-5 p-5 bd-r-5" style="background-color: #F2FFF9;" @click="choose(item)">
										<view class="u-f-dr u-f-ac">
											<view class="p-10">
												<image :src="getImgsrc(`cars/${item.img}`)" mode="aspectFill" class="img_40"></image>
											</view>
											<view class="u-f-dc">
											<text class="f-b">{{item.name}}</text>
											<text class="f-s">{{toTime(item.fTime*1000)}}</text>
										   </view>
										</view>
										
										<view class="u-f-dc">
											<text class="f-b-wb" style="color: crimson;">¥{{item.fPrice |money}}</text>
											<text>{{get_order_status(item.status)}}</text>
										</view>
									</view> 
				</block>	
				 </view> -->
				 
			 		 
			 </view>
			 
			 <view class="p-10" v-if="curNow==4">
			 				 <u-empty
			 							  v-if="order_list.length==0"
			 				         mode="order"
			 				         icon="http://cdn.uviewui.com/uview/empty/order.png"
			 				 >
			 				 </u-empty>
			 				<block v-for="(item,index) in order_list" :key="index">
			 									<view class="u-f-dr u-f-ac u-f-jsb m-t-10 p-5 bd-r-10" style="background-color: #F2FFF9;" @click="choose(item)">
			 										<view class="u-f-dr u-f-ac">
			 											<view class="p-10">
			 												<image :src="getImgsrc(`cars/${item.img}`)" mode="aspectFill" class="img_40"></image>
			 											</view>
			 											<view class="u-f-dc">
			 											<text class="f-b">{{item.name}}</text>
			 											<text class="f-s">{{toTime(item.fTime*1000)}}</text>
			 										   </view>
			 										</view>
			 										
			 										<view class="u-f-dc">
			 											<text class="f-b-wb" style="color: crimson;">¥{{item.fPrice |money}}</text>
			 											<text>{{get_order_status(item.status)}}</text>
			 										</view>
			 									</view> 
			 				</block>			 
			 </view>
			 
			 
		</view>
		
	</view>
</template>

<script>
	var _self
	
	export default {
		data() {
			return {
				 list: [
					 {
						 name:'未付款',
						 num:0
					 },
					 {
						 name:'待接单',
						 num:0
					 },
					 {
						 name:'待洗车',
						 num:0
					 },
					 {
						 name:'洗车中',
						 num:0
					 },
					 {
						 name:'待评价',
						 num:0
					 }
				],
				list2: [
					{
						 name:'我的派单',
						 num:0
					 },
					 {
						 name:'待洗车',
						 num:0
					 },
					 {
						 name:'洗车中',
						 num:0
					 },
					 {
						 name:'已结束',
						 num:0
					 }
				],
				
				 curNow: 0,
				 curNow2: 0,
				 order_list:[],
				 user_uuid:'',
				 user_type:0,
				 user_info:'',
				 finish_list:[]
			}
		},
		onShow() {
			this.user_uuid = this.checkLogin().user_uuid;
			if (this.user_uuid) {
				console.log(this.user_uuid);
			
			    
				//this.load_user_info()
				this.user_info=uni.getStorageSync('userInfo')
				console.log(this.user_info);
				this.user_type=this.user_info.fType
				if(this.user_type==0){
					this.load_orders(0)
				}
				
				if(this.user_type==2){
					this.load_orders2(1)
				}
					
				
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
				//this.login_show = true;
			}
			this.curNow=0
			this.curNow2=0
		},
		methods: {
			sectionChange(index) {
				_self=this
							this.curNow = index;
							console.log(index);
							switch (index){
								case 0:
								_self.load_orders(0)
									break;
								case 1:
								_self.load_orders(1)
									break;
								case 2:
								_self.load_orders(2)
									break;
								case 3:
								_self.load_orders(3)
									break;
									case 4:
								_self.load_orders(4)
										break;
								default:
									break;
							}
							
							
							
						},
						
			sectionChange2(index) {
				_self=this
							this.curNow= index;
							console.log(index);
							switch (index){
								case 0:
								_self.load_orders2(1)
									break;
								case 1:
								_self.load_orders2(2)
									break;
								case 2:
								_self.load_orders2(3)
									break;
								case 3:
								_self.load_orders2(11)
									break;
									
								default:
									break;
							}
							
							
							
						},
			load_orders2(index){
				_self=this
				this.order_list=[]
				uni.request({
					url:this.tp_url+'c_load_orders_watcher',
					data:{
						index:index,
						user_uuid:this.user_uuid
					},
					success(res) {
			            console.log(res);
						_self.order_list=res.data.data.my
						// if(_self.user_type==2 && index==11){
						// 	_self.order_list=res.data.data.all
						// }
					   // _self.finish_list=res.data.all
						let all=res.data.data.all
						let l_1=_self.order_count(all,1).length
						let l_2=_self.order_count(all,2).length
						let l_3=_self.order_count(all,3).length
						let l_4=_self.order_count(all,11).length
						let l_5=_self.order_count(all,11).length
						if(l_1>0){
							_self.change_list_num2(_self.list2,'我的派单',l_1)
						}else{
							_self.change_list_num2(_self.list2,'我的派单',0)
						}
						
						if(l_2>0){
							_self.change_list_num2(_self.list2,'待洗车',l_2)
						}else{
							_self.change_list_num2(_self.list2,'待洗车',0)
						}
						if(l_3>0){
							_self.change_list_num2(_self.list2,'洗车中',l_3)
						}else{
							_self.change_list_num2(_self.list2,'洗车中',0)
						}
						if(l_4>0){
							_self.change_list_num2(_self.list2,'已结束',l_4)
						}else{
							_self.change_list_num2(_self.list2,'已结束',0)
						}
						if(l_5>0){
							_self.change_list_num2(_self.list2,'待评价',l_5)
						}else{
							_self.change_list_num2(_self.list2,'待评价',0)
						}
						
					}
				})
			},						
									
		load_orders(index){
				_self=this
				this.order_list=[]
				uni.request({
					url:this.tp_url+'c_load_orders',
					data:{
						index:index,
						user_uuid:this.user_uuid
					},
					success(res) {
                        console.log(res);
						
						_self.order_list=res.data.data.my
						let all=res.data.data.all
						let l_1=_self.order_count(all,0).length
						let l_2=_self.order_count(all,1).length
						let l_3=_self.order_count(all,2).length
						let l_4=_self.order_count(all,3).length
						let l_5=_self.order_count(all,4).length
						if(l_1>0){
							_self.change_list_num(_self.list,'未付款',l_1)
						}else{
							_self.change_list_num(_self.list,'未付款',0)
						}
						
						if(l_2>0){
							_self.change_list_num(_self.list,'待接单',l_2)
						}else{
							_self.change_list_num(_self.list,'待接单',0)
						}
						if(l_3>0){
							_self.change_list_num(_self.list,'待洗车',l_3)
						}else{
							_self.change_list_num(_self.list,'待洗车',0)
						}
						if(l_4>0){
							_self.change_list_num(_self.list,'洗车中',l_4)
						}else{
							_self.change_list_num(_self.list,'洗车中',0)
						}
						if(l_5>0){
							_self.change_list_num(_self.list,'待评价',l_5)
						}else{
							_self.change_list_num(_self.list,'待评价',0)
						}
						
					}
				})
			},
			order_count(all,status){
				let list=all.filter((item)=>{
					return item.status==status
				})
				return list
			},
			change_list_num(list,name,num){
				for(let i=0;i<list.length;i++){
					if(name==this.list[i].name){
						this.list[i].num=num
					}
				}
			},
			change_list_num2(list,name,num){
				for(let i=0;i<list.length;i++){
					if(name==this.list2[i].name){
						this.list2[i].num=num
					}
				}
			},
			choose(item){
				uni.navigateTo({
					url:'order_detail/order_detail?item='+JSON.stringify(item)
				})
			}			
		}
	}
</script>

<style>

</style>
