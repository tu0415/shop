
import common from "./request"

// 判断是否登录
export const isLogin = () => {
    return new Promise((resolve, reject) => {
        if (wx.getStorageSync('userInfo').nickName) {
            resolve();
        } else {
            wx.showToast({
                title: '还没有登录哟', //提示的内容,
                icon: 'success', //图标,
                mask: true, //显示透明蒙层，防止触摸穿透,
            });
            // setTimeout(() => {
            //     // wx.switchTab({
            //     //     url: '/pages/me/me'
            //     // })
            //     // wx.navigateTo({
            //     //     url: '/pages/login/login'
            //     // });
            // }, 800)
        }
    })
}

// 微信登录
export const wslogin = () => {
    return new Promise((resolve, reject) => {
        wx.login({
            success(res) {
                if (res.code) {
                    resolve(res.code);
                } else {
                    wx.showToast({
                        title: res.errMsg, //提示的内容,
                        icon: 'success', //图标,
                        mask: true, //显示透明蒙层，防止触摸穿透,
                    });
                }
            },
            fail(err) {
                reject(err)
            }
        })
    })
}

// 弹窗
export const showModal = ({ content }) => {
    return new Promise((resolve, reject) => {
        wx.showModal({
            title: '提示', //提示的标题,
            content: content, //提示的内容,
            showCancel: true, //是否显示取消按钮,
            success: res => {
                resolve(res)
            }
        });
    })
}

// Toast 提示
export const showToast = ({ content }) => {
    return new Promise((resolve, reject) => {
        wx.showToast({title: content,icon: 'none',duration: 2000})
    })
}



// 微信支付
export const requestPayment = (pay) => {
    return new Promise((resolve, reject) => {
        wx.requestPayment({
            ...pay,
            success: (res) => { resolve(res) },
            fail: (err) => { reject(err) }
        })
    })
}

// 上传图片
export const uploadImg = () => {
    return new Promise((resolve, reject) => {
        wx.chooseImage({
            count: 1,
            sizeType: ['original', 'compressed'],
            sourceType: ['album', 'camera'],
            success: (res) => {
                resolve(res)
            }
        })
    })
}

// 上传文件
export const uploadFile = (filePath) => {
    return new Promise((resolve, reject) => {
        wx.uploadFile({
            url: common.baseUrl + '/goods/uploadPictureFile',
            filePath: filePath,
            name: 'file',
            headers: {
                'Content-Type': 'multipart/form-data' //********划重点
            },
            success: (data) => {
                if(JSON.parse(data.data).code == 200) {
                    resolve(JSON.parse(data.data).data)
                } else {
                    reject(data)
                }
            },
            fail: (err) => { reject(err) }
        })
    })
}







