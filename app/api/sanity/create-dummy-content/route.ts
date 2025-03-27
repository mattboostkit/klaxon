import { NextResponse } from 'next/server';
import { adminClient } from '@/lib/sanity.admin';

export async function GET() {
  try {
    // First, let's create an author
    const author = {
      _type: 'author',
      name: 'Alex Rodriguez',
      slug: {
        _type: 'slug',
        current: 'alex-rodriguez'
      },
      bio: [
        {
          _type: 'block',
          style: 'normal',
          _key: 'bio1',
          children: [
            {
              _type: 'span',
              _key: 'span1',
              text: 'Alex is a senior video producer with over 10 years of experience in the industry.'
            }
          ],
          markDefs: []
        }
      ]
    };

    const createdAuthor = await adminClient.create(author);

    // Create categories
    const categories = [
      {
        _type: 'category',
        title: 'Video Production',
        slug: {
          _type: 'slug',
          current: 'video-production'
        },
        description: 'All about video production techniques and processes'
      },
      {
        _type: 'category',
        title: 'Storytelling',
        slug: {
          _type: 'slug',
          current: 'storytelling'
        },
        description: 'Tips and tricks for effective storytelling in videos'
      },
      {
        _type: 'category',
        title: 'Video Editing',
        slug: {
          _type: 'slug',
          current: 'video-editing'
        },
        description: 'Everything related to video editing technologies and techniques'
      },
      {
        _type: 'category',
        title: 'Sound Design',
        slug: {
          _type: 'slug',
          current: 'sound-design'
        },
        description: 'The art and science of sound in video production'
      }
    ];

    const createdCategories = await Promise.all(
      categories.map(category => adminClient.create(category))
    );

    // Create blog posts without image references to avoid permission issues
    const posts = [
      {
        _type: 'post',
        title: 'The Art of Visual Storytelling in Video Production',
        slug: {
          _type: 'slug',
          current: 'visual-storytelling-video-production'
        },
        excerpt: 'Explore how visual storytelling techniques can elevate your video content and captivate your audience.',
        publishedAt: new Date().toISOString(),
        body: [
          {
            _type: 'block',
            style: 'normal',
            _key: 'intro',
            children: [
              {
                _type: 'span',
                _key: 'span1',
                text: 'In the world of video production, storytelling is everything. It\'s not just about capturing beautiful shots, but about weaving those visuals into a compelling narrative that resonates with your audience.'
              }
            ],
            markDefs: []
          },
          {
            _type: 'block',
            style: 'h2',
            _key: 'heading1',
            children: [
              {
                _type: 'span',
                _key: 'span2',
                text: 'Why Visual Storytelling Matters'
              }
            ],
            markDefs: []
          },
          {
            _type: 'block',
            style: 'normal',
            _key: 'paragraph1',
            children: [
              {
                _type: 'span',
                _key: 'span3',
                text: 'Visual storytelling is the art of communicating a narrative through imagery, composition, and editing. It\'s what separates a random collection of shots from a cohesive story that moves people. When done right, visual storytelling creates an emotional connection with viewers that can influence their thoughts, feelings, and actions.'
              }
            ],
            markDefs: []
          }
        ],
        author: {
          _type: 'reference',
          _ref: createdAuthor._id
        },
        categories: [
          {
            _type: 'reference',
            _ref: createdCategories[0]._id // Video Production
          },
          {
            _type: 'reference',
            _ref: createdCategories[1]._id // Storytelling
          }
        ]
      },
      {
        _type: 'post',
        title: 'Top 5 Video Editing Trends in 2025',
        slug: {
          _type: 'slug',
          current: 'video-editing-trends-2025'
        },
        excerpt: 'Stay ahead of the curve with the latest video editing trends that are shaping the future of video production.',
        publishedAt: new Date().toISOString(),
        body: [
          {
            _type: 'block',
            style: 'normal',
            _key: 'intro',
            children: [
              {
                _type: 'span',
                _key: 'span1',
                text: 'The world of video editing is constantly evolving, with new technologies and techniques emerging every year. As we move into 2025, several editing trends are reshaping how we approach video production.'
              }
            ],
            markDefs: []
          },
          {
            _type: 'block',
            style: 'h2',
            _key: 'heading1',
            children: [
              {
                _type: 'span',
                _key: 'span2',
                text: '1. AI-Assisted Editing'
              }
            ],
            markDefs: []
          },
          {
            _type: 'block',
            style: 'normal',
            _key: 'paragraph1',
            children: [
              {
                _type: 'span',
                _key: 'span3',
                text: 'Artificial intelligence has revolutionized the editing process, automating time-consuming tasks like color correction, audio enhancement, and even content-aware editing. In 2025, we\'re seeing more sophisticated AI tools that can analyze footage and suggest edits based on storytelling principles.'
              }
            ],
            markDefs: []
          }
        ],
        author: {
          _type: 'reference',
          _ref: createdAuthor._id
        },
        categories: [
          {
            _type: 'reference',
            _ref: createdCategories[0]._id // Video Production
          },
          {
            _type: 'reference',
            _ref: createdCategories[2]._id // Video Editing
          }
        ]
      },
      {
        _type: 'post',
        title: 'The Importance of Sound Design in Video Production',
        slug: {
          _type: 'slug',
          current: 'sound-design-video-production'
        },
        excerpt: 'Discover how sound design can enhance the emotional impact of your videos and create a more immersive viewing experience.',
        publishedAt: new Date().toISOString(),
        body: [
          {
            _type: 'block',
            style: 'normal',
            _key: 'intro',
            children: [
              {
                _type: 'span',
                _key: 'span1',
                text: 'When we think about video production, visuals often steal the spotlight. However, sound design is just as crucial to creating an immersive and emotionally resonant experience for your audience.'
              }
            ],
            markDefs: []
          },
          {
            _type: 'block',
            style: 'h2',
            _key: 'heading1',
            children: [
              {
                _type: 'span',
                _key: 'span2',
                text: 'The Power of Sound'
              }
            ],
            markDefs: []
          },
          {
            _type: 'block',
            style: 'normal',
            _key: 'paragraph1',
            children: [
              {
                _type: 'span',
                _key: 'span3',
                text: 'Sound can evoke emotions in ways that visuals alone cannot. The right music, sound effects, and ambient noise can transport viewers to different worlds, enhance dramatic moments, and guide the emotional journey of your story.'
              }
            ],
            markDefs: []
          }
        ],
        author: {
          _type: 'reference',
          _ref: createdAuthor._id
        },
        categories: [
          {
            _type: 'reference',
            _ref: createdCategories[0]._id // Video Production
          },
          {
            _type: 'reference',
            _ref: createdCategories[3]._id // Sound Design
          }
        ]
      }
    ];

    // Create posts
    const createdPosts = await Promise.all(
      posts.map(post => adminClient.create(post))
    );

    return NextResponse.json({
      message: 'Dummy content created successfully',
      author: createdAuthor._id,
      categories: createdCategories.map(cat => cat._id),
      posts: createdPosts.map(post => post._id)
    });
  } catch (error) {
    console.error('Error creating dummy content:', error);
    return NextResponse.json(
      { message: 'Error creating dummy content', error: (error as Error).message },
      { status: 500 }
    );
  }
}
