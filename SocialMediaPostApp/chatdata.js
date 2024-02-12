//it returns a mongoose object
let mongoose = require("mongoose");

//async therefore it returns a promise
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/postdata');
}

//calling main function and handling promise
main().then(() => {
    console.log("connection successful");
})
    .catch((err) => {
        console.log(err);
    });

const postSchema = new mongoose.Schema({ user: String, postContent: String, date: Date, status: String });

const post = mongoose.model("post", postSchema);

// post.insertMany([
//     {
//         user: "Rahul",
//         postcontent: "here I'm talking about myself. I'm smart and efficient to master any skill I select",
//         date: new Date()
//     },
//     {
//         user: "Swami",
//         postcontent: "here I'm talking about myself. I'm smart and efficient to master any skill I select",
//         date: new Date()
//     }
// ]);

//OR

// const post1=new post({
//     user : "Rahul",
//     postcontent : "here I'm talking about myself. I'm smart and efficient to master any skill I select",
//     date : new Date()
// });

// post1.save().then(()=>{
//     console.log("data saved");
// })
// .catch((err)=>{
//     console.log(err);
// });



// post.find().then((data)=>{
//     console.log(data);
// })
// .catch((err)=>{
//     console.log(err);
// });


module.exports = post;


