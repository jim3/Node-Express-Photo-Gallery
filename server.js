const express = require("express");
const path = require("path");
const app = express();
const fs = require("fs");

const port = 3000;

// instructs Express to look for static files in the public directory
app.use(express.static(path.join(__dirname, "public")));

// reads the images directory and returns an array of filenames [drag & drop]
const imagesDir = "./public/images";
const images = fs.readdirSync(imagesDir).map((filename) => `/images/${filename}?v=${Date.now()}`);

// sets up the templating engine
app.set("view engine", "ejs");

// selects a number of random images from the images array so things are not always in the same order after a refresh
const selectRandomImages = (images, num) => {
    const selectedImages = [];
    while (selectedImages.length < num) {
        const randomIndex = Math.floor(Math.random() * images.length);
        const selectedImage = images.splice(randomIndex, 1)[0];
        selectedImages.push(selectedImage);
    }
    return selectedImages;
};

// sets up the route for the home page
app.get("/", (req, res) => {
    const randomImages = selectRandomImages(images, 20);
    res.render("index", {
        // images: images,
        images: randomImages,
    });
});

// starts the server
const server = app.listen(process.env.PORT || 3000, () => {
    console.log(`Server listening on port ${server.address().port}`);
});
