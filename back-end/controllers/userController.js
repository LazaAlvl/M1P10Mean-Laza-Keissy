const  User  = require('../models/userModel');
const bcrypt = require('bcryptjs');

module.exports.RegisterClient = async (req, res, next) => {
    const salt= await bcrypt.genSalt(10);
    const { firstname, lastname, email, password, number } = req.body;
    const hashpassword = await bcrypt.hash(password,salt);
  try{  
    const client = new User({
        firstname,
        lastname,
        email,
        password: hashpassword,
        number
    });
    await client.save();
    return res.status(200).json('Client register successfully');

} catch (error) {
    // Gérer les erreurs
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

module.exports.LoginClient = async (req, res, next) => {
  try
  {  
    const client = await User.findOne({email: req.body.email});
        if(!client)
        {
            return res.status(404).json('Client not found');
        }
    const isPasswordCorrect = await bcrypt.compare(req.body.password, client.password)
        if(!isPasswordCorrect)
        {
            return res.status(400).json('Password incorrect!');
        }

    return res.json({client});

} catch (error) {
    // Gérer les erreurs
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}