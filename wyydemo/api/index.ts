import { request } from './request'
import {
	Banners,
	Recommended,
	SongDetail
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


