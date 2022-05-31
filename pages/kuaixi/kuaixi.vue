<template>
	<view>
		<view class="m-t-10"></view>
		<!-- <mk-goods-list :goods="goods" @clickItem="goodsItem"></mk-goods-list> -->
		<ss-side :dataArr="dataArr" @rightTap="rightTap"></ss-side>
	</view>
</template>

<script>
	var _self
	//import City from '@/components/com-city-picker/com-city-picker.vue'
	import MkList from "@/components/mk-goods-list/mk-goods-list.vue"
	import ssSide from '@/components/ss-classSide/ss-classSide.vue'
	export default {
		data() {
			return {
				goods:[],
				dataArr:''
			}
		},
		components:{
			//City,
			MkList,
			ssSide
		},
		onLoad() {
		this.load_data()	
		},
		methods: {
			load_data(){
				_self=this
				uni.request({
					url:this.tp_url+'c_load_goods_data',
					success(res) {
					
						_self.dataArr=res.data.data
							console.log(_self.dataArr);
				
					}
				})
			},
			rightTap(e){
				console.log(e);
			},
			goodsItem(item){
				console.log(item);
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
		}
	}
</script>

<style>

</style>
