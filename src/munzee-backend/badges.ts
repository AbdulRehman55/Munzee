type Badge = Readonly<{
  awarded: number;
  badge_id: number;
  badge_large: string;
  badge_large_null: string;
  badge_small: string;
  badge_small_null: string;
  category: string;
  category_name: string;
  description: string;
  description_earned: string;
  event_id: string;
  name: string;
  progression: ReadonlyArray<
    Readonly<{
      ingredient: string;
      target: number;
      value: number;
    }>
  >;
  sort_order: string;
}>;

type Category = Readonly<{
  id: string;
  name: string;
  count: number;
}>;

export default class BadgesAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number }
    ) => any
  ) {}

  userBadges = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: ReadonlyArray<Badge>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/badges/", params);
    return result?.data;
  };

  userBadgesCategories = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: ReadonlyArray<Category>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/badges/categories/", params);
    return result?.data;
  };

  userBadgesCategory = async (
    params: Readonly<{ user_id: number; username: string; category_id: string }>
  ) => {
    const result: {
      data: ReadonlyArray<Badge>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/badges/category/", params);
    return result?.data;
  };
}
