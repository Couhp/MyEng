const create = require(global.__base + '/app/repo/topic/create.js');

let createDB = (req, res) => {
    let info = {
        name: "test",
        description: "hihi"
    };
    create(info)
    return res.json({ msg: "hihi" });
}
module.exports = createDB;