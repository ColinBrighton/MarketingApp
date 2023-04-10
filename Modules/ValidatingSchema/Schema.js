import * as yup from 'yup';

export const ShopDetailsSchema = yup.object({
  shop_name: yup.string().required('Shop Name is Required'),
  shop_mail: yup.string().email().required('email is Required'),
  shop_address: yup.string().required('Address is Required'),
  shop_landmark: yup.string().required('Landmark is Required'),
  contact_number_1: yup
    .number()
    .required('PhoneNumber is Required')
    .min(10, 'Invalid PhoneNumber'),
  contact_number_2: yup.number().min(10, 'Invalid PhoneNumber'),
  shop_pincode: yup
    .number()
    .required('PhoneNumber is Required')
    .min(6, 'Invalid PhoneNumber'),
  gst_number: yup
    .number()
    .required('GST Number is Required')
    .min(15, 'Invalid Number'),
});

export const OrderDetailsSchema = yup.object({

  quantity: yup
    .string()
    .required('Enter Quantity')
});
