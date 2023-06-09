

type blogs = Readonly<{
  data: Readonly<{
    id: string;
    type: string;
    show_at: string;
    hide_at: string;
    title: string;
    start_time: string;
    end_time: string;
    blog_url: string;
    image_url: string;
    mailbox_tier: string;
  }>;
}>;

export default class BlogsAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number }
    ) => any
  ) {}

  Blogs = async (
    params: Readonly<{
      current_page: number;
      per_page: number;
    }>
  ) => {
    const result: blogs = await this.callAPI("assets/news", params);
    return result;
  };
}
