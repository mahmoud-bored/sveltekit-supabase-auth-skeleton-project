<script lang="ts">
	import { writable, type Writable } from "svelte/store";
	import FormInput from "./FormInput.svelte";
	import SubmitButton from "$lib/components/SubmitButton.svelte";
	import type { SupabaseClient } from '@supabase/supabase-js'

    export let supabaseClient: SupabaseClient
    export let loading: Writable<boolean>
    export let url: string
    let magicLinkLoginFromEmailStore: Writable<HTMLInputElement> = writable()
    async function magicLinkLogin() {
        const email = $magicLinkLoginFromEmailStore.value
        
        loading.set(true)
        let error = '';
        const { error: resetPasswordError } = await supabaseClient.auth.signInWithOtp({
            email,
            options: {
                emailRedirectTo: `${url}/callback`,
                shouldCreateUser: false,
            }
        });
        if (resetPasswordError)
            error = resetPasswordError.message;
        console.log(error)
        loading.set(false);
    }
</script>

<p class="mb-5 leading-normal text-neutral-900" dir="rtl">
    سيتم إرسال رابط تسجيل دخول لمرة واحدة إلى حساب البريد الإلكتروني الخاص بك
</p>
<form on:submit|preventDefault={magicLinkLogin}>
    <FormInput 
        type="email" 
        placeholder="username@example.com"
        store={magicLinkLoginFromEmailStore}
    >
        E-mail
    </FormInput>
    <SubmitButton>إرسال رابط تسجيل الدخول</SubmitButton>
</form>