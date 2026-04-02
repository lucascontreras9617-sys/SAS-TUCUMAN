export const prerender = false;

export async function POST({ request }) {
  const data = await request.formData();
  
  const nombre = data.get('nombre');
  const email = data.get('email');
  const idea = data.get('idea');

  // Validación básica del lado del servidor
  if (!nombre || !email) {
    return new Response(
      JSON.stringify({
        message: "Faltan campos obligatorios",
        success: false
      }),
      { status: 400 }
    );
  }

  // Aquí en el futuro se pueden conectar integraciones como Resend, Turso, o SendGrid.
  // Por ahora lo logueamos internamente para verificar la conexión nativa de Astro.
  console.log('--- NUEVO LEAD RECIBIDO ---');
  console.log(`Nombre: ${nombre}`);
  console.log(`Email: ${email}`);
  console.log(`Idea: ${idea}`);
  console.log('---------------------------');

  return new Response(
    JSON.stringify({
      message: "Lead recibido exitosamente.",
      success: true
    }),
    { status: 200 }
  );
}
