exports.paginate = async (pg) => {
    var page;
    if ((pg < 1) || (typeof pg === 'undefined')){
      page = 1;
    } else {
      page = pg;
    }
    const limit = parseInt(process.env.pageSize) || 10;
    const start = (page - 1) * limit;
    const end = page * limit;
    return { start, end, limit };
  };
  exports.resultCount = async (offset, fetched, total) => {
    var count;
    if (offset >= total) {
      count = fetched;
    } else {
      count = parseInt(offset + fetched);
    }
    return count;
  };