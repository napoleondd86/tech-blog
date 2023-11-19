const router = require("express").Router();
const {User} = require("../../models/")

// THIS IS A SIGNUP
router.post("/signup", async (req, res) => {
  try{
    const newUser = await User.create(req.body)
    console.log(newUser)

    // const realUserData = newUser.get({ plain: true })
    // console.log(realUserData)
    // save email and password info
    req.session.save(() => {
      // req.session is an object and We can place whatever we need in it.
        req.session.loggedIn = true;
        req.session.user_id = newUser.id;
        req.session.username = newUser.username;
        
        console.log(req.session)     
        // making a copy of req.session as it already exists 
        res.status(200).json({ status: 'success', msg: 'Congrats you are signed up' })
      }
    )
  } catch (err) {
    res.status(500).json({status: "error", payload: err.message})
  }
})

// THIS IS THE LOGIN
router.post("/login", async (req, res) => {
  console.log("hello!!!")
  try {
    const userData = await User.findOne({
      where: {
        username: req.body.username,
      }
    })
    // email doesnt match our database
    if(!userData) {
      res.status(400).json({message: "Incorrect Username or Password"});
      return
    }
    console.log(userData)
    const pwIsCorrect = userData.checkPassword(req.body.password)
    if(!pwIsCorrect){
      res.status(400).json({message: "Incorrect Username or Password"});
      return
    }
    req.session.save(() => {
      // req.session is an object and We can place whatever we need in it.
        req.session.user_id = userData.id
        req.session.username = userData.username
        req.session.loggedIn = true
        // making a copy of req.session as it already exists 
        res.json({ status: 'success', msg: 'Congrats you are signed IN' })
      }     
      )
    } catch (err) {
      res.status(404).json({ status: "error", payload: err.message })
    }
})
  

// THIS IS THE LOGOUT
router.post("/logout", (req, res) => {
  console.log("hello!!!")
  try {
    req.session.destroy(() => res.status(204).json({status: "destroyed req.session"}))
    console.log(req.session)

  } catch (err) {
    res.status(404).json({ status: "error", payload: err.message })
  }
})



// Get all records
router.get('/api/user', async(req, res) => {
  try{
    const payload = await User.findAll();
    res.status(200).json({ status: "success", payload})
  } catch(err){
    res.status(500).json({ status: "error", payload: err.message})
  }
})

// Get one record by pk
router.get('/api/user/:id', async(req, res) => {
  try{
    const payload = await User.findByPk(req.params.id);
    res.status(200).json({ status: "success", payload})
  } catch(err){
    res.status(500).json({ status: "error", payload: err.message})
  }
})

// Create a new record
router.post('/api/user', async(req, res) => {
  try{
    const payload = await User.create(req.body);
    res.status(200).json({ status: "success", payload})
  } catch(err){
    res.status(500).json({ status: "error", payload: err.message})
  }
})

// Update a record
router.put('/api/user/:id', async(req, res) => {
  try{
    const payload = await User.updat(
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
router.delete('/api/user/:id', async(req, res) => {
  try{
    const payload = await User.destroy({
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