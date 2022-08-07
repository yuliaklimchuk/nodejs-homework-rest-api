const path = require("path");
const fs = require("fs/promises");
const Jimp = require('jimp');
 

const { User } = require('../../models/user');
const { basedir } = global;

const avatarsDir = path.join(basedir, "public", "avatars");

const setAvatar = async (req, res) => { 
    try {
        const { _id } = req.user;
        const { path: tempPath, originalname } = req.file;
        const [extension] = originalname.split(".").reverse();
        const newName = `${_id}.${extension}`;
        const uploadPath = path.join(avatarsDir, newName);
        await fs.rename(tempPath, uploadPath);
        Jimp.read(uploadPath, function (err, test) {
        if (err) throw err;
            test.resize(250, 250)
                .quality(50)                 
                .write(uploadPath); 
        });
        const avatarURL = path.join("avatars", newName);
        await User.findByIdAndUpdate(_id, { avatarURL });
        res.json({
            avatarURL,
        });
    } catch (error) {
        await fs.unlink(req.file.path);
        throw error;
    }
}

module.exports = setAvatar;