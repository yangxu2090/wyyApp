import { request } from './request'
import {
	Banners,
	Recommended,
	SongDetail,
	CommentSong,
	Dayrecommendations,
	SearchHot
} from './type'






// banners 接口
export const bannerApi = ()  => {
	return request<Banners>({
		url:'https://zyxcl.xyz/music/api/banner'
	})
}
// 
export const homepageApi = () => {
  return request({
    url: 'https://zyxcl.xyz/music/api/homepage/block/page'
  })
}


// 推荐歌单的接口
export const personalizedApi = () => {
  return request<Recommended>({
    url: 'https://zyxcl.xyz/music/api/personalized'
  })
}

// 详情页面的接口
export  const songListDetailApi = (id:string) => {
	return request<SongDetail>({
	  url: 'https://zyxcl.xyz/music/api/playlist/detail',
		data: {
			id
		}
	})
}

// 歌单评论
export  const commentSongListDetailApi = (id:string) => {
	return request<CommentSong>({
	  url: 'https://zyxcl.xyz/music/api/comment/playlist',
		data: {
			id
		}
	})
}

// 每日歌单  https://zyxcl.xyz/music/api/recommend/songs
export  const dayrecommendationsApi = () => {
	return request<Dayrecommendations>({
	  url: 'https://zyxcl.xyz/music/api/recommend/songs',
	})
}



// 搜索热门   https://zyxcl.xyz/music/api/search/hot/detai
 export  const seacrchHotApi = () => {
 	return request<SearchHot>({
 	  url: 'https://zyxcl.xyz/music/api/search/hot/detai',
 	})
 }

//搜索   
export  const seacrchSearchApi = (keywords: string) => {
 	return request<SearchHot>({
 	  url: 'https://zyxcl.xyz/music/api/search/suggest',
		data: {
			keywords
		}
 	})
 }



