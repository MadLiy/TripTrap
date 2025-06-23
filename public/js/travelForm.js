let docIndex = 1;
function addDocument() {
  const container = document.getElementById('documents-container');
  const div = document.createElement('div');
  div.className = 'document-group mb-2 d-flex gap-2';
  div.innerHTML = `
    <input type="text" class="form-control" name="requiredDocuments[${docIndex}][title]" placeholder="Titre du document" required>
    <input type="text" class="form-control" name="requiredDocuments[${docIndex}][description]" placeholder="Description">
    <button type="button" class="btn btn-danger" onclick="removeDocument(this)">Supprimer</button>
  `;
  container.appendChild(div);
  docIndex++;
}
function removeDocument(btn) {
  btn.parentElement.remove();
}