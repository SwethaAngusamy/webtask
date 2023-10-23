function allowDrop(event) {
    event.preventDefault();
  }

  function drag(event, element) {
    event.dataTransfer.setData("text/plain", element);
  }
  
 
  function drop(event) {
    event.preventDefault();
    const element = event.dataTransfer.getData("text");
    const formPreview = document.getElementById("preview-form");
  
    if (element === "Layout") {
      const layoutDiv = document.createElement("div");
      layoutDiv.className = "layout";
      layoutDiv.setAttribute("draggable", "true");
      layoutDiv.setAttribute("ondragstart", "drag(event, 'Layout')");
      layoutDiv.ondrop = function (event) {
        splitFormPreview();
        event.preventDefault();
      };
      formPreview.appendChild(layoutDiv);
    } else if (element === "Label") {
        
      const label = document.createElement("label");
      label.innerText = "Label Text:";
      const input = document.createElement("input");
      input.type = "text";
      label.classList.add("draggable-label");
      formPreview.appendChild(label);
      formPreview.appendChild(input);
    } else if (element === "Text Box") {
      const textBox = document.createElement("input");
      textBox.type = "text";
      formPreview.appendChild(textBox);
    } else if (element === "Button") {
      const button = document.createElement("button");
      button.innerText = "Button";
      formPreview.appendChild(button);
    } else if (element === "Check Box") {
      const checkbox = document.createElement("input");
      checkbox.type = "checkbox";
      formPreview.appendChild(checkbox);
      const label = document.createElement("label");
      label.innerText = "Check Box Label";
      formPreview.appendChild(label);
    } else if (element === "Radio Button") {
      const radio = document.createElement("input");
      radio.type = "radio";
      formPreview.appendChild(radio);
      const label = document.createElement("label");
      label.innerText = "Radio Button Label";
      formPreview.appendChild(label);
    } else if (element === "Table") {
    } else if (element === "Navigation") {
      const link = document.createElement("a");
      link.href = "#";
      link.innerText = "Navigation Link";
      formPreview.appendChild(link);
    } else if (element === "Image") {
      const image = document.createElement("img");
      image.src = "path_to_your_image.jpg";
      formPreview.appendChild(image);
    }
  }
  function reloadPage() {
    window.location.reload();
  }
  function loadPreview() {
    const formPreview = document.getElementById("form-preview");
    const previewContent = formPreview.innerHTML;
    const newTab = window.open();
    newTab.document.open();
    newTab.document.write("<html><head><title>Form Preview</title></head><body>");
    newTab.document.write('<div id="preview-content">');
    newTab.document.write(previewContent);
    newTab.document.write("</div></body></html>");
    newTab.document.close();
  }
  function saveAsJSONorCSV(data, fileName, format) {
    // Check if the data is an array of objects
    if (!Array.isArray(data) || data.length === 0 || typeof data[0] !== 'object') {
        console.error('Invalid data format. Please provide an array of objects.');
        return;
    }

    let content;
    if (format === 'json') {
        // Convert the array of objects to JSON format
        content = JSON.stringify(data, null, 2);
    } else if (format === 'csv') {
        // Convert the array of objects to a CSV format
        const csvHeader = Object.keys(data[0]).join(',');
        const csvRows = data.map(obj => Object.values(obj).join(','));
        content = [csvHeader, ...csvRows].join('\n');
    } else {
        console.error('Invalid format. Please choose JSON or CSV.');
        return;
    }

    // Create a Blob containing the data
    const blob = new Blob([content], { type: 'text/plain' });

    // Create a download link for the Blob
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;

    // Trigger a click event to download the file
    a.click();

    // Clean up
    URL.revokeObjectURL(url);
}

// Example usage:
const jsonData = [
    { name: 'John', age: 30, city: 'New York' },
    { name: 'Alice', age: 25, city: 'Los Angeles' },
    { name: 'Bob', age: 35, city: 'Chicago' },
];

document.getElementById('save-json-button').addEventListener('click', function () {
    saveAsJSONorCSV(jsonData, 'data.json', 'json');
});

document.getElementById('save-csv-button').addEventListener('click', function () {
    saveAsJSONorCSV(jsonData, 'data.csv', 'csv');
});
function openFormPreviewInNewTab() {
    const formPreview = document.getElementById("form-preview").outerHTML;
    const newWindow = window.open();
    newWindow.document.write("<html><head><title>Form Preview</title></head><body>");
    newWindow.document.write(formPreview);
    newWindow.document.write("</body></html>");
    newWindow.document.close();
  }



