const state = {
    token: window.sessionStorage.getItem('token'),
    username:window.sessionStorage.getItem('username'),
    isCollapse: false,
    headColor: '#37AA7A',
    tagsView: [
        {
            tag: '首页',
            path: '/admin/home'
        },
        {
            tag: '发布文章',
            path: '/admin/write'
        },
        {
            tag: '审核文章',
            path: '/admin/verifyArticle'
        }
    ],
    tags: [],
    draft:'',
    articleValue: '',
    articleList: [],
    articleList1: [],
    options2: [],
    options1: [],
    articleTree: [],
    
};
export default state;