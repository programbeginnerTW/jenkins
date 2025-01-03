Behaviour.specify(
  ".jenkins-copy-button",
  "copyButton",
  0,
  function (copyButton) {
    // Check if the connection is secure by evaluating the protocol
    const isHttps = window.location.protocol === "https:";

    if (!isHttps) {
      copyButton.disabled = true;
      copyButton.title = "Copy doesn't work in insecure (HTTP) contexts";
      return;
    }


    // Enable the button
    copyButton.disabled = false;
    copyButton.title = "Click to copy the text";

    // Add click event listener
    copyButton.addEventListener("click", () => {
      let text = copyButton.getAttribute("text");

      // If the "ref" attribute is present, fetch the target element's text
      if (copyButton.hasAttribute("ref")) {
        const ref = copyButton.getAttribute("ref");
        const target = document.getElementById(ref);
        if (target) {
          text = target.innerText;
        }
      }

      // Copy the text to the clipboard
      navigator.clipboard
        .writeText(text)
        .then(() => {
          hoverNotification(copyButton.getAttribute("message") || "Copied!", copyButton);
        })
        .catch((err) => {
          console.error("Failed to copy text:", err);
          hoverNotification(
            "Could not get permission to write to clipboard",
            copyButton,
          );
        });
    });
  }
);