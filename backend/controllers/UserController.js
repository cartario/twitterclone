import {UserModel} from '../models/UserModel';
import {validationResult} from 'express-validator';
import { generateMD5 } from '../utils/generateHash';
import {sendMail} from '../utils/sendMail';

class UserController {
  async index(req, res) {
    try {
      const users = await UserModel.find({}).exec();
      res.json({
        status: 'success',
        data: users
      });
    }
    catch (error){
      res.send({
        status: 'error',
        message: JSON.stringify(error)
      })
    }
  }

  async create(req, res) {    
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array()});
        return;
      }

      const data = {
        email: req.body.email,
        fullName: req.body.fullName,
        userName: req.body.userName,
        confirmed_hash: generateMD5(Math.random().toString()),
        password: req.body.password
      };
      
      const user = await UserModel.create(data);
      
      res.json({
        status: 'success',
        data: user
      });

      sendMail({
        emailFrom: 'twitter@test.com', 
        emailTo: data.email, 
        subject: 'Подтверждение почты', 
        html: `Чтобы подтвердить почту <a href="http://localhost:${process.env.PORT || 8888}/users/verify?hash=${data.confirmed_hash}">перейдите по ссылке </a>`
      }, (err)=> {
        if(err){
          res.json({
            status: 'errorSendMail',
            message: JSON.stringify(err)
          })
        }
      });
    }

    catch(error){      
      res.send({
        status: 'error',
        message: JSON.stringify(error)
      })
    }
  }

  async verify(req, res) {
    
    try {
      const hash = req.query.hash;

      if(!hash){
        res.status(400).send();
      }

      const user = await UserModel.findOne({confirmed_hash: hash}).exec();

      if(user){        
        user.confirmed = true;
        user.save();

        res.json({
          status: 'success'        
        })

      } else {
        res.json({
          mmessage: 'Пользователь не найден'
        })
      }      
    }
    catch(error) {
      res.status(500).send();
    }
  }
};

export const UserCtrl = new UserController();
