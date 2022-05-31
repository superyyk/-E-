<template>
	<view class="p-10">
		<view class="p-20 u-f  u-f-ajc">
			<view class="u-f-dc u-f-ac">
				<view class="u-f-dr u-f-ac">
					<text class="u-f-w">{{area.name}}(区域代理)</text>
					<text class="text-border-line m-l-10" style="color: blue;">变更分公司</text>
				</view>
				
				<text class="f-s">(所属分公司)</text>
				
			</view>
		</view>
		<block v-for="(item,index) in area_list" :key="index">
			<view class="u-f-dr u-f-ac u-f-jsb p-15 bd-b-1" style="background-color: #fff;" hover-class="bubble" >
				<view>{{item.name}}</view>
				<view class="u-f-dr u-f-ac">
				<!-- 	<text :style="{color:item.status==0?'#24c06a':'#dbdbdb'}">{{item.status==0?'已开放':'未开放'}}</text>
				   <image :src="getImgsrc('gengduo.png')" mode="aspectFill" class="img_20 m-l-8"></image> -->
				   <u-button type="primary" :plain="true" :text="item.status==0?'已开放':'未开放'" :style="{color:item.status==0?'#24c06a':'#dbdbdb'}" @click="to_kaifang(item)"></u-button>
				   <u-button type="primary" :plain="true" text="管理" @click="to_area(item)" style="margin-left: 3px;" ></u-button> 
				</view>
			</view>
		</block>
	</view>
</template>

<script>
	var _self
	export default {
		data() {
			return {
				area:'',
				area_list:''
			}
		},
		onLoad(e) {
			uni.setNavigationBarTitle({
				title:'区域代理'
			})
			this.area=JSON.parse(e.item)
			console.log(this.area);
			this.load_area()
		},
		methods: {
			to_kaifang(item){
				_self=this
				console.log(item);
				if(item.status==1){
					uni.showModal({
						title:'开放提示',
						content:'是否开放该区域',
						confirmText:'立即开放',
						success(re) {
							if(re.confirm){
										
					uni.request({
						url:_self.tp_url+'c_open_street',
						data:{
							code:item.code,
							status:0
						},
						success(res) {
							if(res.data.res==200){
								uni.showToast({
									title:res.data.msg,
									duration:2000,
									success() {
										_self.load_area()
									}
								})
							}else{
								uni.showToast({
									title:res.data.msg,
									icon:'error',
									duration:2000
								})
							}
						}
					})
							}
						}
					})
			
				}
				if(item.status==0){
					uni.showModal({
						title:'关闭提示',
						content:'是关闭该区域',
						cancelText:'取消',
						confirmText:"立即关闭",
						success(re) {
							if(re.confirm){
										uni.request({
								url:_self.tp_url+'c_open_street',
								data:{
									code:item.code,
									status:1
								},
								success(res) {
									if(res.data.res==200){
										uni.showToast({
											title:res.data.msg,
											duration:2000,
											success() {
												_self.load_area()
											}
										})
									}else{
										uni.showToast({
											title:res.data.msg,
											icon:'error',
											duration:2000
										})
									}
								}
							})
							}
					
						}
					})
				}
				
			
			
			},
			to_area(item){
				uni.navigateTo({
					url:'watchers/watchers?item='+JSON.stringify(item)
				})
			},
			load_area(){
				_self=this
				uni.request({
					url:this.tp_url+'c_load_street',
					data:{
						province_id:this.area.code
					},
					success(res) {
						_self.area_list=res.data
					}
				})
			}
		}
	}
</script>

<style>

</style>
