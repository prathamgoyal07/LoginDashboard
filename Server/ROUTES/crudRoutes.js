const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const Crud = require("../MODELS/model");



//create a login user
router.post('/createcrud', async (req, res) => {
    try{ 
        const {name, email, password, userType } = req.body;
        const newPassword = await bcrypt.hash(password, 10);
        const newCrud = new Crud ({
            name, 
            email,
            password: newPassword, 
            userType
        });
        await newCrud.save();
        res.status(201).json({
            message: "User created successfully",
        });
    }
    catch(err){
     res.status(500).json({
        messsage: err.message
     })
    }
})


//give you all the users
router.get('/getallcrud', async(req, res) => {
    try{
        const cruds = await Crud.find();
        res.status(200).json({
            cruds,
            message: "User fetched successfully",
    });
}
    catch(err){
        res.status(500).json({
            messsage: err.message
        })
    }
})

//give by id
// router.get('/getatcrud/:id', async(req, res) => {
//     try{
//         const crud = await Crud.findById(req.params.id);

//         if(!crud){
//             res.status(404).json({
//                 message: 'crud not found'
//             })
//         }
//         res.status(200).json({
//             crud,
//             message: "Crud fetched successfully",
//     });
// }
//     catch(err){
//         res.status(500).json({
//             messsage: err.message
//         })
//     }
// })

//update the crud
// router.put('/updatecrud/:id', async(req, res) => {
//     try{

//         const {name, email, password} = req.body;
//         const crud = await Crud.findByIdAndUpdate(req.params.id, {
//             name,
//             email,
//             password
//         }, {
//             new : true
//         } 
//         ) ;

//         if(!crud){
//             res.status(404).json({
//                 message: 'crud not found'
//             })
//         }
//         res.status(200).json({
//             crud,
//             message: "Crud updated successfully",
//     });
// }
//     catch(err){
//         res.status(500).json({
//             messsage: err.message
//         })
//     }
// })

//delete crud
router.delete('/deletecrud/:id', async (req, res) => {
    try{
        const crud = await Crud.findByIdAndDelete(req.params.id);

        if(!crud){
            res.status(404).json({
                message: 'User not found'
            })
        }
        res.status(200).json({
            message: 'User deleted successfully'
        });
    }
    catch(err){
        res.status(500).json({
            messsage: err.message
        })
    }
})




module.exports = router;