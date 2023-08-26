import axios from '../Axios.js'


//Login

export const UserLogin = async (formData)=>{
    try{
        const response = await axios({
            url: "/login",
            method: "post",
            data: {
                formData
            }
         });
         const data = response
         if(data) return data;
    }
    catch(err){
        console.log(err);
        throw err
    }

}


//signup

export const SignUp = async (Datas) =>{
    try{
        const response = await axios({
            url: "/signup",
            method: "post",
            data: {
                Datas
            }
         });
         const data = response
         if(data) return data;
    }
    catch(err){
        throw err 
        console.log(err,"errr occured")
    }
}