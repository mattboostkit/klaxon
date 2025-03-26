import { revalidatePath } from 'next/cache';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const { path, token } = await request.json();
    
    // Simple token check - in production, use a more secure method
    const expectedToken = process.env.REVALIDATE_TOKEN;
    
    if (!token || token !== expectedToken) {
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }
    
    if (!path) {
      return NextResponse.json({ message: 'Path is required' }, { status: 400 });
    }
    
    revalidatePath(path);
    
    return NextResponse.json({ revalidated: true, path });
  } catch (error) {
    console.error('Error revalidating:', error);
    return NextResponse.json(
      { message: 'Error revalidating', error: (error as Error).message },
      { status: 500 }
    );
  }
}