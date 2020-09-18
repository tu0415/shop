
Page({
    data: {
        list: [
            {
                name: '首页',
                id: '1'
            },
            {
                name: '女装',
                id: '2'
            },
            {
                name: '珠宝',
                id: '3'
            },
            {
                name: '日用',
                id: '4'
            },
            {
                name: '手机',
                id: '5'
            },
            {
                name: '电脑',
                id: '6'
            }
        ],
        tabIndex: 0,
        scrollInto: '',
        scrollLefts:0,
        scrollH:500
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
       wx.getSystemInfo({
		   success:res=> {
			   this.setData({
				   scrollH:res.windowHeight + 100
			   })
		   }
	   })
    },
    onChangeTab(e) {
        let index = e.detail.current
        this.setData({
            tabIndex: index,
            scrollInto: 'tab' + index,
            scrollLefts: (index - 2) * 65
        })
    },

    onChange(e) {
        let { index } = e.currentTarget.dataset
        if (this.tabIndex == index) {
            return
        }
        this.setData({
            tabIndex: index,
            scrollInto: 'tab' + index,
            scrollLefts: (index - 2) * 65
        })
        //    this.scrollInto = 
    }
})