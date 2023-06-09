export default class CreditsAPI {
  constructor(
    private callAPI: (
      endpoint: string,
      params: { [key: string]: string | number }
    ) => any
  ) {}

  userCredits = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: Readonly<{ [name: string]: number }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/credits/", params);
    return result?.data;
  };

  userCreditsHistory = async (params: Readonly<{ user_id: number }>) => {
    const result: {
      data: Readonly<{
        items: ReadonlyArray<
          Readonly<{
            type: string;
            time_awarded: string;
            log_text: string;
          }>
        >;
      }>;
      status_code: number;
      status_text: string;
    } = await this.callAPI("user/credits/history/", params);
    return result?.data;
  };
}
