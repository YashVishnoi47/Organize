import { getEventById } from '@/lib/actions/events.actions'
import React from 'react'

const EventPage = async ({params: {id}}) => {
    const event = await getEventById(id)
  return (
    <div>
      <div> {event.title}</div>
    </div>
  )
}

export default EventPage
