"use client";

/** Opens the RazaMind chat window from anywhere on the page. */
export function OpenChatButton() {
  return (
    <button
      type="button"
      className="text-link text-sm"
      onClick={() => window.dispatchEvent(new Event("razamind:open"))}
    >
      Ask RazaMind a question
    </button>
  );
}
