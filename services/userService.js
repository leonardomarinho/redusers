const redis = require('redis');
const redisClient = redis.createClient();

exports.add = async (body) => {
  let id = body.id
  let firstName = body.first_name
  let lastName = body.last_name
  let email = body.email
  let phone = body.phone

  return new Promise((resolve, reject) => {
    redisClient.hset(id, 
      [ 'firstName', firstName, 
        'lastName', lastName, 
        'email', email, 
        'phone', phone
      ], (err, reply) => {
        if (!err){
        resolve(reply)
      } else {
        console.log(err);
        reject('Error while adding user')
      }
    })
  });
};

exports.delete = async (id) => {
  return new Promise((resolve, reject) => {
    success = redisClient.del(id);
    if (success){ resolve() }
    reject();
  })
};

exports.search = async (id) => {
  return new Promise ((resolve, reject) =>{
    redisClient.hgetall(id, (err, user) => {
      if (user){
        user.id = id;
        resolve(user);
      } 
      reject("User does not exist");
    });
  })
};