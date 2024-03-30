import { redirect } from '@sveltejs/kit'

export async function GET({ url, locals: { supabase } }) {
    const code = url.searchParams.get('code')
    console.log('code: ', code);
    if (code) {
        try {
            await supabase.auth.exchangeCodeForSession(code)
        } catch(error) {
            console.log('exchangeCodeForSessionError: ', error);

        }
        
    }

    throw redirect(303, '/account')
}