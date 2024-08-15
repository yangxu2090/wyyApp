<script setup lang="ts">
	import {ref} from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { songListDetailApi } from '../../api/index'
	import type { SongItem } from '../../api/type'
	
	const songList = ref<SongItem>(null);
	
	onLoad(async (options) => {
		const res = await songListDetailApi(options?.id)
		console.log(res.data)
		songList.value = res.data.playlist
	})
	
	
</script>

<template>
	<view class="song-box">
		<!-- 头部 -->
		<view class="song-box-up">
			<image :src="songList.coverImgUrl" mode="widthFix"></image>
			<view class="song-box-center">
				<!-- 文本 -->
				<view class="song-box-title">
					{{songList.name}}
				</view>
			</view>
		</view>
		<!-- 内容 -->
		<view class="song-box-text">
			
		</view>
		<!-- 按钮 -->
		<view class="song-box-btns">
			
		</view>
	</view>
</template>


<style lang="scss" scoped>
.song-box{
	width: 100%;
	height: 400rpx;
	
}

</style>
