const getUser = ()=>{
    console.log("inside getUser")
    console.log(localStorage.getItem('username'))
    return localStorage.getItem('username')
}
export default getUser;