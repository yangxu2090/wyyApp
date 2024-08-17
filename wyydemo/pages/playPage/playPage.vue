<script setup lang="ts">
	import {ref, watch, watchEffect} from 'vue'
	import { onLoad } from '@dcloudio/uni-app'
	import { songDetailApi, lyricApi, songUrlApi } from '../../api/index'
	import type { SongDeatailItem, SongUrlItem, Song } from '../../api/type'
	import { useCounterStore } from '../../stores/playLists'
	
	// 引入全局文件
	const app = getApp()
	// 创建播放器对象
	const innerAudioContext = app.globalData?.innerAudioContex
	
	const popup = ref(null) 
	
	const userStore = useCounterStore() // 
	
	const palyListTitle = ref<string>('') // 播放列表
	const orderSwitch = ref<number>(0)   // 歌曲播放顺序
	const songSwitch = ref<boolean>(false) //歌曲播放还是暂停
	const songDeatil = ref<SongDeatailItem>(null) // 歌曲详情
	const songUrl = ref<SongUrlItem>(null) //歌曲url
	const  songLyric = ref<string>('') // 歌曲 ->  歌词
	
	const curUrlTime = ref<number>(0) // 当前时间
	const totalUrlTime = ref<number>(0) // 总共时间
	
	const lyricPage = ref<boolean>(true) //显示歌词界面开关
  const lyricArr = ref<{time: number,text: string}[]>([]) //歌词数组
	const myScrollTop = ref<number>(-200) //滚动
	// 格式化时间
	const formatTime = (time: number | string) => {
		let s = Math.floor( (time as number) % 60)
		let m = Math.floor( (time as number) / 60)
		s = s < 10 ?  '0' + Number(s) : s
		m = m < 10 ?  '0' + Number(m) : m
		return `${m}:${s}`
	} 

	//歌曲详情 
	const getSongDetailApi = async (ids:string | number) => {
		try{
			const res = await songDetailApi(ids)
			songDeatil.value = res.data.songs[0]
		}catch(e){
			uni.showToast({
			      title: '获取歌曲详情失败',
			      icon: 'error'
			})
		}
	}
	// 歌曲url
	const getSongUrlApi = async ( id: string | number ) => {
		try{
			const res = await songUrlApi(id)
			songUrl.value = res.data.data[0]
			innerAudioContext.src = songUrl.value.url; // 歌曲播放地址
		}catch(e){
			uni.showToast({
			      title: '获取歌曲地址失败',
			      icon: 'error'
			})
		}
	}
	// 歌曲 ->  歌词
	const getLyricApi = async ( id: string | number ) => {
		try{
			const res = await lyricApi(id)
			songLyric.value = res.data.lrc.lyric
			lyricArr.value = parseLyrics(res.data.lrc.lyric)
		}catch(e){
			uni.showToast({
			      title: '获取歌曲地址失败',
			      icon: 'error'
			})
		}
	}
	
	
	// 进入页面就开始加载
	onLoad(async (options) => {
			getSongDetailApi(options?.id)
			getSongUrlApi(options?.id)
			getLyricApi(options?.id)
	})
	
	
	// 播放列表title
	palyListTitle.value = `播放列表(${userStore.palyLists.length})`

	
	// 修改标题
	watchEffect(() => {
	  uni.setNavigationBarTitle({
	    title: songDeatil.value?.name + '-' + songDeatil.value?.ar.map((v => v.name)).join('/')
	  })
	})
	
	// 歌曲
	 function parseLyrics(lyrics:string) {
	  // 定义一个正则表达式来匹配时间戳和歌词文本
	  const regex = /\[(\d{2}:\d{2}\.\d{2})\](.*)/;
	  // 使用正则表达式分割字符串，得到包含时间戳和文本的数组
	  const entries = lyrics.split('\n').map(line => {
	    const match = line.match(regex);
	    if (match) {
	      const [m, s] = match[1].split(':')
	      const time = Number(m) * 60 + Number(s) * 1
	      // 返回一个包含时间戳和文本的对象
	      return { time, text: match[2].trim() };
	    }
	    return null;
	  }).filter(Boolean)
	
	  return entries;
	}
	
	
	
	
	
	// 音视频 播放
	innerAudioContext.autoplay = true;
	// onPlay 播放事件
	innerAudioContext.onPlay(() => {
		totalUrlTime.value = innerAudioContext.duration // 歌曲总时长
		songSwitch.value = true
	})
	
	// onTimeUpdate 播放事件
	innerAudioContext.onTimeUpdate( () => {
		curUrlTime.value = innerAudioContext.currentTime // 歌曲当前播放时间
	})

	// 报错事件
	innerAudioContext.onError((res) => {
	  console.log(res.errMsg);
	  console.log(res.errCode);
	});
	watch(curUrlTime, () => {
	
		lyricArr.value.forEach((v) => {
			if(Math.floor(v.time) === Math.floor(curUrlTime.value)){
				myScrollTop.value += 10
			}
		})
	})
	
	
	// 播放歌曲结束
  innerAudioContext.onEnded (() => {
		changeSong(1)
	})
	
	// 播放循序开关
	const orderAdd = () => {
		orderSwitch.value++
		orderSwitch.value = orderSwitch.value % 3
	}
	// 播放状态
	 const swithPlayPaused = () => {
		 songSwitch.value = !songSwitch.value
		  if (innerAudioContext.paused) {
		    innerAudioContext.play()
		  } else {
		    innerAudioContext.pause()
		  }
	 }
	 
	 // 播放列表
	 const open = () => {
	   popup.value.open('bottom')
	 }
	 
	 // 上一首 下一首切换
	 const changeSong = (num:number) => {
		 userStore.curPalyList += num
		 const len = userStore.curPalyList
		 if(len < 0) {
			 userStore.curPalyList = userStore.palyLists.length -1
		 }
		 if( len > userStore.palyLists.length -1) {
			 userStore.curPalyList = 0 
		 }
		 const item = userStore.palyLists[userStore.curPalyList]
		  uni.redirectTo({
		     url: `/pages/playPage/playPage?id=${item.id}`
		   })
	 }
	 // 播放列表播放
	 const changePlay = (item:Song) => {
		 userStore.setPalyLists(item)
		 uni.redirectTo({
		    url: `/pages/playPage/playPage?id=${item.id}`
		  })
	 }
	 
