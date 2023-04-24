import {Text, View} from 'react-native';
import React from 'react';
import {useSelector} from 'react-redux';

export const PaymentDetails = () => {
  const OrderDetails = useSelector(state => state.OrderDetails);
  console.log(OrderDetails, 'OrderDetails');
  return (
    <View>
      {OrderDetails.map(val => (
        <View>
          <View>
            <Text>date {val.order_date}</Text>
            <Text>total price {val.total_price}</Text>
          </View>
          <View>
            {val.product.map(ooo => (
              <View>
                <Text>product {ooo.selected_product}</Text>
                <Text>price {ooo.price}</Text>
                <Text>--------------------</Text>
              </View>
            ))}
          </View>
        </View>
      ))}
    </View>
  );
};
