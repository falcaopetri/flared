// Populates Flared's folders options
function populate_options() {
  var options = document.getElementById('folders');
  for (folder of ['alfred']) {
    var option = document.createElement('option');
    option.value = folder;
    option.text = folder;
    options.appendChild(option);
  }
}

// Saves options to chrome.storage.sync.
function save_options() {
  var folder = document.getElementById('folders').value;
  chrome.storage.sync.set({
    folder: folder,
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
    folder: null
  }, function(items) {
    document.getElementById('folders').value = items.folder;
  });
}
document.addEventListener('DOMContentLoaded', populate_options);
document.addEventListener('DOMContentLoaded', restore_options);
document.getElementById('save').addEventListener('click',
    save_options);
