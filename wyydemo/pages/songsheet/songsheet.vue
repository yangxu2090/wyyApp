<script setup lang="ts">
	import {ref} from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { songListDetailApi } from '../../api/index'
	import type { SongItem } from '../../api/type'
	
	const songList = ref<SongItem[]>([])
	
	onLoad(async (options) => {
		const res = await songListDetailApi(options?.id)
		songList.value = res.data.playlist
	})
	
	
</script>

<template>
	<view>
		
	</view>
</template>


<style>

</style>
