const $itemList = $('.itemList')
const $addList = $itemList.find('li.add')

const urlData = localStorage.getItem('urlData')
const dataObj = JSON.parse(urlData)   //把string变成对象


const hashMap = dataObj || [
    {logo: 'G' , url: 'https://www.github.com' },
    {logo: 'B' , url: 'https://www.bilibili.com'}
]

const simplifyUrl = (url) => {
    return url.replace('http://', '')
    .replace('https://', '')
    .replace('www.', '')
    .replace(/\/.*/, '')   //删除以'/'开头的url
}

const render =() =>{
    $itemList.find('li:not(.add)').remove()
    hashMap.forEach((node, index) => {
        const $li = $(`<li>
                <div class="item">
                    <div class="logo">${node.logo}</div>
                    <div class="linkAddress">${simplifyUrl(node.url)}</div>   
                    <div class="close">
                        <svg class="icon" aria-hidden="true">
                            <use xlink:href="#icon-guanbi1"></use>
                        </svg>
                    </div>
                </div>
        </li>`).insertBefore($addList)
        $li.on('click', () => {
            window.open(node.url,'_self')
        })
        //对删除操作阻止冒泡
        $li.on('click', '.close', (e) =>{
            e.stopPropagation();
            hashMap.splice(index,1)
            render()
        })

    })

}
render()

$('.addItem').on('click',()=>{
   let url = window.prompt('请添加你输入的地址')  
   if(url.indexOf('http') !== 0){
       url ='https://'+url
   }
   console.log(url)
   hashMap.push({
       logo: simplifyUrl(url)[0].toUpperCase(), 
       url: url
    })
    render()
});

//用户关闭页面之前触发
window.onbeforeunload = () =>{
    const string = JSON.stringify(hashMap)  //对象变字符串
    localStorage.setItem('urlData',string)    //在本地设置urlData存string
}

//用户按相关键进入网址
$(document).on('keypress',(e) => {
    const key = e.key
    console.log(key)
    for(let i=0; i<hashMap.length; i++){
        if(hashMap[i].logo.toLowerCase() === key){
            window.open(hashMap[i].url,'_self')
        }
    }
})

$(':input').on('keypress', (e) =>{
    e.stopPropagation();
})

