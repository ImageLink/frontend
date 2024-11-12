import { NextResponse } from 'next/server';
import dbConnect from '@/lib/db';
import Message from '@/lib/db/models/Message';
import { sendEmail } from '@/lib/email';

export async function GET() {
  try {
    await dbConnect();
    const messages = await Message.find()
      .populate('senderId', 'username email')
      .populate('receiverId', 'username email')
      .sort({ createdAt: -1 });
    return NextResponse.json({ messages });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { messageId, content } = await req.json();
    await dbConnect();

    const message = await Message.findByIdAndUpdate(
      messageId,
      {
        $push: { replies: { content, date: new Date() } },
        status: 'replied',
      },
      { new: true }
    ).populate('senderId', 'email');

    if (!message) {
      return NextResponse.json(
        { error: 'Message not found' },
        { status: 404 }
      );
    }

    // Send email notification
    await sendEmail({
      to: message.senderId.email,
      subject: 'New Reply to Your Message',
      html: `You have received a reply to your message: ${content}`,
    });

    return NextResponse.json({ message });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}