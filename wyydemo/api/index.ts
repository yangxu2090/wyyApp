import { request } from './request'
import {
	Banners,
	Recommended
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


export const personalizedApi = () => {
  return request<Recommended>({
    url: 'https://zyxcl.xyz/music/api/personalized'
  })
}




