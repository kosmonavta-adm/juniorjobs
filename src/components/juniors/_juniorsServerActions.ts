'use server';

import { createClient } from '@/supabase/server';

export const getEmailAction = async (juniorId: number) => {
    const supabase = createClient();
    const { data } = await supabase.from('juniors').select('email').eq('id', juniorId).limit(1).single();
    return data;
};
