import React, { useLayoutEffect } from 'react';

function ListItem({ index }) {
  return (
    <li style={{ padding: '2px 0' }}>
      Elemento de lista número {index + 1}
    </li>
  );
}

function App() {
  // 1. Leer el número de ítems desde la URL
  const params = new URLSearchParams(window.location.search);
  const totalItems = parseInt(params.get('items') || '100', 10);

  // 2. Marcar el inicio ANTES de que React empiece a trabajar
  performance.mark('list-render-start');

  // 3. Generar la lista de elementos virtualmente
  const items = [];
  for (let i = 0; i < totalItems; i++) {
    items.push(<ListItem key={i} index={i} />);
  }

  // 4. Usar useLayoutEffect para medir DESPUÉS de que el DOM se actualizó
  useLayoutEffect(() => {
    // 5. Marcar el fin y calcular la duración
    performance.mark('list-render-end');
    const measure = performance.measure(
      'List Render Time', // Nombre de la medición
      'list-render-start', // Marca de inicio
      'list-render-end'   // Marca de fin
    );

    // 6. Mostrar el resultado en la consola
    console.log(`Render de ${totalItems} items: ${measure.duration} ms`);

    // Limpiar marcas para la próxima medición
    performance.clearMarks();
    performance.clearMeasures();
  }, [totalItems]); // Se ejecuta cada vez que 'totalItems' cambia

  // 7. Renderizar la lista
  return (
    <div>
      <h1>Prueba de Rendimiento de Renderizado</h1>
      <p>Renderizando {totalItems} elementos...</p>
      <ul>
        {items}
      </ul>
    </div>
  );
}

export default App;