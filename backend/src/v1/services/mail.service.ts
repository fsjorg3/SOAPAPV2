import nodemailer, { Transporter } from 'nodemailer';

export interface DatosContacto {
  name: string;
  nis: string;
  phone: string;
  email: string;
  address: string;
  comment: string;
}

let transporter: Transporter | null = null;

/**
 * Se crea de forma perezosa (no al importar el módulo) para que un .env con configuración SMTP
 * incompleta no impida arrancar el servidor: solo falla al primer envío real.
 */
function obtenerTransporter(): Transporter {
  if (transporter) return transporter;

  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '465', 10);
  const secure = process.env.SMTP_SECURE === 'true';
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;

  if (!host || !user || !pass) {
    throw new Error('Configuración SMTP incompleta: revisa SMTP_HOST, SMTP_USER y SMTP_PASS en el .env.');
  }

  transporter = nodemailer.createTransport({
    host,
    port,
    secure,
    auth: { user, pass },
    pool: true,
    maxConnections: 3,
    maxMessages: 50,
  });

  return transporter;
}

/** El NIS es opcional: no todo contacto es un usuario registrado en el padrón de suministro. */
function mostrarNis(nis: string): string {
  return nis.trim().length > 0 ? nis : 'No proporcionado';
}

function construirCuerpoTexto(datos: DatosContacto): string {
  return [
    'Nuevo mensaje del formulario de contacto de SOAPAP:',
    '',
    `Nombre: ${datos.name}`,
    `NIS: ${mostrarNis(datos.nis)}`,
    `Teléfono: ${datos.phone}`,
    `Correo: ${datos.email}`,
    `Dirección: ${datos.address}`,
    '',
    'Comentario:',
    datos.comment,
  ].join('\n');
}

function escaparHtml(valor: string): string {
  return valor
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function construirCuerpoHtml(datos: DatosContacto): string {
  return `
<!DOCTYPE html>
<html>
<body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333333; margin: 0; padding: 0;">
  <div style="width: 100%; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #dddddd; border-radius: 8px; background-color: #ffffff;">
    <h2 style="color: #0056b3; border-bottom: 2px solid #eeeeee; padding-bottom: 10px; margin-top: 0; margin-bottom: 20px;">Nuevo Mensaje de Contacto - Página Institucional</h2>

    <p style="margin-bottom: 10px;">Se ha recibido una nueva solicitud de contacto a través de la página web institucional con los siguientes detalles:</p>

    <p style="margin-bottom: 10px;"><strong style="color: #000000;">Nombre del Usuario:</strong> ${escaparHtml(datos.name)}</p>
    <p style="margin-bottom: 10px;"><strong style="color: #000000;">NIS:</strong> ${escaparHtml(mostrarNis(datos.nis))}</p>
    <p style="margin-bottom: 10px;"><strong style="color: #000000;">Teléfono:</strong> ${escaparHtml(datos.phone)}</p>
    <p style="margin-bottom: 10px;"><strong style="color: #000000;">Correo Electrónico:</strong> ${escaparHtml(datos.email)}</p>
    <p style="margin-bottom: 10px;"><strong style="color: #000000;">Dirección:</strong> ${escaparHtml(datos.address)}</p>

    <div style="background-color: #f9f9f9; border-left: 4px solid #0056b3; padding: 15px; margin-top: 20px; margin-bottom: 20px; font-style: italic;">
      <p style="margin-bottom: 10px;"><strong style="color: #000000; font-style: normal;">Comentarios del usuario:</strong></p>
      <p style="margin-bottom: 10px;">${escaparHtml(datos.comment).replace(/\n/g, '<br>')}</p>
    </div>

    <p style="margin-bottom: 10px;">Por favor, procesar esta solicitud a la brevedad posible.</p>

    <div style="margin-top: 30px; padding-top: 15px; border-top: 1px solid #eeeeee; font-size: 0.9em; color: #777777; text-align: center;">
      <small style="display: block;">Este es un mensaje automático, por favor no responder directamente a este correo.</small>
      <small style="display: block;">Generado por el Departamento de Informática</small>
      <small style="display: block;">Gerencia de Administración y Finanzas</small>
    </div>
  </div>
</body>
</html>
  `;
}

/**
 * No se usa replyTo: el correo es una notificación automática, no un canal de conversación.
 * El seguimiento al ciudadano se hace por teléfono o con los datos de contacto asociados a su NIS.
 */
export async function enviarCorreoContacto(datos: DatosContacto): Promise<void> {
  
  const destinatario = process.env.CONTACT_TO_EMAIL;
  if (!destinatario) {
    throw new Error('CONTACT_TO_EMAIL no está configurado.');
  }

  const t = obtenerTransporter();
  await t.sendMail({
    from: process.env.SMTP_USER,
    to: destinatario,
    subject: `Formulario de contacto - ${datos.name}`,
    text: construirCuerpoTexto(datos),
    html: construirCuerpoHtml(datos),
  });
}
