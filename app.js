const express=require('express');
const app = express();
const mongoose=require("mongoose");
app.use(express.json());
import{ v4 as uuidv4 }from "uuid";
mongoose.connect("mongodb://localhost:27017/expenses").then(()=>{
    console.log("connected to MongoDB");
});

const expenseSchema=new mongoose.Schema({
    id:{type: String,required:true},
    title:{type: String,required:true},
    amount:{type: String,required:true},
});
const Expense=mongoose.model("Expense",expenseSchema);
app.get('/api/expenses',(req,res)=>{
    res.status(200).json(expenses);
});

//get
app.get("/api/expenses/:id",(req,res)=>{
    const{id}=req.params;
    const expense=expense.find((expense)=>expense.id==id);
    if(!expense){
        res.status(404).json({message:"Not Found"});
        return
    }
    res.status(200).json(expense);
});

//put 
app.put("/api/expenses/:id", async (req, res) => {
    const { id } = req.params;
    const { title, amount } = req.body;
        const updatedExpense = await Expense.findOneAndUpdate(
            { id: id }, 
            { title: title, amount: amount },
            { new: true }
        );
        if (!updatedExpense) {
            return res.status(404).json({ message: "Expense not found" });
        }
        res.status(200).json(updatedExpense);
});

//post
app.post("/api/expenses",async(req,res)=>{
    const{title,amount}=req.body;
    const newExpense=new Expense({
        id:uuidv4(),
        title:title,
        amount:amount
    })
    const savedExpense= await newExpense.save()
    res.status(201).json(savedExpense)
    res.end();
});

app.listen(3000,()=>{
    console.log("server is running")
});