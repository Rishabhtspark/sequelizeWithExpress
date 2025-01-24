import express from "express";
import db from "./models/index.js";
import postsRoutes from './routes/postsRoutes.js';
import join from './routes/join.js';

const app=express();

const { User } = db;
//Middleware
app.use(express.json());
app.use(postsRoutes);
app.use(join);

// / response 
app.get('/', (req, res) => {
    res.send('Welcome to Express with Sequelize!');
  });


//post users name and email
app.post('/users', async (req, res) => {
    const { name, email } = req.body;
    try {
      const user = await User.create({ name, email });
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
 });

  //get all user data
  app.get('/users',async(req,res)=>{
    try{
      const users=await User.findAll();
          res.status(200).json(users);
    }
  catch(err){
    res.status(500).json({error: "error.message" });
    console.warn(err);
  }
   });
  
  

//update user by id ,name or email
app.put('/users/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;
    const user = await User.findByPk(id);
    if (user) {
      user.name = name || user.name;
      user.email = email || user.email;
      await user.save();
      res.status(200).json(user);
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

















app.listen(3000,()=>{
    console.log("Running on port number 3000");
})

//test db connection
db.sequelize
  .authenticate()
  .then(() => console.log('Database connected'))
  .catch((err) => console.log('Error: ' + err));

//sync database
db.sequelize.sync({ alter: true });