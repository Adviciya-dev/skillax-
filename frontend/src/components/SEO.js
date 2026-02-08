import React from 'react';
import { Helmet } from 'react-helmet-async';

const defaultMeta = {
  title: 'Skillax Digital Marketing Academy | Mananthavady, Kerala',
  description: 'Kerala\'s #1 AI-powered digital marketing academy. Learn SEO, AEO, GEO, GMB, Google Ads, Meta Ads, ChatGPT Ads, 30+ AI tools with guaranteed Infopark internship.',
  keywords: 'digital marketing course kerala, digital marketing training wayanad, seo course mananthavady, google ads certification, ai marketing course, infopark internship',
  image: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200',
  url: 'https://skillax.in',
};

export default function SEO({ 
  title, 
  description, 
  keywords,
  image,
  url,
  type = 'website',
  schema
}) {
  const meta = {
    title: title ? `${title} | Skillax Academy` : defaultMeta.title,
    description: description || defaultMeta.description,
    keywords: keywords || defaultMeta.keywords,
    image: image || defaultMeta.image,
    url: url || defaultMeta.url,
  };

  const defaultSchema = {
    "@context": "https://schema.org",
    "@type": "EducationalOrganization",
    "name": "Skillax Digital Marketing Academy",
    "description": meta.description,
    "url": meta.url,
    "logo": "https://skillax.in/logo.png",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Mananthavady",
      "addressLocality": "Wayanad",
      "addressRegion": "Kerala",
      "postalCode": "670645",
      "addressCountry": "IN"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-9876543210",
      "contactType": "admissions",
      "availableLanguage": ["en", "ml"]
    },
    "sameAs": [
      "https://facebook.com/skillaxacademy",
      "https://instagram.com/skillaxacademy",
      "https://linkedin.com/company/skillax"
    ]
  };

  return (
    <Helmet>
      {/* Primary Meta Tags */}
      <title>{meta.title}</title>
      <meta name="title" content={meta.title} />
      <meta name="description" content={meta.description} />
      <meta name="keywords" content={meta.keywords} />
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={meta.url} />
      <meta property="og:title" content={meta.title} />
      <meta property="og:description" content={meta.description} />
      <meta property="og:image" content={meta.image} />
      
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={meta.url} />
      <meta property="twitter:title" content={meta.title} />
      <meta property="twitter:description" content={meta.description} />
      <meta property="twitter:image" content={meta.image} />
      
      {/* Canonical URL */}
      <link rel="canonical" href={meta.url} />
      
      {/* JSON-LD Schema */}
      <script type="application/ld+json">
        {JSON.stringify(schema || defaultSchema)}
      </script>
    </Helmet>
  );
}

// Page-specific schemas
export const courseSchema = (course) => ({
  "@context": "https://schema.org",
  "@type": "Course",
  "name": course.title,
  "description": course.description,
  "provider": {
    "@type": "Organization",
    "name": "Skillax Digital Marketing Academy",
    "sameAs": "https://skillax.in"
  },
  "hasCourseInstance": {
    "@type": "CourseInstance",
    "courseMode": "onsite",
    "duration": course.duration,
    "instructor": {
      "@type": "Person",
      "name": "Skillax Expert Faculty"
    }
  }
});

export const blogSchema = (blog) => ({
  "@context": "https://schema.org",
  "@type": "BlogPosting",
  "headline": blog.title,
  "description": blog.excerpt,
  "image": blog.featured_image,
  "author": {
    "@type": "Person",
    "name": blog.author
  },
  "publisher": {
    "@type": "Organization",
    "name": "Skillax Digital Marketing Academy",
    "logo": {
      "@type": "ImageObject",
      "url": "https://skillax.in/logo.png"
    }
  },
  "datePublished": blog.created_at,
  "dateModified": blog.updated_at
});

export const faqSchema = (faqs) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": faqs.map(faq => ({
    "@type": "Question",
    "name": faq.q,
    "acceptedAnswer": {
      "@type": "Answer",
      "text": faq.a
    }
  }))
});
