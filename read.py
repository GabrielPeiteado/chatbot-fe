import fitz
import re
import json

# Ruta correcta en Windows
pdf_path = r"public\Carta-Español.pdf"

# Abrir el PDF
doc = fitz.open(pdf_path)

# Leer y extraer texto
text = ""
for page in doc:
    text += page.get_text() + "\n"

# Dividir en líneas y limpiar espacios extra
lines = [line.strip() for line in text.split("\n") if line.strip()]

# Expresión regular para detectar precios (números con decimales)
price_pattern = re.compile(r"^\d+,\d{2}$")

productos = []
temp_product = None

# Procesar línea por línea
for line in lines:
    if price_pattern.match(line):  # Si la línea es un precio
        if temp_product:
            temp_product["price"] = float(line.replace(",", "."))  # Convertir precio a float
            productos.append(temp_product)
            temp_product = None
    else:  # Si es un nombre de producto
        temp_product = {"name_es": line, "price": None}


print(productos)

# Guardar como JSONL
output_path = "carta_restaurante.jsonl"
with open(output_path, "w", encoding="utf-8") as file:
    for producto in productos:
        file.write(json.dumps(producto, ensure_ascii=False) + "\n")

print(f"Archivo generado: {output_path}")
