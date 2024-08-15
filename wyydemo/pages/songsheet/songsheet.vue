<script setup lang="ts">
	import {ref} from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { songListDetailApi } from '../../api/index'
	import type { SongItem } from '../../api/type'
	
	const songList = ref<SongItem>(null);
	
	onLoad(async (options) => {
			const res = await songListDetailApi(options?.id)
			console.log(res.data.playlist.tracks)
			songList.value = res.data.playlist

	})
	
	
</script>

<template>
<view class="song-box-max">
	<view class="song-box">
		<!-- 头部 -->
		<view class="song-box-up">
			<image :src="songList?.coverImgUrl" mode="widthFix"></image>
			<view class="song-box-center">
				<!-- 文本 -->
				<view class="song-box-title">
					{{songList?.name}}
				</view>
				<view class="song-box-up-author">
					<image :src="songList?.creator.avatarUrl" mode="widthFix"></image>
					<view class="song-box-up-nickname">
						{{songList?.creator.nickname}}
					</view>
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="song-box-text">
			{{songList?.description}}
		</view>
		<!-- 按钮 -->
		<view class="example-body">
			<view class="tag-view">
				<uni-tag :circle="true" text="转发" type="primary" />
			</view>
			<view class="tag-view">
				<uni-tag :circle="true" text="评论" type="primary"  />
			</view>
			<view class="tag-view">
				<uni-tag :circle="true" text="留言" type="primary"   />
			</view>
		</view>
		
	</view>
	
	<!-- 头部蒙层 -->
	<view class="bg">
		<image :src="songList?.coverImgUrl" mode="widthFix"></image>
	</view>
	<view class="bgmask">
	</view>
	
	
	<!-- 播放全部 -->
	<scroll-view class="scroll-box">
		<uni-section  title="播放全部" type="line">
					<uni-list>
						<uni-list-item 
						v-for="(item, index) in songList?.tracks"
						:key="item.id"
						title="item.name" 
						note="item.ar.map(v => v.name).join('/')" 
						showArrow		
						thumb=""
						thumb-size="sm" 
						rightText="" />
					</uni-list>
		</uni-section>
	</scroll-view>
	
	
</view>
</template>


<style lang="scss" scoped>
.song-box-max{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	padding: 30rpx;
	position: relative;
	overflow: hidden;
}
.song-box{
	width: 100%;
	height: 370rpx;
	display: flex;
	flex-direction: column;
	color: #ffffff;
	.song-box-up{
		width: 100%;
		height: 240rpx;
		display: flex;
		>image{
			flex-shrink: 0;
			width: 240rpx;
			height: 240rpx;
			border-radius: 10rpx;
			margin-right: 20rpx;
		}
	}
	.song-box-center{
		display: flex;
		flex-direction: column;
		.song-box-up-author{
			margin-top: 20rpx;
			display: flex;
			align-items: center;
			>image{
				width: 60rpx;
				height: 60rpx;
				border-radius: 50%;
				margin-right: 10rpx;
				
			}
		}
	}
}
.song-box-text{
	margin-top: 20rpx;
	overflow: hidden;          /* 隐藏溢出的内容 */
	white-space: nowrap;       /* 保持文本在一行显示 */
	text-overflow: ellipsis;   /* 显示省略号 */
}
.example-body{
	margin-top: 14rpx;
	flex: 1;
	display: flex;
	justify-content: space-around;
	align-items: center;
}
.uni-tag--circle{
	padding: 18rpx 60rpx;
	background-color: #cccccc;
	opacity: .8;
	border: none;
	color:#ffffff;
}
.bg{
	position: absolute;
	width: 100%;
	height: 430rpx;
	overflow: hidden;
	left: 0;
	top: 0;
	>image{
		width: 100%;
		height: 100%;
		z-index: -2;
	}
}
.bgmask{
	position: absolute;
	width: 100%;
	height: 370rpx;
	left: 0;
	top: 0;
	background-color: #000000;
	opacity: .2;
	z-index: -1;
}

.scroll-box{
	margin-top: 40rpx;
}


.no {
  width: 80rpx;
  display: flex;
  justify-content: center;
  align-items: center;
}





</style>
