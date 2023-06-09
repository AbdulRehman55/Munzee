import Backend from "../munzee-backend";

type Badge = Readonly<{
  icon: string;
  name: string;
  tooltip: ReadonlyArray<string>;
  awarded: boolean;
}>;

type Category = Readonly<{
  id: string;
  name: string;
  count: number;
}>;

class Badges {
  constructor(private backend: Backend) {}

  getCategories = async (): Promise<ReadonlyArray<Category>> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return [];
    }
    const categories =
      (await this.backend.badges.userBadgesCategories({
        user_id: parseInt(user.uid + "", 10),
      })) || [];
    const allCount = categories.reduce(
      (accum, value) => accum + value.count,
      0
    );
    return [{ id: "0", name: "All", count: allCount }, ...categories];
  };

  getBadges = async (
    categoryId?: string,
    forUsername?: string
  ): Promise<ReadonlyArray<Badge>> => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return [];
    }
    const result = await this.backend.badges.userBadgesCategory({
      user_id: parseInt(user.uid + "", 10),
      username: forUsername || user.username,
      category_id: categoryId || "0",
    });
    return (
      result?.map((b) => ({
        icon: b.badge_small,
        name: b.name,
        tooltip: [b.description, b.description_earned],
        awarded: !!b.awarded,
      })) || []
    );
  };
}

export default Badges;
