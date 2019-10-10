const BASE_URL = '/api/comments';

export function getAll() {
  return fetch(BASE_URL)
  .then(res => res.json());
}

export function create(comments) {
  return fetch(BASE_URL, {
    method: 'POST',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(comments)
  }).then(res => res.json());
}

export function update(comments) {
  return fetch(`${BASE_URL}/${comments._id}`, {
    method: 'PUT',
    headers: {'content-type': 'application/json'},
    body: JSON.stringify(comments)
  }).then(res => res.json());
}

export function deleteOne(id) {
  return fetch(`${BASE_URL}/${id}`, {
    method: 'DELETE'
  }).then(res => res.json());
}