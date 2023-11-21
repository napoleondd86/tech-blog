const router = require("express").Router();
const Comment = require("../../models/Comment")






// Get all records
router.get('/', async(req, res) => {
  try{
    const payload = await Comment.findAll();
    res.status(200).json({ status: "success", payload})
  } catch(err){
    res.status(500).json({ status: "error", payload: err.message})
  }
})

// Get one record by pk
router.get('/:id', async(req, res) => {
  try{
    // const blogpostId = req.params.id;
    const payload = await Comment.findByPk(req.params.id);
    res.status(200).json({ status: "success", payload})
  } catch(err){
    res.status(500).json({ status: "error", payload: err.message})
  }
})

// Create a new record
router.post('/', async(req, res) => {
  try{
    const payload = await Comment.create(req.body);
    res.status(200).json({ status: "success", payload})
  } catch(err){
    res.status(500).json({ status: "error", payload: err.message})
  }
})

// Update a record
router.put('/:id', async(req, res) => {
  try{
    const payload = await Comment.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );
    res.status(200).json({ status: "success", payload})
  } catch(err){
    res.status(500).json({ status: "error", payload: err.message})
  }
})

// Delete a record
router.delete('/:id', async(req, res) => {
  try{
    const payload = await Comment.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json({ status: "success"})
  } catch(err){
    res.status(500).json({ status: "error", payload: err.message})
  }
})

module.exports = router;