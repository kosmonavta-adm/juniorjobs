'use client';
import { useQuery } from '@tanstack/react-query';

import { getPortfolio } from '@/components/juniors/juniors.queries';
import PortfolioInVerification from '@/components/juniors/PortfolioInVerification';
import PortfolioQuickStats from '@/components/juniors/PortfolioQuickStats';
import PostPortfolio from '@/components/juniors/PostPortfolio';
import Loader from '@/components/ui/Loader';
import { createClient } from '@/supabase/client';

type PortfolioQuickInfoProps = {
    userId: string;
};

const PortfolioQuickInfo = ({ userId }: PortfolioQuickInfoProps) => {
    const supabase = createClient();
    const portfolio = useQuery(getPortfolio(supabase, userId));

    if (portfolio.isFetching) return <Loader />;

    if (portfolio.data === null) return <PostPortfolio />;

    if (portfolio.data?.isVerified) return <PortfolioQuickStats juniorId={portfolio.data.id} />;
    else return <PortfolioInVerification />;
};

export default PortfolioQuickInfo;
