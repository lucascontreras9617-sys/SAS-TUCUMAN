import type { APIRoute } from 'astro';
import { Resend } from 'resend';

export const prerender = false;

export const POST: APIRoute = async ({ request }) => {
  // Nota: En producción, RESEND_API_KEY debe estar en las variables de entorno del servidor.
  const resend = new Resend(import.meta.env.RESEND_API_KEY);
  
  try {
    const data = await request.formData();
    const nombre = data.get('nombre');
    const email = data.get('email');
    const mensaje = data.get('mensaje');
    const provincia = data.get('provincia') || 'No especificada';

    // Validación básica de seguridad
    if (!nombre || !email || !mensaje) {
      return new Response(JSON.stringify({ error: 'Faltan campos requeridos' }), { status: 400 });
    }

    const { data: emailData, error } = await resend.emails.send({
      from: 'Sistema <contacto@estudiosas.com.ar>',
      to: import.meta.env.CONTACT_EMAIL || 'lucascontreras96@gmail.com', // Fallback para pruebas
      subject: `Nuevo Lead SAS — ${provincia} — ${nombre}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #EEE; padding: 20px; border-radius: 8px;">
          <h2 style="color: #D4AF37; border-bottom: 2px solid #D4AF37; padding-bottom: 10px;">Nuevo Lead de Contacto</h2>
          <p>Has recibido un nuevo mensaje desde el sitio web Estudio SAS.</p>
          <hr style="border: 0; border-top: 1px solid #EEE;" />
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Provincia/Jurisdicción:</strong> ${provincia}</p>
          <p><strong>Mensaje:</strong></p>
          <div style="background: #F9F9F9; padding: 15px; border-radius: 4px; font-style: italic;">
            ${mensaje}
          </div>
          <hr style="border: 0; border-top: 1px solid #EEE;" />
          <small style="color: #888;">Este es un mensaje automático enviado desde el servidor de Estudio SAS.</small>
        </div>
      `
    });

    if (error) {
      console.error('Error Resend:', error);
      return new Response(JSON.stringify({ error: 'Error al enviar el email' }), { status: 500 });
    }

    return new Response(JSON.stringify({ ok: true, id: emailData?.id }), { status: 200 });
    
  } catch (err) {
    console.error('Error Contact API:', err);
    return new Response(JSON.stringify({ error: 'Error interno del servidor' }), { status: 500 });
  }
};
