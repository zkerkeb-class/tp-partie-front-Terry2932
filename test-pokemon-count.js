import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const MONGO_URL = process.env.MONGO_URL || 'mongodb://localhost:27017';
const DB_NAME = process.env.DB_NAME || 'pokedex';

const pokemonSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  name: { type: String, index: true },
});
const Pokemon = mongoose.model('Pokemon', pokemonSchema);

async function test() {
  try {
    const fullUrl = `${MONGO_URL}/${DB_NAME}`;
    await mongoose.connect(fullUrl);
    
    const count = await Pokemon.countDocuments();
    console.log(`📊 Total de pokémons dans la base de données: ${count}`);
    
    const items = await Pokemon.find({}).sort({ id: 1 }).select('id name').limit(10).lean();
    console.log('Premiers 10 pokémons:', items);
    
    await mongoose.disconnect();
  } catch (e) {
    console.error('Erreur:', e.message);
  }
}

test();
