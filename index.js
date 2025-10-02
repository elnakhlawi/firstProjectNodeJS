const mongoose = require("mongoose");
const express = require("express");
const Article = require("./models/Article");
const Posts = require("./models/Posts");
const User = require("./models/User");
const Videos = require("./models/Videos");
const Images = require("./models/Images");
const app = express();
app.use(express.json());

app.get("/home", (req, res) => {
  res.send("welcome to you in here");
});
const dbConection = `mongodb+srv://mahmoudnakhlawy6:Rahma.Html.27@cluster0.ahyie2z.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
mongoose
  .connect(`${dbConection}`)
  .then(() => {
    console.log("connection successfly");
  })
  .catch((err) => {
    console.log(`the err while connection DB is>>>>:${err}`);
  });
// api
app.post("/article", async (req, res) => {
  const { title, content, numberLikes } = req.body;
  const newArticle = new Article();
  newArticle.title = title;
  newArticle.content = content;
  newArticle.numberLikes = numberLikes;
  await newArticle.save();
  res.send("the new article is stored successfuly");
});

app.get("/articles", async (req, res) => {
  const articles = await Article.find();
  res.json(articles);
});

app.get("/article/:articleId", async (req, res) => {
  const articleId = req.params.articleId;
  console.log(articleId);
  try {
    const articl = await Article.findById(articleId);
    return res.json(articl);
  } catch (err) {
    console.log("the err is :", err);
    return res.send("err while find article by id");
  }
});

app.delete("/article/:articleId", async (req, res) => {
  const articleId = req.params.articleId;
  try {
    const article = await Article.findByIdAndDelete(articleId);
    res.json(article);
  } catch (err) {
    console.log("the err while delete article by id============>>>>>", err);
    res.send("the err while delete article by id============>>>>>", err);
  }
});

app.get("/showAllArticles", async (req, res) => {
  try {
    const articles = await Article.find();
    res.render("ShowAllArticles.ejs", { allArticles: articles });
  } catch (err) {
    console.log("the err while get all articles is ======>>>>>", err);
    return res.send("the err while get all articles is ======>>>>>", err);
  }
});

app.post("/post", (req, res) => {
  const { name, title, content } = req.body;
  const newPost = new Posts();
  newPost.name = name;
  newPost.title = title;
  newPost.content = content;
  newPost.date = new Date();
  newPost.save();
  res.send("post saved successfuly");
});

app.get("/posts", async (req, res) => {
  const posts = await Posts.find();
  res.json(posts);
});

app.get("/post/:postId", async (req, res) => {
  const postId = req.params.postId;
  console.log(postId);
  try {
    const post = await Posts.findById(postId);
    console.log(post);
    return res.json(post);
  } catch (err) {
    console.log("the err is >>>>", err);
    return res.send("the err while fint post by id is :", err);
  }
});

app.delete("/post/:postId", async (req, res) => {
  const postId = req.params.postId;
  try {
    const post = await Posts.findByIdAndDelete(postId);
    res.json(post);
  } catch (err) {
    console.log("the err while delete post by id is ========>>>>>>>", err);
    res.send("the err while delete post by id is ========>>>>>>>", err);
  }
});

app.get("/showAllPosts", async (req, res) => {
  try {
    const posts = await Posts.find();
    res.render("posts.ejs", { allPosts: posts });
  } catch (err) {
    console.log("the err while get all posts ", err);
    res.send("the err while get all posts ", err);
  }
});

app.post("/user", async (req, res) => {
  const { name, password, age } = req.body;
  const newUser = new User();
  newUser.name = name;
  newUser.password = password;
  newUser.age = age;
  await newUser.save();
  res.json(newUser);
});

app.get("/users", async (req, res) => {
  const users = await User.find();
  res.json(users);
});

app.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  try {
    const user = await User.findById(userId);
    return res.json(user);
  } catch (err) {
    console.log("the err while find user by id is :", err);
    return res.send(err);
  }
});

app.delete("/user/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findByIdAndDelete(userId);
    return res.json(user);
  } catch (err) {
    console.log("the error while delete user by id is =========>>>>>>>", err);
    return res.json(
      "the error while delete user by id is =========>>>>>>>",
      err
    );
  }
});

app.get("/showAllUsers", async (req, res) => {
  try {
    const users = await User.find();
    return res.render("showAllUser.ejs", { allUsers: users });
  } catch (err) {
    console.log("the error while get all users is ====>>>", err);
    return res.send("the error while get all users is ====>>>", err);
  }
});

app.post("/video", async (req, res) => {
  //with body params
  const { name, title, size } = req.body;
  const newVideo = new Videos();
  newVideo.name = name;
  newVideo.title = title;
  newVideo.size = size;
  await newVideo.save();
  res.json(newVideo);
});

app.get("/videos", async (req, res) => {
  try {
    const videos = await Videos.find();
    res.json(videos);
  } catch (err) {
    console.log("error while get videos is:>>>>>>", err);
    res.send(
      `<h1>there's erro when get all videos the erro is :>> ${err}</h1>`
    );
  }
});

