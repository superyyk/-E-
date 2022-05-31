<template>
	<view>
		<view class="p-10">
			<view class="u-f-dc" style="width: 100%;">
				<view class="p-5 u-f-dr u-f-ac u-f-jsb">
							<text class="p-5 u-f-w">我绑定的车型</text>
							<image :src="getImgsrc('jia.png')" mode="aspectFill" class="img_30" @click="add_car()"></image>
				</view>
		
				<block v-if="cars_list.my_cars!=null" v-for="(item,index) in cars_list.my_cars" :key="index">
				
				<view class="p-15 bd-b-1 bd-r-10 u-f-dr u-f-ac u-f-jsb m-t-5" style="background-color: #fff;">
				
				<view class="u-f-dc " style="font-size: small;">
					<view class="u-f-dc">
						<text style="color: red; font-weight: 800;">{{item.price.price}}元</text>
					    <text style="font-size: small;">({{get_car_type(item.fCar_type)}})-{{item.fNum}}</text>
					
				   </view>
				<view v-if="parseFloat(get_coupon(distret,item.youhui))>0" class="u-f-dr u-f-ac">
					<text class="f-s" :style="{color:item.guoqi=='已过期'?'red':'green'}">地区政策优惠</text>
					<text style="color: red; font-size: large;">-{{get_coupon(distret,item.youhui)}}元</text>
				</view>
				
				</view>
				
				
				<view> 
				<u-button text="立即洗车" size="small" color="linear-gradient(to right, rgb(6, 83, 26), rgb(6, 83, 40))" @click="use_car(item,0)"></u-button>
				</view>
				</view>	
							
				</block>
				
				<view v-if="add_show" class="p-5 m-t-10 " style="background-color: #fff;"> 
					
					<view class="carinput">
						<view class="carinput-title">
							请填写车牌号码
						</view>
						<view class="carinput-input">
							<view class="carinput-input-i" :class="{'input-active':carIndex == i}" @tap="inputKey" :data-index="i" v-for="(v,i) in carInput" :key="i" v-show="i < 7">
								{{carInput[i].val}}
							</view>
							<view class="carinput-input-i" :class="{'input-active':carIndex == 7}" @tap="inputKey" data-index="7">
								{{carInput[7].val?carInput[7].val:'+'}}
							</view>
						</view>
						<view class="carinput-power">
							<checkbox-group class="checkbox-g" @change="powerChange">
								<label class="checkbox">
									<checkbox value="true" :checked="isPower" />
									新能源
								</label>
							</checkbox-group>
						</view>
					</view>
				
				<view class="u-f-w">车型</view>	
					<view class="p-10 u-f-dr u-f-ac u-f-w">
						<block v-for="(item,index) in cars_list.sys_cars" :key="index">
							<view class="m-5 bd-r-10 d-btn"  hover-class="bubble" :style="{background:select_id==item.uid?'blue':''}" @click="select_(item)">{{item.name}}</view>
						</block>
					</view>
					
					<view class="u-f-dc u-f-ajc p-20">
				
						<view class="c-btn bd-r-5" hover-class="bubble" @click="set_car()">
							<text  style="border-bottom: 1px solid blue;">暂未绑定车型，立即绑定</text>
						</view>
						<text>{{value}}</text>
					</view>
				</view>
				
				
				<text class="p-5 u-f-w">平台车型</text>
				<block v-for="(item,index) in cars_list.sys_cars" :key="index">
				
				<view class="p-15 bd-b-1 bd-r-10 u-f-dr u-f-ac u-f-jsb m-t-5" style="background-color: #fff;">
				
				<view class="u-f-dc " style="font-size: small;">
					<view class="u-f-dc">
						<view class="u-f-dr u-f-ac">
							<text style="color: red; font-size: large;">{{item.price}}元</text>
							<text class="m-l-5 old-price">{{item.old_price}}元</text>
						</view>
					
					<text class="m-t-10" style="font-size: small;">({{item.name}})</text>
					
				</view>
				<view v-if="parseFloat(get_coupon(distret,item.youhui))>0" class="u-f-dr u-f-ac">
					<text class="f-s" :style="{color:item.guoqi=='已过期'?'red':'green'}">地区政策优惠</text>
					<text style="color: red; font-size: large;">-{{get_coupon(distret,item.youhui)}}元</text>
				</view>
				</view>
				
				
				<view> 
				<u-button text="下单" size="small" color="linear-gradient(to right, rgb(66, 83, 216), rgb(213, 51, 186))" @click="use_car(item,1)"></u-button>
				</view>
				</view>	
			
				</block>	
				
	
					</view>
		</view>
		<tki-float-keyboard ref="keybd" :mode="'car'" :type="keyType" :title="'车牌键盘'" @del="keyCbDel" @val="keyCbVal" @hide="keyCbHide"></tki-float-keyboard>
		
	</view>
