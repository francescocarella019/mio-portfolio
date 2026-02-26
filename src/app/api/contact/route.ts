import { NextResponse } from 'next/server';
import { Resend } from 'resend';

// Inizializza Resend (dovrai mettere la tua API KEY nel file .env.local)
const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    // 1. Legge il body inviato dal frontend
    const body = await request.json();
    const { nome, email, messaggio } = body;

    // 2. Validazione base lato server (sempre buona pratica per un Full Stack)
    if (!nome || !email || !messaggio) {
      return NextResponse.json(
        { error: 'Tutti i campi sono obbligatori' },
        { status: 400 }
      );
    }

    // 3. Invio della mail vera e propria
    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>', // Email di default di Resend per test
      to: 'francescocarella019@gmail.com', // INSERISCI LA TUA EMAIL QUI
      subject: `Nuovo messaggio dal portfolio da: ${nome}`,
      html: `
        <h3>Hai ricevuto un nuovo contatto!</h3>
        <p><strong>Nome:</strong> ${nome}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Messaggio:</strong><br/> ${messaggio}</p>
      `
    });

    // 4. Risposta di successo al frontend
    return NextResponse.json({ success: true, data });

  } catch (error) {
    console.error('Errore API Contatti:', error);
    return NextResponse.json(
      { error: 'Errore interno del server' },
      { status: 500 }
    );
  }
}