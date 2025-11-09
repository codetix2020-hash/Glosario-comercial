// generar_guia.js
//
// Script para generar guía comercial de Codetix en Markdown y JSON
//
// Ejecutar: node generar_guia.js
//
// Genera: guia_comercial.md y guia_comercial.json

const fs = require('fs');
const path = require('path');

// Contenido de la guía
const productos = [
  {
    nombre: 'WEB PROFESIONAL',
    definicion:
      'Desarrollo web completamente personalizado creado con código propio desde cero. A diferencia de plataformas como WordPress o Wix que usan plantillas prediseñadas, cada línea de código se escribe específicamente para tu negocio, garantizando un diseño único, mayor velocidad de carga, máxima seguridad y total control sobre la funcionalidad.',
    uso: 'Ideal para empresas, profesionales independientes, restaurantes, clínicas, despachos de abogados y cualquier negocio que necesite presencia online profesional y diferenciada. Perfecta para negocios que buscan destacar de la competencia con una imagen única y moderna.',
    ventajas: [
      'Diseño 100% único y personalizado según la identidad de tu marca',
      'Velocidad de carga 3-5 veces más rápida que plantillas (mejor posicionamiento Google)',
      'Máxima seguridad al no depender de plugins vulnerables de terceros',
      'Totalmente escalable: se pueden añadir nuevas funcionalidades cuando el negocio crezca',
      'Tu propiedad total del código fuente',
      'Mejor posicionamiento en buscadores (SEO optimizado desde el código)',
    ],
    por_que:
      'Mientras otros negocios usan la misma plantilla que miles de empresas, tu web será completamente única. Esto genera mayor confianza en tus clientes, mejora tu imagen de marca y te posiciona como líder en tu sector. Una inversión que se recupera rápidamente con la captación de nuevos clientes.',
    incluye: [
      'Diseño responsive (se adapta perfectamente a móvil, tablet y ordenador)',
      'Certificado SSL (HTTPS) para navegación segura',
      'Optimización SEO básica on-page',
      'Velocidad de carga optimizada (menos de 3 segundos)',
      'Formulario de contacto funcional',
      'Integración con Google Analytics',
      '2 rondas de revisiones incluidas',
      'Capacitación básica de uso',
      'Soporte técnico durante el primer mes',
    ],
  },
  {
    nombre: 'WEB DROPSHIPPING / TIENDA ONLINE',
    definicion:
      'Tienda online completa desarrollada con código propio para venta de productos físicos o digitales, optimizada especialmente para modelos de negocio dropshipping. Incluye gestión integral de productos, pedidos, clientes y pagos, con integración directa a proveedores cuando sea necesario.',
    uso: 'Perfecta para emprendedores que quieren vender productos online sin inventario (dropshipping), tiendas establecidas que quieren migrar a plataforma propia, o negocios físicos que quieren abrir canal de venta online. Especialmente útil para nichos específicos donde necesitas funcionalidades personalizadas.',
    ventajas: [
      'Sin comisiones por venta (a diferencia de Shopify o similares)',
      'Integración directa con proveedores dropshipping automática',
      'Optimizada para máxima conversión de visitante a comprador',
      'Gestión completa de inventario en tiempo real',
      'Sistema de pagos seguro con múltiples pasarelas (Stripe, PayPal, Redsys)',
      'Panel de administración intuitivo para gestionar todo el negocio',
    ],
    por_que:
      'Tener tu propia tienda online significa no pagar comisiones mensuales ni por venta a plataformas como Shopify. Con una inversión inicial, obtienes una plataforma que es 100% tuya, escalable y sin limitaciones. Perfecta para negocios serios que buscan crecer sin depender de terceros.',
    incluye: [
      'Catálogo de productos ilimitado con categorías y filtros',
      'Carrito de compra optimizado para conversión',
      'Gestión completa de pedidos y estados de envío',
      'Integración con múltiples pasarelas de pago',
      'Sistema de gestión de stock en tiempo real',
      'Panel de cliente para seguimiento de pedidos',
      'Emails automáticos (confirmación, envío, entrega)',
      'Diseño responsive para compras desde móvil',
      'Certificado SSL para pagos seguros',
      'SEO optimizado para productos',
      'Integración con proveedores dropshipping',
      'Dashboard de ventas y estadísticas',
    ],
  },
  {
    nombre: 'CHATBOT',
    definicion:
      'Programa automatizado que conversa con los visitantes de tu web mediante mensajes de texto, capaz de responder preguntas frecuentes, captar leads, gestionar reservas o guiar a los usuarios 24/7 sin necesidad de intervención humana. Funciona como un asistente virtual que nunca duerme.',
    uso: 'Ideal para negocios que reciben muchas consultas repetitivas (horarios, precios, disponibilidad), clínicas que quieren automatizar citas, restaurantes con reservas, e-commerce con dudas de productos, o cualquier empresa que quiera captar leads fuera del horario laboral.',
    ventajas: [
      'Atención al cliente 24/7 sin coste de personal adicional',
      'Responde al instante (no hace esperar al cliente potencial)',
      'Captura leads automáticamente incluso de madrugada',
      'Libera tiempo del equipo para tareas más importantes',
      'Mejora experiencia de usuario en la web',
      'Reduce abandono de clientes potenciales por falta de respuesta',
    ],
    por_que:
      'Cada consulta sin responder es un cliente potencial perdido. Un chatbot garantiza que ningún visitante se quede sin atención, incluso cuando estás durmiendo o atendiendo otros clientes. Es como tener un empleado trabajando 24/7 por una fracción del coste.',
    incluye: [
      'Programación de respuestas automáticas personalizadas',
      'Widget integrado en tu web con diseño a medida',
      'Flujos de conversación configurables según tu negocio',
      'Captura de datos de contacto (leads)',
      'Integración con email para notificaciones',
      'Panel de gestión de conversaciones',
      'Analíticas básicas de uso',
      'Diseño adaptado a tu marca',
      'Actualización de respuestas cuando lo necesites',
    ],
  },
  {
    nombre: 'CHATBOT IA (WhatsApp Business)',
    definicion:
      'Chatbot avanzado con Inteligencia Artificial conectado directamente a WhatsApp Business que aprende de la información de tu negocio y mantiene conversaciones naturales con clientes. Capaz de entender contexto, responder preguntas complejas y gestionar múltiples conversaciones simultáneas de forma inteligente.',
    uso: 'Perfecto para negocios con alto volumen de consultas por WhatsApp, clínicas que gestionan citas, restaurantes con reservas, empresas de servicios que responden dudas técnicas, o cualquier negocio donde la comunicación por WhatsApp sea crítica y no se pueda responder inmediatamente todas las consultas.',
    ventajas: [
      'Inteligencia Artificial entrenada específicamente con la información de TU negocio',
      'Conversaciones naturales e ilimitadas sin límite de mensajes',
      'Funciona directamente en WhatsApp (la app que tus clientes ya usan)',
      'Dashboard completo con analíticas avanzadas (Diswarp)',
      'Soporte técnico prioritario dedicado',
      'Aprende y mejora con cada conversación',
    ],
    por_que:
      'WhatsApp es la aplicación de mensajería más usada en España. Tus clientes ya la tienen y la prefieren. Un chatbot IA en WhatsApp Business te permite estar disponible 24/7 en el canal que tus clientes prefieren, respondiendo de forma inteligente y natural, sin que notes la diferencia con una persona real en la mayoría de casos.',
    incluye: [
      'IA entrenada con documentos, FAQs y base de conocimiento de tu negocio',
      'Integración completa con WhatsApp Business API oficial',
      'Conversaciones ilimitadas sin coste adicional por mensaje',
      'Dashboard de analytics completo (Diswarp) con métricas clave',
      'Respuestas automáticas 24/7 en lenguaje natural',
      'Gestión de múltiples conversaciones simultáneas',
      'Capacidad de escalar a clientes humanos cuando sea necesario',
      'Actualizaciones y mejoras continuas del modelo IA',
      'Soporte técnico prioritario por WhatsApp y email',
      'Reportes mensuales de uso y rendimiento',
    ],
  },
  {
    nombre: 'AUTOMATIZACIÓN',
    definicion:
      'Servicios de automatización de procesos comerciales y de atención al cliente mediante workflows inteligentes que ejecutan tareas repetitivas sin intervención humana. Conecta diferentes herramientas de tu negocio para que trabajen juntas automáticamente, ahorrando tiempo y eliminando errores humanos.',
    uso: 'Ideal para empresas que pierden tiempo en tareas repetitivas como enviar emails de seguimiento, actualizar CRM, generar informes, sincronizar datos entre plataformas, o cualquier proceso que se repita con frecuencia y pueda automatizarse.',
    ventajas: [
      'Ahorro de 10-20 horas semanales en tareas repetitivas',
      'Cero errores humanos en procesos automatizados',
      'Respuesta inmediata a eventos (nuevo lead, nueva venta, etc.)',
      'Mejora experiencia del cliente con comunicaciones instantáneas',
      'Escalable: procesa 10 o 10,000 acciones sin coste adicional',
      'ROI medible: recuperas inversión en 2-3 meses típicamente',
    ],
    por_que:
      'El tiempo de tu equipo es valioso. Las tareas repetitivas no solo consumen horas, sino que son propensas a errores y retrasos. La automatización libera a tu equipo para enfocarse en lo que realmente genera ingresos: cerrar ventas, atender clientes VIP y hacer crecer el negocio.',
    incluye: [
      'Envío automático de emails de bienvenida, seguimiento y recordatorios',
      'Sincronización automática de leads desde web/redes sociales a CRM',
      'Generación automática de informes y reportes periódicos',
      'Notificaciones instantáneas de eventos críticos (nueva venta, lead caliente)',
      'Integración entre múltiples herramientas (CRM, email, calendarios, facturación)',
      'Workflows personalizados según procesos específicos de tu negocio',
      'Dashboard de monitoreo de automatizaciones',
      'Documentación completa de cada proceso automatizado',
      'Ajustes y optimizaciones durante los primeros 3 meses',
    ],
  },
  {
    nombre: 'SEO (Search Engine Optimization)',
    definicion:
      'Servicio de optimización técnica y de contenido para mejorar el posicionamiento orgánico de tu web en resultados de búsqueda de Google. No es publicidad pagada, sino trabajo estratégico para que tu web aparezca en las primeras posiciones cuando clientes potenciales buscan servicios como el tuyo.',
    uso: 'Esencial para cualquier negocio que quiera ser encontrado en Google por clientes locales o nacionales. Especialmente importante para sectores competitivos donde aparecer en segunda página de Google significa ser invisible. Inversión a medio-largo plazo con resultados duraderos.',
    ventajas: [
      'Tráfico orgánico constante sin pagar por cada clic (vs Google Ads)',
      'Resultados duraderos: el posicionamiento se mantiene en el tiempo',
      'Mayor credibilidad: usuarios confían más en resultados orgánicos',
      'Mejor ROI a largo plazo comparado con publicidad pagada',
      'Aumenta autoridad de tu marca en el sector',
      'Tráfico altamente cualificado (usuarios buscando activamente tu servicio)',
    ],
    por_que:
      'El 75% de usuarios nunca pasa de la primera página de Google. Si no estás ahí, eres invisible para miles de clientes potenciales que buscan exactamente lo que ofreces. SEO es inversión, no gasto: cada euro invertido genera retorno durante años.',
    incluye: [
      'Auditoría SEO técnica completa de tu web actual',
      'Investigación de palabras clave relevantes para tu negocio',
      'Optimización on-page (títulos, meta descripciones, headings, contenido)',
      'Mejora de velocidad de carga (crítico para SEO)',
      'Optimización de estructura de URLs y navegación',
      'Implementación de schema markup para rich snippets',
      'Optimización de imágenes y multimedia',
      'Estrategia de contenido SEO (blog, landing pages)',
      'Link building básico (construcción de autoridad)',
      'Reportes mensuales con evolución de posiciones y tráfico',
      'Seguimiento de rankings en Google Search Console',
      'Recomendaciones mensuales de mejora continua',
    ],
  },
  {
    nombre: 'DESARROLLO A MEDIDA',
    definicion:
      'Creación de software, aplicaciones web o funcionalidades específicas desarrolladas completamente desde cero con código propio para cubrir necesidades únicas de tu negocio que no pueden resolverse con soluciones estándar. Máxima flexibilidad, rendimiento y escalabilidad sin límites de plantillas o plugins.',
    uso: 'Para empresas con procesos únicos que requieren herramientas específicas: sistemas de gestión interna, portales de empleados, calculadoras personalizadas, plataformas de reservas complejas, integraciones con sistemas legacy, dashboards de métricas, o cualquier software que necesites y no exista en el mercado.',
    ventajas: [
      'Solución exacta a tu problema específico (no adaptarte a software genérico)',
      'Escalabilidad ilimitada según crezca tu negocio',
      'Integración perfecta con tus sistemas actuales',
      'Propiedad total del código (no dependes de proveedores externos)',
      'Ventaja competitiva: herramientas que tu competencia no tiene',
      'Sin costes de licencias mensuales de software de terceros',
    ],
    por_que:
      'Software genérico te obliga a adaptar tus procesos a la herramienta. Con desarrollo a medida, la herramienta se adapta a tu forma de trabajar. Esto significa más eficiencia, menos fricción con el equipo, y capacidad de hacer cosas que tu competencia no puede.',
    incluye: [
      'Análisis detallado de requisitos y consultoría inicial',
      'Diseño de arquitectura técnica y base de datos',
      'Desarrollo completo frontend (interfaz) y backend (lógica)',
      'Testing exhaustivo y control de calidad',
      'Documentación técnica completa del sistema',
      'Capacitación personalizada para tu equipo',
      'Despliegue en producción y configuración de servidores',
      '1 mes de soporte intensivo post-lanzamiento',
      'Garantía de corrección de bugs',
      'Código fuente entregado y documentado',
      'Posibilidad de mantenimiento y evolución futura',
      'Integración con APIs y servicios externos necesarios',
    ],
  },
  {
    nombre: 'RESPONSIVE (Diseño Adaptable)',
    definicion:
      'Característica técnica que garantiza que tu web se visualice y funcione perfectamente en cualquier dispositivo: ordenador de escritorio, portátil, tablet o smartphone. El diseño se adapta automáticamente al tamaño de pantalla, reorganizando elementos para máxima usabilidad en cada dispositivo.',
    uso: 'Imprescindible en 2025: el 70-75% de las visitas web provienen de dispositivos móviles. Una web no responsive pierde automáticamente 3 de cada 4 visitantes potenciales. Crítico para e-commerce, formularios de contacto, reservas online y cualquier web donde importa la conversión.',
    ventajas: [
      'Accesible desde cualquier dispositivo sin perder funcionalidad',
      'Mejora experiencia de usuario móvil (menos rebote, más conversiones)',
      'Google prioriza webs responsive en resultados móviles (mejor SEO)',
      'Una sola web funciona en todos los dispositivos (vs web + app móvil)',
      'Reduce costes de mantenimiento (un solo código base)',
      'Imagen profesional y moderna de tu marca',
    ],
    por_que:
      'Más del 70% de tus clientes potenciales te buscarán desde el móvil. Si tu web no funciona bien en móvil, esos clientes se van directamente a tu competencia. Google además penaliza webs no responsive en búsquedas móviles. No es opcional, es obligatorio.',
    incluye: [
      'Diseño adaptativo para todos los tamaños de pantalla (móvil, tablet, desktop)',
      'Menús optimizados para táctil en dispositivos móviles',
      'Imágenes que se adaptan automáticamente según dispositivo',
      'Botones y formularios dimensionados para uso con dedos',
      'Velocidad de carga optimizada en conexiones móviles',
      'Testing en dispositivos reales iOS y Android',
      'Experiencia de navegación fluida en cualquier orientación',
      'Elementos táctiles con espaciado adecuado (sin clics erróneos)',
      'Contenido priorizado según importancia en pantallas pequeñas',
    ],
  },
  {
    nombre: 'SSL (HTTPS) - Certificado de Seguridad',
    definicion:
      "Protocolo de seguridad que encripta toda la información que viaja entre el navegador del usuario y tu servidor web, protegiendo datos sensibles como formularios, contraseñas o pagos. Visualmente se identifica por el candado verde en la barra de direcciones y la URL comenzando con 'https://' en lugar de 'http://'.",
    uso: 'Obligatorio para cualquier web que solicite datos personales (formularios de contacto), procese pagos online, gestione login de usuarios, o simplemente quiera proyectar imagen profesional y confiable. Google además penaliza webs sin SSL en sus rankings.',
    ventajas: [
      'Protege datos personales y financieros de clientes (privacidad garantizada)',
      'Google prioriza webs con SSL en resultados de búsqueda (mejor posicionamiento)',
      'Genera confianza inmediata con el candado verde visible',
      "Navegadores modernos marcan webs sin SSL como 'No seguro' (aleja clientes)",
      'Cumplimiento legal RGPD para protección de datos en Europa',
      'Protección contra ataques man-in-the-middle y robo de información',
    ],
    por_que:
      "Los usuarios han aprendido a buscar el candado verde antes de comprar o dejar sus datos. Webs sin SSL son marcadas como 'No seguro' por Chrome, Firefox y Safari, lo que espanta al 85% de visitantes. Además, Google penaliza tu posicionamiento. No tener SSL es perder clientes y dinero directamente.",
    incluye: [
      'Certificado SSL instalado y configurado correctamente',
      'Renovación automática anual sin intervención manual',
      'Forzado de HTTPS (redirección automática desde HTTP)',
      'Configuración de seguridad óptima en servidor',
      'Testing completo de encriptación',
      'Actualización de enlaces internos a HTTPS',
      'Verificación en Google Search Console',
      'Monitoreo de expiración y alertas automáticas',
      'Soporte técnico para cualquier incidencia SSL',
    ],
  },
  {
    nombre: 'SISTEMA DE RESERVAS',
    definicion:
      'Plataforma completa de gestión de citas y reservas online que permite a tus clientes reservar servicios directamente desde tu web 24/7, mientras tú gestionas todo desde un panel de administración intuitivo con vista de calendario y tabla. Elimina llamadas telefónicas y WhatsApps para gestionar agenda.',
    uso: 'Perfecto para restaurantes, clínicas médicas, peluquerías, centros de estética, estudios de tatuaje, consultas profesionales, salas de eventos, clases particulares, o cualquier negocio que trabaje con citas y necesite optimizar la gestión de su agenda.',
    ventajas: [
      'Clientes reservan 24/7 sin llamar (incluso cuando estás cerrado)',
      'Reduce no-shows con recordatorios automáticos por email',
      'Ahorra 5-10 horas semanales en gestión manual de agenda',
      'Elimina errores de doble reserva o confusión de horarios',
      'Dashboard visual que muestra disponibilidad de un vistazo',
      'Base de datos automática de clientes para remarketing',
    ],
    por_que:
      'Cada cliente que llama para reservar y no le atiendes es un cliente perdido que va a la competencia. El 60% de reservas online se hacen fuera de horario comercial. Un sistema de reservas trabaja 24/7 captando clientes mientras duermes, sin coste de personal.',
    incluye: [
      'Widget de reservas personalizable integrable en tu web',
      'Dashboard completo con vista de calendario mensual',
      'Vista de tabla con todas las reservas organizadas',
      'Emails automáticos de confirmación al cliente',
      'Emails automáticos de notificación para el negocio',
      'Emails automáticos de cancelación si el cliente cancela',
      'Sistema de cancelación fácil para clientes',
      'Gestión ilimitada de reservas sin límite mensual',
      'Configuración de horarios disponibles y bloqueados',
      'Configuración de duración de servicios',
      'Campos personalizables en formulario de reserva',
      'Exportación a Excel para análisis externos',
      'Panel de administración responsive (desde móvil también)',
      'Soporte técnico continuo por email',
      'Capacitación de uso del sistema incluida',
    ],
  },
];

