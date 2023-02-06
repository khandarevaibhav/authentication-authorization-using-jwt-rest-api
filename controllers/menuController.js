
const menuModel=require("../models/menu")


const getMenu = async (req, res) => {
    try {
      const menu = await menuModel.find({
        userId: req.userId,
      });
      res.status(200).json(menu);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong...' });
    }
  };
  
  


const createMenu = async (req, res) => {
    //console.log(req.userId)
    const { title, price } = req.body;
  
    const newMenu = new menuModel({
      title,
      price,
      userId: req.userId
  
    });
  
    try {
      newMenu.save();
      res.status(200).json(newMenu);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong !!!!' });
    }
  };
  
  const updateMenu = async (req, res) => {
    const { id } = req.params;
    const { title, price } = req.body;
    
    const newMenu = {
      title,
      price,
      userId: req.userId,
  
    };
    try {
      await menuModel.findByIdAndUpdate(id, newMenu, { new: true });
      //202 request accepted
      res.status(202).json(newMenu);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong..' });
    }
  };

  const deleteMenu = async (req, res) => {
    const { id } = req.params;
    try {
      const menu = await menuModel.findByIdAndRemove(id);
      res.status(202).json(menu);
    } catch (error) {
      res.status(500).json({ message: 'Something went wrong...' });
    }
  };

  module.exports = {
    getMenu,
    createMenu,
    updateMenu,
    deleteMenu,
  };
  





























// const getAllmenu=async (req, resp)=>{
//     menuModel.find()
//        .then((result)=>{
//         resp.send(result)
//        })
//        .catch((error)=>{
//         console.log(error)
//        })
    
// }
// const getMenuByid=async (req, resp)=>{
//     menuModel.findById(req.params.title)
//         .then((result)=>{
//             resp.send(result)
//         })
//         .catch((error)=>{
//             resp.send("id not found")
//             //console.log(error)
//         })
// }

// const getMenubyName=async(req, resp)=>{
//    const title=req.params.name
//     console.log(title)
//    let query= menuModel.find({title})
    
//    .then((result)=>{
//         if(result.length==0){
//             res.send("given name not in db")
//         }

//         resp.send(result)
//     })
//     .catch((error)=>{

//         resp.send("Not in database")

//     })
// }


// const createMenu = async (req, resp)=>{

//     const menu=new menuModel({
//         title: req.body.title,
//         price: req.body.price
//     })
//     menu.save()
//      .then((result)=>{
//         resp.send(result)
//      })
//      .catch((error)=>{
//         console.log(error)
//         resp.status(500).json({message:"Something went wrong"})

//      })
// }

// const updateMenu=async(req,resp)=>{
    
//     menuModel.findOneAndUpdate({_id:req.params.id},{

//         $set:{

//             title: req.body.title,
//             price: req.body.price
//         }
//        })
//        //adding promise
//        .then((result)=>{
       
//         resp.send("Successfully updated")
//         resp.send(result)

//        })

//        .catch(err=>{

//         resp.send('Cannot get Item')
        
//       })

// }

// const deleteMenu=async(req, resp)=>{
//     const id = req.params.id
//     menuModel.deleteOne(id)
//     .then((result)=>{

//         resp.send("Deleted Successfully!")

//     })
//     .catch(err=>{
//         resp.send("connot find Id")
//     })
// }
// module.exports={
//     getAllmenu,
//     getMenuByid,
//     getMenubyName,
//     createMenu,
//     updateMenu,
//     deleteMenu
// }
