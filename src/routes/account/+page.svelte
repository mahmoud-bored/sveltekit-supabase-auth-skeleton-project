<script lang="ts">
	import { enhance } from "$app/forms";
	import SubmitButton from "$lib/components/SubmitButton.svelte";

    export let data
    
    console.log(data.profile)
    let loading = false
</script>

<h1 class="text-3xl text-white">Account</h1>
<form 
    method="post"
    action="?/logout"
    use:enhance={() => {
        loading = true
        return async ({ update }) => {
            loading = false
            update()
        }
    }}>
    <SubmitButton>Logout</SubmitButton>

</form>