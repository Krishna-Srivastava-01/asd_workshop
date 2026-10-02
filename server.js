const express=require("express");
const fs=require("fs/promises");
const path=require("path");
const port= 3000;

let filepath=path.join(__dirname,"database","db.json");
const app=express();



let cache={};
// "/products" - []
//"/products/1" - {}
//"/products/2" - {}



async function readData(){
let data = await fs.readFile(filepath,"utf-8");
return JSON.parse(data);    
}

async function delayReadData(){
    await new Promise((resolve,reject)=>{
        setTimeout(()=>resolve(),1500);
    })
    return await readData();
};


app.get('/products',async (req,res)=>{
    let key=req.url;
    let value=cache[key];
    try
    {
        if(value){
           return res.json(value);
        }
        let products=await delayReadData();
        cache[key]=products;
        return res.json(products);
    }
    catch(err){
        console.log(err);
    }
});

app.get('/products/:id',async (req,res)=>{
    let key=req.url;
    let value=cache[key];
    try{
        if(value){
           return res.json(value);
        }
        let id= Number(req.params.id);
        let products=await delayReadData();
        let data=products.find((item)=>item.id===id);
        cache[key]=data;
        return res.json(data);
    }
    catch(err){
        console.log(err);
    }
});

app.listen(port,()=>{
    console.log("Server is running");
})




