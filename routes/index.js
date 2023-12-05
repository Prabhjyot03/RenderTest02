
const bcrypt = require('bcryptjs');
const User = require('../models/User'); // Replace with your actual User model path

var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET users listing. */
router.get('/users/login', function (req, res, next) {
  res.render('login');
});

router.get('/users/register', (req, res, next) => {
  res.render('register');
});

/* GET users listing. */
router.get('/finance/budgets', function (req, res, next) {
  res.render('budget');
});


router.get('/finance/budgetList', function (req, res, next) {
  res.render('budgetList');
});

router.get('/finance/financialGoal', function (req, res, next) {
  res.render('financialGoal');
});

router.get('/finance/goalList', function (req, res, next) {
  res.render('goalList');
});
router.get('/finance/transactions', function (req, res, next) {
  res.render('transactions');
});
router.get('/finance/savings', function (req, res, next) {
  res.render('savings');
});

// POST login handler
router.post('/login', async (req, res) => {
  try {
    // Extract data from the form
    const { email, password } = req.body;

    // Check for user with the given email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).render('login', { message: 'Invalid email or password' });
    }

    // Compare password with hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).render('login', { message: 'Invalid email or password' });
    }

    // Login successful, set session and redirect to the user's dashboard or another page
    // Assuming you have session management set up
    req.session.userId = user._id;
    res.redirect('/dashboard'); // Redirect to the dashboard or any other target page after login

  } catch (error) {
    console.error(error);
    res.status(500).render('login', { message: 'Server error occurred' });
  }
});
// Route to handle the registration form submission
router.post('/users/register', async (req, res) => {
  try {
    // Extract form data
    const { username, email, password } = req.body;

    // Simple validation - you may want to use a library like express-validator for more complex validation rules
    if (!username || !email || !password) {
      return res.status(400).send('Please enter all fields');
    }

    // Check if user already exists
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).send('User already exists');
    }

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new user instance
    const newUser = new User({
      username,
      email,
      password: hashedPassword
    });

    // Save the new user to the database
    await newUser.save();

    // Redirect to the login page, or perhaps a success page
    res.redirect('/login');
  } catch (error) {
    // Log the error and return a generic error message
    console.error(error);
    res.status(500).send('Server error during registration');
  }
});
// In your transactions route file
router.post('/finance/addTransaction', async (req, res) => {
  try {
    // Construct a new transaction object from the form data
    const { type, amount, category, date, description } = req.body;

    // Add validation or further processing as needed

    // Save the new transaction to the database
    const newTransaction = new Transaction({ type, amount, category, date, description });
    await newTransaction.save();

    // Redirect to the transactions list page or display a success message
    res.redirect('/finance/transactions');
  } catch (error) {
    // Handle errors and maybe send back an error message
    res.status(500).send('Server error occurred while adding the transaction');
  }
});

// In your savings route file
router.post('/finance/addSavings', async (req, res) => {
  try {
    // Extract data from the form
    const { goalName, targetAmount, deadline } = req.body;

    // Perform validation and any other business logic

    // Create and save the new savings goal
    const newGoal = new SavingsGoal({ goalName, targetAmount, deadline, user: req.user });
    await newGoal.save();

    // Redirect to the savings page or display a success message
    res.redirect('/finance/savings');
  } catch (error) {
    // Handle errors and return an error message
    res.status(500).send('Server error occurred while adding the savings goal');
  }
});


module.exports = router;
