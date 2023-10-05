const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cloudinary=require('cloudinary');

const app=require('./index');


dotenv.config({path:'./config.env'});

cloudinary.config({ 
    cloud_name: 'dleogo48u', 
    api_key: '643894985824757', 
    api_secret: '4D_VmBL5uCMqVlj_eL2w5pUVUKs',
  });


const DB = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster1.vp2kugo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;

mongoose.connect(DB).then(()=>console.log('DB connected successfully')); 




const server=app.listen(8000,()=>{
    console.log(`Server is running at port ${process.env.PORT} and in ${process.env.NODE_ENV} mode`)
}); 