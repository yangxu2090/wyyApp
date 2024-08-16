import { defineStore } from 'pinia';
import { ref } from 'vue'
import type { Song } from '../api/type'


export const useCounterStore = defineStore('paly', () => {
	const palyLists = ref<Song[]>([]) // 播放歌曲 数组
	const curPalyList = ref<number>(-1) // 播放歌曲的 下标

	//添加
	const setPalyLists = (item:Song) => {
		const index = palyLists.value.findIndex(v => v.id === item.id) 
		if( index > -1) {
			curPalyList.value = index
		} else{
			palyLists.value.push(item)
			curPalyList.value = palyLists.value.length - 1
		}
	}
	
	// 播放全部
	const setPalyListAll = (item:Song[]) => {
		curPalyList.value = 0
		palyLists.value = item
	}


	return {
		palyLists,
		curPalyList,
		setPalyLists,
		setPalyListAll
	}
});