const tinify = require("tinify");
const fs = require("fs");
const path = require("path");

tinify.key = "dGv62vCgBMNzlR4jZmSXrTYgZQ56CSM0";
// tinify.key = "XYxRtw4lml028C0w9NXJDrj5k8TGqsgs";


let compressPath = "./assets"
function compressDir(dir) {
    let stat = fs.statSync(dir);
    if (!stat.isDirectory()) {
        return;
    }
    var subpaths = fs.readdirSync(dir),
        subpath, size, md5, compressed, relative;
    for (var i = 0; i < subpaths.length; ++i) {
        if (subpaths[i][0] === '.') {
            continue;
        }
        subpath = path.join(dir, subpaths[i]);
        stat = fs.statSync(subpath);
        if (stat.isDirectory()) {
            compressDir(subpath)
        } else if (stat.isFile()) {
            console.log("subpath=", subpath, stat)
            let localLowerPath = subpath.toLocaleLowerCase();
            if (localLowerPath.includes(".png") || localLowerPath.includes(".jpg")
                || localLowerPath.includes(".jpeg") || localLowerPath.includes("webp")) {
                fs.readFile(subpath, (err, sourceData) => {
                    if (err) throw err;
                    tinify.fromBuffer(sourceData).toBuffer((err, resultData) => {
                        if (err) throw err;
                        fs.writeFile(subpath, resultData, (err) => {
                            if (err) {
                                console.error("压缩文件失败", err);
                            } else {
                                console.log("压缩成功", subpath)
                            }
                        });
                    });
                });
            }
        }
    }
}
compressDir(compressPath);

