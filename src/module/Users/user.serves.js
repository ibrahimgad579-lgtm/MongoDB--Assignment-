import userModel from "../../DB/models/user.model.js"

export const signup = async (req, res ,next) =>{
    try {
        const { name, email, password, phone, age } = req.body;
        const existingUser = await userModel.findOne({email});
        if(existingUser){
            return  res.status(404).json({
                message: "Email already exists"
            });
        }
        const newuser = await userModel.create({
            name,
            email,
            password,
            phone,
            age
        });
        res.status(202).json({
            message: "User created successfully",
            user: newuser
        })
        
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
             error
        });
    }
};
export const login =async(req, res ,next)=>{
   try {
    const {email,password}=req.body;
    const user = await userModel.findOne({email,password});
    if (!user) {
        return res.status(401).json({
            message: "Invalid email or password"
        });
    }
    res.status(202).json({
        message: "User created successfully",
        user: user
    })

   } catch (error) {
    res.status(500).json({
        message: "Internal Server Error",
         error
    });
}
};
export const updateUser = async (req, res, next) => {
    try {
        const { id } = req.params;

        const { name, email, phone, age } = req.body;

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        if (email && email !== user.email) {
            const existingUser = await userModel.findOne({ email });

            if (existingUser) {
                return res.status(409).json({
                    message: "Email already exists"
                });
            }
        }

        const updatedUser = await userModel.findByIdAndUpdate(
            id,
            {
                name,
                email,
                phone,
                age
            },
            {
                new: true
            }
        );

        res.status(200).json({
            message: "User updated successfully",
            user: updatedUser
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
             error
        });
    }
};
export const deleteUser = async (req, res, next) => {
    try {
        const { id } = req.query;

        const user = await userModel.findByIdAndDelete(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User deleted successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
             error
        });
    }
};
export const getUserById = async (req, res, next) => {
    try {
        const { id } = req.query;

        const user = await userModel.findById(id);

        if (!user) {
            return res.status(404).json({
                message: "User not found"
            });
        }

        res.status(200).json({
            message: "User found successfully",
            user
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
             error
        });
    }
};
