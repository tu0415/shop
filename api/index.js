
export const login = {
	openid:'/login/openid', // 获取openid
	register:'/login/register', // 用户授权登录
	getUserInfo:'/login/getUserInfo', // 获取用户信息
}

export const goods = {
	goodsList:'/goods/goodsList', // 商品列表
	typeList:'/goods/typeList', // 分类列表
	goodsDetail:'/goods/goodsDetail', // 商品详情
	goodsCollection:'/goods/goodsCollection', // 收藏
	delCollection:'/goods/delCollection', // 商品列表
	goodsList:'/goods/goodsList', // 取消收藏
}

export const site = {
	createAddress:'/order/createAddress', // 新增地址
	addressList:'/order/addressList', // 地址列表
	addressDetail:'/order/addressDetail', // 地址详情
	setDefault:'/order/setDefault', // 设置默认地址
}

export const car = {
	addCart:'/order/addCart', // 添加购物车
	reduceCart:'/order/reduceCart', // 减少购物车数量
	clearCart:'/order/clearCart', // 清空购物车
	cartList:'/order/cartList', // 购物车列表
}




