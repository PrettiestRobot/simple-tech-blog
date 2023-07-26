const deleteButtonHandler = async event => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/posts/${id}`, {
      method: 'DELETE',
    });

    document.location.replace('/dashboard');

    // if (response.ok) {
    //   document.location.replace('/dashboard');
    // } else {
    //   alert('Failed to delete post');
    // }
  }
};

document
  .querySelector('.post-list')
  .addEventListener('click', deleteButtonHandler);
