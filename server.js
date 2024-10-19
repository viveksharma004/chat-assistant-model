const express = require("express");
const app = express();
const cors = require("cors");
// const fs = require("fs");
// const multer = require("multer");
require("dotenv").config();


// const {
//   GoogleGenerativeAI,
//   HarmCategory,
//   HarmBlockThreshold,
// } = require("@google/generative-ai");

// const apiKey = process.env.GEMINI_API_KEY;
// const genAI = new GoogleGenerativeAI(apiKey);

const { GoogleGenerativeAI } = require("@google/generative-ai");
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
  model: "gemini-1.5-flash-002",
});

app.use(cors());
app.use(express.json());

// Configure multer for in-memory storage
// const storage = multer.memoryStorage();
// const upload = multer({ storage: storage });


app.get("/",async (req,res)=>{
  // console.log("Connected")
  res.status(200).json({
    message:"connected",
  })
})




const generationConfig = {
  temperature: 1,
  topP: 0.95,
  topK: 40,
  maxOutputTokens: 8192,
  responseMimeType: "text/plain",
};



app.post("/gemini", async (req, res) => {
  try {
    const message = req.body.message;
    // console.log(message);

    const parts = [
      {text: "input: What does this website do"},
      {text: "output: This website is developed to bridge the gap between the student and tutor, helps tutor to upload video lecture and student can buy the course and learn from it."},
      {text: "input: How to make  payment in this website"},
      {text: "output: This website uses Razorpay for payment method."},
      {text: "input: How student can enroll in courses"},
      {text: "output: Student can buy the course to enroll and then learn from the course content"},
      {text: "input: what your website can do"},
      {text: "output: This website connects students with tutors by allowing tutors to upload video lectures that students can then purchase and learn from."},
      {text: "input: How tutor can use this website"},
      {text: "output: Tutor can  create course by uploading the video lectures and set the price of their course and a brief description about the course."},
      {text: "input: Can Tutor modify the course content"},
      {text: "output: Yes , tutor can modify the course content by editing his course and lectures."},
      {text: "input: can tutor watch the course progress and his earnings"},
      {text: "output: Yes, tutor can see the dashboard where the course he sell and the total income generated and the number of  students enrolled in his courses."},
      {text: "input: How student can use this website"},
      {text: "output: Students can enroll in the  course by purchasing the course ."},
      {text: "input: Can student track their progress"},
      {text: "output: Yes, student can track the progress of his enrolled courses."},
      {text: "input: Can user get refund if he is not interested in course anymore"},
      {text: "output: Yes , if student ask for refund within 30 days time limit"},
      {text: "input: can student access the tutor/instructor dashboard"},
      {text: "output: No, both the students and instructor have their own private routes"},
      {text: "input: Is this website is safe "},
      {text: "output: yes, this website is 100% safe "},
      {text: "input: Website working and its flow"},
      {text: "output: works a bridge for students and tutor where tutor can upload lecture and students can enroll in them "},
      {text: "input: What is best about this website or site"},
      {text: "output: This website is free to use and helps the students and tutor or instructor to share their immense knowledge"},
      {text: "input: How to navigate in your website "},
      {text: "output: It is easy to navigate it has route to home page, catalog page, dashboard for user both student and tutor."},
      {text: `input: ${message}`},
      {text: "output: "},
    ];

    const result = await model.generateContent({
      contents: [{ role: "user", parts }],
      generationConfig,
    });
    // console.log(result.response.text());

    res.status(200).json({
      response:result.response.text()
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("An error occurred during processing.");
  }
});

app.listen(8000, () => {
  console.log("App is listening at 8000");
});