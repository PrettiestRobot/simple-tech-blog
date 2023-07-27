const deleteReviewButtonHandler = async event => {
  if (event.target.hasAttribute('data-id')) {
    const id = event.target.getAttribute('data-id');

    const response = await fetch(`/api/reviews/${id}`, {
      method: 'DELETE',
    });

    document.location.replace('/index');
  }
};

const deleteReviewBtn = document.querySelector('.review-delete');

if (deleteReviewBtn) {
  deleteReviewBtn.addEventListener('click', deleteReviewButtonHandler);
}
// document
//   .querySelector('.review-delete')
//   .addEventListener('click', deleteReviewButtonHandler);
