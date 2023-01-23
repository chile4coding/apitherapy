const Faq = require("../models/faq");
const {validationResult} = require('express-validator')

exports.postFaq = (req, res, next) => {
  const error = validationResult(req);
  if (!error.isEmpty()) {
    return res.status(400).json({
      error: error.array(),
    });
  }
  const questionType = req.body.questionType;
  const name = req.body.name;
  const email = req.body.email;
  const message = req.body.message;

  const faq = new Faq({
    questionType: questionType,
    name: name,
    email: email,
    message: message,
  });
  return faq
    .save()
    .then((result) => {
      return res.status(200).json({
        message: "Message successfully sent",
      });
    })
    .catch((err) => {
      return res.status(400).json({
        errorMessage: "Server Error! please refresh",
      });
    });
};

exports.getFaq = (req, res, next) => {
  Faq.find()
    .then((faq) => {
      res.status(200).json({
        message: "FAQ succesfully fetched",
        faq: faq,
      });
    })
    .catch((err) => {
      res.status(400).json({
        errorMessage: "There was an error fetching frequently asked questions",
      });
    });
};
