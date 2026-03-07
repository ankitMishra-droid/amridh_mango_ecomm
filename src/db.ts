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

  CREATE TABLE IF NOT EXISTS product_images (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    product_id INTEGER NOT NULL,
    image_url TEXT NOT NULL,
    sort_order INTEGER DEFAULT 0,
    FOREIGN KEY(product_id) REFERENCES products(id) ON DELETE CASCADE
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

  const insertImage = db.prepare(`
    INSERT INTO product_images (product_id, image_url, sort_order)
    VALUES (?, ?, ?)
  `);

  const initialProducts: {
    data: [string, string, number, number, number, string, string];
    extraImages: string[];
  }[] = [
    {
      data: [
        "Mango Pulp",
        "Pulp",
        400,
        300,
        300,
        `<h3>100% pure Alphonso mango pulp.</h3><br><p>Amridh Mango Pulp is a premium, ready-to-use product made from 100% pure Alphonso mangoes. Carefully processed to preserve the fruit's natural sweetness, vibrant color, and rich flavor, our mango pulp offers a convenient way to enjoy the essence of ripe mangoes all year round.</p><br><p>Premium Alphonso Mango Puree – The Crown Jewel of Nature's Finest Treasures</p><br><p>Welcome to Amridh, where we bring you the purest treasures of nature. Among our most celebrated offerings stands the legendary Alphonso Mango Puree — a product that embodies richness, aroma, and unmatched tropical flavor.</p><br><p>Carefully crafted from hand-selected Alphonso mangoes grown in premium orchards, our puree captures the true essence of India's most prized mango variety. Every batch is processed under controlled ripening conditions to preserve its natural sweetness, vibrant color, and signature fragrance — ensuring consistent, export-quality excellence year after year.<p><br><p>What Makes Amridh Alphonso Mango Puree Exceptional?<p><br><p>🥭 Made from Authentic Alphonso Mangoes</p><br><p>We source our mangoes from trusted growers in Ratnagiri, Maharashtra — the heartland of Alphonso cultivation. Each mango is carefully handpicked at peak ripeness to ensure the highest quality and flavor in every jar.</p><br><p>🌿 Rich in Natural Goodness</p><br><p>Alphonso mangoes are naturally packed with:</p><br><p>🌿 Nutrient-Rich Natural Goodn</p>`,
        "/images/pulp.jpeg",
      ],
      extraImages: ["/images/tiles4-02.jpg"],
    },
    {
      data: [
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
      extraImages: ["/images/tilles 5.jpg"],
    },
    {
      data: [
        "Mango Cubes / Aam Papad",
        "Papad",
        200,
        150,
        150,
        `<h3>Mango Cubes (Aam Papad) – A Bite-Sized Burst of Real Mango Goodness</h3><br><p>Relive the authentic taste of traditional Indian mango delight with Amridh Mango Cubes (Aam Papad) — crafted from premium quality mango pulp and carefully processed to preserve natural flavor, color, and nutrition.</p><br><p>Our mango cubes offer the perfect balance of sweetness and tanginess, delivering a chewy, fruity indulgence in convenient bite-sized pieces. Made from sun-ripened mangoes, this timeless treat combines tradition with modern quality standards.</p><br><h4>What Makes Amridh Mango Cubes Special?</h4><br><p>🥭 Made from Real Mango Pulp</p><br><p>Prepared using high-quality mango pulp, our Aam Papad cubes capture the rich tropical essence and natural sweetness of ripe mangoes.</p><br>
<h4>🌿 Naturally Flavorful & Nutrient-Rich</h4><p>Mangoes are naturally rich in:</p>
<ul>
<li>Vitamin A</li>
<li>Vitamin C</li>
<li>Antioxidants</li>
<li>Dietary Fiber</li>
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
      extraImages: ["/images/tiles3.jpg"],
    },
    {
      data: [
        "Mango Juice",
        "Beverages",
        150,
        110,
        1000,
        `<h3>Refreshing natural mango juice.</h3><br><p>Amridh Mango Juice is a nutrient-dense tropical beverage made by blending ripe mango pulp with water, ice, and optional natural sweeteners. Bursting with rich flavor and natural goodness, it delivers a thick, smooth texture that captures the true essence of mango.</p><br><p>Naturally high in Vitamin A, Vitamin C, antioxidants, and dietary fiber, this refreshing drink helps support skin health, boost immunity, and provide natural energy — making it a perfect summer staple.</p><br><p>Unlike many other fruits, mangoes cannot be extracted using a regular juicer because they are high in fiber. The fiber holds much of the fruit's flavor and nutrition, which is why mango juice is best prepared by blending the whole pulp rather than traditional juicing. This method preserves its wholesome taste, natural thickness, and full nutritional value.</p><br><p>Best served chilled, Amridh Mango Juice is a delicious and healthy way to enjoy the king of fruits in every sip.</p>`,
        "/images/juice.jpeg",
      ],
      extraImages: ["/images/tilles 2-01.jpg"],
    },
    {
      data: [
        "Alphonso Mango",
        "Fresh Mangoes",
        1200,
        900,
        100,
        `<h3>Fresh Alphonso Mangoes – Premium Ratnagiri Alphonso Mangoes</h3><br>

<p>Experience the unmatched taste of India's King of Mangoes – Fresh Alphonso Mangoes. Known for their rich sweetness, creamy texture, vibrant golden color, and irresistible aroma, Alphonso mangoes are among the most sought-after mango varieties in the world.</p><br>

<p>Our premium fresh Alphonso mangoes are sourced directly from trusted farms in the renowned mango-growing regions of Ratnagiri and Devgad in Maharashtra, where the unique coastal climate produces mangoes with exceptional flavor and natural sweetness.</p><br>

<h4>Why Our Fresh Alphonso Mangoes Are Special</h4><br>

<ul>
<li>Handpicked at peak ripeness for maximum sweetness</li>
<li>Naturally ripened without harmful chemicals</li>
<li>Rich, creamy pulp with a smooth fiberless texture</li>
<li>Premium export-quality fruit selected from trusted farmers</li>
</ul><br>

<h4>Rich in Natural Nutrients</h4><br>

<p>Alphonso mangoes are not only delicious but also packed with essential nutrients that support overall health:</p><br>

<ul>
<li>Vitamin A for healthy skin and eyesight</li>
<li>Vitamin C to strengthen the immune system</li>
<li>Dietary fiber for better digestion</li>
<li>Antioxidants that support overall wellness</li>
</ul><br>

<h4>Perfect for Many Uses</h4><br>

<p>Fresh Alphonso mangoes are incredibly versatile and can be enjoyed in many ways:</p><br>

<ul>
<li>Eating fresh as a sweet summer treat</li>
<li>Preparing milkshakes, smoothies, and juices</li>
<li>Making desserts like mango ice cream, cakes, and puddings</li>
<li>Preparing traditional Indian dishes such as aamras</li>
</ul><br>

<h4>Carefully Packed & Delivered Fresh</h4><br>

<p>Each box of Alphonso mangoes is carefully sorted, quality checked, and hygienically packed to ensure freshness and safety during delivery. We take great care to maintain the natural aroma, taste, and texture that makes Alphonso mangoes truly special.</p><br>

<p>Bring home the authentic taste of premium Alphonso mangoes and enjoy the true flavor of summer with every bite.</p>`,
        "/images/AdobeStock_43300661.jpeg",
      ],
      extraImages: [],
    },
    {
      data: [
        "Mango Jam",
        "Jam",
        300,
        220,
        80,
        `<p>Premium Alphonso Mango Jam – A Taste of Royal Indulgence</p><br><p>Experience the richness of nature with Amridh Alphonso Mango Jam, crafted from the finest handpicked Alphonso mangoes. Known as the King of Mangoes, Alphonso brings an unmatched sweetness, vibrant golden color, and irresistible tropical aroma — now preserved in a smooth, luscious jam.</p><br><p>Our premium mango jam captures the authentic taste of sun-ripened Alphonso mangoes, delivering a delightful burst of flavor in every spoonful.</p><br><p>Why Choose Amridh Alphonso Mango Jam?</p><br><p>🥭 Made from Authentic Alphonso Mangoes</p><br><p>We use carefully selected, export-quality Alphonso mangoes sourced from trusted orchards. Each batch is prepared to retain the fruit's natural sweetness, rich pulp texture, and signature fragrance.</p><br><p>🌿 Rich in Natural Goodness - Alphonso mangoes are naturally packed with:</p><br><ul>
<li>Vitamin A</li>
<li>Vitamin C</li>
<li>Antioxidants</li>
<li>Dietary Fiber</li>
</ul><br><p>Our mango jam not only satisfies your sweet cravings but also provides natural fruit-based nourishment.</p><br>
<p>🍞 Perfect for Everyday Indulgence - Versatile and delicious, our Alphonso mango jam is ideal for:</p><br>
<ul>
<li>Spreading on bread, toast & croissants</li>
<li>Swirling into yogurt & oatmeal</li>
<li>Filling cakes, pastries & donuts</li>
<li>Topping pancakes & waffles</li>
<li>Pairing with desserts & cheeseboards</li>
</ul><br><p>Its smooth consistency and vibrant taste make it a family favorite across all age groups.</p><br><p>✔ Premium Quality & Hygienic Processing</p><br><p>At Amridh, quality is our promise. Our Alphonso mango jam is:</p><br><ul>
<li>Made from high fruit pulp content</li>
<li>Carefully processed under hygienic conditions</li>
<li>Free from artificial flavors</li>
<li>Free from artificial flavors</li>
<li>Crafted for consistent taste & texture</li>
</ul><br><p>We ensure every jar reflects purity, freshness, and the true essence of Alphonso mangoes.</p><br><p>The True Taste of Alphonso in Every Jar</p><br>

<p>With its naturally sweet flavor, rich golden hue, and tropical aroma, Amridh Alphonso Mango Jam brings you the authentic taste of premium mangoes all year round.</p><br><p>Whether for breakfast spreads, bakery creations, or gourmet desserts, our mango jam adds a royal touch to every bite.</p>`,
        "/images/jam.jpeg",
      ],
      extraImages: ["/images/tilles.jpg"],
    },
  ];

  const seedAll = db.transaction(() => {
    for (const product of initialProducts) {
      const result = insertProduct.run(...product.data);
      const productId = result.lastInsertRowid as number;

      // Insert extra images (sort_order starts at 0)
      product.extraImages.forEach((imgUrl, index) => {
        insertImage.run(productId, imgUrl, index);
      });
    }
  });

  seedAll();

  // Seed Coupons
  const insertCoupon = db.prepare(
    "INSERT INTO coupons (code, discount_percent) VALUES (?, ?)"
  );

  insertCoupon.run("MANGO10", 10);
  insertCoupon.run("WHOLESALE20", 20);

  console.log("✅ Initial products and coupons seeded.");
}

export default db;