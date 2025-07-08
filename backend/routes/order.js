const Order =require("../models/Order");
const {verifyToken, verifyTokenAndAuthorization,verifyTokenAndAdmin} = require("./verifyToken");

const router = require('express').Router();

//create
router.post("/", async (req, res) => {
    console.log("Received order data:", req.body);
    
    const newOrder = new Order(req.body);

    try {
        const savedOrder = await newOrder.save();
        console.log("Order saved successfully:", savedOrder);
        res.status(200).json(savedOrder);
    } catch (err) {
        console.error("Order save error:", err);
        res.status(500).json({ 
            error: err.message,
            details: err.errors || err
        });
    }
});


//Update
router.put("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
        const updatedOrder= await Order.findOneAndUpdate(
            { _id: req.params.id },
            { $set: req.body },
            { new: true }
        );
        res.status(200).json(updatedOrder);
    }catch (err){
        res.status(500).json(err);
    }
});

//delete
router.delete("/:id",verifyTokenAndAdmin,async (req,res)=>{
    try{
        await Order.findByIdAndDelete(req.params.id)
        res.status(200).json("Order has been deleted...")
    }catch(err){
        res.status(500).json(err);
    }
})

//Get user Orders
router.get("/find/:userId",verifyTokenAndAuthorization,async (req,res)=>{
    try{
        const orders=await Order.find({userId:req.params.userId});
        res.status(200).json(orders);
    }catch(err){
        res.status(500).json(err);
    }
})

//Get all

router.get("/",async (req,res)=>{
    try {
        const orders = await Order.find();
        res.status(200).json(orders);
    } catch(err){
        res.status(500).json(err);
    }
})

//Get monthly income
// Get monthly income
router.get("/income", async (req, res) => {
  try {
    const now = new Date();
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);

    const income = await Order.aggregate([
      { $match: { createdAt: { $gte: twoMonthsAgo } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          total: { $sum: "$amount" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(income);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get monthly sales count
router.get("/sales", async (req, res) => {
  try {
    const now = new Date();
    const twoMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 2, 1);

    const sales = await Order.aggregate([
      { $match: { createdAt: { $gte: twoMonthsAgo } } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(sales);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;