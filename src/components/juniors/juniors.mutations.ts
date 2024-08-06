import { useMutation, useQueryClient } from '@tanstack/react-query';

import { juniorsKeys, peeksKeys, portfoliosKeys } from '@/components/juniors/_juniorsUtils';
import { createClient } from '@/supabase/client';
import { TablesInsert, TablesUpdate } from '@/utils/dbTypes';

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
        const session = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('juniors')
            .insert({ ...portfolioData, email: session.data.user?.email })
            .select('id')
            .single();
        if (error) throw new Error(error.message);
        return data;
    };

    return useMutation({
        mutationFn,
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: juniorsKeys.all });
            queryClient.invalidateQueries({ queryKey: portfoliosKeys.single });
        },
    });
};

export const useUpdateProfile = () => {
    const supabase = createClient();

    const mutationFn = async (profileData: TablesUpdate<'profiles'>) => {
        const session = await supabase.auth.getUser();
        const { data, error } = await supabase
            .from('profiles')
            .update(profileData)
            .eq('user_id', session.data.user?.id);
        if (error) throw new Error(error.message);
        return data;
    };

    return useMutation({
        mutationFn,
    });
};
