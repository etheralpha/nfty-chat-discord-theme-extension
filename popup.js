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
    let url = "https://gist.githubusercontent.com/hanniabu/b4900faca40890ab29d73fdeaf518d98/raw";
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

    // Close twitter feed
    document.getElementsByClassName('topbar__twitter')[0].click();
    // Open the members sidebar
    document.getElementsByClassName('topbar__indicators--members')[0].click();

    console.log("Discord Theme Enabled");
  }
}