app.get("/video/:videoId", async (req, res) => {
  const videoId = req.params.videoId;
  try {
    const video = await Videos.findById(videoId);
    res.json(video);
  } catch (err) {
    console.log("the err while get video by id is:", err);
    res.send("the errr while get video by id is:", err);
  }
});

app.delete("/video/:videoId", async (req, res) => {
  const videoId = req.params.videoId;
  try {
    const video = await Videos.findByIdAndDelete(videoId);
    return res.json(video);
  } catch (err) {
    console.log(
      "the error while delete the video by id is==========>>>>>",
      err
    );
    return res.json(
      "the error while delete the video by id is==========>>>>>",
      err
    );
  }
});

app.get("/showAllVideos", async (req, res) => {
  try {
    const videos = await Videos.find();
    res.render("showAllVideos.ejs", { allVideos: videos });
  } catch (err) {
    console.log("the error while get all videos is ========>>>>", err);
    return res.send("the error while get all videos is ========>>>>", err);
  }
});

app.post("/image", async (req, res) => {
  const { title, date, url } = req.body;
  const newImage = new Images({
    title: title,
    date: date,
    url: url,
  });
  await newImage.save();
  res.json(newImage);
});

app.get("/images", async (req, res) => {
  try {
    const images = await Images.find();
    res.json(images);
  } catch (err) {
    console.log("the error is========>>>>", err);
    res.send("the error is========>>>>", err);
  }
});

app.get("/image/:imageId", async (req, res) => {
  const imageId = req.params.imageId;
  try {
    const image = await Images.findById(imageId);
    res.json(image);
  } catch (err) {
    console.log("the error while get image by id is =====>>>>>", err);
    res.send("the error while get image by id is =====>>>>>", err);
  }
});

app.get("/showAllImages", async (req, res) => {
  try {
    const images = await Images.find();
    res.render("image.ejs", { allImages: images });
  } catch (err) {
    console.log("the err while get show all images is=====>>>>", err);
    res.send("the err while get show all images is=====>>>>", err);
  }
});

app.delete("/image/:imageId", async (req, res) => {
  const imageId = req.params.imageId;
  try {
    const image = await Images.findByIdAndDelete(imageId);
    res.json(image);
  } catch (err) {
    console.log("the error while delete image by id is ========>>>>>>>", err);
    return res.send(
      "the error while delete image by id is ========>>>>>>>",
      err
    );
  }
});
// end api//
app.get("/printNumbers", (req, res) => {
  let numbers = "";
  for (let i = 0; i <= 100; i++) {
    numbers = numbers + i + "-";
  }
  res.send(`The Nubmers are: ${numbers}`);
});

app.get("/getSumtionOfTwoNumbers/:num1/:num2", (req, res) => {
  let { num1, num2 } = req.params;
  let sumtion = `The total sumtion for two numbers are: ${+num1 + +num2}`;
  res.send(sumtion);
});

app.get("/getFullName", (req, res) => {
  let { firstName, lastName } = req.body;
  console.log(firstName, lastName);
  res.send(
    `Welcome to your mr: ${firstName} your fullname is: ${
      firstName + " " + lastName
    }`
  );
});

app.get("/getAge", (req, res) => {
  res.send(`your age is: ${req.query.age}`);
});

app.listen(3000, () => {
  console.log(`the server is running on : http://localhost:3000/home`);
});
