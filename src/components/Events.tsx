export function Events() {
  return (
    <section id="events">
      <div className="col">
        <div className="section-header">
          <span className="section-title">Upcoming Sessions</span>
          <span className="section-index">02</span>
        </div>
        <iframe
          src="https://luma.com/embed/calendar/cal-I7hIeu5c7EHZhDp/events"
          width="100%"
          height="450"
          frameBorder={0}
          style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          allowFullScreen
          aria-hidden={false}
          tabIndex={0}
          title="Upcoming sessions"
        />
      </div>
    </section>
  );
}
