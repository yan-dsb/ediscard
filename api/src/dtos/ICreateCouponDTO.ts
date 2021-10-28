interface ICreateCouponDTO {
  amount: number;
  balance_id: string;
  isUsed?: boolean;
  isCancelled?: boolean;
}

export { ICreateCouponDTO };
