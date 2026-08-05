export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Coride',
    url: 'https://coride.org',
    logo: 'https://coride.org/assets/coride-logo.png',
    description:
      'Verified workplace carpooling that gets co-workers to work together and rewards drivers and passengers with perks from local businesses.',
    sameAs: [
      'https://www.linkedin.com/company/corideapp',
      'https://www.instagram.com/corideapp',
      'https://x.com/corideapp',
      'https://www.facebook.com/corideapp',
      'https://www.tiktok.com/@corideapp',
    ],
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
