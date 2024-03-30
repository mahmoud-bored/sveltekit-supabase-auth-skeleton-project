<script lang="ts">
	import { cn } from '$lib/docs/utils';
    import { invalidateAll } from '$app/navigation';
	import { createTabs, melt } from '@melt-ui/svelte';
	import { cubicInOut } from 'svelte/easing';
	import { crossfade } from 'svelte/transition';
	import SubmitButton from '../../lib/components/SubmitButton.svelte';
	import FormInput from './FormInput.svelte';
	import type { Input } from 'postcss';
	import { writable, type Writable } from 'svelte/store';
	import EmailLogin from './EmailLogin.svelte';
	import MagicLinkLogin from './MagicLinkLogin.svelte';
	import EmailSignUp from './EmailSignUp.svelte';

    export let data

    const url = `${data.url}/auth/api`
    
    const loading = writable(false)
    const supabaseClient = data.supabase
	const {
		elements: { root, list, content, trigger },
		states: { value }
	} = createTabs({
		defaultValue: 'tab-3'
	});

	let className = '';
	export { className as class };

	const triggers = [
		{ id: 'tab-1', title: 'إنشاء حساب' },
		{ id: 'tab-2', title: 'تسجيل الدخول لمرة واحدة' },
		{ id: 'tab-3', title: 'تسجيل الدخول' },
	];

	const [send, receive] = crossfade({
		duration: 250,
		easing: cubicInOut
	});






</script>
<section class="h-full w-full flex justify-center items-center">
    <div use:melt={$root} class={ cn('flex max-w-[25rem] flex-col overflow-hidden rounded-xl shadow-lg  data-[orientation=vertical]:flex-row border-4 border-magnum-900', className) } >
        <div
            use:melt={$list}
            class="flex shrink-0 overflow-x-auto bg-neutral-100 data-[orientation=vertical]:flex-col data-[orientation=vertical]:border-r"
            aria-label="Manage your account"
        >
            {#each triggers as triggerItem}
                <button 
                    use:melt={$trigger(triggerItem.id)} 
                    class="trigger flex-1 leading-5 bg-neutral-100 text-neutral-900 flex justify-center 
                        items-center select-none relative cursor-default hover:bg-neutral-200 transition h-14 pb-2 px-2
                        focus:relative focus-visible:z-10 focus-visible:ring-2 
                        data-[state=active]:focus:relative data-[state=active]:bg-white data-[state=active]:text-magnum-900"
                >
                    {triggerItem.title}
                    {#if $value === triggerItem.id}
                        <div
                            in:send={{ key: 'trigger' }}
                            out:receive={{ key: 'trigger' }}
                            class="absolute bottom-1 left-1/2 h-1 w-6 -translate-x-1/2 rounded-full bg-magnum-400"
                        />
                    {/if}
                </button>
            {/each}
        </div>



        <div use:melt={$content('tab-1')} class="grow bg-white p-5">
            <EmailSignUp {supabaseClient} {loading} {url} />
        </div>



        <div use:melt={$content('tab-2')} class="grow bg-white p-5">
            <MagicLinkLogin {supabaseClient} {loading} {url} />
        </div>



        <div use:melt={$content('tab-3')} class="grow bg-white p-5">
            <EmailLogin {supabaseClient} {loading} />
        </div>
    </div>
</section>

