<script lang="ts" setup>
	import {ref} from 'vue'
	import { bannerApi, homepageApi, personalizedApi, homePageApi } from '../../api/index'
	import { ballList } from './navball'
	import  type { BannersItem, RecommendedItem, BannerNewItem, RecommendedPlay,SongListItem} from '../../api/type'
	
	import { useCounterStore } from '../../stores/playLists'
	
	const userStore = useCounterStore()
	
	const banners = ref<BannersItem[]>([])  // banners 轮播图
	const playlists = ref<RecommendedItem[]>([]) //  推荐歌单
	
	const bannersList = ref<BannerNewItem[]>([]) // banners 轮播图
	const recommendPlaylists = ref<RecommendedPlay[]>([]) // 推荐歌单
	const recommendPlaylistsTitle = ref<string>('') //推荐歌单标题
	const songSheetHost = ref<RecommendedPlay[]>([]) // 歌单排行榜
	const songSheetHostTitle =  ref<string>('') // 歌单排行榜标题
	
	const radarPlaylist = ref<RecommendedPlay[]>([]) // 雷达歌单
	const radarPlaylistTitle =  ref<string>('') // 雷达歌单标题
	// 首页
	const getHomePageApi = async () => {
		try{
			const res =  await homePageApi()
			bannersList.value = res.data.data.blocks[0].extInfo.banners   // banners 轮播图
			recommendPlaylists.value = res.data.data.blocks[2].creatives  // 推荐歌单
			recommendPlaylistsTitle.value = res.data.data.blocks[2].uiElement.subTitle.title //推荐歌单 标题
			
			songSheetHost.value = res.data.data.blocks[3].creatives  // 歌单排行榜
			songSheetHostTitle.value = res.data.data.blocks[3].uiElement.subTitle.title // 歌单排行榜 标题
			
			radarPlaylist.value = res.data.data.blocks[4].creatives  // 雷达歌单
			radarPlaylistTitle.value = res.data.data.blocks[4].uiElement.subTitle.title // 歌单排行榜 标题
		}catch(e){
			uni.showToast({
			      title: '获取文件失败',
			      icon: 'error'
			})
		}
	}
	getHomePageApi()
	
	 // banners 轮播图
	bannerApi().then( res => {
		banners.value = res.data.banners
	})
	 //  推荐歌单
	personalizedApi().then( res => {
		playlists.value = res.data.result
	})

// 跳转歌单
const songSheet = (id: number | string) => {
	uni.navigateTo({
		url: `/pages/songsheet/songsheet?id=${id}`
	});
}

//导航跳转对应的页面
const navDetail = (url:string) => {
	uni.navigateTo({
		url
	})
}
	
// 搜索界面
const search = () => {
	uni.navigateTo({
		url: "/pages/search/search"
	})
}

// 猜你喜欢界面
const goPanationwly = (vi:SongListItem) => {
	userStore.setPalyLists(vi)
	uni.navigateTo({
		url: `/pages/playPage/playPage?id=${vi.resourceId}`
	});
}


</script>


<template>
	<view class="index-container">
	 <!-- 头部 -->
	 <view class="header">
		<uni-icons class="header-icons" type="list" size="30"></uni-icons>
		<view class="search" @click="search">搜索</view>
	 </view>
	 <!-- 轮播图 -->
	 <view class="swiper-box">
	 	<swiper class="swiper" indicator-dots>
	 		<swiper-item  class="swiper-item" v-for="item in bannersList" :key="item.bannerId">
					<image class="image" :src="item.pic" mode="widthFix"></image>
	 		</swiper-item>
	 	</swiper>
	 </view>
	 
	 <!-- 导航 -->
	 <view class="scroll-view-box">
	 	<scroll-view class="scroll-view-box-box" scroll-x enable-flex style="flex-direction:row">
			<view class="scroll-view-box-item" v-for="item in ballList" :key="item.name" @click="navDetail(item.url)">
				<image :src="item.iconUrl" mode="widthFix"></image>
				<text>{{item.name}}</text>
			</view>
	 	</scroll-view>
	 </view>
	 
	 <!-- 推荐歌单 -->
	 <view class="playlists">
		<view class="playlists-title">
			<uni-section :title="recommendPlaylistsTitle" type="line" />
		</view>
		<scroll-view class="playlists-box" scroll-x>
			<view class="scroll-view-box-item" v-for="item in recommendPlaylists" :key="item.creativeId" @click="songSheet(item.creativeId)">
				<image :src="item.uiElement.image.imageUrl" mode="widthFix"></image>
				<text>{{item.uiElement.mainTitle.title}}</text>
			</view>
		</scroll-view>
	 </view>
	 
	 <!-- 粤语|中文|欧美|热门榜单 -->
	 <view class="nationwidesong">
	 	<view class="nationwidesong-title">
	 		<uni-section :title="songSheetHostTitle" type="line" />
	 	</view>
		<scroll-view class="nationwidesong-box" scroll-x>
			<view class="nationwidesong-box-item" v-for="item in songSheetHost" :key="item.creativeId">
				<view class="playitem" v-for="vi in item.resources" :key="vi.resourceId">
					<view class="playitem-left" @click="goPanationwly(vi)">
						<image :src="vi.resourceExtInfo.song.al.picUrl" mode="widthFix"></image>
						<view class="songname">
							<view class="songname-name">
								{{vi.resourceExtInfo.song.al.name}}
							</view>
							<view class="songname-author">
								{{vi.resourceExtInfo.song.ar.map( v => v.name).join('/')}}
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
	 			<uni-section :title="radarPlaylistTitle" type="line" />
	 		</view>
	 		<scroll-view class="playlists-box" scroll-x>
	 			<view class="scroll-view-box-item" v-for="item in radarPlaylist" :key="item.creativeId" @click="songSheet(item.creativeId)">
	 				<image :src="item.uiElement.image.imageUrl" mode="widthFix"></image>
	 				<text>{{item.uiElement.mainTitle.title}}</text>
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
			border-radius: 10rpx;
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
