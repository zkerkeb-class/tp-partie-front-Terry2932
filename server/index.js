require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const axios = require('axios');
const multer = require('multer');
const path = require('path');
const fs = require('fs');

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static('uploads'));

// Configure multer for file uploads
const uploadsDir = path.join(__dirname, 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadsDir);
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    cb(null, `pokemon-${timestamp}${path.extname(file.originalname)}`);
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
  fileFilter: (req, file, cb) => {
    const allowedTypes = /jpeg|jpg|png|gif/;
    const mimetype = allowedTypes.test(file.mimetype);
    const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase());
    if (mimetype && extname) return cb(null, true);
    cb(new Error('Only image files are allowed'));
  }
});

const PORT = process.env.PORT || 3000;
const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'pokedex';

// Define Mongoose schema and model
const pokemonSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  name: { type: String, index: true },
  sprites: mongoose.Schema.Types.Mixed,
  types: [mongoose.Schema.Types.Mixed],
  stats: [mongoose.Schema.Types.Mixed],
  height: Number,
  weight: Number,
  isCustom: { type: Boolean, default: false },
  description: String,
  image: String,
  type: String,
});
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

async function start() {
  const fullUrl = `${MONGO_URL}/${DB_NAME}`;
  await mongoose.connect(fullUrl, { useNewUrlParser: true, useUnifiedTopology: true });
  console.log('Connected to MongoDB', fullUrl);

  // Seed DB with first 151 pokemons from PokeAPI if empty
  const count = await Pokemon.countDocuments();
  if (count === 0) {
    console.log('No pokemons found in DB — seeding from PokéAPI (this may take a moment)');
    try {
      const listRes = await axios.get('https://pokeapi.co/api/v2/pokemon?limit=151&offset=0');
      const list = listRes.data.results;
      const details = await Promise.all(
        list.map(async (p) => {
          const res = await axios.get(p.url);
          const d = res.data;
          return {
            id: d.id,
            name: d.name,
            sprites: d.sprites,
            types: d.types,
            stats: d.stats,
            height: d.height,
            weight: d.weight,
            isCustom: false,
            image: d.sprites?.front_default || '',
          };
        })
      );
      if (details.length) await Pokemon.insertMany(details);
      console.log('Seeding completed');
    } catch (e) {
      console.error('Seeding failed:', e.message);
    }
  }

  // GET all pokemons without pagination (MOST SPECIFIC - MUST BE FIRST)
  app.get('/pokemons/all', async (req, res) => {
    try {
      const items = await Pokemon.find({}).sort({ id: 1 }).lean();
      console.log(`📦 /pokemons/all retourne ${items.length} pokémons`);
      res.json(items);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // GET by id or name (PARAMETRIC - SECOND)
  app.get('/pokemons/:identifier', async (req, res) => {
    try {
      const { identifier } = req.params;
      let query;
      if (/^\d+$/.test(identifier)) query = { id: parseInt(identifier, 10) };
      else query = { name: identifier };
      const item = await Pokemon.findOne(query).lean();
      if (!item) return res.status(404).json({ error: 'Not found' });
      res.json(item);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // GET all (with optional search and pagination) (GENERIC - LAST)
  app.get('/pokemons', async (req, res) => {
    try {
      const q = req.query.q || '';
      const page = parseInt(req.query.page || '1', 10);
      const limit = parseInt(req.query.limit || '200', 10);
      const filter = q ? { name: { $regex: q, $options: 'i' } } : {};
      const items = await Pokemon.find(filter).sort({ id: 1 }).skip((page - 1) * limit).limit(limit).lean();
      res.json(items);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // POST upload image
  app.post('/upload', upload.single('image'), async (req, res) => {
    try {
      if (!req.file) {
        return res.status(400).json({ error: 'No file uploaded' });
      }
      const imageUrl = `http://localhost:${PORT}/${req.file.filename}`;
      res.json({ imageUrl });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // POST create custom pokemon
  app.post('/pokemons', async (req, res) => {
    try {
      const data = req.body;
      data.id = data.id || Date.now();
      data.isCustom = true;
      const created = await Pokemon.create(data);
      res.status(201).json(created);
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // PUT update
  app.put('/pokemons/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const update = req.body;
      const result = await Pokemon.updateOne({ id: parseInt(id, 10) }, { $set: update });
      res.json({ matched: result.matchedCount, modified: result.modifiedCount });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  // DELETE
  app.delete('/pokemons/:id', async (req, res) => {
    try {
      const { id } = req.params;
      const result = await Pokemon.deleteOne({ id: parseInt(id, 10) });
      res.json({ deleted: result.deletedCount });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  });

  app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
}

start().catch((e) => {
  console.error('Failed to start server', e);
  process.exit(1);
});
