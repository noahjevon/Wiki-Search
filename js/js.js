var selected_text;

chrome.tabs.executeScript( {
    code: "window.getSelection().toString();" // Get selection to string
}, function(selection) {
    document.getElementById("selected").innerHTML = "Selected Text: " + selection[0].italics(); // Update selected text with user highlighted text
    selected_text = selection[0]; // Set variable 'selected_text' to selected string
});

document.getElementById("button").addEventListener("click", searchWiki); // Call searchWiki function when button is pressed

function searchWiki() {
    const searchWiki = async search => {
        const response = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${search}`) // Call API with selected word
        return await response.json(); // Return API response
      }
      
      searchWiki(selected_text).then(data => {
        var JSONString = JSON.stringify(Object.values(data.query.pages)[0].extract); // Stringify the JSON response from API
        var formattedJSONString = JSONString.replace(/\\n/g, '<br>') // Replace new lines with actual new lines
                                              .replace(/\\"/g, ''); // Replace italics with white space (Will need to figure out how to add italics later)

          document.getElementById("contents").innerHTML = formattedJSONString; // Update the "contents" div with the formatted JSON string
      });
}
