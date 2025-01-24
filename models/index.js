import {Sequelize} from 'sequelize';
import dotenv from 'dotenv';

//change name other wise db will be not able to use 
import UserModel from './user.js';
import PostModel from './post.js';

dotenv.config();

const sequelize=new Sequelize(
    process.env.DB_DATABASE,
    process.env.DB_USERNAME,
    process.env.DB_PASSWORD,
    {
        host:process.env.DB_Host,
        dialect:"mysql"
    }
);





const User=UserModel(sequelize);
const Post=PostModel(sequelize);


//now Relationship

User.hasMany(Post,{foreignKey:'userId',as:'posts'});
Post.belongsTo(User,{foreignKey:'id',as:'user'});




const db={Sequelize,sequelize,User,Post};

export default db;