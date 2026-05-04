import sqlite3
import json

def export_products():
    conn = sqlite3.connect('mango.db')
    conn.row_factory = sqlite3.Row
    cursor = conn.cursor()
    cursor.execute('SELECT * FROM products')
    rows = cursor.fetchall()
    
    products = [dict(row) for row in rows]
    
    with open('products.json', 'w') as f:
        json.dump(products, f, indent=2)

    print("Exported", len(products), "products to products.json")
    conn.close()

if __name__ == '__main__':
    export_products()