</template>

<script>
	var _self
	import tkiFloatKeyboard from "@/components/tki-float-keyboard/tki-float-keyboard.vue";
	export default {
		data() {
			return {
				user_uuid:'',
				cars_list:[],
				distret:'',
				car_show:false,
				value:'',
				showLicenseDialog:false,
				carIndex: -1,
				carInput: [
					{ type: 2, val: "浙" },
					{ type: 4, val: "A" },
					{ type: 1, val: "" },
					{ type: 1, val: "" },
					{ type: 1, val: "" },
					{ type: 1, val: "" },
					{ type: 3, val: "" },
					{ type: 1, val: "" }
				],
				keyType: 0,
				isPower: false, // 新能源
				select_id:'',
				selec_car_info:'',
				add_show:false
				
			}
		},
		components:{
			tkiFloatKeyboard
		},
	   onLoad(e) {
	   	uni.setNavigationBarTitle({
	   		title:'选择车型'
	   	})
		this.distret=e.distret
		console.log(this.distret);
		this.user_uuid=this.checkLogin().user_uuid
		this.load_cars()
	   },
		methods: {
			add_car(){
				this.add_show=true
			},
			use_car(item,type){
				console.log(item);
				let car=''
				let num=0
				let type1=''
				if(type==0){
					car=item.fCar_name
					num=this.get_coupon(this.distret,item.youhui)
					type1=item.fCar_type
					uni.setStorageSync('select_car_price',item.price.price)
					
				}else{
					car=item.name
					num=this.get_coupon(this.distret,item.youhui)
					type1=item.type
					uni.setStorageSync('select_car_price',item.price)
				}
				console.log(car);
				console.log(num);
				console.log(type);
				uni.setStorageSync('select_car',car)
				uni.setStorageSync('select_car_coupon',num)
				uni.setStorageSync('select_type',type1)
				uni.setStorageSync('select_info',item)
				setTimeout(()=>{
					uni.navigateBack({
						delta:1
					})
				},600)
			},
			select_(item){
				this.select_id=item.uid
				this.selec_car_info=item
			},
		// 判定是否为空
		empty(v) {
			let tp = typeof v,
				rt = false;
			if (tp == "number" && String(v) == "") {
				rt = true
			} else if (tp == "undefined") {
				rt = true
			} else if (tp == "object") {
				if (JSON.stringify(v) == "{}" || JSON.stringify(v) == "[]" || v == null) rt = true
			} else if (tp == "string") {
				if (v == "" || v == "undefined" || v == "null" || v == "{}" || v == "[]") rt = true
			} else if (tp == "function") {
				rt = false
			}
			return rt
		},
		inputKey(e) {
			let that = this;
			let data = e.currentTarget.dataset;
			if (data.index >= 7) {
				if (!that.isPower) {
					return false;
				} else {
					that.carIndex = 7;
				}
			} else {
				that.carIndex = data.index;
			}
			that.upKeyType();
			that.keyShow();
		},
		keyCbVal(e) {
			let that = this;
			let index = Number(that.carIndex);
			if (index >= 0 && index < 6) {
				that.carInput[index].val = e;
				that.carIndex = index + 1;
			} else if (index == 6) {
				that.carInput[index].val = e;
				if (that.isPower) {
					// 新能源
					that.carIndex = 7;
				} else {
					// 不是新能源出输入结束
					that.keyHide();
					that.carIndex = -2;
					console.log('非新能源车输入完毕')
					console.log(that.carInput);
				}
			} else if (index == 7) {
				// 新能源车输入完毕
				that.carInput[index].val = e;
				that.keyHide();
				that.carIndex = -3;
				console.log('新能源车输入完毕')
				console.log(that.carInput);
			}
			that.upKeyType();
		},
		keyCbDel(e) {
			let index = this.carIndex;
			if (index > 0) {
				if (!this.empty(this.carInput[index].val)) {
					this.carInput[index].val = "";
					this.carIndex = index;
				} else {
					this.carInput[index - 1].val = "";
					this.carIndex = index - 1;
				}
			}
			this.upKeyType();
		},
		upKeyType() {
			if (!this.empty(this.carInput[this.carIndex])) {
				this.keyType = this.carInput[this.carIndex].type;
			}
		},
		keyShow() {
			this.$refs.keybd._keyShow();
		},
		keyHide() {
			this.$refs.keybd._keyHide();
		},
		keyCbHide() {
			if (this.carIndex != -3 || this.carIndex != -2) {
				this.carIndex = -1;
			}
		},
		powerChange(e) {
			let that = this
			let i = that.checkCar().i
			if (e.detail.value.length > 0) {
				that.isPower = true;
				if (i == -1) {
					that.carIndex = 7;
				} else {
					that.carIndex = i;
				}
				that.keyShow();
			} else {
				that.isPower = false;
				that.carInput[7].val = "";
				if (that.carIndex == 7) {
					that.keyHide();
					that.carIndex = -2;
				}
			}
			that.upKeyType();
		},
		checkCar() {
			// 检查车牌是否输入完成
			let that = this;
			let i = 7;
			let rt = { i: -1, isempty: false, val: "" };
			if (that.isPower) {
				i = 8;
			}
			for (let index = 0; index < i; index++) {
				const obj = that.carInput[index];
				if (this.empty(String(obj.val))) {
					rt.i = index;
					rt.isempty = true;
					rt.val = "";
					break;
				}
				rt.val += that.carInput[index].val;
			}
			return rt;
		},
		toBind() {
			let that = this
			let ck = that.checkCar();
			if (ck.i == -1 && !ck.isempty) {
				console.log('可以绑定车牌了')
			} else {
				// 显示键盘输入
				that.keyShow();
				that.carIndex = ck.i;
				that.keyType = that.carInput[ck.i].type
			}
		},
			set_car(){
				let car=''
				for(let i=0;i<this.carInput.length;i++){
					car+=this.carInput[i].val
					if(i==1){
						car+="·"+this.carInput[i].val
					}
					
				}
				console.log(this.select_id);
				
					console.log(car.length);
				if(this.select_id && car.length>8){
					
				this.save_car(car)	
					
					
				}else{
					uni.showToast({
						title:'车牌和车型必须同时选择后才能绑定！',
						icon:'error'
					})
					return
				}
			},
			save_car(car){
			  _self=this
			  uni.request({
			  	url:this.tp_url+'c_save_car_num',
				data:{
					user_uuid:this.user_uuid,
					car:car,
					car_type:this.selec_car_info.type,
					car_name:this.selec_car_info.name,
					car_uid:this.selec_car_info.uid
				},
				success(res) {
					if(res.data.res==200){
						uni.showToast({
							title:res.data.msg
						})
						_self.load_cars()
					}else{
						uni.showToast({
							title:res.data.msg,
							icon:'none'
						})
					}
				}
			  })
			},
			load_cars(){
				_self=this
				uni.request({
					url:this.tp_url+'c_load_cars',
					data:{
						user_uuid:this.user_uuid,
						
					},
					success(res) {
						_self.cars_list=res.data.data
					}
				})
			},
			get_coupon(distret,list){
				var num=0
				if(list!=null){
					list.filter((item)=>{
						if(distret==item.area){
							num=item.youhui
						}
					})
					
				}else{
					return num
				}
				return num
			}
		}
	}
