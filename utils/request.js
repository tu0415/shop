
const baseUrl = 'http://192.168.0.120/index.php/api'
let questTotal = 0
const quest = (url, parameter,method) => {
    questTotal++
    if(questTotal == 1) {
        wx.showLoading({title: '加载中', mask: true,  success: res => {}});
    }
    
    return new Promise((resolve, reject) => {
        wx.request({
            url: `${baseUrl}${url}`,
            data: parameter,
            method: method,
            header:{"Content-Type": "application/x-www-form-urlencoded; charset=UTF-8"},
             dataType: 'json',
            success: res => {
                if(res.data.status == 1) {
                    resolve(res.data);
                } else if(res.data.status == 0){
                    wx.showToast({
                        title: res.data.msg,
                        icon: 'none',
                        duration: 2000
                    });
                    resolve(res.data);
                }
               
            },
            fail: (err) => {
                wx.showToast({
                    title: '服务器错误,请重试',
                    icon: 'none',
                    duration: 2000
                });
                reject(err);
            },
            complete: () => {
                questTotal--
                if(questTotal == 0) {
                    wx.hideLoading();
                }
               
            }
        });
    });

};

export default {
    quest,
    baseUrl
}