// Sección explicativa sobre "código"
const explicacionCodigo = {
  titulo: "¿Qué significa desarrollar 'a código'?",
  contenido: `En Codetix trabajamos con **código propio**, lo que significa que cada web, sistema o aplicación se construye desde cero, línea por línea, específicamente para tu negocio.

**A diferencia de usar plantillas o plataformas como WordPress, Wix o Shopify:**
- No dependemos de plugins de terceros que se desactualizan o tienen vulnerabilidades
- No tenemos limitaciones de diseño o funcionalidad impuestas por una plantilla
- No pagas licencias mensuales a plataformas externas
- No estás atado a un proveedor que puede cambiar precios o cerrar

**Ventajas de trabajar a código:**
- **Control Total:** Podemos implementar cualquier funcionalidad que imagines, sin restricciones
- **Rendimiento Superior:** Código optimizado específicamente para tu caso = webs 3-5x más rápidas
- **Seguridad Máxima:** No usamos código de terceros que pueda tener vulnerabilidades conocidas
- **Escalabilidad:** Tu sistema crece contigo sin límites técnicos de plataformas
- **Propiedad:** El código es 100% tuyo, no dependes de renovar licencias para que funcione
- **Flexibilidad:** Cualquier cambio o mejora es posible, sin esperar actualizaciones de plugins

**En resumen:** Desarrollo a código es como tener un traje hecho a medida por un sastre vs comprar uno de talla estándar en una tienda. Más inversión inicial, pero resultado infinitamente superior y duradero.`,
};

