import User from "../mongoModels/user.model.js";

export const updateUser = async (req, res) => {};
export const deleteUser = async (req, res) => {};
export const getOneUser = async (req, res) => {
    if (req.user.isAdmin ||req.params.id === req.user.id)  {
        
        const user = await User.findOne({ _id: req.params.id })
        if (!user) return res.status(403).json('User not found')
            
            const {password,...restUser}=user?._doc
            res.status(200).json(restUser)
        
    }else return res.status(401).json('Only Administrator can see other users')
};
export const getAllUsers = async (req, res) => { 
    if (req.user.isAdmin) {
        try {
            const users = await User.find()
            return res.status(200).json(users);
        } catch (error) {
            return res.status(403).json(error);
        }
    }else return res.status(401).json('Only Administrator can see other users')
  
};
