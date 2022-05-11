import React from 'react';
import BigNumber from 'bignumber.js';
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import {
  addDays,
  format,
  fromUnixTime,
  getDate,
  getUnixTime,
  startOfDay,
  subDays,
} from 'date-fns';
import faker from '@faker-js/faker';

interface Data {
  timestamp: number;
  value: BigNumber;
}

interface Props {
  colour?: string;
  name?: string;
  data: Data[];
  width?: number;
  height?: number;
}

export const generateTimeSeries = (
  days: number,
  yDomain: [number, number],
  step: number = 5000,
  variance: number = 0.05
) => {
  const [dataMin, dataMax] = yDomain;
  const now = new Date();
  const end = startOfDay(now);
  const start = subDays(end, days);
  const seedNum = dataMin;

  const data: Data[] = [];
  for (let i = 0; i < days; i++) {
    const prevNum = i === 0 ? seedNum : data[i - 1].value.toNumber();
    const diff = step * (1 + variance);
    const max = prevNum + diff;
    const min = prevNum - diff;
    const v =
      i === 0
        ? seedNum
        : faker.datatype.float({
            max: max > dataMax ? dataMax : max,
            min: min < dataMin ? dataMin : min,
          });
    const value = new BigNumber(v);
    const timestamp = addDays(start, i);
    data.push({ timestamp: getUnixTime(timestamp), value });
  }
  return data;
};

const formatDate = (unixTimestamp: number): string =>
  getDate(fromUnixTime(unixTimestamp)).toString();

const LineChart: React.FC<Props> = ({
  name = 'TVL',
  colour = '#0CCDAA',
  data,
}) => {
  const formatted = data.map(({ value, timestamp }) => ({
    value: value.decimalPlaces(2).toNumber(),
    timestamp,
  }));
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={formatted} margin={{ left: 0, bottom: 18, top: 10 }}>
        <defs>
          <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={colour} stopOpacity={0.35} />
            <stop offset="95%" stopColor={colour} stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis
          dataKey="timestamp"
          tickLine={false}
          axisLine={false}
          interval="preserveEnd"
          tickMargin={6}
          tickFormatter={formatDate}
          minTickGap={30}
          type="number"
          scale="time"
          domain={['dataMin', 'dataMax']}
        />
        <YAxis
          type="number"
          axisLine={false}
          domain={['dataMin', 'dataMax']}
          tick={false}
          width={5}
        />
        <Tooltip
          cursor
          labelFormatter={(ts) => format(fromUnixTime(ts), 'MMM d, yyyy')}
        />
        <Area
          name={name}
          type="linear"
          dataKey="value"
          dot={false}
          stroke={colour}
          fill="url(#areaGradient)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};

export default LineChart;
