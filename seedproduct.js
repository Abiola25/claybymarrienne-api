require("dotenv").config();
const mongoose = require("mongoose");
const Product = require("./models/product");

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverSelectionTimeoutMS: 20000
});

// ✅ Step 2: Wait for connection before seeding
mongoose.connection.once("open", async () => {
  console.log("✅ Connected to MongoDB Atlas");

  try {
    await Product.deleteMany({});
    await Product.insertMany(products);
    console.log("🪴 Products seeded successfully");
  } catch (err) {
    console.error("❌ Seeding failed:", err);
  } finally {
    mongoose.connection.close();
  }
});

const products = [
  {
    name: "Riverhold Pouring Jugs",
    description: "Molded for gatherings and traditions, these 2L jugs echo the rhythm of ancestral pourings.",
    price: 35000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1750356769/2L-clay-jugs.jpg_gt4psy.jpg",
    type: "Jug",
    stock: 6,
    featured: true,
    new: true
  },
  {
    name: "Oreke Whisper Cup",
    description: "A slender cup shaped for quiet mornings and soft reflections — minimalist and elegant.",
    price: 55000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1750356768/oreke-cup.jpg_nsmlt9.jpg",
    type: "Cup",
    stock: 8,
    featured: false,
    new: true
  },
  {
    name: "Blushfire Morning Mug",
    description: "Textured to hug the fingers, this mug cradles warmth like sunrise nestled in earth.",
    price: 15000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1750356768/clay-mug.jpg_l4wkem.jpg",
    type: "Mug",
    stock: 10,
    featured: true,
    new: false
  },
  {
    name: "Twilight Goblet Duo",
    description: "Kiln-fired for evening toasts, these goblets shimmer with rustic grace and intimacy.",
    price: 15000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1750356767/clay-goblet.jpg_jtap61.jpg",
    type: "Goblet",
    stock: 12,
    featured: false,
    new: true
  },
  {
    name: "Harvest Bloom Plate",
    description: "Flat, firm and floral in aura — for meals shared and stories told.",
    price: 18000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1750356767/clay-plate.jpg_n44opz.jpg",
    type: "Plate",
    stock: 14,
    featured: false,
    new: false
  },
   {
    name: "Raino Vitality Flask",
    description: "Hydration reborn — this elegant bottle balances minerals, temperature, and grace.",
    price: 78000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1750356768/rainoalkaline-bottle.jpg_otgdte.jpg",
    type: "Bottle",
    stock: 5,
    featured: true,
    new: false
  },
  {
    name: "The Vital Spring Dispenser",
    description: "Earth’s nourishment, housed in slow-fired clay. Pour balance into your day.",
    price: 92000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1750356766/clay-alkalin-dispenser.jpg_cwyppc.jpg",
    type: "Dispenser",
    stock: 4,
    featured: true,
    new: true
  },
  {
    name: "Feastfire Clay Cauldron",
    description: "Large and loving — made for stews that linger and flavors that bond.",
    price: 80000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1750356767/6-8L-clay-cookware_jikrxx.jpg",
    type: "Cookware",
    stock: 7,
    featured: false,
    new: true
  },
  {
    name: "HearthCharm Pot – 2L",
    description: "Compact in size, rich in story. Carries meals and memories in gentle glaze.",
    price: 62000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1750356768/2L-clay-cookware_ctvhol.jpg",
    type: "Cookware",
    stock: 6,
    featured: true,
    new: false
  },
  {
    name: "EchoSip Clay Tumbler",
    description: "Light and honest. Shaped for gentle drinks and midday musings.",
    price: 22000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1750356766/clay-cup.jpg_yvflsx.jpg",
    type: "Cup",
    stock: 10,
    featured: false,
    new: false
  },
   {
    name: "SoulStew Clay Cauldron – 4–6L",
    description: "Big-hearted and bold — made for meals that hug and heal.",
    price: 58000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1750356766/4-6L-clay-cookware_l3rmay.jpg",
    type: "Cookware",
    stock: 7,
    featured: false,
    new: true
  },
  {
    name: "Kinfolk Clayware Ensemble",
    description: "A family of pots dancing together — for chefs, dreamers, and table-tales.",
    price: 80000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1750356766/clay-cookwaresets.jpg_fbj2wn.jpg",
    type: "Set",
    stock: 6,
    featured: true,
    new: true
  },
  {
    name: "Earthlift Clay Pedestal",
    description: "Raises your dispenser like royalty — sturdy, minimal, purposeful.",
    price: 75000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1751708658/clay-tab-stand.jpg_yxvomx.jpg",
    type: "Stand",
    stock: 3,
    featured: true,
    new: true
  },
  {
    name: "Àdùní Eden Vessel",
    description: "Regal, sculpted, and ethereal — the centerpiece that speaks of tradition and prestige.",
    price: 450000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1751720118/Aduni-Eden.jpg_agr1nm.jpg",
    type: "Vessel",
    stock: 2,
    featured: true,
    new: false
  },
  {
    name: "Lekota Clay Nest",
    description: "Like matriarchs in a circle — each pot layered with the wisdom of warmth.",
    price: 180000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1751722049/Clay-Lecota-nest.jpg_j2h5a5.jpg",
    type: "Set",
    stock: 3,
    featured: true,
    new: true
  },
   {
    name: "Edenfire Sacred Vessel",
    description: "A statement of presence and power. Born from clay, destined for awe.",
    price: 380000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1751719147/TheEden-vessel.jpg_zxfvue.jpg",
    type: "Vessel",
    stock: 2,
    featured: true,
    new: false
  },
  {
    name: "Majestic Clay Pedestal – Prestige",
    description: "Elevated clay elegance — where display meets story in sculptural clarity.",
    price: 550000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1751719600/clay-pedestal.jpg_xdghgl.jpg",
    type: "Pedestal",
    stock: 1,
    featured: true,
    new: true
  },
  {
    name: "Midnight Ember Vase Set",
    description: "Bold and quiet, textured for contrast — a dance of fire and peace.",
    price: 75000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1751723062/clay-jug2-bowl.jpg_bs0uz5.jpg",
    type: "Set",
    stock: 4,
    featured: false,
    new: true
  },
  {
    name: "FlowRhythm Clay Jug",
    description: "Every curve crafted for ceremony — for oils, drinks, or graceful pours.",
    price: 45000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1751723912/clay-jug.jpg_zkhrkj.jpg",
    type: "Jug",
    stock: 7,
    featured: false,
    new: false
  },
  {
    name: "Heartscribe Clay Flask",
    description: "Personalized in both form and soul — ready to hold water, meaning, or a name etched by love.",
    price: 50000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1751723615/clay-bottle.jpg_huqluw.jpg",
    type: "Bottle",
    stock: 5,
    featured: true,
    new: true
  },
  {
    name: "Kauthar Keepsake Jar",
    description: "A clay jar that guards flavor and secrets alike — minimalist, soulful, enduring.",
    price: 60000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1751708624/clay-cutomize-pot.jpg_aqfbni.jpg",
    type: "Jar",
    stock: 3,
    featured: false,
    new: false
  },
  {
    name: "ClayBond Twin Hydration Set",
    description: "A pair of handcrafted bottles bound in intention, perfect for couples, rituals, or sacred gifting.",
    price: 68000,
    image: "https://res.cloudinary.com/dz3be1jmf/image/upload/v1751708628/claybottle-set.jpg_yh9c4o.jpg",
    type: "Set",
    stock: 4,
    featured: false,
    new: true
  },
];
  async function seedDB() {
  await Product.deleteMany({});
  await Product.insertMany(products);
  console.log("🪴 Products seeded successfully");
  mongoose.connection.close();
}

seedDB();