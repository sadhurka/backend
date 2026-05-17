// seed.js
// If .env is in the same folder as seed.js, use './.env'. If seed.js is in a subfolder like /scripts, leave it as '../.env'
const path = require('path');
require('dotenv').config({ path: path.resolve(process.cwd(), '.env') });
const mongoose = require('mongoose');
const JobRequest = require('./models/JobRequest');

// Fallback logic so it doesn't crash on an empty string
const MONGODB_URI = process.env.MONGODB_URI;

async function seed() {
  // Catch the missing URI before Mongoose tries to use it
  if (!MONGODB_URI) {
    console.error('❌  Seed error: MONGODB_URI is undefined. Check your .env file path!');
    return;
  }

  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅  Connected to MongoDB');

    await JobRequest.deleteMany({});
    console.log('🗑   Cleared existing jobs');

    const inserted = await JobRequest.insertMany(sampleJobs);
    console.log(`🌱  Seeded ${inserted.length} sample jobs`);
  } catch (err) {
    console.error('❌  Seed error:', err.message);
  } finally {
    await mongoose.disconnect();
    console.log('👋  Disconnected');
  }
}


// Sample jobs to seed the database
const sampleJobs = [
  {
    title: 'Fix leaking kitchen sink',
    description: 'The kitchen sink is leaking and needs urgent repair.',
    category: 'Plumbing',
    location: '123 Main St, Springfield',
    contactName: 'John Doe',
    contactEmail: 'john@example.com',
    status: 'Open',
  },
  {
    title: 'Install new light fixture',
    description: 'Need a new ceiling light fixture installed in the living room.',
    category: 'Electrical',
    location: '456 Elm St, Springfield',
    contactName: 'Jane Smith',
    contactEmail: 'jane@example.com',
    status: 'Open',
  },
];

seed();