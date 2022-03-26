// Initialize button with user's preferred color
const toggleBtn = document.getElementById("toggleBtn");

// Listen for the extension menu "Enable Theme" button click
toggleBtn.addEventListener("click", async () => {
  let [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    function: toggleTheme,
  });
});

async function toggleTheme() {
  let css;

  // Check if the theme css is present
  let element =  document.getElementById('DiscordTheme');
  if (typeof(element) != 'undefined' && element != null) {
    // If theme is present, remove it
    let head = document.getElementsByTagName('head')[0];
    head.removeChild(head.lastChild);

    console.log("Discord Theme Disabled");
  } else {
    // If theme is not present, add it

    // Get theme css from gist
    let url = "https://gist.githubusercontent.com/hanniabu/b4900faca40890ab29d73fdeaf518d98/raw/230b4188416abeadfa14d09403e2cd687d5fecbd/custom-nifty-chat.html";
    const [response] = await Promise.all([
      fetch(url)
    ]);
    css = await response.text();

    // Append theme css to head
    let head = document.getElementsByTagName('head')[0];
    let s = document.createElement('style');
    s.setAttribute('type', 'text/css');
    s.setAttribute('id', 'DiscordTheme');
    s.appendChild(document.createTextNode(css));
    head.appendChild(s);

    let widget = document.getElementsById("twitter-widget-0")
    let widgetCSS = "<style>.timeline-Widget{background-color:green!important;";
    var s2 = document.createElement('style');
    s2.setAttribute('type', 'text/css');
    s2.appendChild(document.createTextNode(widgetCSS));
    widgetCSS.appendChild(s2);

    console.log("Discord Theme Enabled");
  }
}









