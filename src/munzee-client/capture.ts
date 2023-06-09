import Backend from "../munzee-backend";

type CapturedTypeCount = Readonly<{
  [key: number]: number;
}>;

class Captured {
  constructor(private backend: Backend) {}

  getCapturedTypeCount = async (
    params: Readonly<{
      [type_ids: string]: string | number;
    }>
  ): Promise<ReadonlyArray<CapturedTypeCount>> => {
    const result = await this.backend.munzee.capturedTypeCount(params);
    return (
      Object.entries(result).map(([key, value]) => ({
        [key]: value,
      })) || []
    );
  };
}

export default Captured;
