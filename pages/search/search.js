import http from "../../utils/request"
import {goods} from "../../api/index"
// import { threadId } from "worker_threads"
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navH:'',
        page:1,
        value:'',
        classData:[],
        tabIndex:1,
        isSold:true,
        isPrice:true,
        finish:false
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {
        wx.getSystemInfo({
            success:res=> {
                this.setData({
                    navH:res.statusBarHeight
                })
            }
        })
      
    },
    back() {
       wx.navigateBack({back:1})
    },
    select(e) {
        let {id} = e.currentTarget.dataset
        this.setData({tabIndex:id})
        this.sort(e)
    },

    async startSearch(e) {
        let search = e.detail.value
        this.setData({value:search})
        let parameter = {
            search,
            page:this.data.page,
        }
        let {data} = await http.quest(goods.goodsList,parameter)
         if(data && data.length) {
            this.setData({finish:data.length < 10})
            !this.data.finish && this.setData({page:this.data.page+=1})
            this.setData({classData:this.data.classData.concat(data)})
        }
    },

    sort(e) {
        let { sold, price, sort, dest } = e.currentTarget.dataset
        if (this.data.tabIndex == 2) {
            // this.isSold = !this.isSold
           
            if (this.data.isSold) {
                this.data.classData.sort((a, b) => {
                    return a.sales - b.sales
                })
            } else {
                this.data.classData.sort((a, b) => {
                    return b.sales - a.sales
                })
            }
            this.setData({isSold:!this.data.isSold,classData:this.data.classData})
        } else if (this.data.tabIndex == 3) {
            if (this.data.isPrice) {
                this.data.classData.sort((a, b) => {
                    return a.markprice - b.markprice
                })
            } else {
                this.data.classData.sort((a, b) => {
                    return b.markprice - a.markprice
                })
            }
            this.setData({isPrice:!this.data.isPrice,classData:this.data.classData})
        }
    },
   
    onReachBottom() {
        this.startSearch()
    },

   
})