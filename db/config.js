const mongoose = require('mongoose');

const dbConnection = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_ATLAS, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });

    console.log('DB online');
  } catch (error) {
    console.log(error);
    throw new Error('Error initializing the database');
  }
};

module.exports = { dbConnection };
