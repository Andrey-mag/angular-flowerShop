
import {PaymentType} from "./payment.type";
import {DeliveryType} from "./delivery.type";

export type UserInfoType = {
  deliveryType?:DeliveryType;
  firstName?: string,
  lastName?: string,
  fatherName?: string,
  phone?: string,
  paymentType?: PaymentType,
  email: string,
  street?: string,
  house?: string,
  entrance?: string,
  apartment?: string,

}
