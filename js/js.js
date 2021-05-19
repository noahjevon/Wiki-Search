var selected_text;

chrome.tabs.executeScript( {
    code: "window.getSelection().toString();"
}, function(selection) {
    document.getElementById("selected").innerHTML = "Selected Text: " + selection[0];
    selected_text = selection[0];
});

document.getElementById("button").addEventListener("click", searchWiki);

// function searchWiki() {
//         fetch("https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=" + selected_text).then(function(resp) {
//         return resp.json()
//     }).then(function(data) {
//     document.getElementById("contents").innerHTML = (JSON.stringify(data.extract));
//     })
// }

// const searchWiki = async search => {
//   const response = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${search}`)
//   if(!response.ok) return false;
//   return await response.json();
// }

// searchWiki("banana").then(data => {
//   document.body.textContent = data.extract;
// });

function searchWiki() {
    const searchWiki = async search => {
        const response = await fetch(`https://en.wikipedia.org/w/api.php?format=json&action=query&prop=extracts&exintro&explaintext&redirects=1&titles=${search}`)
        return await response.json();
      }
      
      searchWiki(selected_text).then(data => {
        document.getElementById("contents").innerHTML = (JSON.stringify(Object.values(data.query.pages)[0].extract));
      });
}
