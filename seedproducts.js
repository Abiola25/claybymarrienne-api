const mongoose = require('mongoose');
const Product = require('./models/Product'); // adjust path if needed

mongoose.connect('mongodb://127.0.0.1:27017/claybymarrienne', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => {
  console.log('✅ MongoDB connected');
  return seedProducts();
}).catch(err => {
  console.error('❌ Mongo connection error:', err);
});

const products = [
  {
    name: 'Healing Clay Mug',
    type: 'Mug',
    price: 3500,
    size: 'Medium',
    image: 'images/mug1.jpg',
    description: 'Ideal for detox teas and hot drinks.',
    stock: 10,
    isNew: true
  },
  {
    name: 'Classic Clay Cup',
    type: 'Mug',
    price: 2800,
    size: 'Small',
    image: 'images/mug2.jpg',
    description: 'Compact size, big tradition.',
    stock: 12
  },
  {
    name: 'Eco Water Bottle',
    type: 'Bottle',
    price: 4500,
    size: '1L',
    image: 'images/bottle1.jpg',
    description: 'Naturally cools water. No plastic.',
    stock: 8,
    isNew: true
  },
  {
    name: 'Mini Bottle Clay',
    type: 'Bottle',
    price: 3200,
    size: '500ml',
    image: 'images/bottle2.jpg',
    description: 'Compact for daily use.',
    stock: 15
  },
  {
    name: 'Detox Bowl',
    type: 'Bowl',
    price: 5000,
    size: 'Large',
    image: 'images/bowl1.jpg',
    description: 'Perfect for soups and stews. Promotes gut health.',
    stock: 6
  },
  {
    name: 'Deep Clay Bowl',
    type: 'Bowl',
    price: 4800,
    size: 'Medium',
    image: 'images/bowl2.jpg',
    description: 'Deep, earthy finish and versatile use.',
    stock: 10
  },
  {
    name: 'Traditional Clay Pot',
    type: 'Cookware',
    price: 7500,
    size: 'Large',
    image: 'images/cookware1.jpg',
    description: 'Classic Nigerian cookware for stews and soups.',
    stock: 5,
    isNew: true
  },
  {
    name: 'Herbal Soupware',
    type: 'Cookware',
    price: 6700,
    size: 'Medium',
    image: 'images/cookware2.jpg',
    description: 'Enhances herbal soup flavors naturally.',
    stock: 4
  },
  {
    name: 'Heritage Clay Jug',
    type: 'Bottle',
    price: 4200,
    size: '900ml',
    image: 'images/bottle3.jpg',
    description: 'Curved elegance for healthy hydration.',
    stock: 7
  },
  {
    name: 'Flat Clay Plate',
    type: 'Bowl',
    price: 3600,
    size: 'Flat',
    image: 'images/bowl3.jpg',
    description: 'Great for traditional meals and fruit arrangements.',
    stock: 9
  },
  {
    name: 'Earthen Dish Set',
    type: 'Cookware',
    price: 9600,
    size: 'Set of 3',
    image: 'images/cookware3.jpg',
    description: 'Clay cookware set for full family prep.',
    stock: 3
  },
  {
    name: 'Cultural Keepsake Mug',
    type: 'Mug',
    price: 3900,
    size: 'Tall',
    image: 'images/mug3.jpg',
    description: 'Handpainted with Igbo motifs.',
    stock: 6
  },
  {
    name: 'Clay Spice Canister',
    type: 'Bowl',
    price: 2500,
    size: 'Small',
    image: 'images/bowl4.jpg',
    description: 'Perfect for storing dry herbs and powders.',
    stock: 14
  }
];

async function seedProducts() {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log('✅ Products seeded!');
  mongoose.connection.close();
}