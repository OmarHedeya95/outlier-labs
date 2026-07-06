import { FormEvent, useEffect, useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

type SubscribeModalProps = {
  open: boolean;
  onClose: () => void;
};

export function SubscribeModal({ open, onClose }: SubscribeModalProps) {
  const subscribe = useMutation(api.subscribers.subscribe);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }

    document.addEventListener("keydown", onKeyDown);
    return () => document.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  useEffect(() => {
    if (open) {
      setSuccess(false);
      setError("");
    }
  }, [open]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    const form = e.currentTarget;
    const name = (form.elements.namedItem("name") as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem("email") as HTMLInputElement).value.trim();
    if (!name || !email) return;

    setSubmitting(true);
    try {
      await subscribe({ name, email });
      setSuccess(true);
      window.setTimeout(onClose, 2800);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  if (!open) return null;

  return (
    <div
      id="subscribe-modal"
      className="open"
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-title"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div className="modal-box">
        <button
          type="button"
          className="modal-close"
          id="modal-close"
          aria-label="Close"
          onClick={onClose}
        >
          ✕
        </button>

        {!success ? (
          <div id="modal-form-wrap">
            <p className="modal-title" id="modal-title">
              Stay in the loop
            </p>
            <p className="modal-sub">Get notified when new editions are announced.</p>
            <form id="subscribe-form" noValidate onSubmit={handleSubmit}>
              <div className="modal-field">
                <label htmlFor="sub-name">Name</label>
                <input
                  id="sub-name"
                  name="name"
                  type="text"
                  placeholder="Your name"
                  required
                />
              </div>
              <div className="modal-field">
                <label htmlFor="sub-email">Email</label>
                <input
                  id="sub-email"
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  required
                />
              </div>
              <button type="submit" className="modal-submit" disabled={submitting}>
                Subscribe ↗
              </button>
              {error ? (
                <p className="modal-error visible" id="modal-error" role="alert">
                  {error}
                </p>
              ) : null}
            </form>
          </div>
        ) : (
          <div className="modal-success" id="modal-success" style={{ display: "block" }}>
            <p>
              <span className="accent">You&apos;re in.</span>
              <br />
              We&apos;ll be in touch when the next edition drops.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
