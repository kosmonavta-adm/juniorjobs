import { SupabaseClient } from '@supabase/supabase-js';

import { juniorsKeys, peeksKeys, portfoliosKeys, tagsKeys } from '@/components/juniors/_juniorsUtils';
import { Database } from '@/utils/dbTypes';

export const getJuniors = (client: SupabaseClient<Database>) => ({
    queryFn: async () => {
        const { data, error } = await client
            .from('juniors')
            .select(
                `
                id,
                projectUrl_0:project_url_0,
                projectUrl_1:project_url_1,
                projectUrl_2:project_url_2,
                projectUrl_3:project_url_3,
                projectUrl_4:project_url_4,
                fullName:full_name,
                isVerified:is_verified,
                about,
                tag_0:tag_0,
                tag_1:tag_1,
                tag_2:tag_2,
                tag_3:tag_3,
                tag_4:tag_4,
                tag_5:tag_5,
                tag_6:tag_6,
                tag_7:tag_7,
                tag_8:tag_8,
                tag_9:tag_9
                `
            )
            .order('id', { ascending: true });
        // .eq('is_verified', true);

        if (error) throw new Error(error.message);

        return data;
    },
    queryKey: juniorsKeys.all,
});

export const getPortfolioPeeks = (client: SupabaseClient<Database>, juniorId: number) => ({
    queryFn: async () => {
        const { data, error } = await client
            .from('peeks')
            .select(
                `
            id,
            createdAt:created_at

    `
            )
            .eq('junior_id', juniorId)
            .order('created_at', { ascending: true });

        if (error) throw new Error(error.message);

        return data;
    },
    queryKey: peeksKeys.portfolio(),
});

export const getUserPeeks = (client: SupabaseClient<Database>, userId: string) => ({
    queryFn: async () => {
        const { data, error } = await client
            .from('peeks')
            .select(
                `
        junior:juniors (
            id,
            email
        )
    `
            )
            .eq('user_id', userId);

        if (error) throw new Error(error.message);

        return data;
    },
    queryKey: peeksKeys.all,
});

export const getPortfolio = (client: SupabaseClient<Database>, userId: string) => ({
    queryFn: async () => {
        const { data, error } = await client
            .from('juniors')
            .select(
                `
                id,
                projectUrl_0:project_url_0,
                projectUrl_1:project_url_1,
                projectUrl_2:project_url_2,
                projectUrl_3:project_url_3,
                projectUrl_4:project_url_4,
                fullName:full_name,
                isVerified:is_verified,
                about,
                tag_0:tag_0,
                tag_1:tag_1,
                tag_2:tag_2,
                tag_3:tag_3,
                tag_4:tag_4,
                tag_5:tag_5,
                tag_6:tag_6,
                tag_7:tag_7,
                tag_8:tag_8,
                tag_9:tag_9
                `
            )
            .eq('user_id', userId)
            .limit(1)
            .maybeSingle();

        if (error) throw new Error(error.message);

        return data;
    },
    queryKey: portfoliosKeys.single,
});

export const getTags = (client: SupabaseClient<Database>) => ({
    queryFn: async () => {
        const { data, error } = await client.from('tags').select(
            `
                name
                `
        );

        if (error) throw new Error(error.message);

        const convertedTags = data.map(({ name }) => name);

        return convertedTags;
    },
    queryKey: tagsKeys.all,
});
