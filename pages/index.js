import { getFeaturedEvents } from '../helpers/events-api'
import EventList from '../components/events/event-list'
import NewsletterRegistration from '../components/input/newsletter-registration'

function HomePage({ featuredEvents }) {
  return (
    <div>
      <NewsletterRegistration />
      <EventList items={featuredEvents} />
    </div>
  )
}

export default HomePage

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents()

  return {
    props: { featuredEvents },
  }
}
