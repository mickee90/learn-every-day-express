
const getPagination = (page, size) => {
  const limit = size ? +size : 15;
  const offset = page ? (page -1) * limit : 0;

  return { limit, offset };
}

const getPaginationData = (data, page, limit) => {
  const totalItems = data.count;
  const posts = data.rows;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);
  let previousPage = '';
  let nextPage = '';

  const pageLinks = [];
  for (let i = 1; i <= totalPages; i++) {
    pageLinks.push({
      url: `/posts/?page=${i}`,
      sort: i,
      title: i
    })
  }

  if (currentPage > 1) {
    previousPage = `/posts?page=${currentPage -1}`;
  }

  if (currentPage < totalPages) {
    nextPage = `/posts?page=${currentPage +1}`;
  }

  return { pageLinks, previousPage, nextPage, totalItems, totalPages, currentPage, data: posts }
}

export {
  getPagination,
  getPaginationData
}