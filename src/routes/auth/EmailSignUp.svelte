<script lang="ts">
	import { writable, type Writable } from "svelte/store";
	import FormInput from "./FormInput.svelte";
	import SubmitButton from "$lib/components/SubmitButton.svelte";
	import type { SupabaseClient } from '@supabase/supabase-js'

    export let supabaseClient: SupabaseClient
    export let loading: Writable<boolean>
    export let url: string


    let signUpFormEmailStore: Writable<HTMLInputElement> = writable()
    let signUpFormPasswordStore: Writable<HTMLInputElement> = writable()
    async function signUp() {
        loading.set(true)
        const email = $signUpFormEmailStore.value
        const password = $signUpFormPasswordStore.value
        let error = ""

        let options = {
            emailRedirectTo: `${url}/confirm`
        };

        const { data: { user: signUpUser, session: signUpSession }, error: signUpError } = await supabaseClient.auth.signUp({
            email,
            password,
            options
        });
        if (signUpError)
            error = signUpError.message;
        console.log(error)
        loading.set(false)
    }
</script>
<p class="mb-5 leading-normal text-neutral-900" dir="rtl">
    سيتم إرسال رمز تحقق إلى البريد الإلكتروني الخاص بك للتأكد من الهوية
</p>
<form on:submit|preventDefault={signUp}>
    <FormInput 
        type="email" 
        placeholder="username@example.com"
        store={signUpFormEmailStore}
    >
        New E-mail
    </FormInput>
    
    <FormInput
        type="password"
        placeholder="password"
        store={signUpFormPasswordStore}
    >
        New Password
    </FormInput>
    
    <SubmitButton>إنشاء حساب</SubmitButton>
</form>