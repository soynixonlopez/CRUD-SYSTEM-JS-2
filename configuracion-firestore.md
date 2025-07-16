# 🔥 Configuración de Firebase Firestore

## 📋 Pasos para Configurar Firestore

### 1. **Habilitar Firestore Database**

1. Ve a [Firebase Console](https://console.firebase.google.com)
2. Selecciona tu proyecto: `project-it-7713e`
3. En el menú lateral, haz clic en **"Firestore Database"**
4. Si no está habilitado, haz clic en **"Create Database"**
5. Selecciona **"Start in test mode"** (para desarrollo)
6. Elige la ubicación más cercana a ti (ej: `us-central1`)
7. Haz clic en **"Done"**

### 2. **Configurar las Reglas de Firestore**

1. En Firestore Database, haz clic en la pestaña **"Rules"**
2. **Reemplaza** todo el contenido con las reglas del archivo `firestore-rules-simple.txt`
3. Haz clic en **"Publish"**

### 3. **Verificar la Configuración**

1. Ve a la pestaña **"Data"** en Firestore
2. Deberías ver una base de datos vacía
3. La colección `products` se creará automáticamente cuando agregues el primer producto

## 🔧 Reglas de Firestore

### **Versión Simple (Recomendada para desarrollo):**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Permitir acceso completo a la colección "products"
    match /products/{productId} {
      allow read, write: if true;
    }
    
    // Bloquear acceso a otras colecciones
    match /{document=**} {
      allow read, write: if false;
    }
  }
}
```

### **Versión Avanzada (Con validaciones):**

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    // Reglas para la colección "products"
    match /products/{productId} {
      // Permitir lectura de todos los productos
      allow read: if true;
      
      // Permitir escritura (crear, actualizar, eliminar) de productos
      allow create, update, delete: if true;
      
      // Validaciones adicionales para crear/actualizar productos
      allow create: if 
        // Validar que el documento tenga los campos requeridos
        request.resource.data.keys().hasAll(['name', 'description', 'currentPrice', 'sku', 'createdAt', 'updatedAt', 'status', 'visibility']) &&
        
        // Validar tipos de datos
        request.resource.data.name is string &&
        request.resource.data.description is string &&
        request.resource.data.currentPrice is number &&
        request.resource.data.sku is string &&
        
        // Validar longitudes mínimas
        request.resource.data.name.size() >= 3 &&
        request.resource.data.description.size() >= 10 &&
        
        // Validar que el precio sea positivo
        request.resource.data.currentPrice > 0 &&
        
        // Validar que el SKU no esté vacío
        request.resource.data.sku.size() > 0;
      
      allow update: if 
        // Validar que el documento tenga los campos requeridos
        request.resource.data.keys().hasAll(['name', 'description', 'currentPrice', 'sku', 'updatedAt']) &&
        
        // Validar tipos de datos
        request.resource.data.name is string &&
        request.resource.data.description is string &&
        request.resource.data.currentPrice is number &&
        request.resource.data.sku is string &&
        
        // Validar longitudes mínimas
        request.resource.data.name.size() >= 3 &&
        request.resource.data.description.size() >= 10 &&
        
        // Validar que el precio sea positivo
        request.resource.data.currentPrice > 0 &&
        
        // Validar que el SKU no esté vacío
        request.resource.data.sku.size() > 0;
    }
    
    // Reglas para otras colecciones (si las agregas en el futuro)
    match /{document=**} {
      // Por ahora, solo permitir acceso a la colección products
      // Puedes agregar más colecciones aquí según necesites
      allow read, write: if false;
    }
  }
}
```

## 🚨 Solución de Problemas

### **Error: "Missing or insufficient permissions"**

1. Verifica que las reglas estén publicadas correctamente
2. Asegúrate de usar las reglas simples para desarrollo
3. Espera unos minutos después de publicar las reglas

### **Error: "Firestore is not enabled"**

1. Ve a Firebase Console > Firestore Database
2. Haz clic en "Create Database"
3. Selecciona "Start in test mode"
4. Elige una ubicación y haz clic en "Done"

### **Error: "Collection does not exist"**

1. No te preocupes, la colección `products` se creará automáticamente
2. Intenta crear un producto desde tu aplicación
3. La colección aparecerá después del primer documento

## ✅ Verificación

Para verificar que todo funciona:

1. **Abre tu aplicación** (`index.html`)
2. **Haz clic en "Crear Producto"**
3. **Llena el formulario** y envía
4. **Ve a Firebase Console > Firestore Database > Data**
5. **Deberías ver** la colección `products` con tu producto

## 🔒 Seguridad

### **Para Desarrollo:**
- Usa las reglas simples (`firestore-rules-simple.txt`)
- Permite acceso completo a la colección `products`

### **Para Producción:**
- Usa las reglas avanzadas (`firestore-rules.txt`)
- Agrega autenticación de usuarios
- Implementa validaciones más estrictas

## 📝 Notas Importantes

- ⚠️ **Las reglas simples son solo para desarrollo**
- 🔒 **En producción, agrega autenticación**
- 📊 **La colección se crea automáticamente**
- ⏱️ **Las reglas pueden tardar unos minutos en aplicarse** 