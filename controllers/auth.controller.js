import jwt from "jsonwebtoken";
import User from "../mongoModels/user.model.js";
import CryptoJS from "crypto-js";

const generateAccessToken = (user) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: "15d",
    }
  );
};
const generateRefreshToken = (user) => {
  return jwt.sign(
    { id: user.id, isAdmin: user.isAdmin },
    process.env.JWT_SECRET_KEY_REFRESH,
    { expiresIn: "1d" }
  );
};

//REGISTER USER
export const registerNewUser = async (req, res) => {
  const data = { ...req.body };
  const user = new User(data);
  try {
    user.password = CryptoJS.AES.encrypt(
      req.body.password,
      process.env.CryptoJS_AES
    ).toString();
    await user.save();
    res.status(200).json("Registration successful");
  } catch (error) {
    res.status(404).json(error);
  }
};
//LOGIN USER
export const loginUser = async (req, res) => {
  const { password: passwordBody, username } = req.body;

  try {
    const user = await User.findOne({
      $or: [{ email: username }, { username }],
    });
    if (!user) res.status(401).json("Password or username incorrect");

    const AES = CryptoJS.AES.decrypt(user.password, process.env.CryptoJS_AES);
    const passwordEncoded = AES.toString(CryptoJS.enc.Utf8);

    if (passwordBody != passwordEncoded)
      return res.status(401).json("Password or Username incorrect");

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // const userUpdated = { ...rest, accessToken, refreshToken }
    user.accessToken = accessToken;
    user.refreshToken.push(refreshToken);
   
    await user.save();

    const { password, ...rest } = user._doc;
    res.status(200).json(rest);
  } catch (error) {}
};
//REFRESH TOKEN USER
export const refreshToken = async (req, res) => {};
//LOGOUT USER
export const LogoutUser = async (req, res) => {};
