

// Populates Flared's folders options
function populate_options() {
  var options = document.getElementById('folders');

  chrome.bookmarks.getTree(function(tree) {
    function flatten(items) {
      // Source: https://stackoverflow.com/a/30048623
      const flat = [];
        
      items.forEach(item => {
        flat.push(item);
        if (item.children)
          flat.push(...flatten(item.children));
      });
    
      return flat;
    }

    var folders = flatten(tree).filter(function(item) {
      return item.url === undefined;
    });

    for (const folder of folders) {
      var option = document.createElement('option');
      option.value = folder.id;
      option.text = folder.title;
  
      options.appendChild(option);
    }
  });
  
}

// Saves options to chrome.storage.sync.
function save_options() {
  var folder_id = document.getElementById('folders').value;
  chrome.storage.sync.set({
    folder_id: folder_id,
  }, function() {
    // Update status to let user know options were saved.
    var status = document.getElementById('status');
    status.textContent = 'Options saved.';
    setTimeout(function() {
      status.textContent = '';
    }, 750);
  });
}

// Restores select box state using the preferences
// stored in chrome.storage.
function restore_options() {
  // Use default value folder = null.
  chrome.storage.sync.get({
    folder_id: null
  }, function(items) {
    document.getElementById('folders').value = items.folder_id;
  });
}
document.addEventListener('DOMContentLoaded', populate_options);
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
