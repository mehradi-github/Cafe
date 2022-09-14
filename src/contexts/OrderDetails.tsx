import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { formatCurrency } from '../utilities';

interface OrderDetail {
  resetOrder: () => void;
  updateItemCount: (
    itemName: string,
    newItemCount: string,
    optionType: OptionType
  ) => void;
  totals: TotalsType;
  optionCounts: OptionCountType;
}
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const OrderDetails = createContext<OrderDetail>();

export const useOrderDetails = () => {
  const context = useContext<OrderDetail>(OrderDetails);

  // if (!context)
  //   throw new Error(
  //     'useOrderDetails must be used within an OrderDetailsProvider'
  //   );

  return context;
};

export declare type OptionType = 'scoops' | 'toppings';
export declare type OptionCountType = {
  scoops: Map<string, number>;
  toppings: Map<string, number>;
};
export declare type TotalsType = {
  scoops: string;
  toppings: string;
  grandTotal: string;
};
export const pricePerItem = new Map<OptionType, number>([
  ['scoops', 2],
  ['toppings', 1.5],
]);

const calculateSubTotals = (
  optionType: OptionType,
  optionCounts: OptionCountType
) => {
  return (
    Array.from(optionCounts[optionType].values()).reduce((p, c) => p + c, 0) *
    (pricePerItem.get(optionType) ?? 0)
  );
};

export const OrderDetailsProvider: React.JSXElementConstructor<{
  children: React.ReactElement;
}> = (props) => {
  const [optionCounts, setOptionCounts] = useState<OptionCountType>({
    scoops: new Map<string, number>(),
    toppings: new Map<string, number>(),
  });
  const zeroCurrency = formatCurrency(0);
  const [totals, setTotals] = useState<TotalsType>({
    scoops: zeroCurrency,
    toppings: zeroCurrency,
    grandTotal: zeroCurrency,
  });

  useEffect(() => {
    const PriceScoops = calculateSubTotals('scoops', optionCounts);
    const PriceToppings = calculateSubTotals('toppings', optionCounts);
    const PriceGrandTotal = PriceScoops + PriceToppings;
    setTotals({
      scoops: formatCurrency(PriceScoops),
      toppings: formatCurrency(PriceToppings),
      grandTotal: formatCurrency(PriceGrandTotal),
    });
  }, [optionCounts]);

  const value = useMemo(() => {
    function resetOrder() {
      setOptionCounts({
        scoops: new Map<string, number>(),
        toppings: new Map<string, number>(),
      });
    }
    function updateItemCount(
      itemName: string,
      newItemCount: string,
      optionType: OptionType
    ) {
      const newOptionCounts = { ...optionCounts };
      const optionContsMap = optionCounts[optionType];
      optionContsMap.set(itemName, parseInt(newItemCount));
      setOptionCounts(newOptionCounts);
    }
    const result: OrderDetail = {
      resetOrder,
      updateItemCount,
      totals,
      optionCounts,
    };
    return result;
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
};
