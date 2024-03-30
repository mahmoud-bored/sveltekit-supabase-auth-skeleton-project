<script lang="ts">
	import type { Writable } from "svelte/store";

    export let type: string = "text"
    export let placeholder: string = ""
    export let required: boolean = true
    export let store: Writable<HTMLInputElement> | null = null

    let input: HTMLInputElement
    $: if (store) {
        store.set(input)
    }
</script>

<label class="mb-4 flex w-full flex-col justify-start">
    <span class="mb-2.5 block text-sm leading-none text-neutral-900">
        <slot/>
    </span>
    <input 
        {type} 
        {placeholder}
        {required}
        bind:this={input}
        class="h-8 flex-grow flex-shrink-0 rounded-md border border-neutral-200 px-2.5 leading-4 text-neutral-900 focus:border-magnum-400 transition"
        />
</label>



