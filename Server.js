var express = require("express")
let Books = require('./BooksSchema')
let mongodbConnected=require('./MongoDBConnect')
const cors = require('cors');
var app =express()
var bodyparser=require("body-parser")
app.use(bodyparser.json());
app.use(bodyparser.urlencoded({extended:false}))
app.use(cors());
console.log("BOOKS",Books)
app.get('/',function(req,res){
})
app.get('/about',function (req,res){
    res.send("mongodb express React and mongoose app,React runs in another application")
    Books.countDocuments().exec()
     .then(count=>{
     console.log("Total documents Count before addition :", count)
    
     }) .catch(err => {
        console.error(err)
 })

})
app.get('/allbooks',function(req,res){
 Books.find(function(err, allbook) {
 if (err) {
 console.log(err);
 } else {

 res.json(allbook);
 }
 });
 });
 app.get('/getbook/:id',function(req, res) {
    let id = req.params.id;
    Books.findById(id, function(err, book) {
    res.json(book);
    });
    });
   app.post('/addbooks', function(req,res)
    {
    console.log("Ref",req.body)
    let newbook = new Books(req.body);
    console.log("newbook->",newbook)
    newbook.save()
    .then(todo => {
    res.status(200).json({'books': 'book added successfully'});
})
.catch(err => {
res.status(400).send('adding newbook failed');
});
})
app.post('/updatebook/:id', function(req, res) {
   const id = req.params.id;
   const updatedBookData = req.body;  // Directly use the incoming request data

   console.log("Updating book with ID:", id);
   console.log("Updated book data:", updatedBookData);

   // Ensure that updatedBookData contains the expected values before updating
   if (!updatedBookData.booktitle || !updatedBookData.author || !updatedBookData.PubYear) {
       return res.status(400).json({ error: "Missing required fields" });
   }

   Books.findByIdAndUpdate(id, updatedBookData, { new: true }, function(err, updatedBook) {
       if (err) {
           console.error("Error updating book:", err);
           return res.status(500).json({ message: "Failed to update book. Please try again." });
       }

       if (!updatedBook) {
           console.log("Book not found with ID:", id);
           return res.status(404).json({ message: "Book not found." });
       }

       console.log("Book updated successfully:", updatedBook);
       return res.status(200).json({ message: "Book updated successfully." });
   });

});
app.post('/deleteBook/:id',function(req, res) {
 let id = req.params.id;

 console.log("deleting")
 Books.findByIdAndDelete(id,function (err, docs) {
 if (err){
 console.log(err)
 }
 else{
 res.status(200).send('Book Deleted');
}
}


)

});
app.listen(5000,function(){
console.log("Server is running on the port 5000")
})  