<template>
	<view class="p-10">
		<view class="p-20 u-f  u-f-ajc">
			<view class="u-f-dc u-f-ac">
				<view class="u-f-dr u-f-ac">
					<text class="u-f-w">{{area.name}}(社区监视)</text>
					<text class="text-border-line m-l-10" style="color: blue;">变更分公司</text>
				</view>
				
				<text class="f-s">(所属分公司)</text>
				
			</view>
		</view>
		<block v-for="(item,index) in area_list" :key="index">
			<view class="u-f-dr u-f-ac u-f-jsb p-15 bd-b-1" style="background-color: #fff;" hover-class="bubble" >
				<view>{{item.fTel}}</view>
				<view class="u-f-dr u-f-ac">
				<!-- 	<text :style="{color:item.status==0?'#24c06a':'#dbdbdb'}">{{item.status==0?'已开放':'未开放'}}</text>
				   <image :src="getImgsrc('gengduo.png')" mode="aspectFill" class="img_20 m-l-8"></image> -->
				   <u-button type="primary" :plain="true" :text="item.fStatus==0?'正常':'离职'" :style="{color:item.fStatus==0?'#24c06a':'#dbdbdb'}" @click="to_kaifang(item)"></u-button>
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
				title:"社区监视"
			})
			this.area=JSON.parse(e.item)
			console.log(this.area);
			this.load_watchers()
		},
		methods: {
			to_kaifang(item){
				_self=this
				console.log(item);
	
			
			},
			to_area(item){
				uni.navigateTo({
					url:'watcher_detail/watcher_detail?item='+JSON.stringify(item)
				})
			},
			load_watchers(){
				_self=this
				uni.request({
					url:this.tp_url+'c_load_watcher_street',
					data:{
						street_name:this.area.name,
						
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
