
const authModel = require('../Model/signupschema');
const postModel = require('../Model/postSchema');
const postModels = require('../Model/postSchemas');
const bcrypt = require("bcryptjs");
const bookingModel = require('../Model/bookingSchema')
const MultipleFile = require('../Model/multiplefile');


///signup api

const authSignUp=async(req,res)=>{
    
    try {
        
        const { email, password, role, name, hotelname, contact, address, city, area, marketname, cnic, img, accountsstatus } = await  req.body;
        console.log(req.body,'req.body')

        const checkUser = await authModel.findOne({email:email})
console.log(checkUser,'checkUser')

if(checkUser){
    return res.status(400).send({ success: false, message: "user already registered" });

}else{
    const hastPass = await bcrypt.hash(password,12);
    const userCreate = new authModel({email,pass:hastPass,role,name,hotelname, contact, address, city, area, marketname, cnic, img, accountsstatus}) //store into Database
    userCreate.save()
    .then((response)=>{
        return res.status(200).send({ success: true, message:"Successfully Registered"})
    })
    .catch(()=>{
        return res.status(400).send({ success: false, message:"error"})
    })
}
    }
catch (e) {
    return res.status(401).send({ success: false, message: e.message });
  }
}




///signin api

const authsignin=async(req,res)=>{
    try {
console.log(req.body,'req.body')
let {email,password} = await req.body;
const checkUser = await authModel.findOne({email:email})

if(checkUser){
console.log(checkUser,'checkUser')
    const passTest = await bcrypt.compare(password,checkUser.pass)
    if(passTest){
        return res.status(200).send({
            message: "login successfull",
            success: true,
        data:{userId:checkUser._id,email:checkUser. email}})
    }else{
        return res.status(400).send({success:false,message:"Password Incorrect!"})
        return alert(data.Message)
    }

}else{
    return res.status(400).send({ success: false, message:"Email Not Found"}) 
}

    }
    catch(e){
        console.log(e,'eeee')
        return res.status(401).send({ success: false, message: e.message });
    }
}







///Add Post Data

const authPostdata = async (req, res, next)=>{
    
    
    const postCreate = new postModel({

        
        dt: req.body.dt,
        brand: req.body.brand,
        model: req.body.model,
        serial: req.body.serial,
        userEmail: req.body.userEmail,
        qty: req.body.qty,
        fqty: req.body.fqty,
        year: req.body.year,
        hotelname: req.body.hotelname,
        buyer: req.body.buyer,
        currency: req.body.currency,
        cost: req.body.cost, 
        cargoCost: req.body.cargoCost,
        repairing: req.body.repairing,
        totalP: req.body.totalP,
        totalN: req.body.totalN,
        desc: req.body.desc,

        imageURL: req.body.imageURL,
        status : req.body.status
       
     
       


        
    })
    
    postCreate.save()
    .then((response)=>{
        console.log(`response success`)

        res.status(200).send({result: response, Message: "Post Data Successfully"})

        console.log(postCreate)

    }).catch((err)=>{
        res.status(400).send({result: err, Message: "Post Data Not Successfully"})
    })

}








///Add Post Data Sale

const authPostdatasale = async (req, res, next)=>{
    
    
    const postCreates = new postModels({

        
        dt: req.body.dt,
        brand: req.body.brand,
        model: req.body.model,
        serial: req.body.serial,
        userEmail: req.body.userEmail,
        qty: req.body.qty,
        fqty: req.body.fqty,
        year: req.body.year,
        hotelname: req.body.hotelname,
        buyer: req.body.buyer,
        currency: req.body.currency,
        cost: req.body.cost, 
        cargoCost: req.body.cargoCost,
        repairing: req.body.repairing,
        totalP: req.body.totalP,
        totalN: req.body.totalN,
        desc: req.body.desc,
        pid: req.body.pid,

        imageURL: req.body.imageURL,
        status : req.body.status
       
     
       


        
    })
    
    postCreates.save()
    .then((response)=>{
        console.log(`response success`)

        res.status(200).send({result: response, Message: "Post Data Successfully"})

        console.log(postCreates)

    }).catch((err)=>{
        res.status(400).send({result: err, Message: "Post Data Not Successfully"})
    })

}


//getsingleuserid sale

const getpostbyIDs = async(req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividualsa = await postModels.findById({_id:id});
        console.log(userindividualsa);
        res.status(201).json(userindividualsa)

    } catch (error) {
        res.status(422).json(error);
    }
}


// update user data sale

const postupdates = async(req,res)=>{
    try {
        const {id} = req.params;

        const updatedusers = await postModels.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updatedusers);
        res.status(201).json(updatedusers);

    } catch (error) {
        res.status(422).json(error);
    }
}


