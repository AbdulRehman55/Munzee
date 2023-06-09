import Backend from "../munzee-backend";

type BlogsEntry = {
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
};
class Blogs {
  constructor(private backend: Backend) {}

  getBlogs = async (
    params: Readonly<{
      current_page: number;
      per_page: number;
    }>
  ): Promise<ReadonlyArray<BlogsEntry>> => {
    const result: any = await this.backend.blogs.Blogs(params);
    return result?.data;
  };
}

export default Blogs;
