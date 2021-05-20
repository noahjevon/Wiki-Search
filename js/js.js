var selected_text;

chrome.tabs.executeScript( {
    code: "window.getSelection().toString();" // Get selection to string
}, function(selection) {
    document.getElementById("selected").innerHTML = "Selected Text: " + selection[0].italics(); // Update selected text with user highlighted text
    selected_text = selection[0]; // Set variable 'selected_text' to selected string
});

document.getElementById("button").addEventListener("click", searchWiki); // Call searchWiki function when button is pressed to display wiki summary
document.getElementById("wiki").addEventListener("click", loadWiki); // Call loadWIki function when button is pressed to go to wiki page

function searchWiki() {
    const searchWiki = async search => {
        const response = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${search}`) // Call API with selected word
        return await response.json(); // Return API response
      }
      
      searchWiki(selected_text).then(data => {
        var JSONString = JSON.stringify(Object.values(data.query.pages)[0].extract); // Stringify the JSON response from API
        var formattedJSONString = JSONString.replace(/\\n/g, '<br>') // Replace new lines with actual new lines
                                              .replace(/\\"/g, ''); // Replace italics with white space (Will need to figure out how to add italics later)

          document.getElementById("contents").innerHTML = formattedJSONString + '<br> <br>'; // Update the "contents" div with the formatted JSON string
          document.getElementById("wiki").style.display = ""; // Show 'read more' button
      });
}

function loadWiki() { // Open the relevant wikipedia page in a new tab
  chrome.tabs.create({'url': 'https://en.wikipedia.org/wiki/' + selected_text}, function(tab) {
  });
}
