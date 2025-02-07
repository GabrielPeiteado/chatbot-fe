import json
import hashlib
import datetime

# Función para generar un hash único para PK_PRODUCT
def generate_hash(value):
    return hashlib.sha256(value.encode()).hexdigest()

# Fecha de creación
creation_date = datetime.datetime.now().strftime("%Y-%m-%d")

# Usuario creador (suposición)
created_by = "admin"

# Lista de productos extraídos de la carta
productos = [
    {"name_es": "Verduras de temporada, crema de tofu y pesto de tomates secos", "price": 13.50, "category": "Brasa"},
    {"name_es": "Provolone, cabello de ángel y pimiento encurtido", "price": 13.50, "category": "Brasa"},
    {"name_es": "Corvina, puré de calabaza, espárragos", "price": 19.80, "category": "Brasa"},
    {"name_es": "Pulpo, chips de yuca y pico verde", "price": 23.50, "category": "Brasa"},
    {"name_es": "Costillas de cerdo con salsa agridulce", "price": 18.50, "category": "Brasa"},
    {"name_es": "Mollejas Teriyaki con puré de coliflor", "price": 18.50, "category": "Brasa"},
    {"name_es": "Entrecot Angus Argentino con chimichurri", "price": 22.50, "category": "Brasa"},
    {"name_es": "Pan con tomate", "price": 3.80, "category": "Entrantes"},
    {"name_es": "Olivas Gordal marinadas", "price": 4.30, "category": "Entrantes"},
    {"name_es": "Anchoas del cantábrico (4u)", "price": 12.00, "category": "Entrantes"},
    {"name_es": "Banderilla de boquerón (4u)", "price": 7.00, "category": "Entrantes"},
    {"name_es": "Jamón Ibérico", "price": 19.50, "category": "Entrantes"},
    {"name_es": "Croquetas de jamón ibérico (4u)", "price": 10.00, "category": "Entrantes"},
    {"name_es": "Croquetas de la semana (4u)", "price": 10.00, "category": "Entrantes"},
    {"name_es": "Patatas bravas con alioli trufado", "price": 7.80, "category": "Entrantes"},
    {"name_es": "Empanada de ossobuco braseado", "price": 5.00, "category": "Entrantes"},
    {"name_es": "Hummus de kimchi, cacahuate tostado y kale crujiente", "price": 9.00, "category": "Entrantes"},
    {"name_es": "Ensaladilla rusa de la casa con anchoas", "price": 9.75, "category": "Entrantes"},
    {"name_es": "Ensalada de mango, cherrys, granada, cebolla encurtida y parmesano", "price": 9.50, "category": "Entrantes"},
    {"name_es": "Polenta frita, setas y miso", "price": 12.30, "category": "Entrantes"},
    {"name_es": "Tartar de Atún, aguacate, cebolla roja, emulsión de leche de tigre", "price": 22.50, "category": "Entrantes"},
    {"name_es": "Langostinos crocantes, miel de maracuyá", "price": 17.50, "category": "Entrantes"},
    {"name_es": "Milanesa de ternera, spaghetti Cacio & Pepe", "price": 18.50, "category": "Entrantes"},
    {"name_es": "Milanesa de ternera napolitana con patatas", "price": 19.90, "category": "Entrantes"},
    {"name_es": "Piña asada, helado de chocolate blanco, crumble de coco", "price": 7.00, "category": "Postres"},
    {"name_es": "Brownie de chocolate, banana, helado de vainilla, avellanas", "price": 8.50, "category": "Postres"},
    {"name_es": "Húmedo de nuez, crema de limón y frambuesas", "price": 8.00, "category": "Postres"},
    {"name_es": "Tiramisú de pistacho", "price": 8.90, "category": "Postres"},
]

# Generar JSONL
jsonl_data = []
for i, prod in enumerate(productos, start=1):
    product_data = {
        "PK_PRODUCT": generate_hash(prod["name_es"]),
        "ID_PRODUCT": f"PROD-{i}",
        "ENABLE": True,
        "CREATION_DATE": creation_date,
        "CREATED_BY": created_by,
        "NAME_ES": prod["name_es"],
        "NAME_US": "Unknown",
        "HOUSE_RECO": False,
        "MENU_TYPE": "Main Course" if prod["category"] != "Postres" else "Dessert",
        "TIME_TEMP": "Hot",
        "CATEGORY": prod["category"],
        "FAMILY": "General",
        "SUB-FAMILY": "None",
        "MAIN_COMPONENT": "Unknown",
        "PRICE_CATEGORY": "Standard",
        "PLATE_PRICE_EUR": prod["price"],
        "UNIT_PRICE_EUR": prod["price"],
        "SUPPLIER": "Unknown",
        "HOMEMADE": False,
        "INGREDIENTS": [],
        "ak_allergenes": [],
        "food_fat_g": 0,
        "food_fat_g-unit": "g",
        "food_protein_g": 0,
        "food_protein_g-unit": "g",
        "food_energy_kj": 0,
        "food_energy_kj-unit": "kJ",
        "food_allergens": False,
        "cosmetic_allergenes": False,
        "food_energy_kcal": 0,
        "food_energy_kcal-unit": "kcal",
        "food_kosher": False,
        "food_halal": False,
        "food_lactose": False,
        "food_coeliac": False,
        "IMAGE_URL": "https://example.com/default.jpg",
    }
    jsonl_data.append(json.dumps(product_data))

# Guardar en archivo JSONL
file_path = "carta_restaurante.jsonl"
with open(file_path, "w") as file:
    file.write("\n".join(jsonl_data))

file_path
