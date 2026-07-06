type NavProps = {
  onSubscribe: () => void;
};

export function Nav({ onSubscribe }: NavProps) {
  return (
    <nav>
      <div className="col">
        <a href="#" className="wordmark">
          Outlier<span>&nbsp;Labs</span>
        </a>
        <button type="button" className="nav-link" onClick={onSubscribe}>
          Subscribe
        </button>
      </div>
    </nav>
  );
}
