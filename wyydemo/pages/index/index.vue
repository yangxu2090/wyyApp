<script lang="ts" setup>
	import {ref} from 'vue'
	import { bannerApi, homepageApi, personalizedApi } from '../../api/index'
	import { ballList } from './navball'
	import  type { BannersItem, RecommendedItem} from '../../api/type'
	
	
	
	const banners = ref<BannersItem[]>([])  // banners 轮播图
	const playlists = ref<RecommendedItem[]>([]) //  推荐歌单
	
	 // banners 轮播图
	bannerApi().then( res => {
		banners.value = res.data.banners
	})
	 //  推荐歌单
	personalizedApi().then( res => {
		playlists.value = res.data.result
	})
	
	
</script>


<template>
	<view class="index-container">
	 <!-- 头部 -->
	 <view class="header">
		<uni-icons class="header-icons" type="list" size="30"></uni-icons>
		<view class="search">搜索</view>
	 </view>
	 <!-- 轮播图 -->
	 <view class="swiper-box">
	 	<swiper class="swiper" indicator-dots>
	 		<swiper-item  class="swiper-item" v-for="item in banners" :key="item.imageUrl">
					<image class="image" :src="item.imageUrl" mode="widthFix"></image>
	 		</swiper-item>
	 	</swiper>
	 </view>
	 
	 <!-- 导航 -->
	 <view class="scroll-view-box">
	 	<scroll-view class="scroll-view-box-box" scroll-x enable-flex style="flex-direction:row">
			<view class="scroll-view-box-item" v-for="item in ballList" :key="item.name">
				<image :src="item.iconUrl" mode="widthFix"></image>
				<text>{{item.name}}</text>
			</view>
	 	</scroll-view>
	 </view>
	 
	 <!-- 推荐歌单 -->
	 <view class="playlists">
		<view class="playlists-title">
			<uni-section title="推荐歌单" type="line" />
		</view>
		<scroll-view class="playlists-box" scroll-x>
			<view class="scroll-view-box-item" v-for="item in playlists" :key="item.name">
				<image :src="item.picUrl" mode="widthFix"></image>
				<text>{{item.name}}</text>
			</view>
		</scroll-view>
	 </view>
	 
	 <!-- 粤语|中文|欧美|热门榜单 -->
	 <view class="nationwidesong">
	 	<view class="nationwidesong-title">
	 		<uni-section title="粤语 | 中文 | 欧美 | 热门榜单" type="line" />
	 	</view>
		<scroll-view class="nationwidesong-box" scroll-x>
			<view class="nationwidesong-box-item">
				<view class="playitem">
					<view class="playitem-left">
						<image src="" mode=""></image>
						<view class="songname">
							<view class="songname-name">
								Where Did You Go
							</view>
							<view class="songname-author">
								邓紫棋
							</view>
						</view>
					</view>
					<view class="playitem-right">
						▶️
					</view>
				</view>
			</view>
		</scroll-view>
	 </view>
	 
	 <!-- 你的雷达歌单 -->
	 <view class="playlists">
	 		<view class="playlists-title">
	 			<uni-section title="你的雷达歌单" type="line" />
	 		</view>
	 		<scroll-view class="playlists-box" scroll-x>
	 			<view class="scroll-view-box-item" v-for="item in playlists" :key="item.name">
	 				<image :src="item.picUrl" mode="widthFix"></image>
	 				<text>{{item.name}}</text>
	 			</view>
	 		</scroll-view>
	 </view>
	 
	</view>
	
</template>


<style lang="scss" scoped>
	.index-container{
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		padding: 20rpx;
	}
	.header{
		width: 690rpx;
		height:70rpx;
		display: flex;
		align-items: center;
		.header-icons{
			width: 80rpx;
			text-align: cneter;
		}
		.search{
			flex: 1;
			text-align: center;
			height: 65rpx;
			line-height: 65rpx;
			background-color: #eeeeee;
			border-radius: 5px;
		}
	}
	
	.swiper-box{
		margin-top: 50rpx;
		width: 690rpx;
		height: 256rpx;
		overflow: hidden;
		.swiper{
			width: 690rpx;
			border-radius: 14rpx;
			height: 256rpx;
			overflow: hidden;
			.swiper-item{
				width: 100%;
				.image{
					width: 100%;
				}
			}
		}
	}

	.scroll-view-box{
		margin-top: 10rpx;
		width: 690rpx;
		height: 150rpx;
		// background-color: skyblue;
		.scroll-view-box-box{
			width: 100%;
			height: 100%;
			.scroll-view-box-item{
				flex-shrink: 0;
				width: 20%;
				height: 100%;
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				>image{
					width: 60%;
					border-radius: 50%;
					background-color:#c84341 ;
				}
			}
		}
	}

	:deep .uni-scroll-view-content{
		display: flex;
		&.custom-scrollbar {
			overflow: hidden;
		}
	}

	.playlists{
		width: 690rpx;
		// background-color: skyblue;
		height: 400rpx;
		.playlists-title{
			height: 80rpx;
		}
	}
	.playlists-box{
		
		.scroll-view-box-item{
			flex-shrink: 0;
			width: 240rpx;
			height: 320rpx;
			display: flex;
			flex-direction: column;
			margin-right: 20rpx;
			>image{
				width: 100%;
				height: 240rpx;
				margin-bottom: 10rpx;
			}
			>text{
				display: -webkit-box;
				-webkit-line-clamp: 2; /* 限制在一个块元素显示的文本的行数*/
				-webkit-box-orient: vertical;
				overflow: hidden;
				text-overflow: ellipsis; /* 溢出隐藏用省略号*/
				white-space: normal; /* 保留空白符，不合并*/
			}
		}
	}

.nationwidesong{
	margin-top: 50rpx;
	width: 690rpx;
	height: 500rpx;
	.nationwidesong-title{
		height: 90rpx;
	}
	.nationwidesong-box{
		width: 690rpx;
		height: 420rpx;
		.nationwidesong-box-item{
			flex-shrink: 0;
			margin-right: 20rpx;
			width: 600rpx;
			height: 410rpx;
			display: flex;
			flex-direction: column;
			justify-content: space-between;
			.playitem{
				width: 100%;
				height: 33%;
				display: flex;
				.playitem-left{
					flex: 1;
					display: flex;
					align-items: center;
					padding: 10rpx;
					>image{
						width: 100rpx;
						height: 90%;
						background-color: green;
						margin-right: 20rpx;
					}
				}
			}
		}
	}
}
.playitem-right{
	width: 80rpx;
	font-size: 60rpx;
	padding-top: 26rpx;
}
</style>