</script>

<style>
carinput {
    margin-top: 74upx;
    display: flex;
    flex-direction: column;
    padding-left: 40upx;
    padding-right: 40upx
}

.carinput-title {
    font-size: 30upx;
    color: #333333;
    line-height: 1;
    margin-bottom: 90upx
}

.carinput-input {
    display: flex;
    justify-content: center
}

.carinput-input-i {
    width: 50upx;
    border-bottom-width: 2upx !important;
    border-bottom-style: solid;
    border-bottom-color: #BCBCBC;
    font-size: 36upx;
    color: #333333;
    line-height: 1;
    margin-right: 12upx;
    padding-bottom: 7upx;
    text-align: center
}

.carinput-input-i:nth-last-child(1) {
    margin-right: 0
}

.carinput-input .input-active {
    border-bottom-width: 2upx !important;
    border-bottom-style: solid;
    border-bottom-color: #23CCAB;
    color: #23CCAB
}

.carinput-power {
    height: 90upx;
    display: flex;
    justify-content: flex-end
}

.carinput-power .checkbox-g {
    display: flex;
    justify-content: center;
    align-items: center
}

.carinput-power .checkbox {
    margin-right: 92upx;
    font-size: 28upx;
    color: #999999;
    line-height: 1
}

.carinput-power .checkbox checkbox {
    transform: scale(.6) translateY(-2px);
    margin-right: 0
}

.card-btn {
    margin-top: 40upx
}

.card-btn .btn {
    width: 324upx;
    height: 80upx
}
</style>