////// delete post picture sale
const postdeletes = async(req,res)=>{
    try {
        const {id} = req.params;

        const deletusers = await postModels.findByIdAndDelete({_id:id})
        console.log(deletusers);
        res.status(201).json(deletusers);

    } catch (error) {
        res.status(422).json(error);
    }
}

const fileSizeFormatter = (bytes, decimal) => {
    if(bytes === 0){
        return '0 Bytes';
    }
    const dm = decimal || 2;
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'YB', 'ZB'];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) + ' ' + sizes[index];

}


//get all post data

const getallPost = async(req, res)=>{
    const allpost = await postModel.find();
    res.json(allpost);


}


//get all post stock

const getallPoststock = async(req, res)=>{
    const allpoststock = await postModel.find({status: 'Stock'});
    res.json(allpoststock);

}


//get all post data by categoryname

const getallPostbycategory = async(req, res)=>{
    const {brand} = req.params;

    const allpostcategory = await postModel.find({brand: brand});

    res.json(allpostcategory);

}

//get all post data by model

const getallPostbymodel = async(req, res)=>{
    const {model} = req.params;

    const allpostmodel = await postModel.find({model: model});

    res.json(allpostmodel);

}

//get all post data by serial

const getallPostbyserial = async(req, res)=>{
    const {serial} = req.params;

    const allpostserial = await postModel.find({serial: serial});

    res.json(allpostserial);

}



//get all post data by subcategoryname

const getallPostbysubcategory = async(req, res)=>{
    const {qty} = req.params;

    const allpostsubcategory = await postModel.find({qty: qty});

    res.json(allpostsubcategory);

}

//get all book data

const getallBook = async(req, res)=>{
    const allpostbook = await bookingModel.find();
    res.json(allpostbook);

}


//get all signup

const getallSignup = async(req, res)=>{
    const allsignup = await authModel.find();
    res.json(allsignup);

}

//get post by email

const getpostbyemail = async(req, res)=>{
    const {userEmail} = req.params;
    const allpostemail = await postModel.find({userEmail: userEmail});
    res.json(allpostemail);

}



//get post sale by email

const getpostbyemailsale = async(req, res)=>{
    const {userEmail} = req.params;
    const allpostemailsale = await postModels.find({userEmail: userEmail});
    res.json(allpostemailsale);

}


//get all post data by date sale

const getallPostbydt = async(req, res)=>{
    const {dt} = req.params;

    const allpostdt = await postModels.find({dt: dt});

    res.json(allpostdt);

}

//get post Signup by email

const getpostsignupbyemail = async(req, res)=>{
    const {email} = req.params;
    const {accountsstatus}= req.params;

    const allpostemailsignup = await authModel.find({email: email});
    res.json(allpostemailsignup);

}


//getsingleuserid

const getpostbyID = async(req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await postModel.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
}


// update user data

const postupdate = async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await postModel.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
}


// delete post picture
const postdelete = async(req,res)=>{
    try {
        const {id} = req.params;

        const deletuser = await postModel.findByIdAndDelete({_id:id})
        console.log(deletuser);
        res.status(201).json(deletuser);

    } catch (error) {
        res.status(422).json(error);
    }
}


// delete post picture
const deletesignup = async(req,res)=>{
    try {
        const {id} = req.params;

        const deletsignupuser = await authModel.findByIdAndDelete({_id:id})
        console.log(deletsignupuser);
        res.status(201).json(deletsignupuser);

    } catch (error) {
        res.status(422).json(error);
    }
}


//getsingle profile id

const getprofid = async(req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await authModel.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
}


// update profile data

const profileupdate = async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduser = await authModel.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduser);
        res.status(201).json(updateduser);

    } catch (error) {
        res.status(422).json(error);
    }
}

//getlast multiple pictures

const getLastmulti = async(req, res)=>{
    try {
        // console.log(req.params);
        // const {id} = req.params;

        const lastmulti = await MultipleFile.find().sort({_id: -1}).limit(1);
        console.log(lastmulti);
        res.status(201).json(lastmulti)

    } catch (error) {
        res.status(422).json(error);
    }
}


const getmarketName = async(req, res)=>{
    const {marketname} = req.params;
    const allmarketname = await authModel.find({marketname: marketname});
    res.json(allmarketname);

}

const getshopName = async(req, res)=>{
    const {hotelname} = req.params;
    const allshopname = await postModel.find({hotelname: hotelname});
    res.json(allshopname);
}

module.exports = {authSignUp, authPostdata, authPostdatasale, getallPostbydt, authsignin, getallPost, getpostbyID, postupdate, postdelete, getpostbyemail, getpostbyemailsale, getpostsignupbyemail, getallSignup, getallBook, getallPostbycategory, getallPostbysubcategory, deletesignup, getprofid, profileupdate, getLastmulti, getmarketName, getshopName, getallPostbymodel, getallPostbyserial, getallPoststock, postdeletes, getpostbyIDs, postupdates}