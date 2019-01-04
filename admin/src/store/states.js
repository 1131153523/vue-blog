const state = {
    token: window.sessionStorage.getItem('token'),
    username:window.sessionStorage.getItem('username'),
    isCollapse: true,
    headColor: '#37AA7A',
    tagsView: [
        {
            tag: '首页',
            path: '/admin/home'
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