</script>


<template>
 <view class="paly-box">
	 <!-- 内容 -->
 	<view class="paly-center">
		<!-- 图片banners -->
 		<view class="paly-center-banners" v-if="lyricPage" @click="lyricPage = false">
 			<image :src="songDeatil?.al.picUrl" mode="widthFix"></image>
 		</view>
		<!-- 歌词 -->
		<scroll-view class="lysicPage" v-else @click="lyricPage = true" scroll-y :scroll-top="myScrollTop">
			<view class="lyricItem" v-for="item in lyricArr" :key="item.time">
				{{item.text}}
			</view>
		</scroll-view>
		
 	</view>
	 <!-- 按钮 -->
	<view class="footer-box">
		<!-- 头部信息 -->
		<view class="footerbox  comment-up">
			<view class="comment-up-icon">
				<uni-icons type="heart" color='#ffffff'  size="40"></uni-icons>
			</view>
			<view class="comment-up-icon">
				<uni-icons type="chat" color='#ffffff'  size="40"></uni-icons>
			</view>
		</view>
		<!-- 进度条时间 -->
		<view class="footerbox time-box">
			<view class="time">
				{{formatTime(curUrlTime)}}
			</view>
			<progress class="pro"  :percent="curUrlTime / totalUrlTime * 100"  stroke-width="5" />
			<view class="time">
				{{formatTime(totalUrlTime)}}
			</view>
		</view>
		<!-- 切换 -->
		<view class="footerbox paly-assembly">
			<view class="orderSwitch swithc" @click="orderAdd">
				<uni-icons color='#ffffff' v-if="orderSwitch === 0"  type="loop" size="40"></uni-icons>
				<uni-icons color='#ffffff' v-if="orderSwitch === 1" type="bars" size="40"></uni-icons>
				<uni-icons color='#ffffff' v-if="orderSwitch === 2" type="reload" size="40"></uni-icons>
			</view>
			<uni-icons class="swithc" @click="changeSong(-1)" color='#ffffff'   type="back" size="40"></uni-icons>
			<view class="palySwitch swithc" @click="swithPlayPaused">
				<uni-icons  v-if="songSwitch" type="headphones" size="40" color='#ffffff'></uni-icons> 
				<uni-icons  v-else type="circle" size="40" color='#ffffff'></uni-icons> 
			</view>
			<uni-icons class="swithc" @click="changeSong(1)" type="forward" size="40" color='#ffffff'></uni-icons>
			<uni-icons class="swithc"  type="list" size="40" color='#ffffff' @click="open"></uni-icons>
		</view>
		
		<!-- 背景 -->
		<view class="bg">
			<image :src="songDeatil?.al.picUrl" mode=""></image>
		</view>
		<!-- 蒙层 -->
		<view class="mask">
			
		</view>
		
		<!-- 播放列表 -->
		<uni-popup ref="popup" border-radius="10px 10px 0 0">
			 <scroll-view class="popup-list" scroll-y>
				  <uni-section :title="palyListTitle" type="line">
					 <uni-list>
							<uni-list-item v-for="(item, index) in userStore.palyLists"
							              :key="item.id"
							              :title="item.name"
							              :note="item.ar.map(v => v.name).join('/')"
							              :thumb="item.al.picUrl"
							              :rightText="userStore.curPalyList === index ? '正在播放' : ''"
														clickable
														@click="changePlay(item)"
							            />
						</uni-list>
					</uni-section>
			 </scroll-view>
		</uni-popup>
		
	</view>
 </view>
</template>



<style lang="scss" scoped>
uni-page-body{
	width: 100%;
	height: 100%;
	box-sizing: border-box;
}
.paly-box{
	width: 100%;
	height: 100%;
	display: flex;
	flex-direction: column;
	position: relative;
	.paly-center{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		.paly-center-banners{
			width: 500rpx;
			height: 500rpx;
			border-radius: 50%;
			overflow: hidden;
			background-color: #eee;
			>image{
				width: 100%;
				height: 100%;
			}
		}
	}
}
.lysicPage{
	width: 100%;
	height: 1000rpx;
	// background-color: skyblue;
	overflow: hidden;
}
.lyricItem{
	line-height: 100rpx;
	text-align: center;
	color: yellowgreen;
}
.footer-box{
	height: 240rpx;
	display: flex;
	flex-direction: column;
	color:#ffffff;
}
.footerbox{
	flex: 1;
	display: flex;
	color:#ffffff;
	.comment-up-icon{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		color:#ffffff;
	}
	.time{
		width: 100rpx;
		// background-color: red;
		font-size: 24rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		color:#ffffff;
	}
	.pro{
		flex: 1;
	}
	.swithc{
		flex: 1;
		display: flex;
		justify-content: center;
		align-items: center;
		color:#ffffff;
	}
}
.mask{
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	background-color: rgb(0, 0, 0);
	opacity: .7;
	z-index: -1;
}
.bg{
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	top: 0;
	z-index: -2;
	opacity: .3;
	>image{
		width: 100%;
		height: 100%;
	}
}

.popup-list{
	max-height: 900rpx;
}

</style>
