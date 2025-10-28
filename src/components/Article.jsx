import React, { useEffect, useRef } from 'react'
import analytics from '../analytics/analytics.js'
import { smoothScrollTo } from '../utils/scroll.js'

export default function Article() {
  const p1Ref = useRef(null)
  const p2Ref = useRef(null)
  const p3Ref = useRef(null)
  const p4Ref = useRef(null)
  const p5Ref = useRef(null)

  useEffect(() => {
    const seen = new Set()
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.getAttribute('data-id')
        if (entry.isIntersecting) {
          analytics.markSectionOpen(id)
          if (!seen.has(id)) {
            analytics.trackSectionOpen(id)
            seen.add(id)
          }
        } else {
          analytics.markSectionClose(id)
        }
      })
    }, { threshold: 0.6 })

    const els = [p1Ref.current, p2Ref.current, p3Ref.current, p4Ref.current, p5Ref.current].filter(Boolean)
    els.forEach(el => io.observe(el))
    return () => {
      els.forEach(el => io.unobserve(el))
      io.disconnect()
    }
  }, [])

  const goNext = (ref) => {
    if (ref?.current && ref.current.scrollIntoView) {
      ref.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
    } else if (ref?.current) {
      // fallback
      smoothScrollTo(ref.current, { duration: 600 })
    }
  }

  return (
    <>
      <section ref={p1Ref} data-id="p1" className="article__section article__section--one" data-fade>
        <div className="article__content">
          <p>
            Before you enter, you feel a difference at Hillman. The glass sparkles in the sunlight as you walk toward its entrance. Once inside, warm air wraps itself around you as though the building is exhaling. A smooth beam of sunlight flows over the long, low-slung tables as if the sun were shining directly on your face. Footsteps echo softly from students walking down the stairs, printers hum in the background, and the gentle whir of the air vent. It seems that the comfort comes naturally at first glance, but it does not. It has been thoughtfully created.
          </p>
          <div className="article__next"><button className="btn btn--arrow" aria-label="Next paragraph" onClick={() => goNext(p2Ref)}><span className="btn__chev">⌄</span></button></div>
        </div>
      </section>

      <section ref={p2Ref} data-id="p2" className="article__section article__section--two" data-fade>
        <div className="article__content">
          <p>
            I remember the old Hillman Library. Fluorescents hung from the ceiling, and it was a sterile, closed environment with an endless supply of beige. The renovation did far more than simply bring the building up to date; it changed the way the building interacts with its users. When no one is using the area, sensors automatically turn off the lights. The temperature in the building also seems to adjust according to the number of occupants. It is as if the air is aware of whether or not there are people in the space. This building appears to have learned to pay attention, to be responsive to those who use it.
          </p>
          <div className="article__next"><button className="btn btn--arrow" aria-label="Next paragraph" onClick={() => goNext(p3Ref)}><span className="btn__chev">⌄</span></button></div>
        </div>
      </section>

      <section ref={p3Ref} data-id="p3" className="article__section article__section--three" data-fade>
        <div className="article__content">
          <p>
            As I walked through the building, I couldn't help but think of Berry's belief that care starts with paying attention. The renovated Hillman Library appears to teach this lesson repeatedly. It rewards individuals for being slow. As I sit and study, I find myself noticing how the light shifts as I read, and how others have chosen seats near windows as opposed to outlets. The design of the library is encouraging individuals to develop positive behaviors without forcing them to do so; it creates nearly instinctual awareness.
          </p>
          <div className="article__next"><button className="btn btn--arrow" aria-label="Next paragraph" onClick={() => goNext(p4Ref)}><span className="btn__chev">⌄</span></button></div>
        </div>
      </section>

      <section ref={p4Ref} data-id="p4" className="article__section article__section--four" data-fade>
        <div className="article__content">
          <p>
            However, the building cannot do everything. I still leave my laptop plugged in all day, assuming that the energy-efficient aspects of Hillman will offset the consumption. Perhaps that is the biggest problem with modern sustainability - believing that advanced technologies can replace the mindfulness of the individual. While the library provides clean air and calming light, it cannot provide self-discipline.
          </p>
          <div className="article__next"><button className="btn btn--arrow" aria-label="Next paragraph" onClick={() => goNext(p5Ref)}><span className="btn__chev">⌄</span></button></div>
        </div>
      </section>

      <section ref={p5Ref} data-id="p5" className="article__section article__section--five" data-fade>
        <div className="article__content">
          <p>
            At nightfall, the skylight above the reading room glows golden. I look up, and the plants growing on the north wall appear to shimmer along with it. In many ways, the building appears to be alive, but not due to technological advancements. Rather, it is the result of attention given to the details of the building and its users. Hillman serves as a reminder that "progress" is not solely based upon invention, but rather it is based upon engagement by those involved.
          </p>
        </div>
      </section>
    </>
  )
}
