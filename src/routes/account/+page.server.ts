import { redirect } from '@sveltejs/kit'

export async function load({ locals: { supabase, getSession } }){
    const session = await getSession()
    if (!session) {
        throw redirect(303, '/auth')
    }
    const { data: profile } = await supabase
        .from('profiles')
        .select('*')

    return { session, profile }
}
export const actions = {
    logout: async ({ locals: { supabase, getSession } }) => {
        const session = await getSession()
        if (session) {
            await supabase.auth.signOut()
            throw redirect(303, '/auth')
        }
    }
}