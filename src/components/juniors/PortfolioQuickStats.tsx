import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns/format';
import { isAfter } from 'date-fns/isAfter';
import { startOfDay } from 'date-fns/startOfDay';
import { subDays } from 'date-fns/subDays';
import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

import { getPortfolioPeeks } from '@/components/juniors/juniors.queries';
import Loader from '@/components/ui/Loader';
import { createClient } from '@/supabase/client';

type PortfolioQuickStatsProps = {
    juniorId: number;
};

const PortfolioQuickStats = ({ juniorId }: PortfolioQuickStatsProps) => {
    const supabase = createClient();
    const portfolioPeeks = useQuery(getPortfolioPeeks(supabase, juniorId));
    if (portfolioPeeks.isFetching || portfolioPeeks.data === undefined) return <Loader />;
    const endDate = startOfDay(subDays(new Date(), 7));
    const peeksFromLastSevenDays = portfolioPeeks.data.filter((peek) => {
        const isInSevenDaysRange = isAfter(peek.createdAt, endDate);
        return isInSevenDaysRange;
    });
    const peeksGroupedByDay = peeksFromLastSevenDays.reduce((result, item) => {
        const formatedDate = format(item.createdAt, 'EEEE dd.MM');
        if (result.has(formatedDate)) {
            const peeksFromDay = result.get(formatedDate);
            peeksFromDay.Views += 1;
        } else {
            result.set(formatedDate, { name: formatedDate, Views: 1 });
        }

        return result;
    }, new Map());
    return (
        <div className="flex h-full flex-1 flex-col gap-16">
            <p className="text-center text-lg text-white">{`Your email was peeked ${portfolioPeeks.data?.length} ${portfolioPeeks.data?.length === 1 ? 'time' : 'times'} in total`}</p>
            <div className="flex h-full flex-1 flex-col gap-2">
                <p className="text-center text-xl text-white">Last 7 days</p>
                <ResponsiveContainer className="flex h-full w-full flex-1">
                    <LineChart data={Array.from(peeksGroupedByDay.values())}>
                        <Line
                            stroke="white"
                            dataKey="Views"
                            type="monotone"
                        />
                        <Tooltip />
                        <XAxis
                            interval="preserveStartEnd"
                            minTickGap={0}
                            tick={{ fill: 'white' }}
                            axisLine={{ stroke: 'white' }}
                            dataKey="name"
                        />
                        <YAxis
                            tick={{ fill: 'white' }}
                            axisLine={{ stroke: 'white' }}
                            allowDecimals={false}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};

export default PortfolioQuickStats;
