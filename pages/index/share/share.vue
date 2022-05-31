<template>
	<view class="work-card">
		<image class="bg-img" :src="getImgsrc('/daijia/bg.jpg')"></image>
		<view class="work-card-container">
			<view class="user-header">
				<view class="header-img"><image :src="getImgsrc('/daijia/avatar.jpg')"></image></view>
				<view class="user-info">
					<view class="user-name">唐**</view>
					<view class="user-num">编号735676</view>
					<view class="user-rate"><u-rate size="24" :count="count" active-color="#FFA91C" inactive-color="#b2b2b2" v-model="value"></u-rate></view>
				</view>
			</view>
			<view class="user-code-box">
				<view class="tips">真诚自重，安全可靠</view>
				<view class="code-box"><image :src="getImgsrc('/daijia/code.jpg')"></image></view>
				<view class="code-tip">面对面展示给好友，扫码推荐。</view>
				<view class="code-tip">二维码自动刷新，请勿截图使用</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				count: 5,
				value: 4
			}
		}
	}
</script>

<style lang="scss" scoped>
	.work-card {
		height: 100vh;
		width: 100wh;
		// background: url(../../static/daijia/bg.jpg) no-repeat;
		// box-sizing: 100% 100%;
		.bg-img {
			height: 100%;
			width: 100%;
		}
		position: relative;
		.work-card-container {
			width: 620rpx;
			background: #FFFFFF;
			border-radius: 12rpx;
			position: absolute;
			top: 50%;
			left: 50%;
			margin-left: -350rpx;
			transform: translateY(-50%);
			padding: 40rpx;
			.user-code-box {
				margin-top: 28rpx;
				.tips {
					text-align: center;
					color: #333333;
					line-height: 40rpx;
					font-size: 28rpx;
					margin-bottom: 20rpx;
				}
				.code-box {
					width: 195px;
					height: 195px;
					border-radius: 12rpx;
					overflow: hidden;
					margin: 0 auto;
					margin-bottom: 20rpx;
					image {
						display: block;
						height: 100%;
						width: 100%;
					}
				}
				.code-tip {
					color: #F84646;
					line-height: 34rpx;
					font-size: 24rpx;
					text-align: center;
					margin-bottom: 12rpx;
				}
			}
			.user-header {
				overflow: hidden;
				.header-img {
					width: 130rpx;
					height: 130rpx;
					border-radius: 8rpx;
					overflow: hidden;
					float: left;
					image {
						display: block;
						height: 100%;
						width: 100%;
					}
				}
				.user-info {
					float: left;
					margin-left: 20rpx;
					.user-name {
						color: #333333;
						line-height: 40rpx;
						font-size: 28rpx;
					}
				}
				.user-num {
					color: #777777;
					line-height: 36rpx;
					font-size: 26rpx;
					margin-top: 12rpx;
				}
				.user-rate {
					margin-top: 12rpx;
				}
			}
		}
	}
</style>
