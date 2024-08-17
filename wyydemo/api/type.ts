import { number } from "prop-types"

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
	name?: string;
	id?: number;
	ar?: { id: number; name: string; }[];
	al?: {
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


//歌单评论
export interface CommentItem {
	commentId: number;
		content: string;
		richContent: string;
		ipLocation: {
			location: string;
		}
		timeStr: string;
		time: number;
		user: {
			nickname: string;
			userId: number;
			avatarUrl: string;
		}
	
}

export interface CommentSongDate {
	code: number
	comments: CommentItem[]
	hotComments:CommentItem[]
}

export interface CommentSong {
	statusCode: number
	data: CommentSongDate
	[key:string]:any
}





// 每日 歌单
export interface DayrecommendationsItem {
	name: string
	id: number
	ar: {
		id: number
		name: string
	}[]
	[key: string]: any
}

export interface DayrecommendationsData {
	code: number
	data: {
		dailySongs:DayrecommendationsItem[]
		[key: string]: any
	}
	[key: string]: any; // 索引签名应该放在最后
	// dailySongs:DayrecommendationsItem[]
}

export interface Dayrecommendations {
	data: DayrecommendationsData
	[key: string]: any
}


// 搜索界面的热搜榜
export interface HotItem {
	first: string
	iconType: number
	second: number 
}

export interface SearchHotSesult {
	code: number
	result: {
		hots: HotItem[]
	}
}

export interface SearchHot {
	data: SearchHotSesult
	[key: string]: any
}





// 首页 

//banners 接口
export interface BannerNewItem {
	bannerId: string
	pic: string
	[key: string]: any
}

// 榜单 
export interface SongListItem {
	uiElement: {
		image: {
			imageUrl: string
		}
		subTitle: {
			title: string
		}
	}
	resourceExtInfo:{
		song: {
			al: {
				name: string
				id: string
				picUrl: string
				pic: number
			}
			ar: {
				name: string
				id: number
			}[]
		}
		
	}
	resourceId:string
}

// 推荐歌单接口
export interface RecommendedPlay {
	creativeId?: string
	uiElement?: {
		image:{
			imageUrl: string
		}
		mainTitle: {
			title: string
		}
	}
	resources?: SongListItem[]

	[key: string]: any
}

export interface HomePageDateItem {
	uiElement?: {
		subTitle?: {
			title?: string
		}
	}  // 标题
	creatives?:RecommendedPlay[]    // 推荐歌单
	extInfo?: {  // banner轮播图
		banners: BannerNewItem[]
	}   
	[key: string]: any
}

export interface HomePageDate {
	blocks: HomePageDateItem []
	[key: string]: any
}


export interface HomePage {
	data:{
		code: number
		data: HomePageDate
		[key: string]: any
	}
}



// 歌曲 详情  
export interface SongDeatailItem {
		name: string
		id: number
		al: {
			id: number
			name: string
			pic: number
			picUrl: string
			pic_str: string
		}
		ar:{
			id: number
			name: string
		}[]
		[key: string]: any
}

export interface SongDeatil {
	data:{
		code:number
		songs:SongDeatailItem[]
	}
	[key: string]: any
}




// 歌曲url地址
export interface SongUrlItem {
	id: number
	md5: string
	url: string
	time: number
	size: number
} 


export interface SongUrl {
	statusCode: number
	data: SongUrlItem[]
	[key: string]: any
}



// 歌曲  -》 歌曲
export interface Lyric {
	code: number
	lrc: {
		lyric: string
	}
}
export interface SongLyric {
	data:Lyric
	[key: string]: any
}




// 搜索--接口
export interface SearchDateResult {
	albums?:{
		id:number
		copyrightId: number
		name: string
		picId: number
		publishTime: number
		artist: {
			name: string
			img1v1Url: string
			picUrl: string
			picId: number
			[key: string]: any
		}
	}[]
	songs?: {
		name: string
		id: number
		copyrightId: number
		album?:{
			id: number
			name: string
			copyrightId:number
			artist:{
				id: number
				img1v1Url:string
				[key: string]: any
			}
			[key: string]: any
		}
		artists?:{
			id: number
			img1v1Url: string
			name:string
			[key: string]: any
		}[]
	}[]
	[key: string]: any
}

export interface Search {
	data:{
		code: number
		result:SearchDateResult
	}
	statusCode: number
	errMsg: string
	[key: string]: any
} 





