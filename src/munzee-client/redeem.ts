import Backend from "../munzee-backend";

type Section = Readonly<{
  id: string;
  title: string;
  expiresAt?: Date;
}>;

type Item = Readonly<{
  receivedType: string;
  gameplayNotes: string;
  bundleQuantity: string;
  buttonCostText: string;
  userAmountText: string;
  canPurchase: boolean;
  imageUrl: string;
  section: string;
  id: string;
  limit: number;
}>;

class Redeem {
  private items: ReadonlyArray<{
    id: string;
    cost: number;
    userAmount: number;
    purchaseLimit: number;
  }>;

  constructor(private backend: Backend) {
    this.items = [];
  }

  redeemItem = async (
    itemId: string,
    quantity: number
  ): Promise<{ success: boolean; message: string }> => {
    const result = await this.backend.redeem.userRedeem({
      selection_id: itemId,
      quantity,
    });
    return { success: !!result.success, message: result.message };
  };

  getRedeemData = async (): Promise<
    Readonly<{
      sections: ReadonlyArray<Section>;
      items: ReadonlyArray<Item>;
    }>
  > => {
    const user = await this.backend.getCurrentUserInfo();
    if (!user) {
      return { sections: [], items: [] };
    }
    const user_id = parseInt(user.uid + "", 10);
    const store = await this.backend.redeem.userRedeemGetoptions({ user_id });
    this.items = store.map((s) => ({
      id: s.id,
      cost: parseInt(s.cost + "", 10),
      userAmount: parseInt(s.user_amount + "", 10),
      purchaseLimit: parseInt(s.purchase_limit + "", 10),
    }));
    // const jewelshards = await this.backend.redeem.userRedeemJewelshards({
    //   user_id,
    // });
    const sections = await this.backend.redeem.userRedeemSections({ user_id });
    return {
      sections: sections.map((s) => ({
        id: s.id,
        title: s.title,
        expiresAt: s.hide_date ? new Date(s.hide_date) : undefined,
      })),
      items: store.map((s) => ({
        id: s.id,
        section: s.section,
        receivedType: s.name,
        gameplayNotes: !!s.premium_locked
          ? "This option is for Premium Users only."
          : s.text,
        bundleQuantity: s.amount,
        buttonCostText: s.button_text,
        userAmountText: s.user_credit,
        limit: parseInt(s.purchase_limit + "", 10),
        canPurchase:
          parseInt(s.user_amount + "", 10) >= parseInt(s.cost + "", 10),
        imageUrl: `https://munzee.global.ssl.fastly.net/images/${s.folder}/${s.logo}`,
      })),
    };
  };
}

export default Redeem;
