// server.js
const express = require('express');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5500;

// Połączenie z bazą danych MongoDB
mongoose.connect('mongodb://localhost:27017/mojabaza', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('Connected to MongoDB');
}).catch(err => {
  console.error('Error connecting to MongoDB:', err);
});

// Definicja modelu
const Schema = mongoose.Schema;
const UserSchema = new Schema({
  name: String,
  email: String,
});

const User = mongoose.model('User', UserSchema);

// Middleware do parsowania danych JSON z ciała żądania
app.use(express.json());

// Endpoint do tworzenia nowego użytkownika
app.post('/api/users', async (req, res) => {
  try {
    const { name, email } = req.body;
    const newUser = new User({ name, email });
    await newUser.save();
    res.status(201).json({ message: 'Użytkownik został utworzony pomyślnie' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Definicja routingu
app.get('/api/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});