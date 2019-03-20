('use strict');

const fs = require('fs');

let rawdata = fs.readFileSync('userData.json');
let user = JSON.parse(rawdata);
// console.log(user[5]);

module.exports = {
  // 1
  getUsers: async (req, res) => {
    try {
      res.status(200).send(res.json(user));
    } catch (error) {
      res.status(500).send(error);
    }
  },
  //   2
  getById: async (req, res) => {
    try {
      console.log('params', req.params);
      let { userId } = req.params;
      res.status(200).send(res.json(user[userId]));
    } catch (error) {
      res.sendStatus(404);
      console.log(error);
    }
  },
  //   3
  getAdmin: async (req, res) => {
    let admin = [];
    // for(let i = 0; i < user.length; i++){
    //     use
    for (var type in user) {
      //   console.log(user[type].type);
      if (user[type].type === 'admin') {
        console.log(admin);
        admin.push(user[type]);
      }
    }
    // }
    // const all = res.every(item => item.type === 'admin');
    try {
      res.status(200).send(admin);
    } catch (error) {
      console.log(error);
    }
  },
  //   4
  getNonAdmin: async (req, res) => {
    let nonAdmin = [];
    for (var type in user) {
      if (user[type].type !== 'admin') {
        nonAdmin.push(user[type]);
      }
    }
    try {
      res.status(200).send(nonAdmin);
    } catch (error) {
      console.log(error);
    }
  },
  //   5
  getUserType: async (req, res) => {
    // console.log('params', req.params);
    const { userType } = req.params;
    // console.log(userType);
    let newType = [];
    for (var type in user) {
      if (user[type].type === userType) {
        console.log('is equal', user[type]);
        newType.push(user[type]);
      }
    }
    try {
      console.log(newType);
      res.status(200).send(newType);
    } catch (error) {
      console.log(error);
    }
  },
  //   6 <- DONE :) // not the best.. i know. running low on time
  editUser: async (req, res) => {
    let newEditedUser = [];
    const { userId } = req.params;
    // Says its sent on the body?? its undefined
    // console.log(req.body);
    // console.log('before', user[userId]);
    const {
      first_name,
      last_name,
      email,
      gender,
      language,
      age,
      city,
      state,
      type,
      favorites
    } = req.body;
    user[userId].first_name = first_name;
    user[userId].last_name = last_name;
    user[userId].email = email;
    user[userId].gender = gender;
    user[userId].language = language;
    user[userId].age = age;
    user[userId].city = city;
    user[userId].state = state;
    user[userId].type = type;
    user[userId].favorites = favorites;
    // console.log('after', user[userId]);
    newEditedUser.push(user[userId]);
    // console.log('new edited user', newEditedUser);
    try {
      res.status(200).send(newEditedUser);
    } catch (error) {
      console.log(error);
    }
  },
  //   7 <- almost there. not quite
  postUser: async (req, res) => {
    // console.log('hit');
    let findId = user.length - 1;

    const {
      first_name,
      last_name,
      email,
      gender,
      language,
      age,
      city,
      state,
      type,
      favorites
    } = req.body;
    // ID not totally working
    let person = {
      id: findId + 1,
      first_name,
      last_name,
      email,
      gender,
      language,
      age,
      city,
      state,
      type,
      favorites
    };
    console.log('person', person);
    try {
      res.status(200).send(person);
    } catch (error) {
      console.log(error);
    }
  },
  //   8
  deleteUser: async (req, res) => {
    // console.log('hit');
    const { userId } = req.params;
    console.log('id', userId);

    // console.log('user', user[userId].id);
    const newIIDD = userId++;
    console.log('iidd', newIIDD);
    user.map((user, index) => {
      // Think this is working.. almost out of time :(
      //    if(user.id === userId){
      //        user.splice(index, 1);
      //        res.sendStatus(200)
      //    }
    });

    try {
      console.log('try hard');
      res.sendStatus(200);
    } catch (error) {
      console.log(error);
    }
  }
};
