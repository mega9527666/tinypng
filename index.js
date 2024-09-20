const tinify = require("tinify");
const fs = require("fs");

tinify.key = "dGv62vCgBMNzlR4jZmSXrTYgZQ56CSM0";
// tinify.key = "XYxRtw4lml028C0w9NXJDrj5k8TGqsgs";


// const source = tinify.fromFile("assets");
// source.toFile("optimized.webp");

fs.readFile("assets/bg.jpg", (err, sourceData) => {
    if (err) throw err;
    tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
        if (err) throw err;
        // ...
        console.log("resultData==", resultData);
        fs.writeFile("bg.jpg", resultData, (err) => {
            if (err) {
                console.error("压缩文件失败", err);
            }
            // console.log("writeddd==", err, dad);
        });
    });
});