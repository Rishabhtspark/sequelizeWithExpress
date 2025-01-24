
import { DataTypes} from "sequelize";

export default (sequelize)=>{

    const Post=sequelize.define("Post",{
      
        title:{
            type:DataTypes.STRING,
            allowNull:false 
        },
        content:{
            type:DataTypes.TEXT,
            allowNull:false
        },
        userId:{
            type:DataTypes.INTEGER,
            allowNull:false,
            references:{
                model:'Users',
                key:'id'
            }
        }

    })

    return Post;
}