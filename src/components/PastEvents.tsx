const pastEventSlugs = ["8s7bis68", "4acss683", "2khmpnqp"];

export function PastEvents() {
  return (
    <section id="past-events">
      <div className="col">
        <div className="section-header">
          <span className="section-title">Past Sessions</span>
          <span className="section-index">03</span>
        </div>
        <div className="past-events">
          {pastEventSlugs.map((slug) => (
            <iframe
              key={slug}
              src={`https://luma.com/embed/event/${slug}/simple`}
              width="100%"
              height="450"
              frameBorder={0}
              style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
              allowFullScreen
              aria-hidden={false}
              tabIndex={0}
              title="Past session"
            />
          ))}
        </div>
      </div>
    </section>
  );
}
