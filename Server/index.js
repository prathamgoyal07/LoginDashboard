const express = require("express");
const mongoose = require('mongoose');
const cors = require("cors");
const User = require("./MODELS/model");
const dotenv = require("dotenv");
const bcrypt = require('bcryptjs');
const bodyParser = require('body-parser');
const jwt = require('jsonwebtoken');
const crudRoutes = require('./ROUTES/crudRoutes')

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors({
    origin : 'http://localhost:3001'
}));
app.use(bodyParser.json());
app.use('/crudroutes', crudRoutes)


mongoose.connect(process.env.MONGODB_URL)
  .then(() => {
    console.log("Connected to Mongodb");
  })
  .catch((err) => {
    console.log("Error Connecting to database" + err);
  });
   

app.get('/', (req, res) => {
    res.json('The API is working!');
});

app.post('/register', async (req,res) => {
    // console.log(req.body);
    const {name, email, password, userType} = req.body;
    try{
        const newPassword = await bcrypt.hash(password, 10);

        const existingUser = await User.findOne({email});
        
        if(existingUser){
            return res.status(409).json({ message: 'Email already exists'});
        }
       
        await User.create({
          name,
          email,
          password: newPassword,
          userType,
        });
        res.json({ status: "ok" });
      } catch (err) {
        res.json({ status: "error", error: "Duplicate email" });
      }
});
   
app.post("/login", async (req, res) => {
    
      const {email, password} = req.body;
      const user = await User.findOne({email})

      if(!user) {
            return res.status(401).json({message: 'Invalid credentials'});
      }

      const isPasswordCorrect = await bcrypt.compare(password, user.password);
     
    if (isPasswordCorrect) {
        const token = jwt.sign(
          {
            name: user.name,
            _id: user._id,
            email: user.email,
          },
          process.env.JWT_SECRET_KEY,
        );
    
        return res.json({ status: "ok", user: token, userType:user.userType });
      } else {
        return res.json({ status: "error", user: false });
      }
})
  
app.listen(process.env.PORT, () => {
    console.log("Backend server has started at " + process.env.PORT);
  });