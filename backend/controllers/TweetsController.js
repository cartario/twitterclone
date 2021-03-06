import {TweetsModel} from '../models/TweetsModel';
import {validationResult} from 'express-validator';
import mongoose from 'mongoose';

const isValidId = mongoose.Types.ObjectId.isValid;

class TweetsController {
  async index(req, res){
    try {
      const tweets = await TweetsModel.find({}).populate('User').exec();
      res.json({
        status: 'success',
        data: tweets
      })
    }
    catch(error){
      res.send({
        status: 'error',
        message: error
      })
    }
  }

  async create(req, res){
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array()});
        return;
      }
      
    try {
      const data = {              
        text: req.body.text,
        user: {
          fullName: req.body.fullName,
          userName: req.body.userName,
          avatarUrl: req.body.avatarUrl
        },
        postUrl: req.body.postUrl
      };

      const tweet = await TweetsModel.create(data);

      res.json({
        status: 'success',
        data: tweet
      })
    }
    catch(error) {
      res.send({
        status: 'error',
        message: error
      })
    }
  }

  async show(req, res){
    try{
      const tweetId = req.params.id
      
      if(!isValidId(tweetId)){        
        res.status(401).send();
        return;
      }

      const tweet = await TweetsModel.findById(tweetId).exec();
      res.send({
        status: 'success',
        data: tweet
      })      
    }
    catch(error){
      res.json({
        status: 'error',
        message: error
      })
    }
  }

  async remove(req, res){
    
    try {
      const tweetId = req.params.id;      

      if(!isValidId(tweetId)){
        res.status(401).send({message: 'невалидный id'});
        return;
      }

      const tweet = await TweetsModel.findByIdAndDelete(tweetId);
      
      if(!tweet){
        res.send({
          message: 'tweet does not exist'
        });
        return;
      }

      res.send({
        status: 'success'
      });      
    }
    catch(error){
      
      res.send({
        status: 'error',
        message: error
      })
    }
  }

  async update(req, res){
    
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array()});
        return;
      }

      const tweetId = req.params.id;      

      if(!isValidId(tweetId)){
        res.status(401).send();
        return;
      }

      const tweet = await TweetsModel.findById(tweetId);
      
      if(!tweet){
        res.send({
          message: 'tweet does not exist'
        });
        return;
      }

      tweet.text = req.body.text;
      await tweet.save();

      res.send({
        status: 'success'
      });      
    }
    catch(error){
      res.send({
        status: 'error',
        message: error
      })
    }
  }
};

export const TweetsCtrl = new TweetsController();

