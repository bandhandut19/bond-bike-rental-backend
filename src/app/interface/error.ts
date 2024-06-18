export type TErrorMessage = {
  path: string | number;
  message: string | null;
}[];

export type TGeneralResponse = {
  statusCode: number;
  message: string;
  errorMessage: TErrorMessage;
};