// Consejos para comerciales
const consejosComerciales = [
  "**Habla de inversión, no de gasto:** 'Esto no es un gasto, es una inversión que se recupera con los clientes que captarás'",
  '**Traduce técnico a ROI:** En lugar de \'código optimizado\', di \'web que carga en 2 segundos = menos clientes que se van\'',
  "**Usa comparaciones tangibles:** 'Es como comprarte un traje a medida vs uno de cadena comercial que usan miles'",
  "**Enfatiza propiedad:** 'El código es tuyo. Si mañana desaparecemos, tu web sigue funcionando. Con WordPress, si dejas de pagar plugins, todo se rompe'",
  "**Cuantifica el ahorro:** 'Sin comisiones mensuales de Shopify (39€/mes) + sin comisiones por transacción (2%) = en 2 años ahorras 1,500€'",
];

// Generar Markdown
function generarMarkdown() {
  let md = '# Guía Comercial - Codetix\n## Soluciones Web y Marketing Digital\n\n---\n\n';

  // Explicación código
  md += `## ${explicacionCodigo.titulo}\n\n${explicacionCodigo.contenido}\n\n---\n\n`;

  // Índice
  md += '## 📋 Índice de Productos\n\n';
  productos.forEach((p, i) => {
    md += `${i + 1}. [${p.nombre}](#${p.nombre.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '')})\n`;
  });
  md += '\n---\n\n';

  // Productos
  productos.forEach((p) => {
    const ancla = p.nombre.toLowerCase().replace(/ /g, '-').replace(/[()]/g, '');
    md += `## ${p.nombre}\n\n`;
    md += `### ¿Qué es?\n${p.definicion}\n\n`;
    md += `### ¿Para qué sirve?\n${p.uso}\n\n`;
    md += '### Ventajas clave\n';
    p.ventajas.forEach((v) => {
      md += `- ${v}\n`;
    });
    md += `\n### ¿Por qué le interesaría a tu cliente?\n${p.por_que}\n\n`;
    md += '### ¿Qué incluye?\n';
    p.incluye.forEach((inc) => {
      md += `- ${inc}\n`;
    });
    md += '\n---\n\n';
  });

  // Consejos para comerciales
  md += '## 💼 Notas para Comerciales\n\n';
  md += '### 5 Consejos Rápidos para Vender Productos "A Código"\n\n';
  consejosComerciales.forEach((c, i) => {
    md += `${i + 1}. ${c}\n`;
  });
  md += '\n---\n\n';
  md += '*Documento generado automáticamente para uso interno del equipo comercial de Codetix*\n';

  return md;
}

// Generar JSON
function generarJSON() {
  return {
    metadata: {
      empresa: 'Codetix',
      descripcion: 'Soluciones Web y Marketing Digital',
      fecha_generacion: new Date().toISOString(),
      version: '2.0',
    },
    explicacion_codigo: explicacionCodigo,
    productos: productos,
    consejos_comerciales: consejosComerciales,
  };
}

// Escribir archivos
function escribirArchivos() {
  const markdown = generarMarkdown();
  const json = JSON.stringify(generarJSON(), null, 2);

  const mdPath = path.join(__dirname, 'guia_comercial.md');
  const jsonPath = path.join(__dirname, 'guia_comercial.json');

  fs.writeFileSync(mdPath, markdown, 'utf8');
  fs.writeFileSync(jsonPath, json, 'utf8');

  console.log('✅ Archivos generados exitosamente:');
  console.log(`📄 Markdown: ${mdPath}`);
  console.log(`📊 JSON: ${jsonPath}`);
}

// Ejecutar
escribirArchivos();

