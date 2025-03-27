import { client } from '@/lib/sanity.client';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const data = await client.fetch(`*[_type == "video"][0]{
      _id,
      title,
      description,
      videoFile{
        asset->{
          _ref,
          url
        }
      },
      poster{
        asset->{
          _ref
        }
      }
    }`);

    if (!data) {
      return NextResponse.json({ error: 'No video found' }, { status: 404 });
    }

    return NextResponse.json(data);
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch video' },
      { status: 500 }
    );
  }
}
