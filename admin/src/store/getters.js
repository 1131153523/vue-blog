export default {
    checkToken(state){
        return {
            token: state.token,
            username: state.username
        }
    }
}