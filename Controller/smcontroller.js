


///Insertion
const SmModel  = require('../Model/smSchema');

const authareadatasm = (req, res)=>{
    
    

    let areapostCreate = new SmModel({

        scode: req.body.scode, 
        sname: req.body.sname, 
        semail: req.body.semail, 
        snumber: req.body.snumber, 
        ssalary: req.body.ssalary, 


        userEmail: req.body.userEmail,
        // hotelname: req.body.hotelname,


    })
    
    areapostCreate.save()
    .then((response)=>{
        console.log(`response success`)

        res.status(200).send({result: response, Message: "SM Data Successfully"})

        console.log(areapostCreate)

    }).catch((err)=>{
        res.status(400).send({result: err, Message: "SM Data Not Successfully"})
    })

}


//getsingleuserid

const getareaidsm = async(req, res)=>{
    try {
        console.log(req.params);
        const {id} = req.params;

        const userindividual = await SmModel.findById({_id:id});
        console.log(userindividual);
        res.status(201).json(userindividual)

    } catch (error) {
        res.status(422).json(error);
    }
}


//getscode

const getareaidscode = async(req, res)=>{
    try {
        console.log(req.params);
        const {scode} = req.params;

        const userindividualscode = await SmModel.find({scode:scode});
        console.log(userindividualscode);
        res.status(201).json(userindividualscode)

    } catch (error) {
        res.status(422).json(error);
    }   
}


// delete cat
const deleteareasm = async(req,res)=>{
    try {
        const {id} = req.params;

        const deleteareauser = await SmModel.findByIdAndDelete({_id:id})
        console.log(deleteareauser);
        res.status(201).json(deleteareauser);

    } catch (error) {
        res.status(422).json(error);
    }
}



// // update user data

const areaupdatesm = async(req,res)=>{
    try {
        const {id} = req.params;

        const updateduserarea = await SmModel.findByIdAndUpdate(id,req.body,{
            new:true
        });

        console.log(updateduserarea);
        res.status(201).json(updateduserarea);

    } catch (error) {
        res.status(422).json(error);
    }
}



//get all area data

const getallareasm = async(req, res)=>{
    const allgetarea = await SmModel.find();
    res.json(allgetarea);

}

//insertion sort

const getSort = async(req, res)=>{
    try {
        

        const Srt = await SmModel.find().sort({sname: 1}).limit(10);
        console.log(Srt);
        res.status(201).json(Srt)

    } catch (error) {
        res.status(422).json(error);
    }
}

//buble sort

const getSort2 = async(req, res)=>{
    try {
        

        const Srt2 = await SmModel.find().sort({sname: -1}).limit(10);
        console.log(Srt2);
        res.status(201).json(Srt2)

    } catch (error) {
        res.status(422).json(error);
    }
}

module.exports = {authareadatasm, getallareasm, getareaidsm, deleteareasm, areaupdatesm, getSort, getareaidscode, getSort2}