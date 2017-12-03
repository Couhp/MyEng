const create = require(global.__base + '/app/repo/course/create.js');
let createDB = (req, res) => {
    let info = {
        name: "English",
        description: "Learning English"
    };
    create(info)
    return res.json({ msg: "Success" });
}
module.exports = createDB;