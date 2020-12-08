
const getPagination = (page, size) => {
  const limit = size ? +size : 15;
  const offset = page ? page-- * limit : 0;

  return { limit, offset };
}

const getPaginationData = (data, page, limit) => {
  const totalItems = data.count;
  const posts = data.rows;
  const currentPage = page ? +page : 0;
  const totalPages = Math.ceil(totalItems / limit);

  return { totalItems, totalPages, currentPage, data: posts }
}

export {
  getPagination,
  getPaginationData
}