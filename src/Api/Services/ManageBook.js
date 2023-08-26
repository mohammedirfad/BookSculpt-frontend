import axios from '../Axios.js'




export const getBooks = async () =>{
    try{
        const response = await axios({
            url: `/getBooks`,
            method: "get",
           
         });
         const data = response
         if(data) return data;
    }
    catch(err){
        throw err
        console.log(err,"errr occured")
    }
}


export const myBooks = async (token) =>{
    try{
        const response = await axios({
            url: `/myBooks`,
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
              },
           
         });
         const data = response
         if(data) return data;
    }
    catch(err){
        console.log(err,"errr occured")
    }
}

export const ViewBook = async (id,token) =>{
    try{
        const response = await axios({
            url: `/ViewBooks?id=${id}`,
            method: "get",
            headers: {
                Authorization: `Bearer ${token}`,
              },
           
         });
         const data = response
         if(data) return data;
    }
    catch(err){
        throw err
        console.log(err,"errr occured")
    }
}



export const AddBooks = async (id,formData,token) => {

    try{
        const response = await axios({
            method: 'post',
            url: '/add-book',
            headers: {
                Authorization: `Bearer ${token}`,
              },
            data: {
                formData, id,
            }
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        throw error
       
    }
}


export const AddtoCart = async (id,token) =>{
    console.log(token,"ll");
    try{
        const response = await axios({
            url: `/addtoCart`,
            method: "post",
            headers: {
                Authorization: `Bearer ${token}`,
              },
              data:{
                id
              }
           
         });
         const data = response
         if(data) return data;
    }
    catch(err){
        console.log(err,"errr occured")
        throw err;
       
    }
}




export const getCart = async (token) => {
console.log("1");
    try{
        console.log("2");
        const response = await axios({
            method: 'get',
            url: '/getCart',
            headers: {
                Authorization: `Bearer ${token}`,
              },
           
        });
        const data = response
        if(data) return data;
    }
    catch(error){
        throw error
       
    }
}
