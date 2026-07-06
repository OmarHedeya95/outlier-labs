export function Events() {
  return (
    <section id="events">
      <div className="col">
        <div className="section-header">
          <span className="section-title">Upcoming Sessions</span>
          <span className="section-index">02</span>
        </div>
        <iframe
          src="https://luma.com/embed/event/8s7bis68/simple"
          width="100%"
          height="450"
          frameBorder={0}
          style={{ border: "1px solid var(--border)", background: "var(--surface)" }}
          allowFullScreen
          aria-hidden={false}
          tabIndex={0}
          title="No Backprop — Outlier Labs"
        />
      </div>
    </section>
  );
}
