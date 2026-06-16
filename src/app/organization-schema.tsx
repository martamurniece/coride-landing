export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Coride',
    url: 'https://coride.org',
    logo: 'https://coride.org/assets/coride-logo.png',
    description:
      'Employer-backed shared commuting that gets coworkers to work together and rewards both the drivers and passengers.',
  }
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  )
}
