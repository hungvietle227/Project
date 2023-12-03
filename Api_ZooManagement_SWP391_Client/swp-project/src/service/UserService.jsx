import axios from "axios"

const loginApi=(email,password)=>{
    return axios.post("https://reqres.in/api/login",{email,password});
}
const creatNewUser = (name, job) => {
    //return instance.post("/api/login", { email, password})
    return axios.post("https://reqres.in/api/users", { name, job });
  };
export {loginApi, creatNewUser}