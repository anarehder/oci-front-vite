import { useContext } from 'react';
import { Shapes } from '../assets/Shapes'
import { PricesContext } from '../contexts/PricesContext';

function estimatePrice(shape, MEM, OCPU) {
    const prices = useContext(PricesContext);
    const MEM_PartNumber = Shapes[shape].MEM;
    const MEM_objectPrice = prices.find(item => item.partNumber === MEM_PartNumber);
    const MEM_hourValue = MEM_objectPrice.currencyCodeLocalizations[0].prices[0].value;
    const MEM_totalPrice = MEM*720*MEM_hourValue;

    const CPU_PartNumber = Shapes[shape].CPU;    
    const CPU_objectPrice = prices.find(item => item.partNumber === CPU_PartNumber);
    const CPU_hourValue = CPU_objectPrice.currencyCodeLocalizations[0].prices[0].value;
    const CPU_totalPrice = OCPU*720*CPU_hourValue;
    
    return MEM_totalPrice+CPU_totalPrice;
}

const calculatePricesService = { estimatePrice };

export default calculatePricesService;
