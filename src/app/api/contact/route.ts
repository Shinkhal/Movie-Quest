import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const { firstName, lastName, email, phoneNumber, message } = await request.json();

  try {
    // Example: Sending an email or storing data
    console.log('Received data:', { firstName, lastName, email, phoneNumber, message });

    // Dummy response simulating success
    return NextResponse.json({ message: 'Message sent successfully' }, { status: 200 });
  } catch (error: unknown) {
    // Type guard to check if error is an instance of Error
    if (error instanceof Error) {
      return NextResponse.json({ message: 'Failed to send message', error: error.message }, { status: 500 });
    } else {
      return NextResponse.json({ message: 'Failed to send message', error: 'An unknown error occurred' }, { status: 500 });
    }
  }
}
