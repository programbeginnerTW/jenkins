Behaviour.specify(
  ".jenkins-copy-button",
  "copyButton",
  0,
  function (copyButton) {
    // Check if the context is secure
    if (!isSecureContext) {
      console.log("Disabling the button because the connection is insecure.");

      // Disable the button and add a hover notification
      copyButton.disabled = true;
      copyButton.title = "Copy is only supported with a secure (HTTPS) connection";

      // Add a hover notification when the button is disabled
      copyButton.addEventListener("mouseenter", () => {
        hoverNotification(
          "Copy doesn't work in insecure (HTTP) contexts. Please use HTTPS.",
          copyButton
        );
      });

      return;
    }

    console.log("Enabling the button because the connection is secure.");

    // If secure, enable the button and set up the click handler
    copyButton.disabled = false;
    copyButton.addEventListener("click", () => {
      let text = copyButton.getAttribute("text");

      // If the button has a "ref" attribute, fetch the target element's text
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
          // Show a success message
          hoverNotification(copyButton.getAttribute("message") || "Copied!", copyButton);
        })
        .catch(() => {
          // Show an error message if the copy fails
          hoverNotification(
            "Could not get permission to write to clipboard",
            copyButton
          );
        });
    });
  }
);