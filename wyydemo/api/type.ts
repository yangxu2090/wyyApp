// 轮播图接口
export interface BannersItem {
	imageUrl: string
	typeTitle:string
	targetId: number
	[key:string]: any
}

export interface Banners {
	code: number
	banners: BannersItem[]
	[key: string]: any
}

// 推荐歌单
export interface RecommendedItem {
	id: number
	name: string
	picUrl: string
	trackCount: number
	trackNumberUpdateTime: number
	[key: string]: any
}

export interface Recommended {
	code: number
	result: RecommendedItem[]
	[key: string]: any
	
}


// 歌单详情
export interface SongItem {
	name: string
	trackCount: number
	description: string
	coverImgUrl: string
	userId: number
	[key:string]: any
	
} 

export interface SongDetail {
	code: number
	playlist: SongItem[]
	[key:string]:any
}



