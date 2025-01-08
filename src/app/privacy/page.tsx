export default function PrivacyPolicy() {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-6">Alfastore</h1>
        <br />
        <h1 className="text-3xl font-bold mb-6">Política de Privacidad</h1>
        
        <section className="space-y-6">
          <div>
            <h2 className="text-xl font-semibold mb-3">1. Introducción</h2>
            <p className="text-gray-700">
              Esta Política de Privacidad describe cómo se recopila, utiliza y protege la información cuando utilizas nuestra aplicación móvil. Nos comprometemos a proteger tu privacidad y a ser transparentes sobre nuestras prácticas de datos.
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold mb-3">2. Información que Recopilamos</h2>
            <h3 className="text-lg font-medium mb-2">2.1 Permisos de la Aplicación</h3>
            <p className="text-gray-700">
              Nuestra aplicación requiere acceso a la cámara del dispositivo con el único propósito de permitir la captura de imágenes de productos para su visualización en la aplicación.
            </p>
          </div>
  
          <div>
            <h3 className="text-lg font-medium mb-2">2.2 Información que NO recopilamos</h3>
            <ul className="list-disc pl-6 text-gray-700">
              <li>No recopilamos información personal identificable</li>
              <li>No recopilamos datos de localización</li>
              <li>No recopilamos información de pago</li>
              <li>No almacenamos cookies</li>
              <li>No realizamos seguimiento de usuarios</li>
            </ul>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold mb-3">3. Uso de la Información</h2>
            <p className="text-gray-700">
              La única información a la que accedemos (imágenes capturadas a través de la cámara) se utiliza exclusivamente para:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mt-2">
              <li>Mostrar productos dentro de la aplicación</li>
              <li>Permitir la gestión del catálogo de productos</li>
              <li>Facilitar la visualización de productos al usuario</li>
            </ul>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold mb-3">4. Contacto</h2>
            <p className="text-gray-700">
              Para cualquier pregunta o inquietud relacionada con esta política de privacidad, puedes contactarnos a través de:
              <br />
              Correo electrónico: {/* Añade tu correo */}
              <br />
              Teléfono: {/* Añade tu teléfono */}
            </p>
          </div>
  
          <div>
            <h2 className="text-xl font-semibold mb-3">5. Actualización de esta Política</h2>
            <p className="text-gray-700">
              Esta política fue actualizada por última vez el {new Date().toLocaleDateString()}. Nos reservamos el derecho de actualizar o modificar esta política en cualquier momento.
            </p>
          </div>
        </section>
      </main>
    );
  }