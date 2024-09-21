const tinify = require("tinify");
const fs = require("fs");
const path = require("path");



let keyConfig = [
    "dGv62vCgBMNzlR4jZmSXrTYgZQ56CSM0", // mega9527666@gmail.com
    "Z6V54MJQ6D7cxkG90MgK3VM9VSvkD8qC", //mega9527555@gmail.com
    "PPg2HWWkGq38mQ5XQP6d3Mt2kv9Ppvr7", //mega9527111@gmail.com
    "14tyScl9MLhbyDqbRcyBmpl207rf9dPK", //mega9527111@outlook.com
    "6HMpnpGRGDbgjsHYvNzSWGRTg6JFkglC", //mega9527222@outlook.com
    "", //mega9527333@outlook.com
]

let keyIndex = 4;

tinify.key = keyConfig[keyIndex];


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
            compressFile(subpath);
        }
    }
}

function compressFile(subpath) {
    let localLowerPath = subpath.toLocaleLowerCase();
    if (localLowerPath.includes(".png") || localLowerPath.includes(".jpg")
        || localLowerPath.includes(".jpeg") || localLowerPath.includes("webp")) {
        fs.readFile(subpath, (err, sourceData) => {
            if (err) throw err;
            tinify.validate((err, data) => {
                if (err) {
                    console.error("tinypng账号失败==", err)
                    keyIndex++;
                    if (keyIndex < keyConfig.length) {
                        tinify.key = keyConfig[keyIndex];
                        compressFile(subpath);
                    } else {
                        console.error("所有key次数已经使用完成")
                    }
                } else {
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
                }
            })
        });
    }
}
compressDir(compressPath);

