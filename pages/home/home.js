import http from "../../utils/request"
import {login,goods} from "../../api/index"
Page({
    data: {
        navBar: [],
        tabIndex: 0,
        swiperList:[],
        hotList:[],
        scrollInto: '',
        scrollLefts:0,
        scrollH:500,
        hotPage:1,
        goodsPage:1,
        id:0,
        goodslist:[],
        finish:false,
        hotfinish:false
    },
    navBarDefault:[{name: '首页',id: '0'}],
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad() {
       wx.getSystemInfo({
		   success:res=> {
			   this.setData({
				   scrollH:res.windowHeight  - 90
			   })
		   }
       })
       this.getBarData()
       this.getSwiperData()
       this.getHotGoodsData(this.data.hotPage,1)
      
    },
    onShow() {},
    onChangeTab(e) {
        let id;
        let index = e.detail.current
        this.data.navBar.forEach((item,i)=>{
            if(index == i ) {
                id = item.id
                this.setData({id:item.id})
            }
        })
       
        this.setData({
            tabIndex: index,
            scrollInto: 'tab' + id,
            scrollLefts: (index - 2) * 65
        })
        this.clearData()
        this.getGoodsData(this.data.goodsPage,this.data.id)
    },

    onChange(e) {
        let { index,id } = e.currentTarget.dataset
        if (this.tabIndex == index) {
            return
        }
        this.setData({
            tabIndex: index,
            scrollInto: 'tab' + id,
            scrollLefts: (index - 2) * 65
        })
        this.clearData()
        // this.getGoodsData(this.data.goodsPage,this.data.id)

    },
  async getBarData() {
        let {data} = await http.quest(goods.typeList)
        this.setData({navBar:[]})
        this.navBarDefault =  [{name: '首页',id: '0'}]
        this.navBarDefault = this.navBarDefault.concat(data)
        this.setData({navBar:this.navBarDefault})
        if(this.data.tabIndex == 0) {
            this.getGoodsData(this.data.goodsPage,this.navBarDefault[0].id)
        }
    },

    async getSwiperData() {
        let {data} = await http.quest(login.navigationList)
        this.setData({swiperList:data})
    },
    async getHotGoodsData(hotPage,status) {
        let parameter = {page:hotPage,limit:3,hot:1}
        let data = await http.quest(goods.goodsList,parameter)
        if(data.status != 0) {
            this.data.hotfinish = data.data.length < 3
            !this.data.hotfinish && this.setData({page: hotPage})
            this.setData({hotList:data.data})
        } 
    },
    nextPage(e) {
        let {type} = e.currentTarget.dataset
        if(type == -1) {
            if(this.data.hotPage == 1) {
                wx.showToast({title: '亲,已经是第一页了哟',icon:'none'})
            }else {
                this.setData({hotPage:this.data.hotPage-=1})
                this.getHotGoodsData(this.data.hotPage,-1)
            }
        } else {
            if(!this.data.hotfinish) {
                this.setData({hotPage:this.data.hotPage+=1})
                this.getHotGoodsData(this.data.hotPage,1)
            } else {
                wx.showToast({title: '亲,已经是最后一页了哟',icon:'none'})
            }
        }
    },
    async getGoodsData(goodsPage,type) {
        let parameter = {
            page:goodsPage,
            limit:6,
            type:type
        }
        if (this.data.finish) return
        let {data} = await http.quest(goods.goodsList,parameter)
        if(data && data.length) {
            this.data.finish = data.length < 6
            !this.data.finish && this.setData({page:this.data.goodsPage+=1})
            this.setData({goodslist:this.data.goodslist.concat(data)})
        }
    },

    clearData() {
        this.setData({goodslist:[],finish:false,goodsPage:1})
    },
   
    loadMore() {
        this.getGoodsData(this.data.goodsPage,this.data.id)
    }
})