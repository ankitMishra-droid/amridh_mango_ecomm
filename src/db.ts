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

export function ensureUserColumns() {
  const columns = db.prepare(`PRAGMA table_info(users)`).all();

  const hasPhone = columns.some((col: any) => col.name === "phone");

  if (!hasPhone) {
    try {
      db.exec(`ALTER TABLE users ADD COLUMN phone TEXT`);
      console.log("✅ phone column added");
    } catch (err) {
      console.log("⚠️ phone column already exists (ignored)");
    }
  }
}

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
          "Mango Pulp (850g)",
          "Pulp",
          450,
          300,
          300,
          `<h3>Amirdh Ratnagiri Alphonso Mango Pulp Packed in Tin</h3><br>

  <h4>Alphonso Mango Pulp – Premium Sweet & Natural Mango Pulp</h4><br>

  <p>Enjoy the authentic taste of India’s finest mango variety with our fresh Alphonso Mango Pulp. Made from carefully selected, fully ripened Ratnagiri Alphonso mangoes, this premium mango pulp delivers rich sweetness, vibrant golden color, and irresistible aroma that makes Alphonso mangoes famous worldwide.</p><br>

  <p>Our 100% natural Alphonso mango pulp is hygienically processed and packed in tin to preserve the fruit’s natural flavor and nutritional goodness. Whether you're preparing smoothies, milkshakes, desserts, ice creams, or traditional Indian sweets, this pulp offers the perfect balance of sweetness and smooth texture.</p><br>

  <p>If you are looking to buy Alphonso mango pulp online, our premium-quality Amirdh Ratnagiri Alphonso Mango Pulp ensures consistent taste, freshness, and convenience for home kitchens, restaurants, bakeries, and food manufacturers. It comes with a shelf life of up to 2 years.</p><br>

  <h4>Why Choose Our Amirdh Alphonso Mango Pulp Packed in Tin?</h4><br>

  <ul>
    <li>🥭 <strong>Made from Premium Fresh Alphonso Mangoes</strong><br>
    Sourced from top mango-growing regions known for high-quality Alphonso mangoes.</li><br>

    <li>🌿 <strong>100% Natural Mango Pulp</strong><br>
    No artificial colors or flavors, preserving the authentic taste.</li><br>

    <li>✨ <strong>Rich Flavor & Smooth Texture</strong><br>
    Maintains creamy consistency and natural sweetness.</li><br>

    <li>🍹 <strong>Versatile Culinary Use</strong><br>
    Perfect for smoothies, juices, desserts, bakery fillings, and traditional recipes.</li><br>

    <li>📦 <strong>Hygienically Processed & Packed</strong><br>
    Produced under strict food safety standards to maintain freshness.</li>
  </ul><br>

  <h4>Uses of Ratnagiri Alphonso Mango Pulp</h4><br>

  <ul>
    <li>Mango smoothies and milkshakes</li>
    <li>Ice creams and frozen desserts</li>
    <li>Cakes, pastries, and bakery fillings</li>
    <li>Yogurt, puddings, and mousses</li>
    <li>Traditional Indian dishes like Aamras and Mango Shrikhand</li>
    <li>Cocktails, mocktails, and beverages</li>
  </ul><br>

  <h4>Health Benefits of Amirdh Alphonso Mango Pulp</h4><br>

  <ul>
    <li>Rich in Vitamin A and Vitamin C</li>
    <li>Good source of antioxidants</li>
    <li>Supports healthy digestion</li>
    <li>Helps boost immunity</li>
    <li>Provides natural energy</li>
  </ul><br>

  <h4>Buy Premium Amirdh Ratnagiri Alphonso Mango Pulp Online</h4><br>

  <p>Bring home the taste of India’s king of mangoes with our delicious Amirdh Alphonso Mango Pulp. Perfect for both home cooking and professional kitchens, this pulp lets you enjoy the flavor of ripe Ratnagiri Alphonso mangoes all year round.</p><br>

  <p>Order now and experience the rich, tropical sweetness of real Amirdh Ratnagiri Alphonso mango pulp in every spoonful.</p>`,

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
          200,
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
        extraImages: ["/images/tilles-5.jpg"],
      },
      {
        data: [
          "Mango Cubes / Aam Papad",
          "Papad",
          200,
          150,
          150,
          `<h3>Ratnagiri Alphonso Mango Cubes (Aam Papad) – A Bite-Sized Burst of Real Alphonso Mango Goodness</h3><br>

  <p>Relive the authentic taste of traditional Indian mango delight with Amirdh Ratnagiri Alphonso Mango Cubes (Aam Papad) — crafted from premium quality fresh Alphonso mango pulp and carefully processed to preserve natural flavor, color, and nutrition.</p><br>

  <p>Our mango cubes offer the perfect balance of sweetness and tanginess, delivering a chewy, fruity indulgence in convenient bite-sized pieces. Made from sun-ripened mangoes, this timeless treat combines tradition with modern quality standards.</p><br>

  <h4>What Makes Amirdh Ratnagiri Alphonso Mango Cubes Special?</h4><br>

  <ul>
    <li>🥭 <strong>Made from Real Fresh Alphonso Mango Pulp</strong><br>
    Prepared using high-quality fresh Alphonso mango pulp to capture the rich tropical essence and natural sweetness.</li><br>

    <li>🌿 <strong>Naturally Flavorful & Nutrient-Rich</strong><br>
    Fresh Alphonso mangoes are naturally rich in Vitamin A, Vitamin C, antioxidants, and dietary fiber.</li><br>

    <li>🍬 <strong>Perfect Anytime Snack</strong><br>
    Ideal for healthy snacking, school tiffin treats, travel snacks, festive gifting, and traditional sweet platters.</li><br>

    <li>✔ <strong>Hygienically Processed & Quality Assured</strong><br>
    Manufactured at our Alphonso mango pulp unit in Ratnagiri with strict quality checks, uniform texture, and consistent taste.</li>
  </ul><br>

  <h4>Uses of Alphonso Mango Cubes (Aam Papad)</h4><br>

  <ul>
    <li>Healthy fruit-based snack</li>
    <li>Kids' tiffin and lunchbox treats</li>
    <li>Travel-friendly snack option</li>
    <li>Festive gifting and sweet platters</li>
    <li>Quick energy snack anytime</li>
  </ul><br>

  <h4>Health Benefits of Alphonso Mango Cubes</h4><br>

  <ul>
    <li>Rich in Vitamin A and Vitamin C</li>
    <li>Good source of antioxidants</li>
    <li>Supports digestion with natural fiber</li>
    <li>Provides quick natural energy</li>
  </ul><br>

  <p>Mango Cubes (Aam Papad) are a classic fruit confection enjoyed across generations. Amirdh brings you this traditional mango sweet in a hygienically prepared, export-quality format — perfect for retail, bulk supply, and international markets.</p><br>

  <p>Enjoy the chewy, fruity richness of real Alphonso mango in every bite.</p>`,

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
          `<h3>Refreshing natural mango juice.</h3><br><p>Amirdh Mango Juice is a nutrient-dense tropical beverage made by blending ripe mango pulp with water, ice, and optional natural sweeteners. Bursting with rich flavor and natural goodness, it delivers a thick, smooth texture that captures the true essence of mango.</p><br><p>Naturally high in Vitamin A, Vitamin C, antioxidants, and dietary fiber, this refreshing drink helps support skin health, boost immunity, and provide natural energy — making it a perfect summer staple.</p><br><p>Unlike many other fruits, mangoes cannot be extracted using a regular juicer because they are high in fiber. The fiber holds much of the fruit's flavor and nutrition, which is why mango juice is best prepared by blending the whole pulp rather than traditional juicing. This method preserves its wholesome taste, natural thickness, and full nutritional value.</p><br><p>Best served chilled, Amirdh Mango Juice is a delicious and healthy way to enjoy the king of fruits in every sip.</p>`,
          "/images/juice.jpeg",
        ],
        extraImages: ["/images/tilles-2-01.jpg"],
      },
      {
        data: [
          "Alphonso Mango",
          "Fresh Mangoes",
          1200,
          900,
          100,
          `<h3>Fresh Alphonso Mangoes – Amirdh Premium Ratnagiri Alphonso Mangoes</h3><br>

  <p>Experience the unmatched taste of India’s King of Mangoes – Fresh Ratnagiri Alphonso Mangoes. Known for their rich sweetness, creamy texture, vibrant golden color, and irresistible aroma, Alphonso mangoes are among the most sought-after mango varieties in the world.</p><br>

  <p>Our premium fresh Alphonso mangoes are sourced directly from trusted farms in the renowned mango-growing regions of Ratnagiri in Maharashtra, where the unique coastal climate produces mangoes with exceptional flavor and natural sweetness.</p><br>

  <p>Each Alphonso mango is carefully handpicked at the right stage of maturity to ensure you receive fresh, naturally ripened Ratnagiri Alphonso mangoes that deliver authentic taste and quality in every bite.</p><br>

  <h4>Why Our Fresh Ratnagiri Alphonso Mangoes Are Special</h4><br>

  <ul>
    <li>🥭 <strong>Authentic Ratnagiri Alphonso Mangoes</strong><br>
    Sourced from the best mango orchards known for producing world-class Alphonso mangoes.</li><br>

    <li>🌿 <strong>Naturally Ripened</strong><br>
    Our Ratnagiri mangoes are ripened naturally to preserve their real flavor, aroma, and nutrients.</li><br>

    <li>✨ <strong>Rich Taste & Creamy Texture</strong><br>
    Amirdh Ratnagiri Alphonso mangoes are famous for their buttery pulp, fiber-free texture, and naturally sweet taste.</li><br>

    <li>📦 <strong>Carefully Packed for Fresh Delivery</strong><br>
    Each Alphonso mango is carefully selected and packed to maintain freshness and quality during delivery.</li><br>

    <li>🌍 <strong>Farm Fresh Quality</strong><br>
    Direct sourcing from farmers ensures authentic taste and premium quality.</li>
  </ul><br>

  <h4>Taste Profile of Amirdh Alphonso Mangoes</h4><br>

  <p>Fresh Ratnagiri Alphonso mangoes are loved worldwide for their distinctive characteristics:</p><br>

  <ul>
    <li>Bright golden-yellow color</li>
    <li>Intense tropical aroma</li>
    <li>Naturally sweet flavor with a slight tang</li>
    <li>Smooth, fiberless pulp</li>
    <li>Rich and creamy texture</li>
  </ul><br>

  <p>These qualities make Amirdh Ratnagiri Alphonso mangoes the most premium mango variety in India.</p><br>

  <h4>Health Benefits of Fresh Ratnagiri Alphonso Mangoes</h4><br>

  <p>In addition to their delicious taste, fresh Alphonso mangoes are packed with nutrients that support overall health.</p><br>

  <ul>
    <li>Rich in Vitamin A and Vitamin C</li>
    <li>Good source of antioxidants</li>
    <li>Supports healthy digestion</li>
    <li>Helps boost immunity</li>
    <li>Provides natural energy</li>
  </ul><br>

  <p>Adding fresh Amirdh Ratnagiri Alphonso mangoes to your diet is a delicious way to enjoy seasonal nutrition.</p>`,

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
          `<p>Premium Alphonso Mango Jam – A Taste of Royal Indulgence</p><br><p>Experience the richness of nature with Amirdh Alphonso Mango Jam, crafted from the finest handpicked Alphonso mangoes. Known as the King of Mangoes, Alphonso brings an unmatched sweetness, vibrant golden color, and irresistible tropical aroma — now preserved in a smooth, luscious jam.</p><br><p>Our premium mango jam captures the authentic taste of sun-ripened Alphonso mangoes, delivering a delightful burst of flavor in every spoonful.</p><br><p>Why Choose Amirdh Alphonso Mango Jam?</p><br><p>🥭 Made from Authentic Alphonso Mangoes</p><br><p>We use carefully selected, export-quality Alphonso mangoes sourced from trusted orchards. Each batch is prepared to retain the fruit's natural sweetness, rich pulp texture, and signature fragrance.</p><br><p>🌿 Rich in Natural Goodness - Alphonso mangoes are naturally packed with:</p><br><ul>
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
</ul><br><p>Its smooth consistency and vibrant taste make it a family favorite across all age groups.</p><br><p>✔ Premium Quality & Hygienic Processing</p><br><p>At Amirdh, quality is our promise. Our Alphonso mango jam is:</p><br><ul>
<li>Made from high fruit pulp content</li>
<li>Carefully processed under hygienic conditions</li>
<li>Free from artificial flavors</li>
<li>Free from artificial flavors</li>
<li>Crafted for consistent taste & texture</li>
</ul><br><p>We ensure every jar reflects purity, freshness, and the true essence of Alphonso mangoes.</p><br><p>The True Taste of Alphonso in Every Jar</p><br>

<p>With its naturally sweet flavor, rich golden hue, and tropical aroma, Amirdh Alphonso Mango Jam brings you the authentic taste of premium mangoes all year round.</p><br><p>Whether for breakfast spreads, bakery creations, or gourmet desserts, our mango jam adds a royal touch to every bite.</p>`,
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