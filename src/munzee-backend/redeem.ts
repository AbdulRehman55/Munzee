export default class RedeemAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number }
    ) => any
  ) {}

  userRedeem = async (
    params: Readonly<{ selection_id: string; quantity: number }>
  ) => {
    const result: {
      data: Readonly<{ success: number; message: string }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/redeem/", params);
    return result?.data;
  };

  userRedeemGetoptions = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: ReadonlyArray<
        Readonly<{
          id: string;
          name: string;
          type: string;
          amount: string;
          credit_type: string;
          cost: string;
          folder: string;
          logo: string;
          visibility_locked: string;
          text: string;
          purchase_limit: string;
          section: string;
          user_amount: number;
          user_credit: string;
          button_text: string;
          premium_locked?: number;
        }>
      >;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/redeem/getoptions/", params);
    return result?.data;
  };

  userRedeemJewelshards = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: number;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/redeem/jewelshards/", params);
    return result?.data;
  };

  userRedeemSections = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: ReadonlyArray<
        Readonly<{
          id: string;
          title: string;
          hide_date: string | null;
        }>
      >;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/redeem/sections/", params);
    return result?.data;
  };
}
