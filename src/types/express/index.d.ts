declare namespace Express {
  interface Request {
    user?: Post;
    logout(): any;
    session: Object;
    sessionOptions: Object;
  }
}

interface queryParams {
  page: number;
  size: number;
  sortProp: string;
  sortType: string;
}