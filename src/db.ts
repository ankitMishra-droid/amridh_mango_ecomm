import Database from "better-sqlite3";
import path from "path";

// Create database in root directory safely
const dbPath = path.join(process.cwd(), "mango.db");
const db = new Database(dbPath);

// Enable foreign keys (important)
db.pragma("foreign_keys = ON");

// ============================
// Initialize Tables
// ============================

db.exec(`
  CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    role TEXT DEFAULT 'customer',
    name TEXT
  );

  CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    category TEXT,
    price REAL NOT NULL,
    wholesale_price REAL,
    stock INTEGER DEFAULT 0,
    description TEXT,
    image_url TEXT
  );

  CREATE TABLE IF NOT EXISTS orders (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    total REAL,
    status TEXT DEFAULT 'Placed',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    items TEXT,
    FOREIGN KEY(user_id) REFERENCES users(id) ON DELETE CASCADE
  );

  CREATE TABLE IF NOT EXISTS coupons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT UNIQUE,
    discount_percent INTEGER,
    active INTEGER DEFAULT 1
  );
`);

// ============================
// Seed Initial Products
// ============================

const productCount = db
  .prepare("SELECT COUNT(*) as count FROM products")
  .get() as { count: number };

if (productCount.count === 0) {
  const insertProduct = db.prepare(`
    INSERT INTO products 
    (name, category, price, wholesale_price, stock, description, image_url) 
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `);

  const initialProducts: [
    string,
    string,
    number,
    number,
    number,
    string,
    string
  ][] = [
      [
        "Mango Pulp",
        "Pulp",
        400,
        300,
        300,
        `<h3>100% pure Alphonso mango pulp.</h3><br><p>Amridh Mango Pulp is a premium, ready-to-use product made from 100% pure Alphonso mangoes. Carefully processed to preserve the fruit's natural sweetness, vibrant color, and rich flavor, our mango pulp offers a convenient way to enjoy the essence of ripe mangoes all year round.</p><br><p>Premium Alphonso Mango Puree – The Crown Jewel of Nature’s Finest Treasures</p><br><p>Welcome to Amridh, where we bring you the purest treasures of nature. Among our most celebrated offerings stands the legendary Alphonso Mango Puree — a product that embodies richness, aroma, and unmatched tropical flavor.</p><br><p>Carefully crafted from hand-selected Alphonso mangoes grown in premium orchards, our puree captures the true essence of India’s most prized mango variety. Every batch is processed under controlled ripening conditions to preserve its natural sweetness, vibrant color, and signature fragrance — ensuring consistent, export-quality excellence year after year.<p><br><p>What Makes Amridh Alphonso Mango Puree Exceptional?<p><br><p>🥭 Made from Authentic Alphonso Mangoes</p><br><p>We source our mangoes from trusted growers in Ratnagiri, Maharashtra — the heartland of Alphonso cultivation. Each mango is carefully handpicked at peak ripeness to ensure the highest quality and flavor in every jar.</p><br><p>🌿 Rich in Natural Goodness</p><br><p>Alphonso mangoes are naturally packed with:</p><br><p>🌿 Nutrient-Rich Natural Goodn</p>`,
        "/images/product-Amirdh-Mango-pulp.webp",
      ],
      [
        "Mango Pickle",
        "Pickles",
        250,
        180,
        500,
        `
<h3>Traditional spicy and tangy mango pickle.</h3><br>
<p>Mango pickle is a bold, spicy, and tangy condiment made from raw, unripe mangoes mixed with aromatic spices, salt, and oil. It is a traditional favorite in many households, especially across India and other South Asian countries.</p><br>
<p>The pickle has a rich, vibrant color and a robust flavor that balances sourness from the mango with heat from spices like mustard seeds, chili powder, fenugreek, and turmeric. Oil is often added not only for taste but also as a natural preservative.</p><br>

<h4>Commonly enjoyed with:</h4><br>
<ul>
<li>Steamed rice and dal</li>
<li>Chapati, paratha, or other flatbreads</li>
<li>Curd rice</li>
<li>Simple home-style meals for an extra burst of flavor</li>
</ul><br>
<p>Mango pickle is cherished for its intense taste, long shelf life, and ability to instantly enhance any meal with a spicy, tangy kick.</p>`,
        "/images/pickle.png",
      ],
      [
        "Aam Papad",
        "Papad",
        200,
        150,
        150,
        `<h3>Traditional sun-dried mango leather (Aam Papad).</h3><br><p>A Bite-Sized Burst of Real Mango Goodness
Relive the authentic taste of traditional Indian mango delight with Amridh Mango Cubes (Aam Papad) — crafted from premium quality mango pulp and carefully processed to preserve natural flavor, color, and nutrition.</p><br><p>Our Aam Papad is made by blending ripe mango pulp with a touch of natural sweetener, then spreading it thin and drying it under the sun to create a chewy, tangy-sweet treat that captures the true essence of mango in every bite.</p><br><p>Our mango cubes offer the perfect balance of sweetness and tanginess, delivering a chewy, fruity indulgence in convenient bite-sized pieces. Made from sun-ripened mangoes, this timeless treat combines tradition with modern quality standards.</p><br><h4>What Makes Amridh Mango Cubes Special?</h4><br><p>🥭 Made from Real Mango Pulp</p><br><p>Prepared using high-quality mango pulp, our Aam Papad cubes capture the rich tropical essence and natural sweetness of ripe mangoes.</p><br>
<h4>🌿 Naturally Flavorful & Nutrient-Rich</h4><p>Mangoes are naturally rich in:</p>
<ul>
<li>Vitamin A for skin and vision health</li>
<li>Vitamin C for immune support</li>
<li>Dietary fiber for digestion</li>
<li>Antioxidants for overall wellness</li>
</ul>
<p>Our mango cubes provide a delicious fruit-based snack option that satisfies sweet cravings while offering natural goodness.</p><br>
<h4>🍬 Perfect Anytime Snack</h4><p>Convenient, portable, and loved by all age groups, Mango Cubes (Aam Papad) are ideal for:</p><br>
<ul>
<li>Healthy snacking</li>
<li>School tiffin treats</li>
<li>Travel snacks</li>
<li>Festive gifting</li>
<li>Traditional sweet platters</li>
</ul>
<p>Their soft, chewy texture and authentic mango taste make them a nostalgic favorite.</p>
<br><p>✔ Hygienically Processed & Quality Assured
At Amridh, we ensure:</p>
<br><ul>
<li>Premium grade mango pulp selection</li>
<li>Controlled processing for consistent taste</li>
<li>Uniform texture and cube sizing</li>
<li>Strict quality checks for safety and freshness</li>
</ul><br>
<p>Every batch is crafted to maintain the authentic flavor and vibrant color that mango lovers cherish.</p><br><p>A Traditional Indian Delight with Modern Quality
Mango Cubes (Aam Papad) are a classic fruit confection enjoyed across generations. Amridh brings you this traditional mango sweet in a hygienically prepared, export-quality format — perfect for retail, bulk supply, and international markets.</p><br><p>Enjoy the chewy, fruity richness of real mango in every bite.</p>
`,
        "/images/image.png",
      ],
      [
        "Mango Juice",
        "Beverages",
        150,
        110,
        1000,
        `<h3>Refreshing natural mango juice.</h3><br><p>Amridh Mango Juice is a nutrient-dense tropical beverage made by blending ripe mango pulp with water, ice, and optional natural sweeteners. Bursting with rich flavor and natural goodness, it delivers a thick, smooth texture that captures the true essence of mango.</p><br><p>Naturally high in Vitamin A, Vitamin C, antioxidants, and dietary fiber, this refreshing drink helps support skin health, boost immunity, and provide natural energy — making it a perfect summer staple.</p><br><p>Unlike many other fruits, mangoes cannot be extracted using a regular juicer because they are high in fiber. The fiber holds much of the fruit’s flavor and nutrition, which is why mango juice is best prepared by blending the whole pulp rather than traditional juicing. This method preserves its wholesome taste, natural thickness, and full nutritional value.</p><br><p>Best served chilled, Amridh Mango Juice is a delicious and healthy way to enjoy the king of fruits in every sip.</p>`,
        "/images/juice.jpeg",
      ],
      [
        "Alphonso Mango",
        "Fresh Mangoes",
        1200,
        900,
        100,
        "The King of Mangoes from Ratnagiri.",
        "/images/AdobeStock_43300661.jpeg",
      ],
//       [
//         "Mango Cubes",
//         "Cubes",
//         350,
//         280,
//         120,
//         `<h3>Traditional sun-dried mango leather (Aam Papad).</h3><br><p>A Bite-Sized Burst of Real Mango Goodness
// Relive the authentic taste of traditional Indian mango delight with Amridh Mango Cubes (Aam Papad) — crafted from premium quality mango pulp and carefully processed to preserve natural flavor, color, and nutrition.</p><br><p>Our Aam Papad is made by blending ripe mango pulp with a touch of natural sweetener, then spreading it thin and drying it under the sun to create a chewy, tangy-sweet treat that captures the true essence of mango in every bite.</p><br><p>Our mango cubes offer the perfect balance of sweetness and tanginess, delivering a chewy, fruity indulgence in convenient bite-sized pieces. Made from sun-ripened mangoes, this timeless treat combines tradition with modern quality standards.</p><br><h4>What Makes Amridh Mango Cubes Special?</h4><br><p>🥭 Made from Real Mango Pulp</p><br><p>Prepared using high-quality mango pulp, our Aam Papad cubes capture the rich tropical essence and natural sweetness of ripe mangoes.</p><br>
// <h4>🌿 Naturally Flavorful & Nutrient-Rich</h4><p>Mangoes are naturally rich in:</p>
// <ul>
// <li>Vitamin A for skin and vision health</li>
// <li>Vitamin C for immune support</li>
// <li>Dietary fiber for digestion</li>
// <li>Antioxidants for overall wellness</li>
// </ul>
// <p>Our mango cubes provide a delicious fruit-based snack option that satisfies sweet cravings while offering natural goodness.</p><br>
// <h4>🍬 Perfect Anytime Snack</h4><p>Convenient, portable, and loved by all age groups, Mango Cubes (Aam Papad) are ideal for:</p><br>
// <ul>
// <li>Healthy snacking</li>
// <li>School tiffin treats</li>
// <li>Travel snacks</li>
// <li>Festive gifting</li>
// <li>Traditional sweet platters</li>
// </ul>
// <p>Their soft, chewy texture and authentic mango taste make them a nostalgic favorite.</p>
// <br><p>✔ Hygienically Processed & Quality Assured
// At Amridh, we ensure:</p>
// <br><ul>
// <li>Premium grade mango pulp selection</li>
// <li>Controlled processing for consistent taste</li>
// <li>Uniform texture and cube sizing</li>
// <li>Strict quality checks for safety and freshness</li>
// </ul><br>
// <p>Every batch is crafted to maintain the authentic flavor and vibrant color that mango lovers cherish.</p><br><p>A Traditional Indian Delight with Modern Quality
// Mango Cubes (Aam Papad) are a classic fruit confection enjoyed across generations. Amridh brings you this traditional mango sweet in a hygienically prepared, export-quality format — perfect for retail, bulk supply, and international markets.</p><br><p>Enjoy the chewy, fruity richness of real mango in every bite.</p>
// `,
//         "/images/cubes.jpeg",
//       ],
      // [
      //   "Dasheri Mango",
      //   "Fresh Mangoes",
      //   500,
      //   350,
      //   200,
      //   "Delicious Dasheri mangoes from Malihabad.",
      //   "/images/dasheri-mango.jpg",
      // ],
      // [
      //   "Mango Gift Box",
      //   "Gifts",
      //   2500,
      //   2000,
      //   50,
      //   "Premium assortment of mangoes and treats.",
      //   "/images/mango_gift.webp",
      // ],
      [
        "Mango Jam",
        "Jam",
        300,
        220,
        80,
        `<p>Sweet and tangy mango jam made from fresh pulp.</p><br><p>Premium Alphonso Mango Jam – A Taste of Royal Indulgence
Experience the richness of nature with Amridh Alphonso Mango Jam, crafted from the finest handpicked Alphonso mangoes. Known as the King of Mangoes, Alphonso brings an unmatched sweetness, vibrant golden color, and irresistible tropical aroma — now preserved in a smooth, luscious jam.</p><br><p>Our premium mango jam captures the authentic taste of sun-ripened Alphonso mangoes, delivering a delightful burst of flavor in every spoonful.</p><br><p>Why Choose Amridh Alphonso Mango Jam?</p><br><p>🥭 Made from Authentic Alphonso Mangoes</p><br><p>We use carefully selected, export-quality Alphonso mangoes sourced from trusted orchards. Each batch is prepared to retain the fruit’s natural sweetness, rich pulp texture, and signature fragrance.
</p><br><p>🌿 Rich in Natural Goodness</p><br><p>Alphonso mangoes are naturally packed with:</p><br><ul>
<li>Vitamin A</li>
<li>Vitamin C</li>
<li>Dietary fiber</li>
<li>Antioxidants</li>
</ul><br><p>Our mango jam provides a delicious way to enjoy these nutrients while satisfying your sweet cravings.</p><br><p>🍞 Perfect for Everyday Indulgence Versatile and delicious, our Alphonso mango jam is ideal for</p><br><ul>
<li>Spreading on bread, toast & croissants</li>
<li>Swirling into yogurt & oatmeal</li>
<li>Filling cakes, pastries & donuts</li>
<li>Topping pancakes & waffles</li>
<li>Pairing with desserts & cheeseboards</li>
</ul><br><p>Its smooth consistency and vibrant taste make it a family favorite across all age groups.</p><br><p>✔ Premium Quality & Hygienic Processing</p><br><p>At Amridh, we ensure:</p><br><ul>
<li>Made from high fruit pulp content</li>
<li>Carefully processed under hygienic conditions</li>
<li>Free from artificial flavors</li>
<li>Free from artificial flavors</li>
<li>Crafted for consistent taste & texture</li>
</ul><br><p>We ensure every jar reflects purity, freshness, and the true essence of Alphonso mangoes.</p><br><p>The True Taste of Alphonso in Every Jar
With its naturally sweet flavor, rich golden hue, and tropical aroma, Amridh Alphonso Mango Jam brings you the authentic taste of premium mangoes all year round.</p><br><p>Whether for breakfast spreads, bakery creations, or gourmet desserts, our mango jam adds a royal touch to every bite.</p>`,
        "/images/jam.jpeg",
      ],
      // [
      //   "Kesar Mango",
      //   "Fresh Mangoes",
      //   800,
      //   600,
      //   150,
      //   "Sweet and aromatic Kesar mangoes from Gujarat.",
      //   "/images/kesar-mango.jpg",
      // ],
    ];

  const insertMany = db.transaction((products) => {
    for (const product of products) {
      insertProduct.run(...product);
    }
  });

  insertMany(initialProducts);

  // Seed Coupons
  const insertCoupon = db.prepare(
    "INSERT INTO coupons (code, discount_percent) VALUES (?, ?)"
  );

  insertCoupon.run("MANGO10", 10);
  insertCoupon.run("WHOLESALE20", 20);

  console.log("✅ Initial products and coupons seeded.");
}

export default db;