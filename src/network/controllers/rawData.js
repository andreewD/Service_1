import axios from "axios";
import { response } from "../response.js";

const checkIfEmail = (str) => {
  // Regular expression to check if string is email
  const regexExp =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*$/gi;

  return regexExp.test(str);
};

export const parseData = async (req, res, next) => {
  const match = req.rawBody.replaceAll(`'`, "").split(",");

  if (match.length === 4) {
    const email = checkIfEmail(match[1]);

    const time =
      typeof parseInt(match[2]) === "number" &&
      !Number.isNaN(parseInt(match[2]));

    if (!email) {
      return response({
        error: true,
        message: "You must enter a valid email.",
        res,
        status: 400,
      });
    }

    if (!time) {
      return response({
        error: true,
        message: "Time must be a number.",
        res,
        status: 400,
      });
    }

    const data = {
      args: {
        id: match[0],
        email: match[1],
        time: parseInt(match[2]),
        message: match[3],
      },
    };

    try {
      await axios
        .post(process.env.MAIL_SERVICE, data)
        .then((responsed) => {
          if (responsed.status === 201) {
            return response({
              error: false,
              message: "Notification created.",
              res,
              status: 200,
            });
          }
        })
        .catch((err) => {
          console.error(err);
          return response({
            error: true,
            message: "System error.",
            res,
            status: 500,
          });
        });
    } catch (error) {
      console.error(error);
      return response({
        error: true,
        message: "System error.",
        res,
        status: 500,
      });
    }
  } else {
    return response({
      error: true,
      message: "Some parameters are missing.",
      res,
      status: 400,
    });
  }
};
