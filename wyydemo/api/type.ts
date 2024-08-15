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
export interface Song {
	name: string;
	id: number;
	ar: { id: number; name: string; }[];
	al: {
		id: number;
		name: string;
		picUrl: string;
	}
	[key:string]: any
}
export interface SongItem {
	description: string;
	coverImgUrl: string;
	name: string;
	tags: string[];
	playCount: number;
	id: number;
	creator: {
		avatarUrl: string;
		nickname: string;
	};
	tracks: Song[]
	[key:string]: any
}
	
//歌单头部
export interface SongDetail {
	code: number
	playlist: SongItem
	[key:string]:any
}



