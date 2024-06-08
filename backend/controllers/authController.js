import User from '../models/userSchema.js';

export const register = async (req, res, next) => {
    const { name, email, password,phone,website } = req.body;
  
    //validate fileds
  
    if (!name) {    
      next("Name is required");
    }
    if (!email) {
      next("Email is required");
    }
   
    if (!password) {
      next("Password is required");
    }
    if (!phone) {
      next("Contact is required");
    }
    if (!website) {
      next("Website is required");
    }
    try {
        const userExist = await User.findOne({ email });
    
        if (userExist) {
          next("Email Address already exists");
          return;
        }
    
        const user = await User.create({
          name,
          email,
          password,
          phone,
          website,
        });

        const token=await user.createJWT();
        res.status(201).send({
            success: true,
            message: "Account created successfully",
            user: {
           
              name: user.name,
              email: user.email,
              phone:user.phone,
              website:user.website,
                },
                token
        

          });
        } catch (error) {
            console.log(error);
            res.status(404).json({ message: error.message });
          }
}

export const signIn = async (req, res, next) => {
    const { email, password } = req.body;
  
    try {
      //validation
      if (!email || !password) {
        next("Please Provide User Credentials");
        return;
      }
  
      // find user by email
      const user = await User.findOne({ email }).select("+password");
  
      if (!user) {
        next("Invalid email or password");
        return;
      }
  
      // compare password
      const isMatch = await user.comparePassword(password);
  
      if (!isMatch) {
        next("Invalid email or password");
        return;
      }
  
      user.password = undefined;
  
      const token = user.createJWT();
      
      res.status(201).json({
        success: true,
        message: "Login successfully",
        user,
        token,
      });

    } catch (error) {
      console.log(error);
      res.status(404).json({ message: error.message });
    }
  };