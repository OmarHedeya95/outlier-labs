type SubscribeSectionProps = {
  onSubscribe: () => void;
};

export function SubscribeSection({ onSubscribe }: SubscribeSectionProps) {
  return (
    <section id="subscribe">
      <div className="col">
        <div className="section-header">
          <span className="section-title">Stay in the loop</span>
          <span className="section-index">04</span>
        </div>
        <div className="subscribe-wrap">
          <p className="subscribe-copy">
            Get notified when new editions are announced and register for
            upcoming sessions.
          </p>
          <button type="button" className="subscribe-btn" onClick={onSubscribe}>
            Subscribe ↗
          </button>
        </div>
      </div>
    </section>
  );
}
