import { useMutation, useQueryClient } from '@tanstack/react-query';

import { juniorsKeys, peeksKeys } from '@/components/juniors/_juniorsUtils';
import { createClient } from '@/supabase/client';
import { TablesInsert } from '@/utils/dbTypes';

export const useCreatePeek = () => {
    const queryClient = useQueryClient();
    const supabase = createClient();

    const mutationFn = async (juniorId: number) => {
        const { data, error } = await supabase.from('peeks').insert({ junior_id: juniorId });
        if (error) throw new Error(error.message);
        return data;
    };

    return useMutation({
        mutationFn,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: juniorsKeys.all });
            queryClient.invalidateQueries({ queryKey: peeksKeys.all });
        },
    });
};

export const useCreatePortfolio = () => {
    const queryClient = useQueryClient();
    const supabase = createClient();

    const mutationFn = async (portfolioData: TablesInsert<'juniors'>) => {
        const { data, error } = await supabase.from('juniors').insert(portfolioData);
        if (error) throw new Error(error.message);
        return data;
    };

    return useMutation({
        mutationFn,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: juniorsKeys.all });
        },
    });
};
