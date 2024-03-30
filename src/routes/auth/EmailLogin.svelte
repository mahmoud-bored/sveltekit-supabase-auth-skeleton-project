<script lang="ts">
    import type { SupabaseClient } from '@supabase/supabase-js'
	import { writable, type Writable } from "svelte/store";
	import FormInput from "./FormInput.svelte";
	import SubmitButton from "$lib/components/SubmitButton.svelte";
	import { goto } from '$app/navigation';

    export let supabaseClient: SupabaseClient
    export let loading: Writable<boolean>

    let loginFormEmailStore: Writable<HTMLInputElement> = writable()
    let loginFormPasswordStore: Writable<HTMLInputElement> = writable()
        
    async function signIn() {
        loading.set(true)
        const email = $loginFormEmailStore.value
        const password = $loginFormPasswordStore.value
        let error
        const { error: signInError } = await supabaseClient.auth.signInWithPassword({
            email,
            password
        });
        if (signInError)
            error = signInError.message;
        console.log(error)
        goto('../account')
        loading.set(false)
    }
</script>

<form on:submit|preventDefault={signIn}>
    <FormInput 
        type="email" 
        placeholder="username@example.com"
        store={loginFormEmailStore}
    >
        E-mail
    </FormInput>
    
    <FormInput
        type="password"
        placeholder="password"
        store={loginFormPasswordStore}
    >
        Password
    </FormInput>
    
    <SubmitButton>تسجيل دخول</SubmitButton>
</form>