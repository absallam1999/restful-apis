import { UsersModel } from "../Models/users.Model";
import User from "../Models/Types/users.Type";
import config from "../Database/config";
import jwt from "jsonwebtoken";
import express from "express";

// Create Instance From Users Model
const userModel = new UsersModel();

// Generate Token with JWT
const generateToken = (userData: User) => {
  return jwt.sign({ userData }, config.token as string, { expiresIn: "1hr" }); // Token Expires In: 1HOUR
};

// CREATE User Handler
export const createUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const response = await userModel.CreateUser(req.body);
    const token = generateToken(response);
    res.status(200).json({
      status: "SUCCESS",
      user: { response, token },
      message: "User Created Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// GET Users Handler
export const getUsers = async (req: express.Request, res: express.Response) => {
  try {
    const response = await userModel.GetUsers(req.body.username);
    res.status(200).json({
      status: "SUCCESS",
      users: response,
      message: "Users Fetched Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// GET Spacific User
export const getUser = async (req: express.Request, res: express.Response) => {
  try {
    const response = await userModel.GetUser(
      req.params.id as unknown as number
    );
    res.status(200).json({
      status: "SUCCESS",
      user: response,
      message: "User Fetched Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// UPDATE User Handler
export const updateUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user: User = {
      user_name: req.body.user_name,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
      password: req.body.password,
      id: req.params.id as unknown as number,
    };
    const response = await userModel.UpdateUser(user);
    res.status(200).json({
      status: "SUCCESS",
      user: response,
      message: "User Updated Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// Delete User Handler
export const destoryUser = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const response = await userModel.DeleteUser(
      req.params.id as unknown as number
    );
    res.status(200).json({
      status: "SUCCESS",
      user: response,
      message: "User Deleted Successfully.",
    });
  } catch (err) {
    res.status(400).send(`Error ${err}`);
  }
};
// Add User Image Handler
export const addImage = async (req: express.Request, res: express.Response) => {
  try {
    const user = { image: req.body.image };
    const response = await userModel.AddImage(
      user.image,
      req.params.id as unknown as number
    );
    res.status(200).json(response);
  } catch (err) {
    res.status(400).send(`Error: ${err}`);
  }
};
// Authenticate User Handler
export const authenticate = async (
  req: express.Request,
  res: express.Response
) => {
  try {
    const user = { email: req.body.email, password: req.body.password };
    const response = await userModel.Authenticate(user.email, user.password);
    if (response !== null) {
      const token = generateToken(response);
      if (!token) {
        res.status(401).send(`Error Authenticate.. Please Try Again!`);
      }
      res.status(200).json({
        status: "SUCCESS",
        user: { response, token },
        message: "User Authenticated Successfully.",
      });
    } else {
      res.status(401).send(`Password in inCorrect.. Please Try Again!`);
    }
  } catch (err) {
    res.status(401).send(`Error Authenticate User ${req.body.user_name}`);
  }
};
