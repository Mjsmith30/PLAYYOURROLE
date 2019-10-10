const Comment = require('../../models/games')

module.exports = {
    index,
    show,
    create,
    delete: deleteOne,
    update
  };
  
//the main page is the games page
async function index(req, res) {
    const comments = await Comment.find({});
    res.status(200).json(comments);
  }
  
  async function show(req, res) {
    const comment = await Comment.findById(req.params.id);
    res.status(200).json(comment);
  }
  
  async function create(req, res) {
    const comment = await Comment.create(req.body);
    res.status(201).json(comment);
  }
  
  async function deleteOne(req, res) {
    const deletedComment = await Comment.findByIdAndRemove(req.params.id);
    res.status(200).json(deletedComment);
  }
  
  async function update(req, res) {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {new: true});
    res.status(200).json(updatedComment);
  }