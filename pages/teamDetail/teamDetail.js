// pages/teamDetail/teamDetail.js
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		active: 1,
		tabList: [
			{
				title: "今日新增",
			},
			{
				title: "团队总数",
			},
			{
				title: "一级会员",
			}, {
				title: "二级会员",
			},
		]
	},
	onChange(event) {
		wx.showToast({
			title: `切换到标签${event.detail.name}`,
			icon: 'none',
		});
	},


	scrollEvt(e) {
		console.log(e)
	},
	/**
	 * 生命周期函数--监听页面加载
	 */
	onLoad: function (options) {

	},

	/**
	 * 生命周期函数--监听页面初次渲染完成
	 */
	onReady: function () {

	},

	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {

	},

	/**
	 * 生命周期函数--监听页面隐藏
	 */
	onHide: function () {

	},

	/**
	 * 生命周期函数--监听页面卸载
	 */
	onUnload: function () {

	},
	loadMore() {
		console.log(444444444444444)
	},

	/**
	 * 页面相关事件处理函数--监听用户下拉动作
	 */
	onPullDownRefresh: function () {
		console.log(111)
	},

	/**
	 * 页面上拉触底事件的处理函数
	 */
	onReachBottom() {
		console.log(111)
	},

	/**
	 * 用户点击右上角分享
	 */
	onShareAppMessage: function () {

	}
})