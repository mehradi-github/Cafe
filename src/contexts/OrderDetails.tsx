import React, {
  createContext,
  FC,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

declare type OrderDetail = (
  | ((itemName: string, newItemCount: string, optionType: OptionType) => void)
  | {
      totals: TotalsType;
      scoops: Map<string, number>;
      toppings: Map<string, number>;
    }
)[];
const OrderDetails = createContext<OrderDetail | null>(null);

export const useOrderDetail = () => {
  const context = useContext<OrderDetail | null>(OrderDetails);

  if (!context)
    throw new Error(
      'useOrderDetails must be used within an OrderDetailsProvider'
    );

  return context;
};

export declare type OptionType = 'scoops' | 'toppings';
export declare type OptionCountType = {
  scoops: Map<string, number>;
  toppings: Map<string, number>;
};
export declare type TotalsType = {
  scoops: number;
  toppings: number;
  grandTotal: number;
};
export const priceOption = new Map<OptionType, number>([
  ['scoops', 2],
  ['toppings', 1.5],
]);

const calculateSubTotals = (
  optionType: OptionType,
  optionCounts: OptionCountType
) => {
  return (
    Array.from(optionCounts[optionType].values()).reduce((p, c) => p + c, 0) *
    (priceOption.get('scoops') ?? 0)
  );
};

export const OrderDetailsProvider: FC<OrderDetail> = (props) => {
  const [optionCounts, setOptionCounts] = useState<OptionCountType>({
    scoops: new Map<string, number>(),
    toppings: new Map<string, number>(),
  });
  const [totals, setTotals] = useState<TotalsType>({
    scoops: 0,
    toppings: 0,
    grandTotal: 0,
  });

  useEffect(() => {
    const PriceScoops = calculateSubTotals('scoops', optionCounts);
    const PriceToppings = calculateSubTotals('toppings', optionCounts);
    const PriceGrandTotal = PriceScoops + PriceToppings;
    setTotals({
      scoops: PriceScoops,
      toppings: PriceToppings,
      grandTotal: PriceGrandTotal,
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

    return [{ ...optionCounts, totals }, updateItemCount, resetOrder];
  }, [optionCounts, totals]);

  return <OrderDetails.Provider value={value} {...props} />;
};
