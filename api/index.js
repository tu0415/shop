
export const login = {
	openid:'/login/openid', // 获取openid
	register:'/login/register', // 用户授权登录
	getUserInfo:'/login/getUserInfo', // 获取用户信息
	navigationList:'/login/navigationList', // 轮播图

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
	deladdress:'/order/delAddress', // 设置默认地址
}

export const car = {
	addCart:'/order/addCart', // 添加购物车
	reduceCart:'/order/reduceCart', // 减少购物车数量
	clearCart:'/order/clearCart', // 清空购物车
	cartList:'/order/cartList', // 购物车列表
	choiceCart:'/order/choiceCart', // 选中购物车
	clearCart:'/order/clearCart', // 选中购物车
	choiceAll:'/order/choiceAll', // 全选购物车
}


export const order = {
	createOrder:'/order/createOrder', // 创建订单
	orderList:'/order/orderList', // 订单列表
	orderDetail:'/order/orderDetail', // 订单详情
	wxPay:'/order/wxPay', // 微信支付
	balance:'/order/balancePay', // 余额支付
	rechange:'/order/rechange', // 余额充值
}

export const team = {
	teamInfo:'/Team/teamInfo', // 我的团队
	commissionProfit:'/Team/commissionProfit', // 佣金收益
	pool:'/Team/pool', // 分红消费池
	ranking:'/Team/ranking', // 分红列表
}



