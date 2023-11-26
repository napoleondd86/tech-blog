const router = require("express").Router();
const Blogpost = require("../../models/Blogpost")






// Get all records
router.get('/', async(req, res) => {
  try{
    console.log("get all blogposts")
    const payload = await Blogpost.findAll();
    res.status(200).json({ status: "success", payload})
  } catch(err){
    res.status(500).json({ status: "error", payload: err.message})
  }
})

// Get one record by pk
router.get('/:id', async(req, res) => {
  try{
    const payload = await Blogpost.findByPk(req.params.id);
    res.status(200).json({ status: "success", payload})
  } catch(err){
    res.status(500).json({ status: "error", payload: err.message})
  }
})

// Create a new BLOGPOST
router.post('/', async(req, res) => {
  try{
    console.log("inside create blogpost route")
    console.log(req.body)
    console.log(req.session)
    const userId = req.session.user_id;
    
    const newData = {
      ...req.body,
      user_id: userId
    }
    console.log(newData)
    const payload = await Blogpost.create(newData);
    res.status(200).json({ status: "success", payload})
  } catch(err){
    res.status(500).json({ status: "error", payload: err.message})
  }
})

// Update a record
router.put('/:id', async(req, res) => {
  try{
    console.log("inside update try")
    console.log(req.body)
    const payload = await Blogpost.update(
      req.body,
      {
        where: {
          id: req.params.id
        }
      }
    );
    console.log(payload)
    res.status(200).json({ status: "success", payload})
  } catch(err){
    res.status(500).json({ status: "error", payload: err.message})
  }
})

// Delete a record
router.delete('/:id', async(req, res) => {
  console.log("inside delete route")
  try{
    console.log(req.params.id)
    const payload = await Blogpost.destroy({
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