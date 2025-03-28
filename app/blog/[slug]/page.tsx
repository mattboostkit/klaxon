import { client } from '@/lib/sanity';
import Image from 'next/image';
import { urlFor } from '@/lib/sanity';
import { PortableText } from '@portabletext/react';
import { format } from 'date-fns';
import type { Metadata } from 'next';

export async function generateMetadata({
  params
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt,
      "author": author->name,
      mainImage
    }`,
    { slug }
  );

  if (!post) {
    return {
      title: 'Post Not Found | Klaxon Studio',
      description: 'The requested post could not be found.',
    };
  }

  return {
    title: `${post.title} | Klaxon Studio Blog`,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: 'article',
      images: [
        {
          url: urlFor(post.mainImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
  };
}

export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post" && defined(slug.current)][].slug.current`);
  
  return posts.map((slug: string) => ({
    slug,
  }));
}

const components = {
  types: {
    image: ({ value }: any) => (
      <div className="my-8 relative w-full h-96">
        <Image
          src={urlFor(value).url()}
          alt={value.alt || ''}
          fill
          className="object-cover rounded-lg"
          sizes="(max-width: 768px) 100vw, 800px"
        />
      </div>
    ),
    code: ({ value }: any) => (
      <pre className="bg-klaxon-black p-4 rounded-lg overflow-x-auto my-6">
        <code className="text-klaxon-white text-sm">{value.code}</code>
      </pre>
    ),
  },
  block: {
    h1: ({ children }: any) => <h1 className="text-3xl md:text-4xl font-bold mt-12 mb-4 text-klaxon-white">{children}</h1>,
    h2: ({ children }: any) => <h2 className="text-2xl md:text-3xl font-bold mt-10 mb-4 text-klaxon-white">{children}</h2>,
    h3: ({ children }: any) => <h3 className="text-xl md:text-2xl font-bold mt-8 mb-4 text-klaxon-white">{children}</h3>,
    h4: ({ children }: any) => <h4 className="text-lg md:text-xl font-bold mt-6 mb-4 text-klaxon-white">{children}</h4>,
    blockquote: ({ children }: any) => (
      <blockquote className="border-l-4 border-klaxon-accent pl-4 italic my-6 text-klaxon-white text-opacity-80">
        {children}
      </blockquote>
    ),
    normal: ({ children }: any) => <p className="text-klaxon-white text-opacity-80 my-4 leading-relaxed">{children}</p>,
  },
  marks: {
    link: ({ children, value }: any) => (
      <a 
        href={value.href} 
        className="text-klaxon-accent hover:underline"
        target="_blank" 
        rel="noopener noreferrer"
      >
        {children}
      </a>
    ),
    strong: ({ children }: any) => <strong className="font-bold">{children}</strong>,
    em: ({ children }: any) => <em className="italic">{children}</em>,
    code: ({ children }: any) => (
      <code className="bg-klaxon-gray px-1 py-0.5 rounded text-sm">{children}</code>
    ),
  },
};

export default async function BlogPost({
  params
}: {
  params: Promise<{ slug: string }>
}) {
  // Extract slug from params Promise
  const { slug } = await params;
  
  const post = await client.fetch(
    `*[_type == "post" && slug.current == $slug][0]{
      title,
      excerpt,
      body,
      mainImage,
      publishedAt,
      "author": author->name,
      "authorSlug": author->slug.current,
      "categories": categories[]->title,
      "estimatedReadingTime": round(length(pt::text(body)) / 5 / 180)
    }`,
    { slug }
  );

  if (!post) {
    return (
      <div className="container mx-auto px-6 py-32">
        <h1 className="text-3xl font-bold text-center text-klaxon-white">Post not found</h1>
        <p className="text-center text-klaxon-white text-opacity-70 mt-4">
          The post you&apos;re looking for does not exist or has been removed.
        </p>
      </div>
    );
  }

  // Fetch related posts based on categories
  const relatedPosts = await client.fetch(
    `*[_type == "post" && slug.current != $slug && count((categories[]->title)[@ in $categories]) > 0][0...3]{
      title,
      excerpt,
      slug,
      mainImage,
      publishedAt,
      "categories": categories[]->title
    }`,
    { 
      slug,
      categories: post.categories
    }
  );

  return (
    <div className="pt-20 pb-16 bg-klaxon-black">
      <div className="container mx-auto px-6">
        <div className="max-w-3xl mx-auto">
          {/* Hero Section */}
          <div className="mb-10">
            <div className="flex items-center space-x-2 mb-4">
              {post.categories.map((category: string, index: number) => (
                <span 
                  key={index}
                  className="text-sm text-klaxon-accent bg-klaxon-accent bg-opacity-10 px-3 py-1 rounded-full"
                >
                  {category}
                </span>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-klaxon-white mb-6">
              {post.title}
            </h1>
            
            <div className="flex items-center text-klaxon-white text-opacity-70 mb-8">
              <div className="w-10 h-10 rounded-full bg-klaxon-accent flex items-center justify-center text-klaxon-white font-semibold text-sm mr-3">
                {post.author.split(' ').map((name: string) => name[0]).join('')}
              </div>
              <div>
                <p className="font-medium text-klaxon-white">{post.author}</p>
                <div className="flex items-center text-sm">
                  <span>{format(new Date(post.publishedAt), 'MMMM d, yyyy')}</span>
                  <span className="mx-2">•</span>
                  <span>{post.estimatedReadingTime} min read</span>
                </div>
              </div>
            </div>
          </div>
          
          {/* Main Image */}
          <div className="relative w-full h-[400px] mb-10">
            <Image
              src={urlFor(post.mainImage).width(1200).height(675).url()}
              alt={post.title}
              fill
              className="object-cover rounded-lg"
              sizes="(max-width: 768px) 100vw, 800px"
              priority
            />
          </div>
          
          {/* Article Body */}
          <article className="prose prose-lg max-w-none">
            <PortableText value={post.body} components={components} />
          </article>
          
          {/* Author Bio */}
          <div className="mt-16 p-6 bg-klaxon-gray rounded-lg">
            <div className="flex items-start">
              <div className="w-12 h-12 rounded-full bg-klaxon-accent flex items-center justify-center text-klaxon-white font-semibold text-lg mr-4">
                {post.author.split(' ').map((name: string) => name[0]).join('')}
              </div>
              <div>
                <h3 className="text-xl font-bold text-klaxon-white">
                  Written by {post.author}
                </h3>
                <p className="text-klaxon-white text-opacity-80 mt-2">
                  A passionate video production expert with years of experience in the industry.
                </p>
              </div>
            </div>
          </div>
          
          {/* Related Posts */}
          {relatedPosts.length > 0 && (
            <div className="mt-16">
              <h2 className="text-2xl font-bold text-klaxon-white mb-6">Related Articles</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {relatedPosts.map((related: any) => (
                  <a 
                    key={related.slug.current}
                    href={`/blog/${related.slug.current}`}
                    className="block bg-klaxon-gray rounded-lg overflow-hidden group"
                  >
                    <div className="relative h-48">
                      <Image
                        src={urlFor(related.mainImage).width(600).height(400).url()}
                        alt={related.title}
                        fill
                        className="object-cover transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, 50vw"
                      />
                    </div>
                    <div className="p-4">
                      <h3 className="font-semibold text-klaxon-white group-hover:text-klaxon-accent transition-colors text-lg mb-2">
                        {related.title}
                      </h3>
                      <p className="text-klaxon-white text-opacity-70 text-sm line-clamp-2">
                        {related.excerpt}
                      </p>
                    </div>
                  </a>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
