import UserService from "../services/user-service.js";

const userService = new UserService();

export const signup = async (req, res) => {
  try {
    const response = await userService.signup({
      email: req.body.email,
      password: req.body.password,
      username: req.body.username,
    });

    return res.status(201).json({
      success: true,
      data: response,
      err: {},
      message: "Successfully created a user",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {},
      err: error,
      message: "Something went wrong",
    });
  }
};

export const login = async (req, res) => {
  try {
    const token = await userService.signin(req.body);
    return res.status(200).json({
      success: true,
      message: "Successfully logged in...",
      data: token,
      err: {},
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      data: {},
      err: error,
      message: "Something went wrong",
    });
  }
};
