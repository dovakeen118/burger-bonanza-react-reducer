import express from "express";
import { ValidationError } from "objection";

import { User } from "../../../models/index.js";
import cleanUserInput from "../../../services/cleanUserInput.js";

const usersRouter = new express.Router();

usersRouter.post("/", async (req, res) => {
  const { email, password } = req.body;
  const cleanedCredentials = cleanUserInput({ email, password });
  try {
    const persistedUser = await User.query().insertAndFetch(cleanedCredentials);
    return req.login(persistedUser, () => {
      return res.status(201).json({ user: persistedUser });
    });
  } catch (error) {
    if (error instanceof ValidationError) {
      return res.status(422).json({ errors: error.data });
    }
    return res.status(500).json({ errors: error });
  }
});

export default usersRouter;
