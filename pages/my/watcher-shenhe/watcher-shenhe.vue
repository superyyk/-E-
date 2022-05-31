<template>
	<view>
		<block v-for="(item,index) in pass_cards " :key="index">
			<view class="p-10 u-f-dr u-f-jsb m-t-10" @click="to_shenhe(item.fUser_uuid)">
				<view class="u-f-dr u-f-ac">
					<image :src="item.fUser_head" mode="aspectFill" style="width: 50px; height: 50px; border-radius: 50px;"></image>
					<view class="u-f-dc m-l-10">
						<text class="f-b-wb">{{item.fName}}</text>
						<text class="f-s">上传时间:{{toTime(item.fTime*1000)}}</text>
					</view>
					
				</view>
				<view class="u-f-dc u-f-ac">
					<view v-if="item.fStatus==1" style="padding: 3px 20px; background-color: #019177;color: #FFFFFF;">已通过</view>
				     <view v-if="item.fStatus==0" style="padding: 3px 20px; background-color: #F37B1D;color: #FFFFFF;">待审核</view>
					  <view v-if="item.fStatus==2" style="padding: 3px 20px; background-color: red;color: #FFFFFF;">不通过</view>
					<view class="f-s">审核状态</view>
				</view>
			</view>
			<view class="hr"></view>
		</block>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				pass_cards:''
			}
		},
		onShow() {
			this.load_pass_card()
		},
		onLoad() {
			uni.setNavigationBarTitle({
				title:'洗车工人申请'
			})
			
		},
		methods: {
			to_shenhe(e){
				uni.navigateTo({
					url:"shenhe/shenhe?user_uuid="+e
				})
			},
			load_pass_card(){
				_self=this
				uni.request({
					url: this.tp_url+'c_load_all_pass_card',
					method:'GET',
					success(res) {
						//console.log(res.data);
						_self.pass_cards=res.data
					}
				})
			}
		}
	}
</script>

<style>

</style>
